import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function sidebarT() {
  const [subMenuOpen1, setSubMenuOpen1] = useState(false);
  const [subMenuOpen2, setSubMenuOpen2] = useState(false);
  const [subMenuOpen3, setSubMenuOpen3] = useState(false);
  const [subMenuOpen4, setSubMenuOpen4] = useState(false);
  const [subMenuOpen5, setSubMenuOpen5] = useState(false);
  const [menu, setmenu] = useState([{}]);
  const [menuID, setmenuID] = useState([]);
  const [menuMain, setmenuMain] = useState([]);
  const [menuPath, setmenuPath] = useState([]);
  const [Icondrop1, setIcondrop1] = useState(false);
  const [Icondrop2, setIcondrop2] = useState(false);
  const [Icondrop3, setIcondrop3] = useState(false);
  const [Icondrop4, setIcondrop4] = useState(false);

  var UserLogin = localStorage.getItem("UserLogin");
  const Menu = async () => {
    if (UserLogin == "" || UserLogin == null) {
      // openLoginModal()
      await axios.post("/api/menuHome", {}).then((res) => {
        setmenu(res.data);
      });
    } else {
      await axios
        .post("/api/Menuname", {
          login_id: UserLogin,
        })
        .then((res) => {
          setmenu(res.data);
        });
    }
  };

  useEffect(() => {
    Menu();
  }, []);

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

  const toggleSubMenu4 = () => {
    setIcondrop4(!Icondrop4);
    setSubMenuOpen4(!subMenuOpen4);
  };

  const toggleSubMenu5 = () => {
    setSubMenuOpen5(!subMenuOpen5);
  };

  const Home = () => {
    window.location.href = "/";
  };

  const ChangPage = (path) => {
    window.location.href = path;
  };

  const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return {
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
    Menu,
    toggleSubMenu1,
    toggleSubMenu2,
    toggleSubMenu3,
    toggleSubMenu4,
    toggleSubMenu5,
    Home,
    Logout,
    ChangPage,
    menuPath,
    setmenuPath,
  };
}

export { sidebarT };
