import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import TimeUtilizer from "./components/TimeUtilizer";
import History from "./components/History";
import Pomodoro from "./components/Pomodoro";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

function Navbar({ onLogout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [name, setName] = useState(() => localStorage.getItem("name") || localStorage.getItem("username") || "Profile");
  useEffect(() => {
    const closeMenu = (event) => { if (!menuRef.current?.contains(event.target)) setOpen(false); };
    const refreshName = () => setName(localStorage.getItem("name") || localStorage.getItem("username") || "Profile");
    document.addEventListener("mousedown", closeMenu);
    window.addEventListener("profile-updated", refreshName);
    return () => { document.removeEventListener("mousedown", closeMenu); window.removeEventListener("profile-updated", refreshName); };
  }, []);
  return <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur"><nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3"><Link to="/dashboard" className="text-lg font-bold tracking-tight text-indigo-700">Smart Free Time</Link><div className="flex items-center gap-1 text-sm font-medium text-slate-600"><Link to="/dashboard" className="rounded-lg px-3 py-2 hover:bg-slate-100 hover:text-slate-950">Taskboard</Link><Link to="/timeutilizer" className="rounded-lg px-3 py-2 hover:bg-slate-100 hover:text-slate-950">Generate</Link><Link to="/history" className="rounded-lg px-3 py-2 hover:bg-slate-100 hover:text-slate-950">History</Link><div ref={menuRef} className="relative ml-2"><button onClick={() => setOpen(!open)} aria-expanded={open} className="flex items-center gap-2 rounded-lg border border-slate-200 px-2 py-1.5 text-slate-800 shadow-sm hover:bg-slate-50"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">{name.charAt(0).toUpperCase()}</span><span className="hidden max-w-24 truncate sm:block">{name}</span><span aria-hidden="true" className="text-slate-400">⌄</span></button>{open && <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"><Link onClick={() => setOpen(false)} to="/profile" className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100">Edit profile</Link><Link onClick={() => setOpen(false)} to="/settings" className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100">Settings</Link><button onClick={onLogout} className="block w-full rounded-lg px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50">Logout</button></div>}</div></div></nav></header>;
}

function ProtectedLayout({ loggedIn, onLogout }) {
  if (!loggedIn) return <Navigate to="/signin" replace />;
  return <><Navbar onLogout={onLogout} /><Outlet /><Pomodoro /></>;
}

function AuthPage({ signup, onLogin }) {
  const navigate = useNavigate();
  return signup ? <SignUp onSwitch={() => navigate("/signin")} setIsLoggedIn={onLogin} /> : <SignIn onSwitch={() => navigate("/signup")} setIsLoggedIn={onLogin} />;
}

export function AppContent() {
  const [loggedIn, setLoggedIn] = useState(() => Boolean(localStorage.getItem("token")));
  const logout = () => { localStorage.removeItem("token"); localStorage.removeItem("username"); localStorage.removeItem("name"); setLoggedIn(false); };
  return <Routes><Route path="/signin" element={<AuthPage onLogin={setLoggedIn} />} /><Route path="/signup" element={<AuthPage signup onLogin={setLoggedIn} />} /><Route element={<ProtectedLayout loggedIn={loggedIn} onLogout={logout} />}><Route path="/dashboard" element={<Dashboard />} /><Route path="/timeutilizer" element={<TimeUtilizer />} /><Route path="/history" element={<History />} /><Route path="/profile" element={<Profile />} /><Route path="/settings" element={<Settings />} /></Route><Route path="/" element={<Navigate to={loggedIn ? "/dashboard" : "/signin"} replace />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes>;
}

export default function App() { return <BrowserRouter><AppContent /></BrowserRouter>; }
