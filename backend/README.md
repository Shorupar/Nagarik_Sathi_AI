# Backend

On Windows, start the API and a dedicated CPU-only Ollama server with:

```powershell
.\backend\start.ps1
```

The script uses the installed `llama3.2:3b` model and serves the API on port
8001. If the model is missing, install it with `ollama pull llama3.2:3b`.
Press Ctrl+C to stop the API; the script also stops the Ollama process it
started. It does not stop or modify the Ollama app running on its default
port.
