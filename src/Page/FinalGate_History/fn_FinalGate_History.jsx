import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function fn_FinalGate_History() {
    //link
    const searchParams = new URLSearchParams(window.location.search);
    let Serial = searchParams.get("SERIAL");
    let Inspecno = searchParams.get("INSPECT_NO");
    const plantCode = import.meta.env.VITE_FAC;

    //table
    const [gvViewFinal, setgvViewFinal] = useState([]);

    useEffect(() => {
        if (Serial!==null) {
            Serial = searchParams.get("SERIAL");
            Inspecno = searchParams.get("INSPECT_NO");
        } else {
            Inspecno = "0";
        }
        ViewData();
    },[]);

    const ViewData = async () => {
        let dt = [];
        try {
            await axios.post("/api/ViewTracePiece/getfinalgatehistory", {
                strplantcode: plantCode,
                strserialno: Serial,
                strinspectno: Inspecno
            })
            .then((res) => {
                dt = res.data;
            });

            setgvViewFinal(dt);
        } catch (error) {
            console.log(error.message);
        }
    };

    const columns = [
        {
            title: "PLANT_CODE",
            dataIndex: "plant_code",
            key: "PLANT_CODE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "SERIAL_NO",
            dataIndex: "serial_no",
            key: "SERIAL_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "INSPECT_COUNT",
            dataIndex: "inspect_count",
            key: "INSPECT_COUNT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "LOT_NO",
            dataIndex: "lot_no",
            key: "LOT_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "PRODUCT_NAME",
            dataIndex: "product_name",
            key: "PRODUCT_NAME",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "ELT_RESULT",
            dataIndex: "elt_result",
            key: "ELT_RESULT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "FINAL_RESULT",
            dataIndex: "final_result",
            key: "FINAL_RESULT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "REMARKS",
            dataIndex: "elt_remarks",
            key: "REMARKS",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "UPDATE_BY",
            dataIndex: "update_by",
            key: "UPDATE_BY",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "UPDATE_PROGRAM",
            dataIndex: "update_program",
            key: "UPDATE_PROGRAM",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "UPDATE_DATE",
            dataIndex: "update_date",
            key: "UPDATE_DATE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
    ]

  return {
    gvViewFinal, columns
  }
};

export { fn_FinalGate_History };