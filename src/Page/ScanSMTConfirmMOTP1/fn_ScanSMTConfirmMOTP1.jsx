import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Tag } from "antd";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useLoading } from "../../loading/fn_loading";
import { DataConfig } from "../Common/function_Common";

function fn_ScanSMTConfirmMOTP1() {
  const [txtLot, settxtLot] = useState({ disabled: false, value: "" });
  const [selProduct, setselProduct] = useState({
    disabled: false,
    value: null,
  });
  const [Productdata, setProductdata] = useState([]);
  const [lblLot, setlblLot] = useState("");
  const [pnlLog, setpnlLog] = useState(false);
  const [lblLog, setlblLog] = useState("");
  const [lblResult, setlblResult] = useState("");
  const [lblResultcolor, setlblResultcolor] = useState("green");

  //Table
  const [pnlSerial, setpnlSerial] = useState(false);
  const [gvSerialData, setgvSerialData] = useState([]);
  const [gvScanResult, setgvScanResult] = useState(false);
  const [gvScanData, setgvScanData] = useState([]);
  const [txtgvSerial, settxtgvSerial] = useState([]);

  //hiddenfield
  const hfUserID = localStorage.getItem("ipAddress");
  const hfUserStation = localStorage.getItem("ipAddress");
  const [hfUserFactory, sethfUserFactory] = useState("");
  const [hfSerialLength, sethfSerialLength] = useState("");
  const [hfSerialFixFlag, sethfSerialFixFlag] = useState("");
  const [hfSerialDigit, sethfSerialDigit] = useState("");
  const [hfSerialStartDigit, sethfSerialStartDigit] = useState("");
  const [hfSerialEndDigit, sethfSerialEndDigit] = useState("");
  const [hfTrayFlag, sethfTrayFlag] = useState("");
  const [hfTrayLength, sethfTrayLength] = useState("");
  const [hfTestResultFlag, sethfTestResultFlag] = useState("");
  const [hfSerialCount, sethfSerialCount] = useState("");
  const [hfAutoScan, sethfAutoScan] = useState("");
  const [hfMode, sethfMode] = useState("");
  const [hfConfigCheck, sethfConfigCheck] = useState("");
  const [hfConfigCode, sethfConfigCode] = useState("");
  const [hfConfigStart, sethfConfigStart] = useState("");
  const [hfConfigEnd, sethfConfigEnd] = useState("");
  const [hfConfigRuning, sethfConfigRuning] = useState("");
  const [hfDuplicateStart, sethfDuplicateStart] = useState("");
  const [hfDuplicateEnd, sethfDuplicateEnd] = useState("");
  const [hfChipIDCheck, sethfChipIDCheck] = useState("");
  const [hfCheckPrdSht, sethfCheckPrdSht] = useState("");
  const [hfCheckPrdShtStart, sethfCheckPrdShtStart] = useState("");
  const [hfCheckPrdShtEnd, sethfCheckPrdShtEnd] = useState("");
  const [hfCheckPrdAbbr, sethfCheckPrdAbbr] = useState("");
  const [hfPlasmaCheck, sethfPlasmaCheck] = useState("");
  const [hfPlasmaTime, sethfPlasmaTime] = useState("");
  const [hfCheckStartSeq, sethfCheckStartSeq] = useState("");
  const [hfCheckStartSeqCode, sethfCheckStartSeqCode] = useState("");
  const [hfCheckStartSeqStart, sethfCheckStartSeqStart] = useState("");
  const [hfCheckStartSeqEnd, sethfCheckStartSeqEnd] = useState("");
  const [hfCheckSPIAOI, sethfCheckSPIAOI] = useState("");
  const [hfCheckDateInProc, sethfCheckDateInProc] = useState("");
  const [hfDateInProc, sethfDateInProc] = useState("");
  const [hfCheckWeekCode, sethfCheckWeekCode] = useState("");
  const [hfCheckWeekCodeStart, sethfCheckWeekCodeStart] = useState("");
  const [hfCheckWeekCodeEnd, sethfCheckWeekCodeEnd] = useState("");
  const [hfWeekCodeType, sethfWeekCodeType] = useState("");
  const [hfWeekCode, sethfWeekCode] = useState("");
  const [hfCheckPreAOIF, sethfCheckPreAOIF] = useState("");
  const [hfCheckPreAOIB, sethfCheckPreAOIB] = useState("");
  const [hfCheckAOIF, sethfCheckAOIF] = useState("");
  const [hfCheckAOIB, sethfCheckAOIB] = useState("");
  const [hfCheckSPIF, sethfCheckSPIF] = useState("");
  const [hfCheckSPIB, sethfCheckSPIB] = useState("");
  const [hfLotLength, sethfLotLength] = useState(9);
  const [hfExportCSV, sethfExportCSV] = useState("N");
  const [hfLotAll, sethfLotAll] = useState("");
  const [hfSerialInfo, sethfSerialInfo] = useState("");

  //inputRef
  const inputLot = useRef([]);
  const ddlProduct = useRef([]);
  const inputgvSerial = useRef([]);
  const inputTray = useRef([]);

  const { ConfigData } = DataConfig();
  const { showLoading, hideLoading } = useLoading();

  const plantCode = ConfigData.FACTORY;
  const DUPLICATE_CHECK_FLG = ConfigData.DUPLICATE_CHECK_FLG;
  const FINAL_GATE_SPECIAL_FLG = 1;
  const FINAL_GATE_SPECIAL_PRD = ConfigData.FINAL_GATE_SPECIAL_PRD;
  const FINAL_GATE_SPECIAL_MESSAGE = ConfigData.FINAL_GATE_SPECIAL_MESSAGE;
  const FINAL_GATE_MASTER_CODE = ConfigData.FINAL_GATE_MASTER_CODE;
  const FINAL_GATE_SPECIAL_OK = "OK";
  const EXPORT_CSV_FLG = ConfigData.EXPORT_CSV_FLG;

  useEffect(() => {
    if (hfSerialCount != "" && !pnlLog) {
      getInitialSerial();
    }
  }, [hfSerialCount, pnlLog]);

  useEffect(() => {
    PageLoad();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const PageLoad = async () => {
    sethfMode("");
    sethfLotAll("");
    getProductData();
    SetMode("LOT");
  };

  const getProductData = async () => {
    axios.get("/api/Common/GetProductData").then((res) => {
      let data = res.data.flat();
      setProductdata(data);
      setselProduct((prevState) => ({ ...prevState, value: data[0].prd_name }));
      getProductSerialMaster(data[0].prd_name);
    });
  };

  const handleChangeLot = async () => {
    if (txtLot.value !== "") {
      let _strLot = "";
      let _strPrdName = "";
      const _strLotAll = txtLot.value.toUpperCase().trim().split(";");
      if (_strLotAll.length >= 2) {
        _strLot = _strLotAll[0];
        _strPrdName = selProduct;
        sethfTestResultFlag("Y");

        if (_strLot.length === parseFloat(hfLotLength)) {
          await axios
            .post("/api/Common/getProductNameByLot", {
              strLot: _strLot,
            })
            .then((res) => {
              _strPrdName = res.data.prdName[0];
            });


          let dtLotProduct = [];
          await axios
            .post("/api/Common/getProductDataByLot", {
              strLot: _strLot,
            })
            .then((res) => {
              dtLotProduct = res.data.flat().flat();
            });
          if (dtLotProduct.length > 0) {
            if (dtLotProduct[0][2] === "Y") {
              sethfTestResultFlag("N");
            }
            sethfLotAll(dtLotProduct[0][3]);
          }
          setlblLot(_strLot);

          try {
            setselProduct((prevState) => ({
              ...prevState,
              value: _strPrdName,
            }));
            await getProductSerialMaster(_strPrdName);
            SetMode("SERIAL");
          } catch (error) {
            const intProduct = _strPrdName.indexOf("-", 12);
            if (intProduct > -1) {
              _strPrdName =
                _strPrdName.substring(0, intProduct) +
                _strPrdName.substring(intProduct + 1, intProduct + 11).trim();
              try {
                setselProduct((prevState) => ({
                  ...prevState,
                  value: _strPrdName,
                }));
                await getProductSerialMaster();
                SetMode("SERIAL");
              } catch (error) {
                setlblLog(`Product ${_strPrdName} not found.`);
                setpnlLog(true);
                await getProductSerialMaster(_strPrdName);
                setTimeout(() => {
                  ddlProduct.current.focus();
                }, 0);
              }
            } else {
              setlblLog(`Product ${_strPrdName} not found.`);
              setpnlLog(true);
              await getProductSerialMaster(_strPrdName);
              setTimeout(() => {
                ddlProduct.current.focus();
              }, 0);
            }
          }
        } else {
          setlblLog(
            `${_strLot} invalid lot no.! / ${_strLot} หมายเลขล็อตไม่ถูกต้อง`
          );
          setlblLot("");
          SetMode("LOT_ERROR");
        }
      } else {
        setlblLog(` Please scan QR Code! / กรุณาสแกนที่คิวอาร์โค้ด`);
        setlblLot("");
        SetMode("LOT_ERROR");
      }
    } else {
      setlblLot("");
      setTimeout(() => {
        inputLot.current.focus();
      }, 0);
    }
  };

  const ibtBackClick = () => {
    setselProduct((prevState) => ({
      ...prevState,
      disabled: false,
      value: Productdata[0].prd_name,
    }));
    settxtLot((prevState) => ({ ...prevState, disabled: false, value: "" }));
    setpnlSerial(false);
    SetMode("LOT");
    setTimeout(() => {
      inputLot.current.focus();
    }, 0);
  };

  const handleChangeProduct = async (value) => {
    setselProduct(value);
    await getProductSerialMaster(value);
    if (lblLot !== "") {
      await getProductSerialMaster(value);
      SetMode("SERIAL");
    } else {
      SetMode("LOT");
    }
  };

  // const handleChangeSerial = (index, e) => {
  //   const newValues = [...txtgvSerial];
  //   newValues[index] = e.target.value.trim().toUpperCase();
  //   settxtgvSerial(newValues);
  // };

  let newValues = [];
  const handleChangeSerial = async (index, event) => {
    newValues[index] = event.target.value.trim().toUpperCase();
    // event.target.value = '';
    return newValues;
  };

  useEffect(() => {
    if (hfMode === "SERIAL" && inputgvSerial.current[0]) {
      inputgvSerial.current[0].focus();
    }
  }, [gvSerialData]);

  const handleKeygvSerial = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextIndex = index + 1;
      if (nextIndex < hfSerialCount && inputgvSerial.current[nextIndex]) {
        inputgvSerial.current[nextIndex].focus();

      } else if (nextIndex === nextIndex) {
        btnSaveClick();
      }
    }
  };

  const btnSaveClick = async (txtgvSerial) => {
    let CheckValue = false;
    if (hfMode === "SERIAL") {
      if (Array.isArray(txtgvSerial)) {
        const Value = txtgvSerial.some((item) => item.trim() !== "");
        CheckValue = Value;
      }
      if (txtgvSerial !== "" && CheckValue !== false) {
        setpnlLog(false);
        await setSerialDataTray(txtgvSerial);
        // const newValues = [];
        // settxtgvSerial(newValues);
        // await new Promise((resolve) => setTimeout(resolve, 0));
      } else {
        setlblLog(`Please Input Serial No.`);
        setpnlLog(true);
        inputgvSerial.current[0].focus();
        settxtgvSerial(Array(gvSerialData.length).fill(""));
      }
    }
  };

  const btnCancelClick = async () => {
    SetMode("SERIAL");
    settxtgvSerial(Array(gvSerialData.length).fill(""));
  };

  const SetMode = async (strType) => {
    if (strType === "LOT") {
      settxtLot((prevState) => ({ ...prevState, disabled: false, value: "" }));
      setlblLot("");
      setpnlLog(false);
      setpnlSerial(false);
      settxtgvSerial(Array(gvSerialData.length).fill(""));
      setgvScanResult(false);
      setgvScanData([]);
      setTimeout(() => {
        inputLot.current.focus();
      }, 0);
    } else if (strType === "LOT_ERROR") {
      settxtLot((prevState) => ({ ...prevState, disabled: false, value: "" }));
      setlblLot("");
      setpnlLog(true);
      setpnlSerial(false);
      sethfMode("LOT");
      setTimeout(() => {
        inputLot.current.focus();
      }, 0);
    } else if (strType === "TRAY") {
      settxtLot((prevState) => ({ ...prevState, disabled: true }));
      setpnlLog(false);
      setpnlSerial(true);
      await getInitialSerial();
      sethfMode("TRAY");
      setTimeout(() => {
        inputTray.current.focus();
      }, 0);
    } else if (strType === "TRAY_ERROR") {
      settxtLot((prevState) => ({ ...prevState, disabled: true }));
      setpnlLog(true);
      setpnlSerial(false);
      sethfMode("TRAY");
      setTimeout(() => {
        inputTray.current.focus();
      }, 0);
    } else if (strType === "SERIAL") {
      setselProduct((prevState) => ({ ...prevState, disabled: true }));
      settxtLot((prevState) => ({ ...prevState, disabled: true }));
      setpnlLog(false);
      setlblLog("");
      setpnlSerial(true);
      setgvScanResult(false);
      setgvScanData([]);
      sethfMode("SERIAL");
      await getInitialSerial();
    } else if (strType === "SERIAL_ERROR") {
      settxtLot((prevState) => ({ ...prevState, disabled: true }));
      setpnlLog(true);
    } else if (strType === "SERIAL_OK") {
      settxtLot((prevState) => ({ ...prevState, disabled: true }));
      setpnlLog(false);
      setpnlSerial(true);
      await getInitialSerial();
      inputgvSerial.current[0].focus();
    } else if (strType === "SERIAL_NG") {
      settxtLot((prevState) => ({ ...prevState, disabled: true }));
      setpnlLog(false);
    }
  };

  const getInitialSerial = async () => {
    let dtData = [];

    for (let intRow = 1; intRow <= hfSerialCount; intRow++) {
      dtData.push({
        SEQ: intRow,
      });
    }
    setgvSerialData(dtData);
    settxtgvSerial(Array(dtData.length).fill(""))
    inputgvSerial.current.forEach((input) => {
      if (input) input.value = '';
    });
    scrollToTop();

    // if (gvSerialData.length > 0 && hfTrayFlag === "N") {
    //    // inputgvSerial.current[0].focus();
    // }
  };

  const setSerialDataTray = async (txtgvSerial) => {
    const dtSerial = await getInputSerial(txtgvSerial);
    let _strLot = "";
    let _strPrdName = selProduct;
    let _strTray = " ";
    let _bolTrayError = false;
    let _bolError = false;
    let _strScanResultAll = "OK";
    let _intRowSerial = 0;

    showLoading('กำลังบันทึก กรุณารอสักครู่');

    if (!_bolTrayError) {
      if (hfCheckWeekCode === "Y") {
        await axios
          .post("/api/Common/getWeekCodebyLot", {
            _strLot: _strLot,
            _strProc: hfDateInProc,
            _strWeekType: hfWeekCodeType,
            _strSerialInfo: hfSerialInfo,
          })
          .then((res) => {

            sethfWeekCode(res.data);
          });
      }

      for (let i = 0; i < dtSerial.length; i++) {
        if (dtSerial[i].SERIAL !== "") {
          let _intCount = 0;
          let _intCountOK = 0;
          let _intCountNG = 0;
          let _intCountDup = 0;
          let _strRemark = "";
          let _strError = "";
          let _strSerial = dtSerial[i].SERIAL;
          let _dtSerialAll = [];
          let _bolScanDouble = false;
          let _bolScanDuplicate = false;
          let _strPrdNameOrg = "";
          let _strLotOrg = "";
          let _strTrayOrg = "";
          let _strTestResultOrg = "";
          let _strOK = "OK";
          let _strNG = "NG";
          let _strScanResultUpdate = "OK";
          let _strMessageUpdate = "";
          let _strTestResultUpdate = "";
          let _strTypeTestResult = "";
          let _strRejectUpdate = "";
          let _strReject1 = "";
          let _strReject2 = "";
          let _strTouchUp = "";

          _bolError = false;

          let _strTestResult = "NO";

          let data = [];
          await axios
            .post("/api/ConfirmMOTP1/GetCountConfirmMagazineBySerial", {
              strplantcode: plantCode,
              strserial: _strSerial,
            })
            .then((res) => {
              data = res.data;
            });
          if (data <= 0) {
            _strMessageUpdate =
              "Serial not confirm magazine / หมายเลขบาร์โค้ดยังไม่ผ่านการยืนยัน";
            _strRemark = "Serial not confirm magazine";
            _strScanResultUpdate = "NG";
            _strTestResultUpdate = _strTestResult;

            dtSerial[i].REMARK_UPDATE = _strRemark;
            dtSerial[i].ROW_UPDATE = "Y";

            _intCountNG = 1;
            _bolError = true;
          }

          let dtCarrierboard = [];
          await axios
            .post("/api/Common/GetSheetDataBySerialNo", {
              strSerialno: _strSerial,
              strPlantCode: plantCode,
            })
            .then((res) => {
              dtCarrierboard = res.data;
            });

          if (dtCarrierboard === "") {
            _strMessageUpdate =
              "Serial not connect board / หมายเลขบาร์โค้ดยังไม่สแกนประกบบอร์ด";
            _strRemark = "Serial not confirm magazine";
            _strScanResultUpdate = "NG";
            _strTestResultUpdate = _strTestResult;

            dtSerial[i].REMARK_UPDATE = _strRemark;
            dtSerial[i].ROW_UPDATE = "Y";

            _intCountNG = 1;
            _bolError = true;
          }

          //Check format serial no
          if (_strSerial.length === hfSerialLength) {
            let _strFixDigit = "";

            if (hfSerialFixFlag === "Y" && _strScanResultUpdate !== "NG") {
              const start = parseInt(hfSerialStartDigit);
              const end = parseInt(hfSerialEndDigit);
              _strFixDigit = _strSerial.substring(start - 1, end);

              if (_strFixDigit !== hfSerialDigit) {
                _strMessageUpdate =
                  "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                _strRemark = "Serial barcode mix product";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";

                _intCountNG = 1;
                _bolError = true;
              }

              if (hfConfigCheck === "Y" && _strScanResultUpdate !== "NG") {
                let _strConfigDigit = "";
                const start = parseInt(hfConfigStart);
                const end = parseInt(hfConfigEnd);
                _strConfigDigit = _strSerial.substring(start - 1, end);
                if (_strConfigDigit !== hfConfigCode) {
                  _strMessageUpdate =
                    "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                  _strRemark = "Serial barcode mix product";
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;
                  dtSerial[i].REMARK_UPDATE = _strRemark;
                  dtSerial[i].ROW_UPDATE = "Y";

                  _intCountNG = 1;
                  _bolError = true;
                }
              }
            }

            if (hfCheckStartSeq === "Y" && _strScanResultUpdate !== "NG") {
              let _strStartSeq = "";
              const start = parseInt(hfCheckStartSeqStart);
              const end = parseInt(hfCheckStartSeqEnd);
              _strStartSeq = _strSerial.substring(start - 1, end);
              if (_strStartSeq !== hfCheckStartSeqCode) {
                _strMessageUpdate =
                  "Serial barcode mix product / หมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                _strRemark = "Serial barcode mix product";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";

                _intCountNG = 1;
                _bolError = true;
              }
            }

            if (hfCheckWeekCode === "Y" && _strScanResultUpdate !== "NG") {
              let _strWeekCode = "";
              const start = parseInt(hfCheckWeekCodeStart);
              const end = parseInt(hfCheckWeekCodeEnd);
              _strWeekCode = _strSerial.substring(start - 1, end);
              if (_strWeekCode !== hfWeekCode) {
                _strMessageUpdate =
                  "Serial barcode mix week code / หมายเลขบาร์โค้ดปนรหัสสัปดาห์กัน";
                _strRemark = "Serial barcode mix week code";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";

                _intCountNG = 1;
                _bolError = true;
              }
            }

            if (!_bolError) {
              for (
                let intRow = _intRowSerial + 1;
                intRow < dtSerial.length;
                intRow++
              ) {
                if (_strSerial === dtSerial[intRow].SERIAL) {
                  _strMessageUpdate =
                    "Serial duplicate in tray / หมายเลขบาร์โค้ดซ้ำในถาดเดียวกัน";
                  _strRemark = "Serial duplicate in tray  ";
                  _strScanResultUpdate = "NG";
                  _strTestResultUpdate = _strTestResult;
                  dtSerial[i].REMARK_UPDATE = _strRemark;
                  dtSerial[i].ROW_UPDATE = "N";

                  _intCountNG = 1;
                  _bolError = true;
                }
              }
            }

            if (!_bolError && hfCheckPrdSht === "Y") {
              let strSheetLot = "";
              let _strShtNo = "";
              await axios
                .post("/api/common/GetSheetNoBySerialNo", {
                  data: {
                    strPlantCode: plantCode,
                    strSerial: _strSerial,
                    strLot: strSheetLot,
                  },
                })
                .then((res) => {
                  _strShtNo = res.data._strsheet;
                });
              let _strPrdSht = "";
              const start = parseInt(hfCheckPrdShtStart);
              const end = parseInt(hfCheckPrdShtEnd);
              _strPrdSht = _strShtNo.substring(start - 1, end);
              if (_strShtNo !== "" && hfCheckPrdAbbr !== _strPrdSht) {
                _strMessageUpdate =
                  "Change serial barcode mix product / เปลี่ยนหมายเลขบาร์โค้ดปนกันกับชิ้นงานอื่น";
                _strRemark = "Change serial barcode mix product  ";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";

                _intCountNG = 1;
                _bolError = true;
              } else if (_strShtNo === "") {
                _strMessageUpdate =
                  "No data connect sheet / ไม่มีข้อมูลแสกนประกบกับหมายเลขชีส";
                _strRemark = "No data connect sheet  ";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";

                _intCountNG = 1;
                _bolError = true;
              } else if (hfLotAll.indexOf(strSheetLot) === -1) {

                _strMessageUpdate =
                  "Lot not same connect sheet / ล๊อตไม่ตรงตามที่แสกนประกบกับหมายเลขชีส";
                _strRemark = "Lot not same connect sheet  ";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";

                _intCountNG = 1;
                _bolError = true;
              }
            }

            if (!_bolError && hfPlasmaCheck === "Y") {
              let _dblPlasmaTime = 0;
              await axios
                .post("/api/Common/GetPlasmaTimeBySerialNo", {
                  dataList: {
                    strSerial: _strSerial,
                    strPlantCode: plantCode,
                    strPacking: "",
                    strMasterCode: FINAL_GATE_MASTER_CODE,
                    strPrdname: _strPrdName,
                  },
                })
                .then((res) => {
                  _dblPlasmaTime = res.data.plasma_time;
                });
              if (_dblPlasmaTime === 0) {
                _strMessageUpdate =
                  "Plasma time do not record / ไม่พบข้อมูลการแสกนก่อนเข้าพลาสม่า";
                _strRemark = "Plasma time do not record";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";

                _intCountNG = 1;
                _bolError = true;
              } else if (parseFloat(hfPlasmaTime) < _dblPlasmaTime) {
                _strMessageUpdate =
                  "Plasma time over " +
                  hfPlasmaTime +
                  " hr. / เวลาพลาสม่าเกิน " +
                  hfPlasmaTime +
                  " ชม.";
                _strRemark = "Plasma time over " + hfPlasmaTime + " hr.";
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";

                _intCountNG = 1;
                _bolError = true;
              }
            }

            if (!_bolError && hfCheckSPIAOI === "Y") {
              let _Result = "";
              let _strMessage = "";

              await axios
                .post("/api/Common/get_spi_aoi_result_p1", {
                  strSerialNo: _strSerial,
                  strPlantCode: plantCode,
                  strPreAOIF: hfCheckPreAOIF,
                  strPreAOIB: hfCheckPreAOIB,
                  strAOIF: hfCheckAOIF,
                  strAOIB: hfCheckAOIB,
                  strSPIF: hfCheckSPIF,
                  strSPIB: hfCheckSPIB,
                })
                .then((res) => {
                  _Result = res.data[0].result_v;
                  _strMessage = res.data[0]._message;
                });

              if (_Result === "NG") {
                _strScanResultUpdate = _Result;
                _strMessageUpdate = _strMessage;
                _strRemark = _strMessage;
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";

                _intCountNG = 1;
                _bolError = true;
              }
            }

            if (hfChipIDCheck === "Y" && _bolError === false) {
              let _intCheckPass = 0;
              await axios
                .post("/api/common/GetCheckChipDuplicate", {
                  dataList: {
                    _strPrdName: _strPrdName,
                    _strSerial: _strSerial,
                    _strPlantCode: plantCode,
                  },
                })
                .then((res) => {
                  _intCheckPass = res.data;
                });

              if (_intCheckPass === 0) {
                _strMessageUpdate = FINAL_GATE_SPECIAL_MESSAGE;
                _strRemark = FINAL_GATE_SPECIAL_MESSAGE;
                _strScanResultUpdate = "NG";
                _strTestResultUpdate = _strTestResult;
                dtSerial[i].REMARK_UPDATE = _strRemark;
                dtSerial[i].ROW_UPDATE = "Y";

                _intCountNG = 1;
                _bolError = true;
              }
            }
          } else {
            _strMessageUpdate =
              "Serial not matching product / หมายเลขบาร์โค้ดไม่ตรงตามที่กำหนดไว้";
            _strRemark = "Serial barcode not matching product";
            _strScanResultUpdate = "NG";
            _strTestResultUpdate = _strTestResult;
            dtSerial[i].REMARK_UPDATE = _strRemark;
            dtSerial[i].ROW_UPDATE = "Y";

            _bolError = true;
          }

          dtSerial[i].REJECT = _strReject1;
          dtSerial[i].TOUCH_UP = _strTouchUp;
          dtSerial[i].REJECT2 = _strReject2;
          dtSerial[i].SCAN_RESULT = _strScanResultUpdate;
          dtSerial[i].TEST_RESULT = _strTestResultUpdate;
          dtSerial[i].REMARK = _strMessageUpdate;

          if (_strScanResultUpdate === "NG") {
            _strScanResultAll = "NG";
          }
        }

        _intRowSerial = _intRowSerial + 1;
      }

      setlblResult(_strScanResultAll);

      if (_strScanResultAll === "NG") {
        setlblResultcolor("red");
      } else {
        setlblResultcolor("green");
      }
    }

    if (!_bolTrayError) {
      setgvScanResult(true);
      setgvScanData(dtSerial);
    } else {
      setgvScanData([]);
    }

    if (EXPORT_CSV_FLG === "Y") {
      ExportGridToCSV(dtSerial, columnsgvResult);
    }

    getInitialSerial();
    hideLoading();
  };

  const getInputSerial = async (txtgvSerial) => {
    let dtData = [];
    let intRow = 0;

    for (let intSeq = 0; intSeq < gvSerialData.length; intSeq++) {
      intRow = intRow + 1;
      let drRow = {
        SEQ: intRow,
        SERIAL: txtgvSerial[intSeq] || "",
        REJECT: "",
        TOUCH_UP: "",
        REJECT2: "",
        REJECT_CODE: "",
        SCAN_RESULT: "",
        TEST_RESULT: "",
        TYPE_TEST_RESULT: "",
        REMARK: "",
        REMARK_UPDATE: "",
        ROW_COUNT: 0,
        ROW_UPDATE: "N",
        UPDATE_FLG: "N",
      };
      if (drRow.SERIAL !== "") {
        for (let intNo = 0; intNo <= intRow - 2; intNo++) {
          if (drRow.SERIAL === txtgvSerial[intNo]) {
            drRow.ROW_COUNT = 9;
            break;
          }
        }
      }
      dtData.push(drRow);
    }
    return dtData;
  };

  const getProductSerialMaster = async (strPrdName) => {
    let dtProductSerial = [];
    sethfSerialLength("0");
    sethfSerialFixFlag("N");
    sethfSerialDigit("");
    sethfSerialStartDigit("0");
    sethfSerialEndDigit("0");
    sethfTrayFlag("");
    sethfTrayLength("0");
    sethfTestResultFlag("");
    sethfConfigCheck("N");
    sethfConfigCode("");
    sethfConfigStart("0");
    sethfConfigEnd("0");
    sethfConfigRuning("N");
    sethfDuplicateStart("0");
    sethfDuplicateEnd("0");
    sethfChipIDCheck("N");
    sethfCheckPrdSht("N");
    sethfCheckPrdShtStart("0");
    sethfCheckPrdShtEnd("0");
    sethfCheckPrdAbbr("");
    sethfPlasmaCheck("N");
    sethfPlasmaTime("0");

    sethfCheckStartSeq("N");
    sethfCheckStartSeqCode("");
    sethfCheckStartSeqStart("0");
    sethfCheckStartSeqEnd("0");
    sethfCheckSPIAOI("N");
    sethfCheckDateInProc("N");
    sethfDateInProc("");
    sethfCheckWeekCode("N");
    sethfCheckWeekCodeStart("");
    sethfCheckWeekCodeEnd("");
    sethfWeekCode("");
    sethfWeekCodeType("");
    sethfCheckPreAOIF("N");
    sethfCheckPreAOIB("N");
    sethfCheckAOIF("N");
    sethfCheckAOIB("N");
    sethfCheckSPIF("N");
    sethfCheckSPIB("N");

    await axios
      .post("/api/common/GetSerialProductByProduct", {
        prdName: strPrdName,
      })
      .then((res) => {
        dtProductSerial = res.data[0];
        if (dtProductSerial !== null) {
          sethfSerialLength(dtProductSerial.slm_serial_length);
          sethfSerialFixFlag(dtProductSerial.slm_fix_flag);
          sethfSerialDigit(dtProductSerial.slm_fix_digit);
          sethfSerialStartDigit(dtProductSerial.slm_fix_start_digit);
          sethfSerialEndDigit(dtProductSerial.slm_fix_end_digit);
          sethfTrayFlag(dtProductSerial.slm_tray_flag);
          sethfTrayLength(dtProductSerial.slm_tray_length);
          sethfTestResultFlag(dtProductSerial.slm_test_result_flag);
          sethfSerialCount(dtProductSerial.prm_pcs_tray);
          sethfAutoScan(dtProductSerial.slm_auto_scan);
          sethfConfigCheck(dtProductSerial.prm_barcode_req_config);
          sethfConfigCode(dtProductSerial.prm_config_code);
          sethfConfigStart(dtProductSerial.prm_start_config);
          sethfConfigEnd(dtProductSerial.prm_end_config);
          sethfConfigRuning(dtProductSerial.prm_running_req_config);
          sethfDuplicateStart(dtProductSerial.prm_duplicate_start);
          sethfDuplicateEnd(dtProductSerial.prm_duplicate_end);
          sethfChipIDCheck(dtProductSerial.prm_check_chip_id_flg);
          sethfCheckPrdSht(dtProductSerial.prm_req_check_prd_sht);
          sethfCheckPrdShtStart(dtProductSerial.prm_check_prd_sht_start);
          sethfCheckPrdShtEnd(dtProductSerial.prm_check_prd_sht_end);
          sethfCheckPrdAbbr(dtProductSerial.prm_abbr);
          sethfPlasmaCheck(dtProductSerial.prm_plasma_time_flg);
          sethfPlasmaTime(dtProductSerial.prm_plasma_time);
          sethfCheckStartSeq(dtProductSerial.prm_req_start_seq_flg);
          sethfCheckStartSeqCode(dtProductSerial.prm_start_seq_code);
          sethfCheckStartSeqStart(dtProductSerial.prm_start_seq_start);
          sethfCheckStartSeqEnd(dtProductSerial.prm_start_seq_end);
          sethfCheckSPIAOI(dtProductSerial.prm_final_aoi_spi_flg);
          sethfCheckDateInProc(dtProductSerial.prm_date_inproc_flg);
          sethfDateInProc(dtProductSerial.prm_date_inproc);
          sethfWeekCodeType(dtProductSerial.prm_date_type);
          sethfCheckWeekCode(dtProductSerial.prm_check_weekcode_flg);
          sethfCheckWeekCodeStart(dtProductSerial.prm_check_weekcode_start);
          sethfCheckWeekCodeEnd(dtProductSerial.prm_check_weekcode_end);
          sethfCheckPreAOIF(dtProductSerial.prm_sht_pre_aoi_f);
          sethfCheckPreAOIB(dtProductSerial.prm_sht_pre_aoi_b);
          sethfCheckAOIF(dtProductSerial.prm_sht_aoi_f);
          sethfCheckAOIB(dtProductSerial.prm_sht_aoi_b);
          sethfCheckSPIF(dtProductSerial.prm_sht_spi_f);
          sethfCheckSPIB(dtProductSerial.prm_sht_spi_b);
          sethfSerialInfo(dtProductSerial.prm_additional_info);
        }
      });
    return dtProductSerial;
  };

  const columnsgvResult = [
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
      title: "Serial No.",
      dataIndex: "SERIAL",
      key: "Serial No.",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Result",
      key: "Result",
      dataIndex: "SCAN_RESULT",

      render: (text, record, index) => {
        if (record.SERIAL == "") {
          return "";
        } else {
          return text;
        }
        // if (text == '')
        //     return text;
        // else {
        //     return (
        //         <Tag
        //             className={text === "OK" ? "Tag-OK" : text === "NG" ? "Tag-NG" : ""}
        //         >
        //             {text}
        //         </Tag>
        //     );
        // }
      },
      align: "center",
    },
    {
      title: "Remark",
      key: "Remark",
      dataIndex: "REMARK",

      render: (text, record, index) => {
        return text;
      },
      align: "center",
    },
  ];

  // const btnHiddenClick = () => {
  //     let nameFile = '';
  //     nameFile = 'ConfirmResult.csv';
  //     const userAction = window.confirm(`Do you want to open or save ${nameFile} from IP address ${hfUserID}?`);
  //     if (userAction) {
  //         ExportGridToCSV(gvScanData, nameFile);
  //     } else {

  //     }
  // };

  const ExportGridToCSV = (data, ColumnsHeader) => {
    const date = new Date();
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()}`;

    const filteredColumns = ColumnsHeader.filter(
      (col) => col.title !== "" && col.key !== null && col.title !== undefined
    );

    const headers = filteredColumns.map((col) => col.key);

    const filteredData = data.map((row) =>
      filteredColumns.map((col) => row[col.dataIndex] || "")
    );

    const csvContent = [
      headers.join(","),
      ...filteredData.map((row) => row.join(",")),
    ].join("\n");

    const bom = "\uFEFF";
    const blob = new Blob([bom + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    saveAs(blob, `ConfirmResult.csv`);
  };

  return {
    txtLot,
    settxtLot,
    selProduct,
    Productdata,
    lblLot,
    pnlLog,
    lblLog,
    lblResult,
    lblResultcolor,
    pnlSerial,
    hfSerialCount,
    gvScanResult,
    gvScanData,
    txtgvSerial,
    inputLot,
    ddlProduct,
    inputgvSerial,
    handleChangeLot,
    ibtBackClick,
    handleChangeProduct,
    handleChangeSerial,
    handleKeygvSerial,
    btnSaveClick,
    btnCancelClick,
    columnsgvResult,
    settxtgvSerial,
    gvSerialData
  };
}

export { fn_ScanSMTConfirmMOTP1 };
