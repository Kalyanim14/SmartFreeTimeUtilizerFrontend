// src/App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, } from "react-router-dom";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import TimeUtilizer from "./components/TimeUtilizer";
import History from "./components/History";

// Simple protected-route wrapper
function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) return <Navigate to="/signin" replace />;
  return children;
}

// Small wrappers so we can pass the onSwitch + setIsLoggedIn props
function SignInPage({ setIsLoggedIn, isLoggedIn }) {
  const navigate = useNavigate();
  const onSwitch = () => navigate("/signup");
  if (isLoggedIn) return <Navigate to="/timeutilizer" replace />;
  return <SignIn onSwitch={onSwitch} setIsLoggedIn={setIsLoggedIn} />;
}

function SignUpPage({ setIsLoggedIn, isLoggedIn }) {
  const navigate = useNavigate();
  const onSwitch = () => navigate("/signin");
  if (isLoggedIn) return <Navigate to="/timeutilizer" replace />;
  return <SignUp onSwitch={onSwitch} setIsLoggedIn={setIsLoggedIn} />;
}

// Exported for testing so we can wrap in MemoryRouter
export function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("username");
  });

  return (
    <Routes>
      {/* Auth */}
      <Route path="/signin" element={<SignInPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />
      <Route path="/signup" element={<SignUpPage setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />} />

      {/* App (protected) */}
      <Route
        path="/timeutilizer"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <TimeUtilizer setIsLoggedIn={setIsLoggedIn} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <History setIsLoggedIn={setIsLoggedIn} />
          </ProtectedRoute>
        }
      />


      {/* Defaults / redirects */}
      <Route
        path="/"
        element={<Navigate to={isLoggedIn ? "/timeutilizer" : "/signin"} replace />}
      />
      <Route path="/" element={<SignIn />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
