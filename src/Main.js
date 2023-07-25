import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FilmsPresentation from "./FilmsPresentation";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { ContactUs } from "./ContactUs";
import Home from './pages/Home'
import Detail from './pages/Detail'
import About from './pages/About';
import Navbar from "./components/Navbar";
export const AuthContext = React.createContext();

const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const RenderContent = () => (
    <div>
      <Navigation setIsLoggedIn={setIsLoggedIn} />
      <FilmsPresentation />
      <Footer />
    </div>
  );

  const handleLogOut = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
          <Router>
      {isLoggedIn ? (
        <>
          <Navbar setIsLoggedIn={setIsLoggedIn} onLogOut={handleLogOut} user={user} />
          <Routes>
            <Route path="/admin" element={<Home />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<RenderContent />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      )}
    </Router>
    </AuthContext.Provider>

  );
}

export default Main;
