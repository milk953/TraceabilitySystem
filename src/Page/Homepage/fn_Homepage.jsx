import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function fn_Homepage() {
    const [Showmenu, setShowmenu] = useState("img");
    const [menu, setmenu] = useState([]);
    const [SL_menu, setSL_menu] = useState([]);
    useEffect(() => {
        axios.post("/api/MenuHome", {})
        .then((res) => {
            console.log(res.data,'menu')
            setmenu(res.data)
        })
  }, []);

  const SelectMenu = (menuID) => {
    console.log(menuID,'menuID')
    if(menuID=='W'){
        setShowmenu('Work')
    }
    else if (menuID=='M'){
        setShowmenu('Maintain')
    }
    else if(menuID=='V')
    setShowmenu('View')
  };

  const HandleSL_Menu = (Menu_Select) => {
    console.log(Menu_Select,'Menu_Select')
    if(Menu_Select=='Connect Roll Leaf'){
   
     window.location.href = "/ScanSMTRollSht";
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
    Showmenu,menu,SelectMenu,setSL_menu,SL_menu,HandleSL_Menu
  };
}

export { fn_Homepage };
