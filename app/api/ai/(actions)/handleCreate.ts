import { prisma } from "@/libs/prisma";
import { ModelKey, models } from "../(prompts)/process-input-prompt";

export default function handleCreate(object: any) {
  switch (object.model) {
    case models.EXERCISE_ENTRY:
      break;
  }
}
