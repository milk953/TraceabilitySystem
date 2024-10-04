import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import Circle from "@mui/icons-material/CircleOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SensorsOutlinedIcon from "@mui/icons-material/SensorsOutlined";
import BuildIcon from "@mui/icons-material/Build";
import SourceIcon from "@mui/icons-material/Source";
import LogoutIcon from "@mui/icons-material/Logout";
import { sidebarT } from "./function_sidebar";
import HomeIcon from '@mui/icons-material/Home';
import "./sidebar.css";

function Sidebar({ isOpen, onClose }) {
  const {
    subMenuOpen2,
    subMenuOpen3,
    subMenuOpen4,
    menu,
    toggleSubMenu2,
    toggleSubMenu3,
    toggleSubMenu4,
    ChangPage,
    Logout
  } = sidebarT();

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      sx={{
        width: 300,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 300,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <List sx={{ flexGrow: 1 }}>
        <ListItem className="Headslide" onClick={onClose}>
          <ListItemText style={{ marginLeft: "10px" }} primary="Welcome" />
          <ArrowBackIcon onClick={onClose} />
        </ListItem>
        {/*Menu1 Home*/}
        <ListItem
          className="ListItem"
          onClick={() => {
            onClose();
            ChangPage("/TraceabilitySystem");
          }}
        >
          <ListItemIcon>
            <HomeIcon   />
            {/* style={{ fontSize: "8px", marginRight: "10px" }} */}
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>

        {/*Menu2 Work*/}
        <ListItem className="ListItem" onClick={toggleSubMenu2}>
          <ListItemIcon>
            <SensorsOutlinedIcon color="success" />
          </ListItemIcon>
          <ListItemText primary={"Work"} />
          {subMenuOpen2 ? <UpOutlined /> : <DownOutlined />}
        </ListItem>
        {subMenuOpen2 && (
          <>
            {menu.map(
              (item, index) =>
                menu[index].parent_id === "0928" && (
                  <ListItem
                    className="SubMenuItem"
                    onClick={() => {
                      onClose();
                      ChangPage(item.url);
                    }}
                    key={index}
                  >
                    <Circle style={{ fontSize: "8px", marginRight: "10px" }} />
                    <ListItemText primary={item.menu_name} />
                  </ListItem>
                )
            )}
          </>
        )}

        {/*Menu3 Maintain*/}
        <ListItem className="ListItem" onClick={toggleSubMenu3}>
          <ListItemIcon>
            <BuildIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary={"Maintain"} />
          {subMenuOpen3 ? <UpOutlined /> : <DownOutlined />}
        </ListItem>
        {subMenuOpen3 && (
          <>
            {menu.map(
              (item, index) =>
                menu[index].parent_id === "0929" && (
                  <ListItem
                    className="SubMenuItem"
                    onClick={() => {
                      onClose();
                      ChangPage(item.url);
                    }}
                    key={index}
                  >
                    <Circle style={{ fontSize: "8px", marginRight: "10px" }} />
                    <ListItemText primary={item.menu_name} />
                  </ListItem>
                )
            )}
          </>
        )}

        {/*Menu4 View Data*/}
        <ListItem className="ListItem" onClick={toggleSubMenu4}>
          <ListItemIcon>
            <SourceIcon style={{ color: "orange" }} />
          </ListItemIcon>
          <ListItemText primary={"View Data"} />
          {subMenuOpen4 ? <UpOutlined /> : <DownOutlined />}
        </ListItem>
        {subMenuOpen4 && (
          <>
            {menu.map(
              (item, index) =>
                menu[index].parent_id === "0930" && (
                  <ListItem
                    className="SubMenuItem"
                    onClick={() => {
                      onClose();
                      ChangPage(item.url);
                    }}
                    key={index}
                  >
                    <Circle style={{ fontSize: "8px", marginRight: "10px" }} />
                    <ListItemText primary={item.menu_name} />
                  </ListItem>
                )
            )}
          </>
        )}
      </List>
      <List sx={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
        <ListItem className="ListItem" onClick={Logout}>
          <ListItemIcon>
            <LogoutIcon style={{ color: "gray" }} />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
