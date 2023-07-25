import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import { ThemeContext } from "./components/ThemeContext";
import { TextField } from "@mui/material";
import { AuthContext } from "./Main";
import jwt_decode from "jwt-decode";
const pages = ["Home", "TV Shows", "Movies"];

function Navigation() {
  const { setUser, setIsLoggedIn } = useContext(AuthContext);
  let navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { toggleTheme } = useContext(ThemeContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [showInput, setShowInput] = useState(false);

  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    var decoded = jwt_decode(response.credential);
    setUser(decoded);
    localStorage.setItem('user', JSON.stringify(decoded));
    setIsLoggedIn(true);
    let buttonDiv = document.getElementById("buttonDiv");
    if (buttonDiv) {
      buttonDiv.hidden = true;
    }
    navigate("/admin"); 
};


  useEffect(() => {
    window.onload = function () {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id:
            "435237638966-icv1ij1cifjn6pumq3o2vm7aatm2570g.apps.googleusercontent.com",
          callback: handleCredentialResponse,
        });
        window.google.accounts.id.renderButton(
          document.getElementById("buttonDiv"),
          { theme: "outline", size: "large" } 
        );
        window.google.accounts.id.prompt();
      }
    };
  }, []);
  return (
    <AppBar position="static" sx={{ bgcolor: "rgba(20, 20, 20)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 500,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NETFILM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {showInput && (
              <TextField
                className="search_input"
                id="outlined-textarea"
                placeholder="Search"
              />
            )}
            <IconButton aria-label="search" sx={{ color: "white" }}>
              <SearchOutlinedIcon fontSize="large" />
            </IconButton>
            <Tooltip title="Notifications">
              <IconButton aria-label="notifications" sx={{ color: "white" }}>
                <NotificationsNoneRoundedIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Dark mode">
              <IconButton
                aria-label="dark mode"
                sx={{ color: "white", mr: 10 }}
                onClick={toggleTheme}
              >
                <DarkModeOutlinedIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Box>
          <div id="buttonDiv"></div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
