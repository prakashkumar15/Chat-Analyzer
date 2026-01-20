// src/utils/chat.server.ts
import { getDb } from "./db";
import { computeStats } from "./analytics";
import { parseChat } from "./parseChat";
import { ObjectId } from "mongodb";


export type ChatReport = {
  _id: string;
  createdAt: string;
  stats: {
    chart: {
      date: string;
      active: number;
      joined: number;
    }[];
    powerUsers: string[];
  };
};
export async function analyzeChat(text: string) {
  const { messages, joins } = parseChat(text);
  const stats = computeStats(messages, joins);

  const db = await getDb();
  const result = await db.collection("chat_reports").insertOne({
    createdAt: new Date(),
    stats,
  });

  return {
    reportId: result.insertedId.toString(),
  };
}

export async function getReportById(id: string): Promise<ChatReport> {
  const db = await getDb();

  const doc = await db
    .collection("chat_reports")
    .findOne({ _id: new ObjectId(id) });

  if (!doc) throw new Error("Not found");

  return {
    _id: doc._id.toString(),
    createdAt: doc.createdAt?.toISOString?.() ?? "",
    stats: doc.stats,
  };
}
