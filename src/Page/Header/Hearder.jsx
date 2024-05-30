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
import AccountCircle from "@mui/icons-material/AccountCircle";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

function Hearder() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = localStorage.getItem("Username");
  const surname = localStorage.getItem("Lastname");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("Username");
    localStorage.removeItem("Lastname");
    navigate("/");
  }
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
              Username: {user} {surname} &nbsp;&nbsp;
              <br />
            </Button>
            <LogoutIcon onClick={Logout}  />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Hearder;
