import React, { useEffect, useState, StrictMode } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./sidebar.css"
import { DownOutlined, UpOutlined, MenuOutlined } from "@ant-design/icons";
import Circle from '@mui/icons-material/CircleOutlined';

//Icon
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WorkIcon from "@mui/icons-material/Work";
import BuildIcon from "@mui/icons-material/Build";
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import SourceIcon from "@mui/icons-material/Source";
// import moment from "moment";
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import SensorsOutlinedIcon from '@mui/icons-material/SensorsOutlined';
function sidebar({ isOpen, onClose }) {
  const [subMenuOpen1, setSubMenuOpen1] = useState(false);
  const [subMenuOpen2, setSubMenuOpen2] = useState(false);
  const [subMenuOpen3, setSubMenuOpen3] = useState(false);
  const [data, setdata] = useState([]);
  const [data2, setdata2] = useState([]);
  const [Icondrop1, setIcondrop1] = useState(false);
  const [Icondrop2, setIcondrop2] = useState(false);
  const [Icondrop3, setIcondrop3] = useState(false);
  const menutest = async () => {
    try {
      const res = await axios.get("http://localhost:80/fetch-data");
      setdata2(res.data);
      console.log(res, "/////");
      const Parent = [...new Set(res.data.map((item) => item.parent_id))];
      setdata(Parent);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล:", error);
    }
  };
  useEffect(() => {
    menutest()
  }, []);

  const navigate = useNavigate();
  const Page1 = () => {
    navigate("/Page1");
  };
  const toggleSubMenu1 = () => {
    setIcondrop1(!Icondrop1);
    setSubMenuOpen1(!subMenuOpen1);
  };
  const toggleSubMenu2 = () => {
    setIcondrop2(!Icondrop2);
    setSubMenuOpen2(!subMenuOpen2);
  };
  const toggleSubMenu3 = () => {
    setIcondrop3(!Icondrop3);
    setSubMenuOpen3(!subMenuOpen3);
  };

  const handleButtonClick = (menuName) => {
    // console.log(menuName);
    const System = "x";
    const ParentMenuName = "y";

    if (menuName != "") {
      console.error("hereM", menuName);
      axios
        .post("http://localhost:80/search/MenuName", {
          System: System,
          ParentMenuName: ParentMenuName,
          MenuName: menuName,
        })
        .then((res) => {
          const urll = res.data.map((item) => item.url);
          gopath(urll);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  };

  const gopath = (path) => {
    console.warn(path);
    const go = "/" + path;
    navigate(go);
  };
  //date
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:80/current-date")
      .then((response) => {
        setCurrentDate(response.data.date);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <Drawer anchor="left"
      open={isOpen} onClose={onClose}
      sx={{ border: "10" }}>
      <List sx={{ width: "300px" }}>
        <ListItem className="Headslide"
          onClick={onClose}
        >
          <ListItemText style={{ marginLeft: "10px" }} primary="Welcome" />
          <ArrowBackIcon onClick={onClose} />
        </ListItem>
        {/*Menu1 */}
        <ListItem
          className="ListItem"
          onClick={toggleSubMenu1}

        >
          <ListItemIcon>
            <AssignmentOutlinedIcon color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={<span style={{ marginRight: "5px" }}>{data[0]}</span>}
          />
          {Icondrop1 ? <UpOutlined /> : <DownOutlined />}
        </ListItem>
        {subMenuOpen1 && (
          <>
            {data2.map(
              (item, index) =>
                item.parent_id === "Report" && (
                  <ListItem
                    className="SubMenuItem"

                    onClick={() => {
                      onClose();
                      handleButtonClick(item.menu_name);
                    }}



                    key={index}
                  ><Circle style={{ fontSize: '8px', marginRight: "10px" }} />
                    <ListItemText primary={item.menu_name} />
                  </ListItem>
                )
            )}
          </>
        )}

        {/*Menu2 */}
        <ListItem className="ListItem" onClick={toggleSubMenu2}>
          <ListItemIcon>
            <SensorsOutlinedIcon color="success" />
          </ListItemIcon>
          <ListItemText primary={data[1]} />
          {Icondrop2 ? <UpOutlined /> : <DownOutlined />}
        </ListItem>
        {subMenuOpen2 && (
          <>
            {data2.map(
              (item, index) =>
                item.parent_id === "Scan" && (
                  <ListItem
                    className="SubMenuItem"

                    onClick={() => {
                      onClose();
                      handleButtonClick(item.menu_name);
                    }}

                    key={index}
                  ><Circle style={{ fontSize: '8px', marginRight: "10px" }} />
                    <ListItemText primary={item.menu_name} />
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
          <ListItemText primary={data[2]} />
          {Icondrop3 ? <UpOutlined /> : <DownOutlined />}
        </ListItem>
        {subMenuOpen3 && (
          <>
            {data2.map(
              (item, index) =>
                item.parent_id === "Maintain" && (
                  <ListItem
                    className="SubMenuItem"
                    onClick={() => {
                      onClose();
                      handleButtonClick(item.menu_name);
                    }}
                    key={index}
                  ><Circle style={{ fontSize: '8px', marginRight: "10px" }} />
                    <ListItemText primary={item.menu_name} />
                  </ListItem>
                )
            )}
          </>
        )}
        <ListItem className="ListItem" style={{ marginTop: "170%" }}>
          <ListItemText
            primary={
              <span
                style={{
                  fontSize: "12px",
                }}
              >
                {/* Login Date: {moment(currentDate).format(`DD/MM/YYYY HH:mm:ss`)}{" "} */}
              </span>
            }
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default sidebar;