import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button } from "antd";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert2";
import { useLoading } from "../../loading/fn_loading";

function fn_ScanAOISheetNo() {
  const [txtOperator, settxtOperator] = useState("");
  const [txtTotalPcs, settxtTotalPcs] = useState("");
  const [txtNo, settxtNo] = useState("");
  const [txtLeaf, settxtLeaf] = useState(1);
  const [txtLayer, settxtLayer] = useState("");
  const [txtLotNo, settxtLotNo] = useState("");
  const [lblProduct, setlblProduct] = useState("");
  const [pnlLog, setpnlLog] = useState(false);
  const [lblLog, setlblLog] = useState("");
  const [ibtOperator, setibtOperator] = useState({
    disabled: false,
    value: "",
  });
  const [ibtback, setibtback] = useState({ disabled: false, value: "" });
  const [ibtLayerBack, setibtLayerBack] = useState({
    disabled: false,
    value: "",
  });
  const [ibtLotBack, setibtLotBack] = useState({ disabled: false, value: "" });

  //Table
  const [pnlSerial, setpnlSerial] = useState(false);
  const [gvSerial, setgvSerial] = useState([]);
  const [pnlResult, setpnlResult] = useState(false);
  const [lblSEQ, setlblSEQ] = useState("");
  const [txtgvSerial, settxtgvSerial] = useState([]);
  const [lblResult, setlblResult] = useState("");
  const [lblResultcolor, setlblResultcolor] = useState("green");
  const [gvScanResult, setgvScanResult] = useState({
    visible: false,
    value: [],
  });
  const [gvReject, setgvReject] = useState({ visible: false, value: [] });

  //hiddenfield
  const hfUserID = localStorage.getItem("ipAddress");
  const hfUserStation = localStorage.getItem("ipAddress");
  const [hfUserFactory, sethfUserFactory] = useState("");
  const [hfAutoScan, sethfAutoScan] = useState("");
  const [hfMode, sethfMode] = useState("");
  const [hfPlantCode, sethfPlantCode] = useState("");
  const [hfProductKind, sethfProductKind] = useState("");
  const [hfSerialCount, sethfSerialCount] = useState(1);
  const [hfSerialLength, sethfSerialLength] = useState(22);
  const [hfRollNo, sethfRollNo] = useState("");

  //Disabled
  const [txtOperatorDisabled, settxtOperatorDisabled] = useState(false);
  const [txtTotalPcsDisabled, settxtTotalPcsDisabled] = useState(false);
  const [txtNoDisabled, settxtNoDisabled] = useState(false);
  const [txtLeafDisabled, settxtLeafDisabled] = useState(false);
  const [txtLayerDisabled, settxtLayerDisabled] = useState(false);
  const [txtLotNoDisabled, settxtLotNoDisabled] = useState(false);
  const [lblProductDisabled, setlblProductDisabled] = useState(false);

  //inputRef
  const inputOperator = useRef([]);
  const inputTotalPcs = useRef([]);
  const inputNo = useRef([]);
  const inputLeaf = useRef([]);
  const inputLayer = useRef([]);
  const inputLot = useRef([]);
  const inputSerial = useRef([]);

  const CONNECT_SERIAL_ERROR = import.meta.env.VITE_CONNECT_SERIAL_ERROR;
  const CONNECT_SERIAL_NOT_FOUND = import.meta.env.VITE_CONNECT_SERIAL_NOT_FOUND;
  const plantCode = import.meta.env.VITE_FAC;

  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    PageLoad();
  }, []);

  const PageLoad = async () => {
    sethfMode("");
    SetMode("OP");
  };

  const handleChangeOperator = async () => {
    if (txtOperator.trim() !== "") {
      settxtOperator(txtOperator.toUpperCase().trim());
      SetMode("PCS");
    }
  };

  const ibtOperator_Click = async () => {
    setpnlLog(false);
    SetMode("OP");
  };

  const handleChangeTotalPcs = async () => {
    if (txtTotalPcs.trim() !== "" && !isNaN(txtTotalPcs)) {
      SetMode("LEAF");
    } else {
      SetMode("PCS");
    }
  };

  const handleChangeNo = async () => {
    if (!isNaN(txtNo)) {
      SetMode("LEAF");
    }
  };

  const ibtBack_Click = async () => {
    setpnlLog(false);
    settxtTotalPcs("");
    settxtNo("");
    settxtTotalPcsDisabled(false);
    setpnlSerial(false);
    SetMode("PCS");
  };

  const handleChangeLeaf = async () => {
    if (txtLeaf.trim() !== "" && !isNaN(txtLeaf)) {
      sethfSerialCount(txtLeaf);
      SetMode("LAYER");
    } else {
      sethfSerialCount("1");
      SetMode("LEAF");
    }
  };

  const handleChangeLayer = async () => {
    if (txtLayer.trim() !== "") {
      SetMode("LOT");
    } else {
      SetMode("LAYER");
    }
  };

  const ibtLayerBack_Click = async () => {
    setpnlLog(false);
    SetMode("LEAF");
  };

  // const handleChangeLotNo = async () => {
  //     setlblProduct("");
  //     sethfRollNo("");
  //     let _strLotAll = txtLotNo.toUpperCase().trim().split(";");
  //     if (txtLotNo.trim() !== "") {
  //         settxtLotNo(_strLotAll[0]);
  //         if (txtLotNo.length === 9) {
  //             let dtLotData = [];
  //             await axios.post("/api/Common/getProductDataByLot", {
  //                 strLot: txtLotNo,
  //             })
  //                 .then((res) => {
  //                     dtLotData = res.data.flat().flat();
  //                 });
  //             if (dtLotData.length > 0) {
  //                 setlblProduct(dtLotData[0][0]);
  //                 sethfRollNo(dtLotData[0][1]);
  //             }

  //             await axios.post("/api/ScanAOISheetNo/GetAOISheetCountbyLot", {
  //                 strlotno: txtLotNo,
  //                 strlayer: txtLayer
  //             })
  //                 .then((res) => {
  //                     settxtNo(res.data);
  //                 });

  //             let data = [];
  //             await axios.post("/api/ScanAOISheetNo/GetAOISheetDataByLot", {
  //                 strlotno: txtLotNo,
  //                 strlayer: txtLayer
  //             })
  //                 .then((res) => {
  //                     data = res.data;
  //                 });
  //             setgvScanResult(prevState => ({ ...prevState, visible: true, value: data }));
  //             SetMode("SERIAL");
  //         } else {
  //             SetMode("LOT");
  //         }
  //     } else {
  //         SetMode("LOT");
  //     }
  // };

  const handleChangeLotNo = async () => {
    setlblProduct("");
    sethfRollNo("");

    let trimmedLotNo = txtLotNo.toUpperCase().trim();
    if (trimmedLotNo.includes(";")) {
      trimmedLotNo = trimmedLotNo.split(";")[0];
    }

    if (trimmedLotNo !== "") {
      settxtLotNo(trimmedLotNo);
      if (trimmedLotNo.length === 9) {
        let dtLotData = [];
        await axios
          .post("/api/Common/getProductDataByLot", {
            strLot: trimmedLotNo,
          })
          .then((res) => {
            dtLotData = res.data.flat().flat();
          });

        if (dtLotData.length > 0) {
          setlblProduct(dtLotData[0][0]);
          sethfRollNo(dtLotData[0][1]);
        }

        await axios
          .post("/api/ScanAOISheetNo/GetAOISheetCountbyLot", {
            strlotno: trimmedLotNo,
            strlayer: txtLayer,
          })
          .then(async (res) => {
            const updatedValue = parseInt(res.data, 10) + 1;
            settxtNo(updatedValue);
            if (txtTotalPcs > updatedValue) {
              await getInitialSerial(updatedValue, txtTotalPcs);
              SetMode("SERIAL");
            }
          });

        let data = [];
        await axios
          .post("/api/ScanAOISheetNo/GetAOISheetDataByLot", {
            strlotno: trimmedLotNo,
            strlayer: txtLayer,
          })
          .then((res) => {
            data = res.data;
          });
        setgvScanResult((prevState) => ({
          ...prevState,
          visible: true,
          value: data,
        }));
        //SetMode("SERIAL");
        // setTimeout(() => {
        //     inputSerial.current[0].focus();
        // }, 0);
        //settxtLotNo("");
      } else {
        SetMode("LOT");
      }
    } else {
      SetMode("LOT");
    }
  };

  const ibtLotBack_Click = async () => {
    setpnlLog(false);
    SetMode("LOT");
  };

  // const handleChangeSerial = (index, e) => {
  //   const trimmedValue = e.target.value.trim().toUpperCase();
  //   const newValue = [...txtgvSerial];
  //   newValue[index] = trimmedValue;
  //   settxtgvSerial(newValue);
  // };

  let newValues = [];
  const handleChangeSerial = async (index, event) => {
    newValues[index] = event.target.value.trim().toUpperCase();
    return newValues;
  };

  const btnSave_Click = async (txtgvSerial) => {
    let CheckValue = false;
    if (hfMode === "SERIAL") {
      // await setSerialDataTray();
      // settxtgvSerial(Array(gvSerial.length).fill(""));
      // setTimeout(() => {
      //   inputSerial.current[0].focus();
      // }, 0);
      if (Array.isArray(txtgvSerial)) {
        const Value = txtgvSerial.some((item) => item !== "");
        CheckValue = Value;
      }
      if (txtgvSerial !== "" && CheckValue !== false) {
        setpnlLog(false);
        await setSerialDataTray(txtgvSerial);
      } else {
        setlblLog(`Please Input Sheet No.`);
        setpnlLog(true);
        setTimeout(() => {
          inputSerial.current[0].focus();
        }, 0);
        settxtgvSerial(Array(gvSerial.length).fill(""));
        inputSerial.current.forEach((input) => {
          if (input) input.value = '';
        });
      }
    }
  };

  const btnCancel_Click = async () => {
    SetMode("SERIAL");
    // setgvScanResult(prevState => ({ ...prevState, visible: false, value: [] }));
    setgvReject((prevState) => ({ ...prevState, visible: false, value: [] }));
    settxtgvSerial(Array(gvSerial.length).fill(""));
    inputSerial.current.forEach((input) => {
      if (input) input.value = '';
    });
    setlblResult("");
    setpnlLog(false);
  };

  const SetMode = async (strType) => {
    if (strType === "OP") {
      settxtOperator("");
      settxtOperatorDisabled(false);
      settxtTotalPcs("");
      settxtTotalPcsDisabled(true);
      settxtNo("");
      settxtLeaf("");
      settxtLeafDisabled(true);
      settxtLayer("");
      settxtLayerDisabled(true);
      settxtLotNo("");
      settxtLotNoDisabled(true);
      setlblProduct("");
      setibtLotBack((prevState) => ({ ...prevState, disabled: true }));
      setibtOperator((prevState) => ({ ...prevState, disabled: true }));
      setibtLayerBack((prevState) => ({ ...prevState, disabled: true }));
      setibtback((prevState) => ({ ...prevState, disabled: true }));
      setpnlSerial(false);
      setpnlResult(false);
      setlblResult("");
      setgvScanResult((prevState) => ({
        ...prevState,
        visible: false,
        value: [],
      }));
      setgvReject((prevState) => ({ ...prevState, visible: false, value: [] }));
      sethfMode("OP");
      setTimeout(() => {
        inputOperator.current.focus();
      }, 0);
    } else if (strType === "PCS") {
      settxtLotNoDisabled(true);
      settxtLotNo("");
      setibtLotBack((prevState) => ({ ...prevState, disabled: false }));
      settxtOperatorDisabled(true);
      setibtOperator((prevState) => ({ ...prevState, disabled: false }));
      settxtLeaf("");
      settxtLeafDisabled(true);
      settxtLayer("");
      settxtLayerDisabled(true);
      settxtTotalPcs("");
      settxtTotalPcsDisabled(false);
      setibtLayerBack((prevState) => ({ ...prevState, disabled: true }));
      setibtback((prevState) => ({ ...prevState, disabled: false }));
      setpnlSerial(false);
      setgvSerial([]);
      setpnlResult(false);
      setlblResult("");
      setgvScanResult((prevState) => ({
        ...prevState,
        visible: false,
        value: [],
      }));
      setgvReject((prevState) => ({ ...prevState, visible: false, value: [] }));
      setlblProduct("");
      sethfMode("PCS");
      setTimeout(() => {
        inputTotalPcs.current.focus();
      }, 0);
    } else if (strType === "LEAF") {
      settxtOperatorDisabled(true);
      setibtOperator((prevState) => ({ ...prevState, disabled: false }));
      settxtTotalPcsDisabled(true);
      settxtLeaf("");
      settxtLeafDisabled(false);
      settxtLayer("");
      settxtLayerDisabled(true);
      setibtback((prevState) => ({ ...prevState, disabled: false }));
      settxtLotNo("");
      settxtLotNoDisabled(true);
      setibtLayerBack((prevState) => ({ ...prevState, disabled: true }));
      setpnlSerial(false);
      setgvSerial([]);
      setpnlResult(false);
      setlblResult("");
      setgvScanResult((prevState) => ({
        ...prevState,
        visible: false,
        value: [],
      }));
      setgvReject((prevState) => ({ ...prevState, visible: false, value: [] }));
      setlblProduct("");
      sethfMode("LEAF");
      setTimeout(() => {
        inputLeaf.current.focus();
      }, 0);
    } else if (strType === "LAYER") {
      settxtOperatorDisabled(true);
      setibtOperator((prevState) => ({ ...prevState, disabled: false }));
      settxtTotalPcsDisabled(true);
      settxtLeafDisabled(true);
      settxtLayer("");
      settxtLayerDisabled(false);
      setibtback((prevState) => ({ ...prevState, disabled: false }));
      settxtLotNo("");
      settxtLotNoDisabled(true);
      setibtLayerBack((prevState) => ({ ...prevState, disabled: true }));
      setpnlSerial(false);
      setgvSerial([]);
      setpnlResult(false);
      setlblResult("");
      setgvScanResult((prevState) => ({
        ...prevState,
        visible: false,
        value: [],
      }));
      setgvReject((prevState) => ({ ...prevState, visible: false, value: [] }));
      setlblProduct("");
      sethfMode("LAYER");
      setTimeout(() => {
        inputLayer.current.focus();
      }, 0);
    } else if (strType === "LOT") {
      settxtOperatorDisabled(true);
      setibtOperator((prevState) => ({ ...prevState, disabled: false }));
      settxtTotalPcsDisabled(true);
      setibtback((prevState) => ({ ...prevState, disabled: false }));
      settxtLeafDisabled(true);
      settxtLayerDisabled(true);
      settxtLotNo("");
      settxtLotNoDisabled(false);
      setibtLayerBack((prevState) => ({ ...prevState, disabled: false }));
      setpnlSerial(false);
      setgvSerial([]);
      settxtgvSerial(Array(gvSerial.length).fill(""));
      inputSerial.current.forEach((input) => {
        if (input) input.value = '';
      });
      setpnlResult(false);
      setlblResult("");
      //setgvScanResult(prevState => ({ ...prevState, value: GetAOISheetDataByLot("", txtLayer) }));
      setgvScanResult((prevState) => ({
        ...prevState,
        visible: false,
        value: [],
      }));
      setgvReject((prevState) => ({ ...prevState, visible: false, value: [] }));
      setlblProduct("");
      sethfMode("LOT");
      setTimeout(() => {
        inputLot.current.focus();
      }, 0);
    } else if (strType === "SERIAL") {
      settxtTotalPcsDisabled(true);
      setpnlSerial(true);
      setTimeout(() => {
        setpnlResult(false);
      }, 0);
      setibtLayerBack((prevState) => ({ ...prevState, disabled: false }));
      sethfMode("SERIAL");
      setTimeout(() => {
        inputSerial.current[0].focus();
      }, 0);
      //await getInitialSerial();
    }
  };

  const getInitialSerial = async (No, TotalPcs) => {
    let dtData = [];
    if (parseInt(TotalPcs) > parseInt(No)) {
      setlblSEQ(No);

      for (let intRow = 0; intRow < hfSerialCount; intRow++) {
        let drRow = {
          SEQ: intRow + 1,
        };
        dtData.push(drRow);
      }
      setgvSerial(dtData);
      settxtgvSerial(Array(dtData.length).fill(""))
      inputSerial.current.forEach((input) => {
        if (input) input.value = '';
      });
      if (dtData.length > 0) {
        setTimeout(() => {
          inputSerial.current[0].focus();
        }, 0);
      }
      return dtData;
    } else {
      setpnlSerial(false);
    }
  };

  const setSerialDataTray = async (txtgvSerial) => {
    const dtSerial = getInputSerial(txtgvSerial);
    let _bolTrayError = false;
    let _bolError = false;
    let _strScanResultAll = "OK";
    let _intRowSerial = 0;

    setgvReject((prevState) => ({ ...prevState, visible: false, value: [] }));

    const allSerialEmpty = dtSerial.every(item => item.SERIAL === "");
    const anySerialIncomplete = dtSerial.some(item => item.SERIAL === "");

    if (allSerialEmpty || anySerialIncomplete) {
      hideLoading();
      setlblLog("Please Input Sheet No.");
      setpnlLog(true);
      setTimeout(() => {
        inputSerial.current[0].focus();
      }, 0);
      return;
    } else {
      setpnlLog(false);
      setlblLog("");
    }

    showLoading("กำลังบันทึก กรุณารอสักครู่");

    if (!_bolTrayError) {
      for (let i = 0; i < dtSerial.length; i++) {
        if (dtSerial[i].SERIAL !== "") {
          let _intCount = 0;
          let _strRemark = "";
          let _strError = "";
          let _strSerial = dtSerial[i].SERIAL;
          let _strTestResultOrg = "";
          let _strOK = "OK";
          let _strNG = "NG";

          _bolError = false;

          if (!_bolError) {
            if (
              hfRollNo === "" ||
              hfRollNo !== _strSerial.substring(0, hfRollNo.length)
            ) {
              _strScanResultAll = "NG";
              dtSerial[i].SCAN_RESULT = "NG";
              dtSerial[i].REMARK =
                "Sheet mix roll no. / หมายเลขบาร์โค้ดปนม้วนกัน";
              dtSerial[i].ROW_UPDATE = "N";

              _bolError = true;
              _bolTrayError = true;

            }
          }

          if (!_bolError) {
            for (
              let _intRow = _intRowSerial + 1;
              _intRow < dtSerial.length;
              _intRow++
            ) {
              if (_strSerial === dtSerial[_intRow].SERIAL) {
                _strScanResultAll = "NG";
                dtSerial[i].SCAN_RESULT = "NG";
                dtSerial[i].REMARK = "Sheet duplicate / หมายเลขบาร์โค้ดซ้ำกัน";
                dtSerial[i].ROW_UPDATE = "N";

                _bolError = true;
                _bolTrayError = true;

              }
            }

            for (let gvRow = 0; gvRow < gvScanResult.length; gvRow++) {
              if (_strSerial === gvScanResult[gvRow].SHEET_NO) {
                _strScanResultAll = "NG";
                dtSerial[i].SCAN_RESULT = "NG";
                dtSerial[i].REMARK = "Sheet duplicate / หมายเลขบาร์โค้ดซ้ำกัน";
                dtSerial[i].ROW_UPDATE = "N";

                _bolError = true;
                _bolTrayError = true;

              }
            }
          }

          if (!_bolError) {
            if (_strSerial.length !== parseInt(hfSerialLength)) {
              _strScanResultAll = "NG";
              dtSerial[i].SCAN_RESULT = "NG";
              dtSerial[i].REMARK =
                "Sheet no. invalid / หมายเลขบาร์โค้ดไม่ถูกต้อง";
              dtSerial[i].ROW_UPDATE = "N";

              _bolError = true;
              _bolTrayError = true;

            }
          }

          if (!_bolError) {
            let data = [];
            await axios
              .post("/api/ScanAOISheetNo/GetAOISheetCount", {
                strsheetno: _strSerial,
              })
              .then((res) => {
                data = res.data;
              });
            if (data > 0) {
              _strScanResultAll = "NG";
              dtSerial[i].SCAN_RESULT = "NG";
              dtSerial[i].REMARK = "Sheet duplicate / หมายเลขบาร์โค้ดซ้ำกัน";
              dtSerial[i].ROW_UPDATE = "N";

              _bolError = true;
              _bolTrayError = true;

            }
          }

          if (!_bolError) {
            dtSerial[i].SCAN_RESULT = "OK";
            dtSerial[i].ROW_UPDATE = "Y";
          }
        } else {
          _strScanResultAll = "NG";
          dtSerial[i].SCAN_RESULT = "NG";
          dtSerial[i].REMARK = "Barcode can not scan / สแกนบาร์โค้ดไม่ได้";
          dtSerial[i].ROW_UPDATE = "N";
          _bolTrayError = true;

        }
        _intRowSerial = _intRowSerial + 1;
      }

      setlblResult(_strScanResultAll);

      if (_strScanResultAll === "NG") {
        hideLoading();
        setpnlResult(true);
        setlblResultcolor("red");
      } else {
        for (let i = 0; i < dtSerial.length; i++) {
          let _strErrorUpdate = "";
          await axios
            .post("/api/ScanAOISheetNo/SetAOISheetNo", {
              strlot: dtSerial[i].LOT,
              strlayer: dtSerial[i].LAYER,
              seq: dtSerial[i].SEQ,
              leafno: dtSerial[i].LEAF,
              strserial: dtSerial[i].SERIAL,
              strstation: hfUserStation,
            })
            .then((res) => {
              _strErrorUpdate = res.data.p_error;
            });

          if (_strErrorUpdate !== "") {
            setpnlResult(true);
            setlblResult("Error :" + _strErrorUpdate);
            setlblResultcolor("red");
          } else {
            setpnlResult(true);
            setlblResultcolor("green");
          }
        }
      }
      let dtReject = [];
      for (let i = 0; i < dtSerial.length; i++) {
        await axios
          .post("/api/ScanAOISheetNo/fnGetAOISheetRejectData", {
            dtSerial: dtSerial[i].SERIAL,
            strseq: dtSerial[i].SEQ,
            strleaf: dtSerial[i].LEAF,
          })
          .then((res) => {
            dtReject = res.data;
          });

        if (dtReject.length > 0) {
          setgvReject((prevState) => ({
            ...prevState,
            visible: true,
            value: dtReject,
          }));
        }
      }
    }

    //await GetAOISheetDataByLot(txtLotNo, txtLayer);
    let data = [];
    await axios
      .post("/api/ScanAOISheetNo/GetAOISheetDataByLot", {
        strlotno: txtLotNo,
        strlayer: txtLayer,
      })
      .then((res) => {
        data = res.data;
      });
    setgvScanResult((prevState) => ({
      ...prevState,
      visible: true,
      value: data,
    }));

    SetMode("SERIAL");

    await axios
      .post("/api/ScanAOISheetNo/GetAOISheetCountbyLot", {
        strlotno: txtLotNo,
        strlayer: txtLayer,
      })
      .then(async (res) => {
        const updatedValue = parseInt(res.data, 10) + 1;
        if (updatedValue <= txtTotalPcs) {
          settxtNo(updatedValue);
          setlblSEQ(updatedValue);
        } else if (updatedValue > txtTotalPcs) {
          setTimeout(() => {
            setpnlSerial(false);
            setpnlResult(false);
            setlblResult("");
          }, 0);
        }
      });
      settxtgvSerial(Array(gvSerial.length).fill(""));
      inputSerial.current.forEach((input) => {
        if (input) input.value = '';
      });
    hideLoading();
  };

  const getInputSerial = (txtgvSerial) => {
    let dtData = [];
    let intRow = 0;

    for (let intSeq = 0; intSeq < gvSerial.length; intSeq++) {
      dtData.push({
        SEQ: lblSEQ,
        LEAF: intSeq + 1,
        SERIAL: txtgvSerial[intSeq] || "",
        LOT: txtLotNo,
        LAYER: txtLayer,
        SCAN_RESULT: "",
        REMARK: "",
        ROW_UPDATE: "N",
      });
    }

    return dtData;
  };

  const handleKeygvSerial = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < gvSerial.length && inputSerial.current[nextIndex]) {
        inputSerial.current[nextIndex].focus();

      } else if (nextIndex === gvSerial.length) {
        btnSave_Click();
      }
    }
  };

  const btnDeleteClick = async (rowno) => {

    let data = [];

    if (!isNaN(rowno)) {
      const selectedItem = gvScanResult.value.find(
        (item) => item.row_no === rowno
      );
      const strSheetNo = selectedItem.sheet_no;

      try {
        // ลบข้อมูล
        const deleteRes = await axios.post(
          "/api/ScanAOISheetNo/DeleteAOISheetNo",
          {
            strlotno: txtLotNo,
            strsheetno: strSheetNo,
          }
        );

        data = deleteRes.data.p_error;


        await swal.fire("Success", "You delete data success", "success");

        const getDataRes = await axios.post(
          "/api/ScanAOISheetNo/GetAOISheetDataByLot",
          {
            strlotno: txtLotNo,
            strlayer: txtLayer,
          }
        );
        data = getDataRes.data;
        setgvScanResult((prevState) => ({
          ...prevState,
          visible: true,
          value: data,
        }));

        const getCountRes = await axios.post(
          "/api/ScanAOISheetNo/GetAOISheetCountbyLot",
          {
            strlotno: txtLotNo,
            strlayer: txtLayer,
          }
        );
        const updatedValue = parseInt(getCountRes.data, 10) + 1;
        settxtNo(updatedValue);
        setlblSEQ(updatedValue);

        if (updatedValue <= txtTotalPcs) {
          await getInitialSerial(updatedValue, txtTotalPcs);
          setlblSEQ(updatedValue);
          SetMode("SERIAL");
        }

        setTimeout(() => {
          inputSerial.current[0].focus();
        }, 0);
      } catch (error) {
        console.error("เกิดข้อผิดพลาด =", error);

        await swal.fire("Error", error.message, "error");

        setTimeout(() => {
          inputSerial.current[0].focus();
        }, 0);
      }
    }
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "seq",
      key: "No.",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Leaf",
      dataIndex: "leaf",
      key: "Leaf",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Sheet No.",
      dataIndex: "sheet_no",
      key: "Sheet No.",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Delete",
      dataIndex: "row_no",
      key: "Delete",
      align: "center",
      render: (text, record, index) => {
        return (
          <Button
            type="text"
            style={{ padding: "0px" }}
            onClick={() => btnDeleteClick(record.row_no)}
          >
            <DeleteIcon
              sx={{
                fontSize: 35,
                color: "red",
                padding: 0,
              }}
            />
          </Button>
        );
      },
    },
  ];

  const columnsgvReject = [
    {
      title: "No.",
      dataIndex: "SEQ",
      key: "No.",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Leaf",
      dataIndex: "LEAF",
      key: "Leaf",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Sheet No.",
      dataIndex: "SERIAL",
      key: "Sheet No.",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Side",
      dataIndex: "SIDE",
      key: "Side",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Pcs No.",
      dataIndex: "PCS_NO",
      key: "Pcs No.",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Reject",
      dataIndex: "REJECT_CODE",
      key: "Reject",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Name",
      dataIndex: "REJECT_NAME",
      key: "Name",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
  ];

  return {
    txtOperator,
    settxtOperator,
    txtTotalPcs,
    settxtTotalPcs,
    txtNo,
    settxtNo,
    txtLeaf,
    settxtLeaf,
    txtLayer,
    settxtLayer,
    txtLotNo,
    settxtLotNo,
    lblProduct,
    ibtOperator,
    ibtback,
    ibtLayerBack,
    ibtLotBack,
    pnlSerial,
    gvSerial,
    lblSEQ,
    txtgvSerial,
    lblResult,
    lblResultcolor,
    gvScanResult,
    txtOperatorDisabled,
    txtTotalPcsDisabled,
    txtLeafDisabled,
    txtLayerDisabled,
    txtLotNoDisabled,
    inputOperator,
    inputTotalPcs,
    inputLeaf,
    inputLayer,
    inputLot,
    inputSerial,
    handleChangeOperator,
    ibtOperator_Click,
    handleChangeTotalPcs,
    handleChangeNo,
    ibtBack_Click,
    handleChangeLeaf,
    handleChangeLayer,
    ibtLayerBack_Click,
    handleChangeLotNo,
    ibtLotBack_Click,
    handleChangeSerial,
    btnSave_Click,
    btnCancel_Click,
    columns,
    handleKeygvSerial,
    gvReject,
    columnsgvReject,
    pnlResult,
    pnlLog,
    lblLog,
    settxtgvSerial
  };
}

export { fn_ScanAOISheetNo };
