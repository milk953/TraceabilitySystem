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
import LoginIcon from "@mui/icons-material/Login";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { fn_Homepage } from "../Homepage/fn_Homepage";
import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";
import { LoginOutlined } from "@mui/icons-material";
function Hearder() {
  const { openLoginModal, menuName } = fn_Homepage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = localStorage.getItem("Username");
  const surname = localStorage.getItem("Lastname");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    window.location.href = "/TraceabilitySystem";
    // openLoginModal();
  };

  const loginBtn = () => {
    if (window.location.pathname !== "/TraceabilitySystem") {
      const goHome = () => {
        navigate("/TraceabilitySystem");
      };
      return (
        <Tooltip title="LogOut">
        <LoginIcon style={{ color: '',cursor:'pointer' }} onClick={goHome} />
      </Tooltip>
        
      );
    }
    return (
    <Tooltip title="Login">
     <LoginIcon style={{ color: '',cursor:'pointer' }}  onClick={openLoginModal}  />
    </Tooltip>
    
    );
  };
  const logOut = () => {
    return (
      <Tooltip title="LogOut">
        <LogoutIcon style={{ color: "" }} onClick={Logout} />
      </Tooltip>
    );
  };
  // const RandomColour =()=>{
  //   const letters = '0123456789ABCDEF';
  //   let color = '#';
  //   for (let i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }
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
              TRACEABILITY SYSTEM  {menuName}
            </Typography>

            {user ? <> <Avatar
              sx={{ bgcolor: deepOrange[500], marginRight: "10px" }}
            >{user.charAt(0)}{surname.charAt(0)}</Avatar>
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
              Username : {user}  {surname} &nbsp;&nbsp;
              <br />
            </Button></>:<> 
            <Avatar
              sx={{ bgcolor: deepOrange[500], marginRight: "10px" }}
            >G</Avatar>
            
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
              onClick={openLoginModal} 
            >
              Username : Guess &nbsp;&nbsp;
            </Button>
           </>}
           
            {user ? logOut() : loginBtn()}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Hearder;
