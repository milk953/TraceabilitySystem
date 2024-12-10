import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function fn_TouchUpResult() {
    //link
    const searchParams = new URLSearchParams(window.location.search);
    let Serialno = searchParams.get("serial_no");
    const plantCode = import.meta.env.VITE_FAC;

    //table
    const [gvViewTouchup, setgvViewTouchup] = useState([]);

    useEffect(() => {
        if (Serialno !== null) {
            ViewData();
        }
    }, []);

    const ViewData = async () => {
        let dt = [];
        await axios.post("/api/ViewTracePiece/getTouchupresult", {
            strplantcode: plantCode,
            strserialno: Serialno,
        })
            .then((res) => {
                dt = res.data;
            });
        setgvViewTouchup(dt);
    };

    const formatDate = (dateString) => {
        const [datePart, timePart] = dateString.split("T");
        const [year, month, day] = datePart.split("-");
        const [hours, minutes, secondsWithFraction] = timePart.split(":");

        const seconds = secondsWithFraction.split(".")[0];

        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    const columnsTouchup = [
        {
            title: "TOU_PLANT_CODE",
            dataIndex: "tou_plantcode",
            key: "TOU_PLANT_CODE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "TOU_SERIAL_NO",
            dataIndex: "tou_serialno",
            key: "TOU_SERIAL_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "TOU_TOUCH_UP_COUNT",
            dataIndex: "tou_touch_up_count",
            key: "TOU_TOUCH_UP_COUNT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "TOU_TOUCH_UP_RESULT",
            dataIndex: "tou_touch_up_result",
            key: "TOU_TOUCH_UP_RESULT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "S.TOU_OPERATOR_CODE",
            dataIndex: "tou_operator_code",
            key: "S.TOU_OPERATOR_CODE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "TOU_CREATE_BY",
            dataIndex: "tou_create_by",
            key: "TOU_CREATE_BY",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "TOU_CREATE_PROGRAM",
            dataIndex: "tou_create_program",
            key: "TOU_CREATE_PROGRAM",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "TOU_CREATE_DATE",
            dataIndex: "tou_create_date",
            key: "TOU_CREATE_DATE",
            align: "center",
            render: (text, record, index) => {
                return formatDate(text);
            },
        },
        {
            title: "TOU_UPDATE_BY",
            dataIndex: "tou_update_by",
            key: "TOU_UPDATE_BY",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "TOU_UPDATE_PROGRAM",
            dataIndex: "tou_update_program",
            key: "TOU_UPDATE_PROGRAM",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "TOU_UPDATE_DATE",
            dataIndex: "tou_update_date",
            key: "TOU_UPDATE_DATE",
            align: "center",
            render: (text, record, index) => {
                return formatDate(text);
            },
        },
    ];

    return {
        gvViewTouchup, columnsTouchup
    }
};

export { fn_TouchUpResult };