import { getReportFn } from "@/utils/report.function";
import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChatActivityChart } from "@/components/Chart";
import { Error } from "@/components/Error";

export const Route = createFileRoute("/reports/$Id/")({
  loader: ({ params }) => getReportFn({ data: { id: params.Id } }),
  component: RouteComponent,

  errorComponent: () => (
    <Error
      title="Failed to load report"
      message="The report could not be loaded. It may not exist or an error occurred."
    />
  ),
});

function RouteComponent() {
  const data = Route.useLoaderData();

  return (
    <div>
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
