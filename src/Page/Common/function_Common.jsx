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

const getTimestamp = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};
const DataConfig =() =>{
  const [ConfigData, setConfigData] = useState("");

  useEffect(() => {

    const data = () => {
      axios.post("/api/Common/GetDataConfig").then((res) => {
        setConfigData(res.data);
     
      });
    };
    data();
  }, []);

  return { ConfigData };
}

export { usePopupFunctions, useIPAddress, getFactory, getTimestamp,DataConfig };