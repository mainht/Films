import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
      <Router>
        <Main isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </Router>
  );
}