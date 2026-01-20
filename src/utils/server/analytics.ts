import { DateTime } from "luxon";

function parseWhatsAppDate(dateStr: string): DateTime {
  // "3/30/21"
  return DateTime.fromFormat(dateStr, "M/d/yy");
}

export function computeStats(messages: any[], joins: any[]) {
  // 1️⃣ Collect all dates
  const allDates = [
    ...messages.map((m) => parseWhatsAppDate(m.date)),
    ...joins.map((j) => parseWhatsAppDate(j.date)),
  ].filter((d) => d.isValid);

  if (allDates.length === 0) {
    return { chart: [], powerUsers: [] };
  }

  // 2️⃣ Find last date in chat
  const maxDate = DateTime.max(...allDates);
  if (!maxDate) {
    return { chart: [], powerUsers: [] };
  }
  // 3️⃣ Build last 7 CHAT days
  const last7Days = Array.from({ length: 7 }, (_, i) =>
    maxDate.minus({ days: 6 - i }).toFormat("M/d/yy"),
  );

  // 4️⃣ Init maps
  const activeUsersByDay: Record<string, Set<string>> = {};
  const newUsersByDay: Record<string, Set<string>> = {};

  last7Days.forEach((d) => {
    activeUsersByDay[d] = new Set();
    newUsersByDay[d] = new Set();
  });

  // 5️⃣ Count active users
  messages.forEach((m) => {
    if (activeUsersByDay[m.date]) {
      activeUsersByDay[m.date].add(m.user);
    }
  });

  // 6️⃣ Count joined users
  joins.forEach((j) => {
    if (newUsersByDay[j.date]) {
      newUsersByDay[j.date].add(j.user);
    }
  });

  // 7️⃣ Power users (active ≥4 days)
  const activityCount: Record<string, number> = {};

  Object.values(activeUsersByDay).forEach((set) => {
    set.forEach((user) => {
      activityCount[user] = (activityCount[user] || 0) + 1;
    });
  });

  const powerUsers = Object.keys(activityCount).filter(
    (u) => activityCount[u] >= 4,
  );

  // 8️⃣ Final chart
  return {
    chart: last7Days.map((d) => ({
      date: d,
      active: activeUsersByDay[d].size,
      joined: newUsersByDay[d].size,
    })),
    powerUsers,
  };
}
