



import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";
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