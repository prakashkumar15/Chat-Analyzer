import { createServerFn } from "@tanstack/react-start";
import { analyzeChat } from "./server/chat";

export const analyzeChatFn = createServerFn({ method: "POST" })
  .inputValidator((formData: FormData) => {
    const file = formData.get("file");
    if (!(file instanceof File)) {
      throw new Error("File is required");
    }
    return formData;
  })
  .handler(async ({ data }) => {
    const file = data.get("file") as File;
    const text = await file.text();
    return analyzeChat(text);
  });