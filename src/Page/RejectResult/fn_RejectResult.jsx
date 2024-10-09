import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function fn_RejectResult() {
    //link
    const searchParams = new URLSearchParams(window.location.search);
    let Serialno = searchParams.get("serial_no");
    let Rejorder = searchParams.get("rej_order");
    const plantCode = import.meta.env.VITE_FAC;

    //table
    const [gvViewReject, setgvViewReject] = useState([]);

    useEffect(() => {
        if (Serialno !== null && Rejorder !== null) {
            ViewData();
        }
    },[]);

    const ViewData = async () => {
        let dt = [];
        await axios.post("/api/ViewTracePiece/getrejectresult", {
            strplantcode: plantCode,
            strserialno: Serialno,
            rejorder: Rejorder
        })
        .then((res) => {
            dt = res.data;
        });
        setgvViewReject(dt);
    };

    const columnsReject = [
        {
            title: "REJ_PLANT_CODE",
            dataIndex: "rej_plant_code",
            key: "REJ_PLANT_CODE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "REJ_SERIAL_NO",
            dataIndex: "rej_serial_no",
            key: "REJ_SERIAL_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "REJ_ORDER",
            dataIndex: "rej_order",
            key: "REJ_ORDER",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "REJ_INSPECT_COUNT",
            dataIndex: "rej_inspect_count",
            key: "REJ_INSPECT_COUNT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "REJ_REJECT_CODE",
            dataIndex: "rej_reject_code",
            key: "REJ_REJECT_CODE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "REM_REJECT_NAME",
            dataIndex: "rem_reject_name",
            key: "REM_REJECT_NAME",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "REJ_OPERATOR_CODE",
            dataIndex: "rej_operator_code",
            key: "REJ_OPERATOR_CODE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "REJ_UPDATE_BY",
            dataIndex: "rej_update_by",
            key: "REJ_UPDATE_BY",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "REJ_UPDATE_PROGRAM",
            dataIndex: "rej_update_program",
            key: "REJ_UPDATE_PROGRAM",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "REJ_UPDATE_DATE",
            dataIndex: "rej_update_date",
            key: "REJ_UPDATE_DATE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
    ];

  return {
    gvViewReject, columnsReject
  }
};

export { fn_RejectResult };