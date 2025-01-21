import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";
import {
  processInputPrompt as system,
  actions,
} from "../(prompts)/process-input-prompt";

export const processInputSchema = z.object({
  modelKey: z.string().min(1, "Model is required"),
  actionKey: z.enum([
    "reject",
    "create",
    "read",
    "update",
    "delete",
    "suggest",
    "analyze",
  ]),
});

export async function processInput(prompt: string | null) {
  if (!prompt) {
    return { result: undefined };
  }

  const { object } = await generateObject({
    model: openai("gpt-4"),
    system,
    prompt,
    schema: processInputSchema,
  });

  switch (object.actionKey) {
    case actions.REJECT:
      return { result: "Prompt rejected." };
    case actions.CREATE:
    // return await handleCreate(object);
    case actions.READ:
    // return await handleRead(object);
    case actions.UPDATE:
    // return await handleUpdate(object);
    case actions.DELETE:
    // return await handleDelete(object);
    case actions.SUGGEST:
    // return await handleSuggest(object);
    case actions.ANALYZE:
    // return await handleAnalyze(object);
    default:
      throw new Error("Unknown action type");
  }
}
