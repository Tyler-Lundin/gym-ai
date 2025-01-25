export default async function sendPrompt({
  prompt,
  workoutId,
  timestamp,
  entryKey,
}: {
  prompt: string;
  workoutId: string;
  timestamp: string;
  entryKey: string;
}) {
  const response = await fetch("/api/ai", {
    method: "POST",
    body: JSON.stringify({ prompt, workoutId, timestamp, entryKey }),
  });
  const result = await response.json();
  return { response: result };
}
