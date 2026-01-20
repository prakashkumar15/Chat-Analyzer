import { getReportFn } from "@/utils/report.function";
import { createFileRoute } from "@tanstack/react-router";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  active: {
    label: "Active Users",
    color: "var(--chart-1)",
  },
  joined: {
    label: "New Users",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

type Props = {
  data: {
    date: string;
    active: number;
    joined: number;
  }[];
};

export function ChatActivityChart({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>WhatsApp Group Activity</CardTitle>
        <CardDescription>Last 7 days of conversation</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-114 w-[100%]">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              domain={[0, "dataMax + 5"]}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Legend />

            <Bar dataKey="active" fill="var(--color-active)" radius={4} />
            <Bar dataKey="joined" fill="var(--color-joined)" radius={4} />
          </BarChart>
          {/* </ResponsiveContainer> */}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
export const Route = createFileRoute("/reports/$Id/")({
  loader: ({ params }) => getReportFn({ data: { id: params.Id } }),
  component: RouteComponent,
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div style={{ padding: 24 }}>
      <ChatActivityChart data={data.stats.chart} />

      <Card style={{ marginTop: 24 }}>
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
          <CardDescription>
            Active for at least 4 days in the last 7 days
          </CardDescription>
        </CardHeader>

        <CardContent>
          {data.stats.powerUsers.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No Active users found for this period.
            </p>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {data.stats.powerUsers.map((u: string) => (
                <li key={u} className="text-sm">
                  {u}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
