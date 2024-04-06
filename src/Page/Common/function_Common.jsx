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



export {usePopupFunctions, getBaseURL};