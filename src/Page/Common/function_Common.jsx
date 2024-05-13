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
    const fetchIPAddress = async () => {
      try {
         const response = await fetch('/get_ips');
        if (!response.ok) {
          throw new Error('Failed to fetch IP address');
        }
        const data = await response.json();
        setipaddress(data.client_ip_address);
        console.log(data.client_ip_address,"Show data :");
      } catch (error) {
        console.error("Error fetching IP:", error);
        setipaddress("เกิดข้อผิดพลาดในการดึงข้อมูล IP");
      }
    };

    fetchIPAddress();
  }, []);

  return { ipaddress, setipaddress };
};

const getFactory = () => {

  const [factory, setFactory] = useState([]);
  const [DDL_Factory, setDDL_Factory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(baseURL + "/Factory");
        setFactory(response.data);
      } catch (error) {
        console.error('Error fetching factories:', error.message);
      }
    };

    fetchData();
  }, []);

  return {factory, setFactory, DDL_Factory, setDDL_Factory};

};

export { usePopupFunctions, useIPAddress, getFactory };