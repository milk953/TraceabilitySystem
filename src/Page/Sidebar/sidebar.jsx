import React, { useEffect, useState, StrictMode } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "./Slide.css"
import { DownOutlined, UpOutlined, MenuOutlined } from "@ant-design/icons";
import Circle from '@mui/icons-material/CircleOutlined';

function sidebar() {
  return (
    <div>sidebar</div>
  );
};

export default sidebar;