export interface Message {
  sender: "user" | "agent";
  text: string;
}

export interface DateConversionResponse {
  converted_date: string;
  type: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function convertBsToAd(year: number, month: number, day: number): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/utilities/convert-date`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      year,
      month,
      day,
      conversion_type: "BS_TO_AD",
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to convert date");
  }

  const data: DateConversionResponse = await res.json();
  return data.converted_date;
}