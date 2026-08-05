import { useEffect, useState } from "react";
import api from "../api";

export default function Profile() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [message, setMessage] = useState("");
  useEffect(() => { api.get("/api/profile").then(({ data }) => { setName(data.profile.name); setUsername(data.profile.username); }).catch(() => setMessage("Unable to load your profile.")); }, []);
  const submit = async (event) => { event.preventDefault(); try { const { data } = await api.patch("/api/profile", { name }); localStorage.setItem("name", data.profile.name); window.dispatchEvent(new Event("profile-updated")); setMessage("Profile updated successfully."); } catch (error) { setMessage(error.response?.data?.message || "Unable to update your profile."); } };
  return <main className="mx-auto max-w-2xl px-5 py-8 pb-28"><section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-sm font-semibold text-indigo-600">Account</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">Edit profile</h1><p className="mt-2 text-slate-600">Keep the details that personalize your planning space current.</p><form onSubmit={submit} className="mt-7 space-y-5"><label className="block text-sm font-medium text-slate-700">Name<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none ring-indigo-200 focus:ring-2" /></label><label className="block text-sm font-medium text-slate-700">Username<input disabled value={username} className="mt-1.5 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-500" /></label><button className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">Save changes</button>{message && <p className="rounded-lg bg-indigo-50 px-3 py-2 text-sm text-indigo-900">{message}</p>}</form></section></main>;
}
