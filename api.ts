const API_URL = process.env.NEXT_PUBLIC_API_URL; // http://localhost:5001

export async function sendEmotion(text: string) {
  const res = await fetch(`${API_URL}/api/emotion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  if (!res.ok) throw new Error("API failed");
  return res.json();
}
