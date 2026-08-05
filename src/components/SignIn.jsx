import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function SignIn({ onSwitch, setIsLoggedIn }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const submit = async (event) => { event.preventDefault(); try { const { data } = await api.post("/signin", form); localStorage.setItem("token", data.token); localStorage.setItem("username", form.username); localStorage.setItem("name", data.name || ""); setIsLoggedIn(true); navigate("/dashboard"); } catch (error) { setMessage(error.response?.data?.message || "Unable to sign in."); } };
  return <AuthFrame title="Welcome back"><form onSubmit={submit} className="space-y-4"><input required placeholder="Username" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} className="w-full rounded-lg border p-3"/><input required type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="w-full rounded-lg border p-3"/><button className="w-full rounded-lg bg-indigo-600 py-3 font-medium text-white">Sign in</button></form>{message && <p className="mt-3 text-sm text-rose-600">{message}</p>}<p className="mt-5 text-sm">New here? <button onClick={onSwitch} className="font-medium text-indigo-600">Create an account</button></p></AuthFrame>;
}
function AuthFrame({ title, children }) { return <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 to-violet-100 p-5"><section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"><h1 className="mb-6 text-3xl font-bold text-slate-900">{title}</h1>{children}</section></main>; }
