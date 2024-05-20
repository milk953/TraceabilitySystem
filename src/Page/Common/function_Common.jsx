import React, { useState, useEffect } from "react";
import axios from "axios";
const usePopupFunctions = () => {
  const [OpenPopup, setOpenPopup] = useState(false);

  const PopupOpen = () => {
    setOpenPopup(true);
  };

  const PopupClose = () => {
    setOpenPopup(false);
  };

  const New = () => {
    const STATUS = "NEW";
    localStorage.setItem("STATUS", STATUS);
    PopupOpen();
  };

  return { OpenPopup, PopupOpen, PopupClose, New };
};



const useIPAddress = () => {
  const [ipaddress, setipaddress] = useState("");

  useEffect(() => {

    console.log("TEST IP : OPEN ");
    const page_load = () => {
      axios.get("/api/getIPaddress").then((res) => {
        setipaddress(res.data.ip);
      });
    };
    page_load();
  }, []);

  return { ipaddress, setipaddress };
};

const getFactory = () => {

  const [factory, setFactory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/Factory");
        setFactory(response.data);
      } catch (error) {
        console.error('Error fetching factories:', error.message);
      }
    };

    fetchData();
  }, []);

  return {factory, setFactory};

};

export { usePopupFunctions, useIPAddress, getFactory };