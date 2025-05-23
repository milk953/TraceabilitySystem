import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
function fn_Homepage() {
  const navigate = useNavigate();
  const [Showmenu, setShowmenu] = useState("img");
  const [menu, setmenu] = useState([{}]);
  const [SL_menu, setSL_menu] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState();
  //Login Region
  const [ipAddress, setIpAddress] = useState("");
  const [menuName, setMenuName] = useState("");
  const [menuUrl, setMenuUrl] = useState("");
  const [DataLogin, setDataLogin] = useState("");
  const [checkmenuState, setCheckmenuState] = useState({
    state : false,
    count : 0
  });
  var LoginStatus = localStorage.getItem("isLoggedIn") ?? false;
  var UserLogin = localStorage.getItem("UserLogin");
  const openLoginModal = () => {
    if (
      window.location.pathname === "/TraceabilitySystem" &&
      LoginStatus === false
    ) {
      Swal.fire({
        title: "เข้าสู่ระบบ",
        html:
          '<input type="text" id="username" class="swal2-input" placeholder="ชื่อผู้ใช้">' +
          '<input type="password" id="password" class="swal2-input" placeholder="รหัสผ่าน">',
        showCancelButton: true,
        confirmButtonText: "เข้าสู่ระบบ",
        cancelButtonText: "ปิด",
        focusConfirm: false,
        preConfirm: () => {
          var username = Swal.getPopup().querySelector("#username").value;
          var password = Swal.getPopup().querySelector("#password").value;
          handleLogin(username, password);
        },
        didOpen: () => {
          const usernameInput = Swal.getPopup().querySelector("#username");
          const passwordInput = Swal.getPopup().querySelector("#password");
          passwordInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              const username = usernameInput.value;
              const password = passwordInput.value;
              handleLogin(username, password);
            }
          });
        },
      });
    } else {
      return;
    }
  };

  const handleLogin = async (username, password) => {
    axios
      .post(
        "/api/login",
        {
          User: username,
          Password: password,
        },
        {
          validateStatus: function (status) {
            return true;
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
          localStorage.setItem("Username", res.data.Datainfo.name);
          localStorage.setItem("Lastname", res.data.Datainfo.surname);
          localStorage.setItem("UserLogin", res.data.Datainfo.user_login);
          localStorage.setItem("IDCode", res.data.Datainfo.id_code);
          localStorage.setItem("token", res.data.token);
          Swal.close();
          setTimeout(() => {
            location.reload();
          }, 100);
          setDataLogin('Success')
        } else if (res.status === 401) {
          Swal.fire(
            "ผิดพลาด",
            "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
            "error"
          ).then(() => {
            openLoginModal();
          });
        } else {
          Swal.fire("Error", `Unexpected status: ${res.status}`, "error").then(
            () => {
              openLoginModal();
            }
          );
        }
      })
      .catch((error) => {
        Swal.fire("Please Try Again", error.message, "error").then(() => {
          openLoginModal();
        });
      });
  };

  const page_load = () => {
    axios.get("/api/getIPaddress").then((res) => {
      setIpAddress(res.data.ip);
    });
    localStorage.setItem("Fac", import.meta.env.VITE_FAC);
  };
  
  useEffect(() => {
    MenuHome();
    page_load();
    if (ipAddress != "") {
      localStorage.setItem("ipAddress", ipAddress);
    }
  }, [ipAddress]);

  // useEffect(() => {
  //   MenuHome();
  //   page_load();
  // }, [DataLogin]);

  const MenuHome = async () => {
    let dataMenu;
    if (UserLogin == "" || UserLogin == null) {
      await axios.post("/api/menuHome", {}).then((res) => {
        setmenu(res.data);
        dataMenu = res.data;
      });
    } else {
        await axios
        .post("/api/Menuname", {
          login_id: UserLogin,
        })
        .then((res) => {
          dataMenu = res.data;
          setmenu(res.data);
          setCheckmenuState({state:true,count:1});
        });
    }

    const url = window.location.pathname;
    const urlSplit = url.split("/");
    const currentPath = `/${urlSplit[1]}/${urlSplit[2]}`;
    // if (dataMenu && dataMenu.length > 0) {
    for (let i = 0; i < dataMenu.length; i++) {
      if (currentPath === dataMenu[i].url) {
        setMenuUrl(dataMenu[i].url);
        setMenuName(dataMenu[i].page_title);
        break;
      }
    }
    // }
  };

  const OpenMenu = (menuID) => {
    if (menuID == "W") {
      setShowmenu("Work");
    } else if (menuID == "M") {
      setShowmenu("Maintain");
    } else if (menuID == "V") setShowmenu("View");
  };

  const HandleSL_Menu = (Menu_Select) => {
    window.location.href = Menu_Select;
  };
  const handleClickPath = (url) => {
    if (url != "HOME") {
      window.location.href = url;
    } else {
      window.location.href = `/TraceabilitySystem`;
    }
    // if (window.location.pathname !== `/${url}`) {
    //   navigate(`/${url}`);
    // }
  };

  return {
    Showmenu,
    menu,
    OpenMenu,
    setSL_menu,
    SL_menu,
    HandleSL_Menu,
    openLoginModal,
    isLoggedIn,
    menuName,
    menuUrl,
    handleClickPath,
  };
}

export { fn_Homepage };
