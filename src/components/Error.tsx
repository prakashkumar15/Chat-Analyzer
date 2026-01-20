import { AlertCircle } from "lucide-react";

type Props = {
  title?: string;
  message: string;
};

export function Error({
  title = "Something went wrong",
  message,
}: Props) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <AlertCircle className="h-10 w-10 text-destructive" />

        <h2 className="text-xl font-semibold">{title}</h2>

        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
