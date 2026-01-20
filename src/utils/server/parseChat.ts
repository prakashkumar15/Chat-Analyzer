import { z } from "zod";

export const MessageSchema = z.object({
  date: z.string().regex(/^\d{1,2}\/\d{1,2}\/\d{2}$/),
  user: z.string().min(1),
});

export const JoinSchema = MessageSchema;

export type Message = z.infer<typeof MessageSchema>;
export type Join = z.infer<typeof JoinSchema>;


export function parseChat(text: string) {
  const messages: Message[] = [];
  const joins: Join[] = [];

  const lines = text.split("\n");

  for (const line of lines) {
    const baseMatch = line.match(/^(\d{1,2}\/\d{1,2}\/\d{2}),.*?- (.*)$/);

    if (!baseMatch) continue;

    const [, date, rest] = baseMatch;

    // Message
    if (rest.includes(":")) {
      const user = rest.split(":")[0];
      const parsed = MessageSchema.safeParse({ date, user });

      if (parsed.success) messages.push(parsed.data);
      continue;
    }

    // Join
    if (rest.includes(" joined")) {
      const user = rest.replace(" joined", "");
      const parsed = JoinSchema.safeParse({ date, user });

      if (parsed.success) joins.push(parsed.data);
    }
  }

  return { messages, joins };
}
