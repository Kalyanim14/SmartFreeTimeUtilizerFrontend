import { useEffect, useState } from "react";
import api from "../api";

export default function History() {
  const [history, setHistory] = useState([]); const [message, setMessage] = useState("Loading your generated plans…");
  useEffect(() => { api.get("/api/history").then(({ data }) => { setHistory(data.history); setMessage(data.history.length ? "" : "No generated plans yet."); }).catch(() => setMessage("Unable to load history.")); }, []);
  return <main className="mx-auto max-w-4xl px-5 py-8 pb-28"><h1 className="text-3xl font-bold text-slate-900">Plan history</h1><p className="mt-2 text-slate-600">Review the AI plans that helped populate your taskboard.</p>{message && <p className="mt-6 rounded-xl bg-slate-100 p-4">{message}</p>}<div className="mt-6 space-y-4">{history.map((item, index) => <article key={index} className="rounded-2xl border bg-white p-5 shadow-sm"><time className="text-xs font-medium text-indigo-600">{new Date(item.created_at).toLocaleString()}</time><div className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">{item.ai_response}</div></article>)}</div></main>;
}
