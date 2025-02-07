import { SentPrompt } from "@/app/dashboard/components/messages";

export function getLocalSentPrompts(): SentPrompt[] {
  const result: SentPrompt[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key && key.startsWith("sent-prompt")) {
      const value = localStorage.getItem(key);
      if (value !== null) {
        result.push(JSON.parse(value));
      }
    }
  }

  return result;
}
