import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import TimeUtilizer from "./components/TimeUtilizer";
import History from "./components/History";   // <-- ADD THIS

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/timeutilizer" />
            ) : (
              <SignIn onSwitch={() => (window.location.href = "/signup")} setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path="/signup"
          element={<SignUp onSwitch={() => (window.location.href = "/")} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/timeutilizer" element={<TimeUtilizer />} />
        <Route path="/history" element={<History />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
