$ErrorActionPreference = "Stop"

$ollamaHost = "127.0.0.1:11435"
$ollamaUrl = "http://$ollamaHost"
$model = "llama3.2:3b"
$ollamaProcess = $null

$ollamaCommand = Get-Command ollama -ErrorAction SilentlyContinue
$ollamaPath = if ($ollamaCommand) {
    $ollamaCommand.Source
} else {
    Join-Path $env:LOCALAPPDATA "Programs\Ollama\ollama.exe"
}

if (-not (Test-Path $ollamaPath)) {
    throw "Ollama was not found. Install Ollama or add ollama.exe to PATH."
}

$env:OLLAMA_BASE_URL = $ollamaUrl
$env:OLLAMA_MODEL = $model
$env:OLLAMA_HOST = $ollamaHost
$env:OLLAMA_LLM_LIBRARY = "cpu"

$tags = $null
try {
    $tags = Invoke-RestMethod -Uri "$ollamaUrl/api/tags" -TimeoutSec 2
} catch {
    $listener = Get-NetTCPConnection -LocalPort 11435 -State Listen -ErrorAction SilentlyContinue |
        Select-Object -First 1
    if ($listener) {
        throw "Port 11435 is already in use, but is not serving Ollama."
    }

    $ollamaProcess = Start-Process -FilePath $ollamaPath -ArgumentList "serve" -PassThru -NoNewWindow
    for ($attempt = 0; $attempt -lt 30; $attempt++) {
        if ($ollamaProcess.HasExited) {
            throw "The CPU-only Ollama server exited during startup."
        }

        try {
            $tags = Invoke-RestMethod -Uri "$ollamaUrl/api/tags" -TimeoutSec 2
            break
        } catch {
            Start-Sleep -Seconds 1
        }
    }
}

if (-not $tags -or $tags.models.name -notcontains $model) {
    if ($ollamaProcess) {
        Stop-Process -Id $ollamaProcess.Id -ErrorAction SilentlyContinue
    }
    throw "Ollama model '$model' is not installed. Run 'ollama pull $model' and try again."
}

$uvicornPath = Join-Path $PSScriptRoot "venv\Scripts\uvicorn.exe"
if (-not (Test-Path $uvicornPath)) {
    if ($ollamaProcess) {
        Stop-Process -Id $ollamaProcess.Id -ErrorAction SilentlyContinue
    }
    throw "Backend dependencies are missing. Install backend\requirements.txt in backend\venv first."
}

Write-Host "Starting Nagarik Sathi API on http://127.0.0.1:8001 using $model (CPU)."
Push-Location $PSScriptRoot
try {
    & $uvicornPath app.main:app --host 127.0.0.1 --port 8001
    if ($LASTEXITCODE -ne 0) {
        throw "The backend exited with code $LASTEXITCODE."
    }
} finally {
    Pop-Location
    if ($ollamaProcess -and -not $ollamaProcess.HasExited) {
        Stop-Process -Id $ollamaProcess.Id
        $ollamaProcess.WaitForExit()
    }
}
