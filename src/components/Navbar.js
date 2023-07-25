import React, { useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { AuthContext } from "../Main";

const navItems = [
  {text: "Home", link: "/admin" },
  { text: "Detail", link: "/detail" },
  { text: "Contact", link: "/contact" },
  { text: "About", link: "/about" }
];


function Navbar() {
  let navigate = useNavigate();
  const { user, setIsLoggedIn } = useContext(AuthContext);
  const handleLogOut = () => {
    setIsLoggedIn(false);
    navigate('/');
    let buttonDiv = document.getElementById("buttonDiv");
    if (buttonDiv) {
      buttonDiv.hidden = false;
    }
    localStorage.removeItem('user');
};

  return (
    <AppBar position="static" sx={{ bgcolor: "rgba(20, 20, 20)" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{justifyContent: "right", flexGrow: 0.9 }}>
        <h5>{user.name}</h5>
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "left"}}>
        {navItems.map(({ text, link }) => (
            <NavLink  className="nav-link" to={link} style={{textDecoration: "none", color: "white", margin: "2% 4%"}} type="button">
              {text}
            </NavLink>
          ))}
          {Object.keys(user).length !== 0 ? (
            <>
              <Button
                onClick={handleLogOut}
                sx={{ width: "5%", marginLeft: "4%"}}
              >
                Logout
              </Button>
            </>
          ) : (
            <div id="buttonDiv"></div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
