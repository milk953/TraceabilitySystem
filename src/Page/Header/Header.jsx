import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../Sidebar/sidebar";
import Avatar from "@mui/material/Avatar";
import { Space, Typography } from "antd";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { fn_Homepage } from "../Homepage/fn_Homepage";
import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";
import { LoginOutlined } from "@mui/icons-material";
import ImgLoging from "../Header/login.png";
import ImgLogOut from "../Header/logout.png";
import ImgTitle from "../Header/checklist.png";
import ImgBurger from "../Header/menu (3).png";
import ImgUser from "../Header/data-management.png";
import "../Common/StyleCommon.css";
// Typography

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
          <Avatar
            shape="square"
            size={64}
            src={ImgLoging}
            onClick={goHome}
            style={{ cursor: "pointer" }}
          />
          {/* <LoginIcon style={{ color: '',cursor:'pointer' }} onClick={goHome} /> */}
        </Tooltip>
      );
    }
    return (
      <Tooltip title="Login">
        <Avatar
          shape="square"
          size={64}
          src={ImgLoging}
          onClick={openLoginModal}
          style={{ cursor: "pointer" }}
        />
        {/* <LoginIcon style={{ color: '',cursor:'pointer' }}  onClick={openLoginModal}  /> */}
      </Tooltip>
    );
  };
  const logOut = () => {
    return (
      <Tooltip title="LogOut">
        <Avatar
          shape="square"
          size={64}
          src={ImgLogOut}
          onClick={Logout}
          style={{ cursor: "pointer" }}
        />
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
        <AppBar position="fixed" className="Header_CommonBG">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleSidebar}
            >
              <Avatar
                variant="square"
                src={ImgBurger}
                style={{ width: 25, height: 25 }}
              />
            </IconButton>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            {/* <Avatar variant="square" src={ImgTitle} /> */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Typography.Title
                level={5}
                style={{
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "#fff",
                  margin: 0,
                  fontFamily: "Montserrat, sans-serif",
                }}
                onClick={() => {
                  window.location.href =
                    "http://10.17.70.216/TraceabilitySystem";
                }}
              >
                TRACEABILITY SYSTEM
              </Typography.Title>

              <Typography.Text
                style={{
                  fontSize: "20px",
                  color: "#fff",
                  marginLeft: "8px",
                  // fontFamily: "Montserrat, sans-serif",
                }}
              >
                {menuName && `> ${menuName}`}
              </Typography.Text>
            </div>

            {user ? (
              <>
                {" "}
                {/* <Avatar sx={{ bgcolor: deepOrange[500], marginRight: "10px" }}>
                  {user.charAt(0)}
                  {surname.charAt(0)}
                </Avatar> */}
                <Avatar variant="square" src={ImgUser} /> &nbsp;&nbsp;
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
                  {user} {surname} &nbsp;&nbsp;
                  <br />
                </Button>
              </>
            ) : (
              <>
                <Avatar variant="square" src={ImgUser} /> &nbsp;&nbsp;
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
                  Guest &nbsp;&nbsp;
                </Button>
              </>
            )}
            {user ? logOut() : loginBtn()}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Hearder;
