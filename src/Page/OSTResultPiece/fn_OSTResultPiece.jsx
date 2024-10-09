import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function fn_OSTResultPiece() {
    //link
    const searchParams = new URLSearchParams(window.location.search);
    let Sheetno = searchParams.get("sheet_no");
    let Pcsno = searchParams.get("pcs_no");
    const plantCode = import.meta.env.VITE_FAC;

    //table
    const [gvViewOST, setgvViewOST] = useState([]);
    const [lbl_Message, setlbl_Message] = useState("");
    const [lblMessageColor, setlblMessageColor] = useState("#059212");

    useEffect(() => {
        if (Sheetno !== null) {
            Sheetno = searchParams.get("sheet_no");
            Pcsno = searchParams.get("pcs_no");
        }
        ViewData();
    }, []);

    const ViewData = async () => {
        let dt = [];
        try {
            await axios.post("/api/ViewTracePiece/GetOSTResultPiece", {
                strSheetNo: Sheetno,
                intPCSNo: Pcsno
            })
                .then((res) => {
                    dt = res.data;
                });
            setgvViewOST(dt);
       
        } catch (error) {
            setlbl_Message(error.message);
            setlblMessageColor("#BA0900");
        }
    };

    const columnsOST = [
        {
            title: "SHEET_NO",
            dataIndex: "SHEET_NO",
            key: "SHEET_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRODUCT_NAME",
            dataIndex: "PRODUCT_NAME",
            key: "PRODUCT_NAME",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "LOT_NO",
            dataIndex: "LOT_NO",
            key: "LOT_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "ROLL_LEAF_NO",
            dataIndex: "ROLL_LEAF_NO",
            key: "ROLL_LEAF_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "LEAF_SEQ",
            dataIndex: "LEAF_SEQ",
            key: "LEAF_SEQ",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "MACHINE_NO",
            dataIndex: "MACHINE_NO",
            key: "MACHINE_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "MODEL_NO",
            dataIndex: "MODEL_NO",
            key: "MODEL_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "TESTER_NO",
            dataIndex: "TESTER_NO",
            key: "TESTER_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PCS_NO",
            dataIndex: "PCS_NO",
            key: "PCS_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "OST_RESULT",
            dataIndex: "OST_RESULT",
            key: "OST_RESULT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "OST_DATE",
            dataIndex: "OST_DATE",
            key: "OST_DATE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
    ];

    return {
        gvViewOST, lbl_Message, lblMessageColor, columnsOST
    }
};

export { fn_OSTResultPiece };