import { useState } from "react";

const readSettings = () => { try { return JSON.parse(localStorage.getItem("pomodoro-settings")) || {}; } catch { return {}; } };

export default function Settings() {
  const saved = readSettings();
  const [minutes, setMinutes] = useState(saved.minutes || 25);
  const [repeats, setRepeats] = useState(saved.repeats || 1);
  const [message, setMessage] = useState("");
  const save = (event) => { event.preventDefault(); const settings = { minutes: Math.max(1, Math.min(180, Number(minutes))), repeats: Math.max(1, Math.min(12, Number(repeats))) }; localStorage.setItem("pomodoro-settings", JSON.stringify(settings)); window.dispatchEvent(new Event("pomodoro-settings-updated")); setMinutes(settings.minutes); setRepeats(settings.repeats); setMessage("Pomodoro preferences saved."); };
  return <main className="mx-auto max-w-2xl px-5 py-8 pb-28"><section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-sm font-semibold text-indigo-600">Preferences</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Settings</h1><p className="mt-2 text-slate-600">Set the defaults used by your focus timer.</p><form onSubmit={save} className="mt-7 grid gap-5 sm:grid-cols-2"><label className="text-sm font-medium text-slate-700">Focus duration (minutes)<input type="number" min="1" max="180" value={minutes} onChange={(event) => setMinutes(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none ring-indigo-200 focus:ring-2" /></label><label className="text-sm font-medium text-slate-700">Default repeat rounds<input type="number" min="1" max="12" value={repeats} onChange={(event) => setRepeats(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none ring-indigo-200 focus:ring-2" /></label><div className="sm:col-span-2"><button className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">Save preferences</button>{message && <span className="ml-3 text-sm text-emerald-700">{message}</span>}</div></form></section></main>;
}
