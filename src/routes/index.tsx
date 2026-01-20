import { FileDropzone } from "@/components/dropzone";
import { Input } from "@/components/ui/input";
import { analyzeChatFn } from "@/utils/chat.function";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const router = useNavigate();
  async function onFileSelected(file: File) {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const data = await analyzeChatFn({ data: formData });
      router({
        to: "/reports/$Id",
        params: { Id: data.reportId },
      });
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze chat file");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="w-full max-w-xl space-y-6">
        <FileDropzone onFileSelected={onFileSelected} disabled={loading} />

        {loading && (
          <p className="text-center text-sm text-muted-foreground">
            Analyzing chat…
          </p>
        )}

        {error && <p className="text-center text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
