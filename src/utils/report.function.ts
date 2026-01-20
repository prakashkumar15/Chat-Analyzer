import { createServerFn } from "@tanstack/react-start";
import { getReportById } from "./server/chat";

export const getReportFn = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    return getReportById(data.id);
  });
