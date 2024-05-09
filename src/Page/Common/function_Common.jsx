import React, { useState, useEffect } from "react";
import { internalIpV6, internalIpV4 } from 'internal-ip';
import axios from "axios";

console.log(await internalIpV4());

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

const getBaseURL = () => {
  const baseURL = "http://localhost:3080";
  return { baseURL };
};

const { baseURL } = getBaseURL();

const useIPAddress = () => {
  const [ipaddress, setipaddress] = useState("");

  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const ipv4 = await internalIpV4();
        setipaddress(ipv4)
      } catch (error) {
        console.error("Error fetching IP:", error);
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

export { usePopupFunctions, getBaseURL, useIPAddress, getFactory };