import React from "react";
import "./Footer.scss";
import Box from "@mui/material/Box";
import { AppBar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "rgba(20, 20, 20)", mt: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          padding: "20px",
        }}
      >
        <Box>
          <Typography
            component={Link}
            variant="body1"
            color="inherit"
            underline="none"
            sx={{textDecoration: "none"}}
          >
            Help Center
          </Typography>
          <Typography variant="body1" color="inherit" sx={{ mt: 1 }}>
            Cookie Preferences
          </Typography>
        </Box>
        <Box>
          <Typography
            component={Link}
            variant="body1"
            color="inherit"
            underline="none"
            sx={{textDecoration: "none"}}
          >
            Terms of Use
          </Typography>
          <Typography variant="body1" color="inherit" sx={{ mt: 1 }}>
            Privacy Policy
          </Typography>
        </Box>
        <Box>
          <Typography
            component={Link}
            to="/contact"
            variant="body1"
            color="inherit"
            sx={{textDecoration: "none"}}
          >
            Contact Us
          </Typography>
          <Typography variant="body1" color="inherit" sx={{ mt: 1 }}>
            About
          </Typography>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Footer;
