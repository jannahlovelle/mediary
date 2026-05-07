import React, { useState, useEffect } from "react";
import { getIdeas, createIdea, deleteIdea } from "./api";
import Main from "./Pages/Main";
import Auth from "./Pages/Auth";

function App() {
  // Check if a token already exists from a previous session
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Function to call when login is successful
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="app-container">
      {isLoggedIn ? <Main /> : <Auth onLoginSuccess={handleLoginSuccess} />}
    </div>
  );
}

export default App;
