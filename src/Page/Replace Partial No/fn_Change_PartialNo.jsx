import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from "antd";
function fn_Change_PartialNo() {
  
  //PageLoad----------
  useEffect(() => {
  
  }, []);
  //-------------------
  const columns = [
    {
      title: "No.",
      dataIndex: "SEQ",
      key: "No.",
      render: (text, record, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Old Partial No.",
      dataIndex: "SERIAL_OLD",
      key: "Old Partial No.",
      align: "left",
      render: (text, record, index) => {
          return text;
      },
    },
    {
      title: "New Partial No.",
      dataIndex: "SERIAL_NEW",
      key: "New Partial No.",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },

    {
      title: "Count",
      key: "Count",
      dataIndex: "FINALGATE_ROW",
      align: "center",
      render: (text, record, index) => {
          return text;
      },
    },
    
  ];

  return {
  
    columns
  };
}

export { fn_Change_PartialNo };
