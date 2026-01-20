type Message = {
  date: string;
  user: string;
};

type Join = {
  date: string;
  user: string;
};

export function parseChat(text: string) {
  const messages: Message[] = [];
  const joins: Join[] = [];

  const lines = text.split("\n");

  for (const line of lines) {
    // Message
    const msgMatch = line.match(/^(\d{1,2}\/\d{1,2}\/\d{2}),.*?- (.*?):/);

    if (msgMatch) {
      messages.push({
        date: msgMatch[1],
        user: msgMatch[2],
      });
      continue;
    }

    // Join
    const joinMatch = line.match(
      /^(\d{1,2}\/\d{1,2}\/\d{2}),.*?- (.*?) joined/,
    );

    if (joinMatch) {
      joins.push({
        date: joinMatch[1],
        user: joinMatch[2],
      });
    }
  }

  return { messages, joins };
}
