import React, { useEffect, useState, StrictMode } from "react";

import ListItemIcon from "@mui/material/ListItemIcon";

import { Drawer, List, ListItem, ListItemText} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./sidebar.css";
import { DownOutlined, UpOutlined, MenuOutlined } from "@ant-design/icons";
import Circle from "@mui/icons-material/CircleOutlined";
import { sidebarT } from "./function_sidebar";

//Icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WorkIcon from "@mui/icons-material/Work";
import BuildIcon from "@mui/icons-material/Build";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import SourceIcon from "@mui/icons-material/Source";
import LogoutIcon from "@mui/icons-material/Logout";
// import moment from "moment";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import SensorsOutlinedIcon from "@mui/icons-material/SensorsOutlined";
function sidebar({ isOpen, onClose }) {
  const {
    subMenuOpen1,
    subMenuOpen2,
    subMenuOpen3,
    subMenuOpen4,
    subMenuOpen5,
    menu,
    menuID,
    menuMain,
    Icondrop1,
    Icondrop2,
    Icondrop3,
    Icondrop4,
    toggleSubMenu1,
    toggleSubMenu2,
    toggleSubMenu3,
    toggleSubMenu4,
    toggleSubMenu5,
    Home,
    Logout,
    GoNavigate,
    menuPath,
    setmenuPath
  } = sidebarT();

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{ border: "10" }}
    >
      <List sx={{ width: "300px" }}>
        <ListItem className="Headslide" onClick={onClose}>
          <ListItemText style={{ marginLeft: "10px" }} primary="Welcome" />
          <ArrowBackIcon onClick={onClose} />
        </ListItem>
        {/*Menu1 Home*/}
        <ListItem className="ListItem" onClick={toggleSubMenu1}>
          <ListItemIcon>
            <AssignmentOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary={menu[0]} onClick={Home} />
        </ListItem>

        {/*Menu2  Work*/}
        <ListItem className="ListItem" onClick={toggleSubMenu2}>
          <ListItemIcon>
            <SensorsOutlinedIcon color="success" />
          </ListItemIcon>
          <ListItemText primary={menu[1]} />
          {/* {menuID.map(
            (item, index) =>
              menuID[index] === menuMain[1] && */}
              {Icondrop2 ? <UpOutlined /> : <DownOutlined />}
          {/* )} */}
        </ListItem>
        {subMenuOpen2 && (
          <>
            {menuID.map(
              (item, index) =>
                menuID[index] === menuMain[1] && (
                  <ListItem
                    className="SubMenuItem"
                    onClick={() => {
                      onClose();
                      GoNavigate(menuPath[index]);
                    }}
                    key={index}
                  >
                    <Circle style={{ fontSize: "8px", marginRight: "10px" }} />
                    <ListItemText primary={menu[index]} />
                  </ListItem>
                )
            )}
          </>
        )}
        {/*Menu3 */}
        <ListItem className="ListItem" onClick={toggleSubMenu3}>
          <ListItemIcon>
            <BuildIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary={menu[2]} />
          {Icondrop3 ? <UpOutlined /> : <DownOutlined />}
        </ListItem>
        {subMenuOpen3 && (
          <>
            {menuID.map(
              (item, index) =>
                menuID[index] === menuMain[2] && (
                  <ListItem
                    className="SubMenuItem"
                    onClick={() => {
                      onClose();
                      GoNavigate(menuPath[index]);
                    }}
                    key={index}
                  >
                    <Circle style={{ fontSize: "8px", marginRight: "10px" }} />
                    <ListItemText primary={menu[index]} />
                  </ListItem>
                )
            )}
          </>
        )}
        {/*Menu4 */}
        <ListItem className="ListItem" onClick={toggleSubMenu4}>
          <ListItemIcon>
            <SourceIcon style={{ color: "orange" }} />
          </ListItemIcon>
          <ListItemText primary={menu[3]} />
          {Icondrop4 ? <UpOutlined /> : <DownOutlined />}
        </ListItem>
        {subMenuOpen4 && (
          <>
            {menuID.map(
              (item, index) =>
                menuID[index] === menuMain[3] && (
                  <ListItem
                    className="SubMenuItem"
                    onClick={() => {
                      onClose();
                      GoNavigate(menuPath[index]);
                    }}
                    key={index}
                  >
                    <Circle style={{ fontSize: "8px", marginRight: "10px" }} />
                    <ListItemText primary={menu[index]} />
                  </ListItem>
                )
            )}
          </>
        )}
        {/*Menu5 */}
        <footer style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <ListItem className="ListItem1" onClick={toggleSubMenu5}>
          <ListItemIcon>
            <LogoutIcon style={{ color: 'gray' }} />
          </ListItemIcon>
          <ListItemText primary={menu[4]} onClick={Logout} />
        </ListItem>
      </footer>
      </List>
    </Drawer>
  );
}

export default sidebar;
