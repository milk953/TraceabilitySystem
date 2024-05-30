import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function fn_Homepage() {
  const [Showmenu, setShowmenu] = useState("img");
  const [menu, setmenu] = useState([]);
  const [SL_menu, setSL_menu] = useState([]);
  //Login Region
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const openLoginModal = () => {
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
        const username = Swal.getPopup().querySelector("#username").value;
        const password = Swal.getPopup().querySelector("#password").value;
        console.log(username);
        console.log(password);
        // setLoginId(username)
        // setPassword(password)
        handleLogin(username, password);
      },
    });
  };
  const handleLogin = async (username, password) => {
    try {
      const res = await axios.post("/api/login", {
        User: username,
        Password: password,
      });
      if (res.status === 200) {
        console.log(res.data, "res.data");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("Username", res.data[0][3]);
        localStorage.setItem("Lastname", res.data[0][4]);
        localStorage.setItem("UserLogin", res.data[0][0]);
        localStorage.setItem("IDCode", res.data[0][2]);
        setLoggedIn(true);
        Swal.close(); //
        // setIsLoading(true);
        // setTimeout(() => {
        //   setIsLoading(false);
        // }, 1300);
        Swal.fire("Success", "เข้าสู่ระบบสำเร็จ", "success");
      } else {
        console.log("error");
        Swal.fire("ผิดพลาด", "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", "error");
      }
    } catch (error) {
      // Swal.fire('Error',error);
      Swal.fire(
        "Please Try Again",
        "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        "error"
      ).then(() => {
        openLoginModal();
      });
    }
  };
  const page_load = () => {
    axios.get("/api/getIPaddress").then((res) => {
      setIpAddress(res.data.ip);
    });
    axios.post("/api/MenuHome", {}).then((res) => {
      setmenu(res.data);
    });
    openLoginModal();
  };
  useEffect(() => {
    page_load();
  }, []);

  const SelectMenu = (menuID) => {
    if (menuID == "W") {
      setShowmenu("Work");
    } else if (menuID == "M") {
      setShowmenu("Maintain");
    } else if (menuID == "V") setShowmenu("View");
  };

  const HandleSL_Menu = (Menu_Select) => {
    if (Menu_Select == "Connect Roll Leaf") {
      window.location.href = "/ScanSMTRollSht";
    }
    if (Menu_Select == "SMT Connect Sht&Pcs") {
      window.location.href = "/ScanSMTSerialShtFINManySht";
    }
    // if(menuID=='W'){
    //     setShowmenu('Work')
    // }
    // else if (menuID=='M'){
    //     setShowmenu('Maintain')
    // }
    // else if(menuID=='V')
    // setShowmenu('View')
  };

  return {
    Showmenu,
    menu,
    SelectMenu,
    setSL_menu,
    SL_menu,
    HandleSL_Menu,
  };
}

export { fn_Homepage };
