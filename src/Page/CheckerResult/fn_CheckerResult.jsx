import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

function fn_CheckerResult() {

    //link
    const searchParams = new URLSearchParams(window.location.search);
    let Serialno = searchParams.get("serial_no");
    let Testtype = searchParams.get("test_type");
    let Prdname = searchParams.get("PRODUCT_NAME");
    const plantCode = import.meta.env.VITE_FAC;

    //table
    const [gvViewdata, setgvViewdata] = useState([]);
    const [gvViewdata2, setgvViewdata2] = useState([]);
    const [gvViewdata3, setgvViewdata3] = useState([]);
    const [lbl_Message, setlbl_Message] = useState("");
    const [lblMessageColor, setlblMessageColor] = useState("");

    useEffect(() => {
        if (Serialno !== null) {
            ViewData();
        }
    }, []);

    const ViewData = async () => {
        try {
            await axios.post("/api/ViewTracePiece/getCheckerresult", {
                strplantcode: plantCode,
                strserialno: Serialno,
                strtesttype: Testtype
            })
                .then((res) => {
                    let dt = res.data;
                    setgvViewdata(dt);
                });

            await axios.post("/api/ViewTracePiece/getCheckerresultdata2", {
                strplantcode: plantCode,
                strserialno: Serialno,
                strtesttype: Testtype,
                strprdname: Prdname
            })
                .then((res) => {
                    let dt = res.data;
                    setgvViewdata2(dt);
                });

            await axios.post("/api/ViewTracePiece/getCheckerresultdata3", {
                strplantcode: plantCode,
                strtesttype: Testtype,
                strserialno: Serialno
            })
                .then((res) => {
                    let dt = res.data;
                    setgvViewdata3(dt);
                });
        } catch (error) {
            setlbl_Message(error.message);
            setlblMessageColor("#BA0900");
        }
    };

    const columnsChecker1 = [
        {
            title: "CHE_PLANT_CODE",
            dataIndex: "plant_code",
            key: "CHE_PLANT_CODE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHE_TEST_TYPE",
            dataIndex: "test_type",
            key: "CHE_TEST_TYPE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHE_SERIAL_NO",
            dataIndex: "serial_no",
            key: "CHE_SERIAL_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHE_SERIAL_CHIP",
            dataIndex: "serial_chip",
            key: "CHE_SERIAL_CHIP",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHE_INSPECT_COUNT",
            dataIndex: "inspect_count",
            key: "CHE_INSPECT_COUNT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHE_PRODUCT_NAME",
            dataIndex: "product_name",
            key: "CHE_PRODUCT_NAME",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHE_MASTER_VER",
            dataIndex: "master_ver",
            key: "CHE_MASTER_VER",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHE_PROD_RESULT",
            dataIndex: "prod_result",
            key: "CHE_PROD_RESULT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHE_INSPECT_DATE",
            dataIndex: "inspect_date",
            key: "CHE_INSPECT_DATE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHE_MACHINE_NAME",
            dataIndex: "machine_name",
            key: "CHE_MACHINE_NAME",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHE_RESULT_DETAIL",
            dataIndex: "result_detail",
            key: "CHE_RESULT_DETAIL",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHE_RESULT_DETAIL2",
            dataIndex: "result_detail2",
            key: "CHE_RESULT_DETAIL2",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHE_RESULT_DETAIL3",
            dataIndex: "result_detail3",
            key: "CHE_RESULT_DETAIL3",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
    ];

    const columnsChecker2 = [
        {
            title: "CHD_TEST_TYPE",
            dataIndex: "chd_test_type",
            key: "CHD_TEST_TYPE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHD_SEQ",
            dataIndex: "chd_seq",
            key: "CHD_SEQ",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CDM_INSPECT_NAME",
            dataIndex: "cdm_inspect_name",
            key: "CDM_INSPECT_NAME",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHD_INSPECT_RESULT",
            dataIndex: "chd_inspect_result",
            key: "CHD_INSPECT_RESULT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
    ];

    const columnsChecker3 = [
        {
            title: "CHD_PLANT_CODE",
            dataIndex: "chd_plantcode",
            key: "CHD_PLANT_CODE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHD_TEST_TYPE",
            dataIndex: "chd_testtype",
            key: "CHD_TEST_TYPE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHD_SERIAL_NO",
            dataIndex: "chd_serialno",
            key: "CHD_SERIAL_NO",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHD_SERIAL_CHIP",
            dataIndex: "chd_serial_chip",
            key: "CHD_SERIAL_CHIP",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHD_INSPECT_COUNT",
            dataIndex: "chd_inspect_count",
            key: "CHD_INSPECT_COUNT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHD_SEQ",
            dataIndex: "chd_seq",
            key: "CHD_SEQ",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHD_INSPECT_RESULT",
            dataIndex: "chd_inspect_result",
            key: "CHD_INSPECT_RESULT",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHD_CREATE_BY",
            dataIndex: "chd_create_by",
            key: "CHD_CREATE_BY",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHD_CREATE_PROGRAM",
            dataIndex: "chd_create_program",
            key: "CHD_CREATE_PROGRAM",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "CHD_CREATE_DATE",
            dataIndex: "chd_create_date",
            key: "CHD_CREATE_DATE",
            align: "center",
            render: (text, record, index) => {
                return text;
            },
        },
    ];

    return {
        gvViewdata, gvViewdata2, gvViewdata3, columnsChecker1, columnsChecker2, columnsChecker3, lbl_Message, lblMessageColor
    }
};

export { fn_CheckerResult };