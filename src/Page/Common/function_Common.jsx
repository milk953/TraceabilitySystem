import React, { useState, useEffect } from "react";

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

const useIPAddress = () => {
  const [ipaddress, setipaddress] = useState("");
  useEffect(() => {
    const fetchIPAddress = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const clientIPAddress = data.ip;
        setipaddress(clientIPAddress);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIPAddress();
  }, []);
  return { ipaddress, setipaddress };
};

export { usePopupFunctions, getBaseURL, useIPAddress };