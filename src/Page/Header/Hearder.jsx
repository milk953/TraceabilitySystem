import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../Sidebar/sidebar";
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { fn_Homepage } from "../Homepage/fn_Homepage";
import HomeIcon from "@mui/icons-material/Home";
function Hearder() {
  const { openLoginModal } = fn_Homepage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = localStorage.getItem("Username");
  const surname = localStorage.getItem("Lastname");
  // const params = new URLSearchParams(window.location.search);
  // console.log(params,'webbbb')
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
  window.location.href = "/"
 
    openLoginModal();
  };

  const loginBtn = () => {
    if (window.location.pathname !== "/") {
      const goHome = () => {
        navigate("/");
      };
      return (
        <Button onClick={goHome} variant="contained" sx={{ fontSize: "12px" }}>
          <HomeIcon/>
        </Button>
      );
    }
    return (
      <Button
        onClick={openLoginModal}
        variant="contained"
        sx={{ fontSize: "12px" }}
      >
        Login
      </Button>
    );
  };
  const logOut = () => {
    return (
      <Button
        onClick={Logout}
        variant="contained"
        color="error"
        sx={{ fontSize: "12px" }}
      >
        Logout
      </Button>
    );
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          style={{
            background: "#92C7CF",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </IconButton>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TRACEABILITY SYSTEM
            </Typography>
            <Avatar
              sx={{ bgcolor: deepOrange[500], marginRight: "10px" }}
            ></Avatar>
            <Button
              className="btnDate"
              color="inherit"
              style={{
                display: "contents",
                alignItems: "start",
                justifyContent: "start",
                fontSize: "12px",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              Username: {user ?? "Guest"} {surname} &nbsp;&nbsp;
              <br />
            </Button>
            {user ? logOut() : loginBtn()}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Hearder;