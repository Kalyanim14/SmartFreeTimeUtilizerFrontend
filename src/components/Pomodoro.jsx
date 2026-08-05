import { useEffect, useState } from "react";
import { Plus, Minus, X, Timer } from "lucide-react";

const readSettings = () => {
  try {
    return JSON.parse(localStorage.getItem("pomodoro-settings")) || {};
  } catch {
    return {};
  }
};

export default function Pomodoro() {
  const initial = readSettings();

  const [minutes, setMinutes] = useState(initial.minutes || 25);
  const [seconds, setSeconds] = useState((initial.minutes || 25) * 60);

  const [repeats, setRepeats] = useState(initial.repeats || 1);
  const [remainingRepeats, setRemainingRepeats] = useState(
    initial.repeats || 1
  );

  const [running, setRunning] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const totalSeconds = minutes * 60;
  const progress = (seconds / totalSeconds) * 100;

  // Scaled down SVG parameters (112px viewBox)
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  const reset = (
    nextMinutes = minutes,
    nextRepeats = repeats
  ) => {
    setRunning(false);
    setSeconds(nextMinutes * 60);
    setRemainingRepeats(nextRepeats);
  };

  const changeMinutes = (value) => {
    const next = Math.max(1, Math.min(180, value));
    setMinutes(next);
    reset(next);
  };

  const changeRepeats = (value) => {
    const next = Math.max(1, Math.min(20, value));
    setRepeats(next);
    reset(minutes, next);
  };

  useEffect(() => {
    const sync = () => {
      const saved = readSettings();

      if (saved.minutes && saved.repeats) {
        setRunning(false);
        setMinutes(saved.minutes);
        setRepeats(saved.repeats);
        setSeconds(saved.minutes * 60);
        setRemainingRepeats(saved.repeats);
      }
    };

    window.addEventListener("pomodoro-settings-updated", sync);
    return () => window.removeEventListener("pomodoro-settings-updated", sync);
  }, []);

  useEffect(() => {
    if (!running || seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [running, seconds]);

  useEffect(() => {
    if (seconds !== 0) return;

    if (
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      new Notification("Pomodoro Complete 🎉", {
        body: "Time for a short break!",
      });
    }

    if (remainingRepeats > 1) {
      setRemainingRepeats((r) => r - 1);
      setSeconds(minutes * 60);
    } else {
      setRunning(false);
    }
  }, [seconds]);

  const formatted = `${String(
    Math.floor(seconds / 60)
  ).padStart(2, "0")}:${String(
    seconds % 60
  ).padStart(2, "0")}`;

  // Floating Bubble (Collapsed)
  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className="fixed bottom-5 right-5 z-50 h-16 w-16 rounded-full bg-indigo-600 text-white shadow-xl transition hover:scale-105 active:scale-95 flex flex-col items-center justify-center"
      >
        <Timer size={18} />
        <span className="text-[11px] font-bold mt-0.5 leading-none">
          {formatted}
        </span>
      </button>
    );
  }

  // Expanded Compact Widget
  return (
    <aside className="fixed bottom-5 right-5 z-50 w-72 rounded-2xl bg-white shadow-2xl border border-slate-200 p-4 text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-indigo-600 font-semibold text-sm">
          <Timer size={16} />
          <span>Pomodoro</span>
        </div>

        <button
          onClick={() => setExpanded(false)}
          className="rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X size={16} />
        </button>
      </div>

      {/* Compact Progress Circle */}
      <div className="flex justify-center my-2">
        <div className="relative h-28 w-28 flex items-center justify-center">
          <svg
            className="rotate-[-90deg] h-full w-full"
            viewBox="0 0 112 112"
          >
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="#E2E8F0"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="56"
              cy="56"
              r={radius}
              stroke="#4F46E5"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{
                transition: "stroke-dashoffset .5s",
              }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              {formatted}
            </span>
            <span className="text-[10px] font-medium text-slate-400">
              Round {remainingRepeats} of {repeats}
            </span>
          </div>
        </div>
      </div>

      {/* Side-by-side Controls Grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        {/* Minutes */}
        <div className="rounded-xl bg-slate-50 border border-slate-200/60 p-1.5 text-center">
          <span className="text-[11px] font-medium text-slate-500 block mb-1">
            Focus (min)
          </span>
          <div className="flex items-center justify-between">
            <button
              onClick={() => changeMinutes(minutes - 1)}
              className="rounded-lg p-1 hover:bg-white hover:shadow-sm text-slate-600 transition"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-semibold">{minutes}</span>
            <button
              onClick={() => changeMinutes(minutes + 1)}
              className="rounded-lg p-1 hover:bg-white hover:shadow-sm text-slate-600 transition"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Rounds */}
        <div className="rounded-xl bg-slate-50 border border-slate-200/60 p-1.5 text-center">
          <span className="text-[11px] font-medium text-slate-500 block mb-1">
            Rounds
          </span>
          <div className="flex items-center justify-between">
            <button
              onClick={() => changeRepeats(repeats - 1)}
              className="rounded-lg p-1 hover:bg-white hover:shadow-sm text-slate-600 transition"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-semibold">{repeats}</span>
            <button
              onClick={() => changeRepeats(repeats + 1)}
              className="rounded-lg p-1 hover:bg-white hover:shadow-sm text-slate-600 transition"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            if (Notification.permission === "default") {
              Notification.requestPermission();
            }
            setRunning(!running);
          }}
          className="flex-1 rounded-xl bg-indigo-600 py-2 text-xs font-semibold text-white hover:bg-indigo-700 active:scale-98 transition"
        >
          {running ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => reset()}
          className="rounded-xl bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition"
        >
          Reset
        </button>
      </div>
    </aside>
  );
}