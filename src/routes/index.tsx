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
  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("File selected:", file.name);

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const data = await analyzeChatFn({ data: formData });
      // ✅ navigate after success
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
    <div style={{ padding: 24 }}>
      <h1>WhatsApp Chat Analyzer</h1>

      <Input
        type="file"
        accept=".txt"
        onChange={onFileChange}
        disabled={loading}
      />

      {loading && <p>Analyzing chat…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
