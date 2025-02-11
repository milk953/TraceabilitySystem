import React, { useState, useEffect } from "react";
import "../Product Master/Style.css";
import Header from "../Header/Header";
import {
    TextField,
    Card,
    Table,
    TableCell,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    Paper,
    Typography,
    //Button,
    Select,
    MenuItem,
    FormControl,
    FormControlLabel,
    FormHelperText,
    RadioGroup,
    Radio,
    InputLabel,
    Autocomplete,
    Box,
    Checkbox,
    FormGroup,
    Tooltip,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
    SearchOutlined,
    RedoOutlined,
    PlusOutlined,
    PlusCircleOutlined,
    CloseOutlined,
    EditFilled,
    FlagFilled,
    InfoCircleOutlined,
    DownloadOutlined
} from "@ant-design/icons";
import { Input, Button } from "antd";
import { fn_ProductMaster } from "./function_ProductMaster.jsx";
import * as XLSX from 'xlsx';
import "../Common/StyleCommon.css";

function ProductMaster() {


    const {
        txtCheckPrdShtFrom, txtCheckPrdShtTo, selCheckIC, txtPlasmaTime, txtProcControlTime, txtShtPlasmaTime, txtBarcodeGrade, ReqCheckPrdShtCheck, ReqCheckPrdShtCheckChanged, ReqConShtPcsRollCheck, setReqConShtPcsRollCheck,
        ReqProcControlTimeCheck, ReqProcControlTimeCheckChanged, ReqConnShtPcsTimeCheck, setReqConnShtPcsTimeCheck, ReqFinalPackingGroupCheck, setReqFinalPackingGroupCheck, ReqShtControlPlasmaCheck, ReqShtControlPlasmaCheckChanged,
        PlasmaConnShtPcsCheck, setPlasmaConnShtPcsCheck, ConnShtReqBoardFlg, setConnShtReqBoardFlg, AutoPressFCheck, setAutoPressFCheck, AutoPressBCheck, setAutoPressBCheck, txtCheckPrdShtDisabled, txtStartSeqDigitFromDisabled,
        txtCheckPrdShtToDisabled, txtProcControlTimeDisabled, cbxReqConnShtPcsTimeDisabled, txtPlasmaTimeDisabled, rbtPlasmaTimePCSDisabled, rbtPlasmaTimeSHTDisabled, rbtPlasmaTimeGRPDisabled, cbxReqUpdatePlasmaDisabled,
        cbxPlasmaNotStartELTDisabled, cbxPlasmaNotShowTimeDisabled, visiblePassWord, visibletxtPassWord, txtProduct, handleKeyProductName, btnRetriveClick, ErrorPrdName, txtUpdateCount, txtChkStartDig, txtShtLot, txtChkEndDig,
        txtPcsSht, txtChkWord, selSheetType, txtSerialLength, selDateType, selDateTypeselChanged, txtPcsScan, txtEngCode, txtPcsTray, txtRevision, txtSerialFormat, selLaminationSide, txtSheetFormat, txtShtScan, txtShtLaser, ReqLotCheck,
        ReqConfigCheck, txtConfigWord, txtConfigStart, txtConfigEnd, ReqConfigRunCheck, txtDupStart, txtDupEnd, txtAddInfo, txtPassWord, txtAbbr, txtSerialStartCode, rbtselLotRoll, ReqCheckLotShtCheck, txtCheckLotShtFrom, ReqVendorCheck,
        txtCheckLotShtTo, selStatus, ReqControlPlasmaCheck, rbtPlasmaTime, ReqUpdatePlasmaCheck, PlasmaNotStartELTCheck, PlasmaNotShowTimeCheck, ReqStartSeqCodeCheck, ReqCheckWeekCodeCheck, ReqSheetMCCheck, txtWeekCodeStart,
        txtStartSeqCode, txtStartSeqDigitFrom, txtStartSeqDigitTo, ReqShtELTCheck, ReqSPIAOICheck, ReqVendorLotCheck, txtVendorLotLength, ReqDateProcCheck, txtDateFromProc, txtCheckRollPrdWord, RollReqCheckPrdLeafCheck, txtRollCheckPrdLeafFrom,
        txtWeekCodeEnd, ReqConRollLeafCheck, txtLeafScan, txtRollNoLength, txtLeafNoLength, LeafReqSerialCheck, ReqCheckPrdRollCheck, txtCheckRollPrdFrom, txtCheckRollPrdTo, ReqSPIBCheck, ReqAOICoatFCheck, ReqAOICoatBCheck,
        txtRollCheckPrdLeafTo, RollReqCheckLotLeafCheck, txtRollCheckLotLeafFrom, txtRollCheckLotLeafTo, ReqPreAOIFCheck, ReqPreAOIBCheck, ReqAOIFCheck, ReqAOIBCheck, ReqSPIFCheck, ReqEFPCAVICheck, txtUpdateBy, txtUpdateDate, chk_DelFlgCheck,
        ReqReflowFCheck, ReqReflowBCheck, ReqXrayFCheck, ReqXrayBCheck, ReqXrayOneTimeCheck, ReqFinInspectCheck, txtFinInspectProc, ReqEFPCAOMCheck, ReqEFPCAOICheck, ReqEFPCOSTCheck, cbxReqCheckPrdShtDisabled, txtStartSeqCodeDisabled,
        txtStartSeqDigitToDisabled, txtVendorLotLengthDisabled, txtRollNoLengthDisabled, txtLeafNoLengthDisabled, txtLeafScanDisabled, cbxLeafReqSerialDisabled, cbxReqCheckPrdRollDisabled, txtCheckRollPrdFromDisabled, txtCheckRollPrdToDisabled,
        txtCheckRollPrdWordDisabled, cbxRollReqCheckPrdLeafDisabled, txtRollCheckPrdLeafFromDisabled, txtRollCheckPrdLeafToDisabled, cbxRollReqCheckLotLeafDisabled, txtRollCheckLotLeafFromDisabled, txtRollCheckLotLeafToDisabled, txtDateFromProcDisabled,
        cbxReqCheckWeekCodeDisabled, txtWeekCodeStartDisabled, txtWeekCodeEndDisabled, txtShtPlasmaTimeDisabled, txtFinInspectProcDisabled, cbxReqVendorDisabled, cbxReqStartSeqCodeDisabled, txtConfigWordDisabled, txtConfigStartDisabled, txtConfigEndDisabled,
        cbxReqConfigRunDisabled, txtCheckLotShtFromDisabled, txtCheckLotShtToDisabled, handleKeyUpdateCount, handleKeyCheckDigitFrom, handleKeyShtLot, handleKeyCheckDigitTo, handleKeyPcsSht, handleKeyCheckWord, handleselSheettype, handlerbtLotRollChange,
        setReqLotCheck, setReqVendorCheck, ReqConfigCheckChanged, setReqConfigRunCheck, ReqCheckLotShtCheckChanged, ReqControlPlasmaCheckChanged, handlerbtPlasmaTimeChange, setReqEFPCAVICheck, setReqSPIFCheck, setReqSPIBCheck, setReqAOICoatBCheck,
        setReqUpdatePlasmaCheck, setPlasmaNotStartELTCheck, setPlasmaNotShowTimeCheck, ReqStartSeqCodeCheckChanged, setReqShtELTCheck, setReqSPIAOICheck, ReqVendorLotCheckChanged, ReqDateProcCheckChanged, ReqCheckWeekCodeCheckChanged, setReqAOICoatFCheck,
        setReqSheetMCCheck, ReqConnectRollCheckChanged, setLeafReqSerialCheck, ReqCheckPrdRollCheckChanged, RollReqCheckPrdLeafCheckChanged, RollReqCheckLotLeafCheckChanged, setReqPreAOIFCheck, setReqPreAOIBCheck, setReqAOIFCheck, setReqAOIBCheck,
        setReqReflowFCheck, setReqReflowBCheck, setReqXrayFCheck, setReqXrayBCheck, setReqXrayOneTimeCheck, ReqFinInspectCheckChanged, setReqEFPCAOMCheck, setReqEFPCAOICheck, setReqEFPCOSTCheck, handlekeySerialLength, handlekeyPcsScan, handlekeyEngCode,
        handlekeyPcsTray, handlekeyRevision, handlekeySerialFormat, handleselLaminationSide, handlekeySheetFormat, handlekeyShtScan, handlekeyShtLaser, handlekeyConfigWord, handlekeyConfigStart, handlekeyConfigEnd, handlekeyDupStart, handlekeyDupEnd,
        handlekeyAddInfo, handlekeyPassWord, handlekeyAbbr, handlekeySerialStartCode, handlekeyCheckPrdShtFrom, handlekeyCheckPrdShtTo, handlekeyCheckLotShtFrom, handlekeyCheckLotShtTo, handleselStatus, handleselCheckIC, handlekeyPlasmaTime, handlekeyStartSeqCode,
        handlekeyStartSeqDigitFrom, handlekeyStartSeqDigitTo, handlekeyVendorLotLength, handlekeyDateFromProc, handlekeyWeekCodeStart, handlekeyWeekCodeEnd, handlekeyLeafScan, handlekeyRollNoLength, handlekeyLeafNoLength, handlekeyCheckRollPrdFrom,
        handlekeyCheckRollPrdTo, handlekeyCheckRollPrdWord, handlekeyRollCheckPrdLeafFrom, handlekeyRollCheckPrdLeafTo, handlekeyRollCheckLotLeafFrom, handlekeyRollCheckLotLeafTo, handlekeyProcControlTime, handlekeyFinInspectProc, handlekeyShtPlasmaTime,
        handlekeyBarcodeGrade, handlekeyUpdateBy, handlekeyUpdateDate, chk_DelFlgCheckChanged, btnSubmitClick, ErrorPrdNameMessage, lblMessage, lblMessageColor, ErrorShtLot, ErrorShtLotMessage, ErrorPcsSht, ErrorPcsShtMessage, ErrorShtScan, ErrorShtScanMessage,
        ErrorShtLaser, ErrorShtLaserMessage, ErrorConfigWord, ErrorConfigWordMessage, ErrorConfigStart, ErrorConfigStartMessage, ErrorConfigEnd, ErrorConfigEndMessage, ErrorDupStart, ErrorDupStartMessage, ErrorDupEnd, ErrorDupEndMessage, ErrorCheckPrdShtFrom,
        ErrorCheckPrdShtFromMessage, ErrorCheckPrdShtTo, ErrorCheckPrdShtToMessage, ErrorCheckLotShtFrom, ErrorCheckLotShtFromMessage, ErrorCheckLotShtTo, ErrorCheckLotShtToMessage, ErrorPlasmaTime, ErrorPlasmaTimeMessage, ErrorStartSeqCode, ErrorStartSeqCodeMessage,
        ErrorStartSeqDigitFrom, ErrorStartSeqDigitFromMessage, ErrorStartSeqDigitTo, ErrorStartSeqDigitToMessage, ErrorVendorLotLength, ErrorVendorLotLengthMessage, ErrorRollNoLength, ErrorRollNoLengthMessage, ErrorLeafNoLength, ErrorLeafNoLengthMessage, ErrorLeafScan,
        ErrorLeafScanMessage, ErrorCheckRollPrdFrom, ErrorCheckRollPrdFromMessage, ErrorCheckRollPrdTo, ErrorCheckRollPrdToMessage, ErrorCheckRollPrdWord, ErrorCheckRollPrdWordMessage, ErrorRollCheckPrdLeafFrom, ErrorRollCheckPrdLeafFromMessage, ErrorRollCheckPrdLeafTo,
        ErrorRollCheckPrdLeafToMessage, ErrorRollCheckLotLeafFrom, ErrorRollCheckLotLeafFromMessage, ErrorRollCheckLotLeafTo, ErrorRollCheckLotLeafToMessage, ErrorDateFromProc, ErrorDateFromProcMessage, ErrorWeekCodeStart, ErrorWeekCodeStartMessage, ErrorWeekCodeEnd,
        ErrorWeekCodeEndMessage, ErrorProcControlTime, ErrorProcControlTimeMessage, ErrorShtPlasmaTime, ErrorShtPlasmaTimeMessage, ErrorFinInspectProc, ErrorFinInspectProcMessage, ErrorselSheetType, ErrorselSheetTypeMessage, ErrorselDateType, ErrorselDateTypeMessage,
        ErrorEngCode, ErrorEngCodeMessage, ErrorRevision, ErrorRevisionMessage, ErrorPcsTray, ErrorPcsTrayMessage, ErrorPcsScan, ErrorPcsScanMessage, ErrorChkStartDig, ErrorChkStartDigMessage, ErrorChkEndDig, ErrorChkEndDigMessage, ErrorChkWord, ErrorChkWordMessage,
        ErrorSerialLength, ErrorSerialLengthMessage, ErrorSerialFormat, ErrorSerialFormatMessage, ErrorLaminationSide, ErrorLaminationSideMessage, ErrorPassWord, ErrorPassWordMessage, pnlMessage, ConnShtReqProductFlg, setConnShtReqProductFlg, ConnShtDuplicateFlg, 
        setConnShtDuplicateFlg

    } = fn_ProductMaster();

    return (
        <div>
            <Header />
            <Card
                component={Paper}
                className="Card-Common"
                sx={{
                    display: "flex",
                    width: "1470px",
                    flexDirection: "column"
                }}
            >
                {pnlMessage && (
                    <Paper
                        className="lblMessage"
                        elevation={1}
                        style={{
                            background: lblMessageColor,
                            textAlign: "center",
                            marginBottom: "5px"
                        }}
                    >
                        <Typography
                            variant="h6"
                            style={{ color: "#fff" }}
                        >
                            {lblMessage}
                        </Typography>
                    </Paper>
                )}

                <Box justifyContent="space-between"
                    sx={{
                        textAlign: "center",
                        marginRight: "0px",
                        width: "100%",
                    }}
                >
                    <TableContainer
                        style={{
                            height: "auto",
                        }}
                    >
                        <Table className="TbProductMst"
                            sx={{
                                '& .MuiTableHead-root': {
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,
                                    background: 'white',
                                },
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <Typography style={{fontSize: "24px"}}>
                                            Product Master
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow className="specialrow">
                                    <TableCell>
                                        <Typography>Product Name :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            fullWidth
                                            style={{
                                                width: "420px",
                                            }}
                                            value={txtProduct.toUpperCase()}
                                            onChange={handleKeyProductName}
                                            error={ErrorPrdName}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    btnRetriveClick();
                                                    document.getElementById("ChkStartDig").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            type="primary"
                                            //className="RetriveBtn"
                                            icon={<SearchOutlined />}
                                            onClick={btnRetriveClick}
                                        >
                                            Search
                                        </Button>
                                    </TableCell>
                                    <TableCell style={{ width: "420px" }}>

                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorPrdNameMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Update Count :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="upcount"
                                            size="small"
                                            fullWidth
                                            value={txtUpdateCount}
                                            onChange={handleKeyUpdateCount}
                                            InputProps={{
                                                readOnly: true,
                                                style: { backgroundColor: '#e0e0e0' },
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Check Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="ChkStartDig"
                                            size="small"
                                            value={txtChkStartDig}
                                            fullWidth
                                            style={{
                                                backgroundColor: "#fff"
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handleKeyCheckDigitFrom(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("shtlot").focus();
                                                }
                                            }}
                                            error={ErrorChkStartDig}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorChkStartDigMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Sheet/Lot :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="shtlot"
                                            size="small"
                                            fullWidth
                                            value={txtShtLot}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 5) { // ตรวจสอบให้รับเฉพาะตัวเลขและ 5 digit
                                                    handleKeyShtLot(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("ChkEndDig").focus();
                                                }
                                            }}
                                            error={ErrorShtLot}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Check Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="ChkEndDig"
                                            size="small"
                                            fullWidth
                                            value={txtChkEndDig}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handleKeyCheckDigitTo(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("PcsSht").focus();
                                                }
                                            }}
                                            error={ErrorChkEndDig}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorShtLotMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorChkEndDigMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Pcs/Sheet :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="PcsSht"
                                            size="small"
                                            fullWidth
                                            value={txtPcsSht}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 4) {
                                                    handleKeyPcsSht(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("ChkWord").focus();
                                                }
                                            }}
                                            error={ErrorPcsSht}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Check Word :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="ChkWord"
                                            size="small"
                                            fullWidth
                                            value={txtChkWord.toUpperCase()}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length <= 15) {
                                                    handleKeyCheckWord(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("selectSheetType").focus();
                                                }
                                            }}
                                            error={ErrorChkWord}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorPcsShtMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorChkWordMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Sheet Type :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            className="Select_dropDown"
                                            id="selectSheetType"
                                            value={selSheetType}
                                            onChange={(e, value) => handleselSheettype(value)}
                                            options={["", "S", "D"]}
                                            getOptionLabel={(option) => {
                                                if (option === "S") return "Single";
                                                if (option === "D") return "Double";
                                                return "";
                                            }}
                                            isOptionEqualToValue={(option, value) => option === value}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    sx={{ textAlign: "left", backgroundColor: "#fff" }}
                                                    error={ErrorselSheetType}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            document.getElementById("SerialLength").focus();
                                                        }
                                                    }}
                                                />
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Serial Length :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="SerialLength"
                                            size="small"
                                            fullWidth
                                            value={txtSerialLength}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 3) {
                                                    handlekeySerialLength(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("selectDateType").focus();
                                                }
                                            }}
                                            error={ErrorSerialLength}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorselSheetTypeMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorSerialLengthMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Serial Date Type :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            className="Select_dropDown"
                                            id="selectDateType"
                                            value={selDateType}
                                            onChange={(e, value) => selDateTypeselChanged(value)}
                                            options={["", "Y", "W", "R", "J", "B", "I", "M", "N", "U", "C", "S", "D", "O"]}
                                            getOptionLabel={(option) => {
                                                if (option === "Y") return "year+week+day";
                                                if (option === "W") return "week+lot";
                                                if (option === "R") return "year+week+day(Rev.1)";
                                                if (option === "J") return "Juliet";
                                                if (option === "B") return "Blueway";
                                                if (option === "I") return "Icefish";
                                                if (option === "M") return "year+week+day+mat";
                                                if (option === "N") return "year 2022(since 1970)";
                                                if (option === "U") return "Uflext";
                                                if (option === "C") return "Arc";
                                                if (option === "S") return "Shipping2D";
                                                if (option === "D") return "Date diff";
                                                if (option === "O") return "year 2024(since 1970)";
                                                return "";
                                            }}
                                            isOptionEqualToValue={(option, value) => option === value}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    sx={{ textAlign: "left", backgroundColor: "#fff" }}
                                                    error={ErrorselDateType}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            document.getElementById("PcsScan").focus();
                                                        }
                                                    }}
                                                />
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Pcs/Scan (Shipping tray) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="PcsScan"
                                            size="small"
                                            fullWidth
                                            value={txtPcsScan}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 3) {
                                                    handlekeyPcsScan(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("EngCode").focus();
                                                }
                                            }}
                                            error={ErrorPcsScan}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorselDateTypeMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorPcsScanMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Serial Engineer Code :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="EngCode"
                                            size="small"
                                            fullWidth
                                            value={txtEngCode.toUpperCase()}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length <= 10) {
                                                    handlekeyEngCode(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("PcsTray").focus();
                                                }
                                            }}
                                            error={ErrorEngCode}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Pcs/Scan (In process tray) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="PcsTray"
                                            size="small"
                                            fullWidth
                                            value={txtPcsTray}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 3) {
                                                    handlekeyPcsTray(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("Revision").focus();
                                                }
                                            }}
                                            error={ErrorPcsTray}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorEngCodeMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorPcsTrayMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Serial Revision :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="Revision"
                                            size="small"
                                            fullWidth
                                            value={txtRevision.toUpperCase()}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length <= 1) {
                                                    handlekeyRevision(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("SerialFormat").focus();
                                                }
                                            }}
                                            error={ErrorRevision}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Serial btw Name :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="SerialFormat"
                                            size="small"
                                            fullWidth
                                            value={txtSerialFormat}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length <= 50) {
                                                    handlekeySerialFormat(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("selectLaminationSide").focus();
                                                }
                                            }}
                                            error={ErrorSerialFormat}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorRevisionMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorSerialFormatMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Lamination Side :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            className="Select_dropDown"
                                            id="selectLaminationSide"
                                            value={selLaminationSide}
                                            onChange={(e, value) => handleselLaminationSide(value)}
                                            options={["", "F", "B"]}
                                            getOptionLabel={(option) => {
                                                if (option === "F") return "F";
                                                if (option === "B") return "B";
                                                return "";
                                            }}
                                            isOptionEqualToValue={(option, value) => option === value}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    sx={{ textAlign: "left", backgroundColor: "#fff" }}
                                                    error={ErrorLaminationSide}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            document.getElementById("SheetFormat").focus();
                                                        }
                                                    }}
                                                />
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Sheet btw Name :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="SheetFormat"
                                            size="small"
                                            fullWidth
                                            value={txtSheetFormat}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length <= 50) {
                                                    handlekeySheetFormat(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("ShtScan").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorLaminationSideMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Sheet/Scan :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="ShtScan"
                                            size="small"
                                            fullWidth
                                            value={txtShtScan}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 3) {
                                                    handlekeyShtScan(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("ShtLaser").focus();
                                                }
                                            }}
                                            error={ErrorShtScan}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Sheet/Laser :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="ShtLaser"
                                            size="small"
                                            fullWidth
                                            value={txtShtLaser}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 3) {
                                                    handlekeyShtLaser(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("checkboxReqLots").focus();
                                                }
                                            }}
                                            error={ErrorShtLaser}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorShtScanMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorShtLaserMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Req. Lot :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="checkboxReqLots"
                                            style={{ padding: "0" }}
                                            checked={ReqLotCheck}
                                            onChange={(e) => setReqLotCheck(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("checkboxVendorCheck").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Req. Vendor Code :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="checkboxVendorCheck"
                                            style={{ padding: "0" }}
                                            disabled={cbxReqVendorDisabled}
                                            checked={ReqVendorCheck}
                                            onChange={(e) => setReqVendorCheck(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("checkboxReqConfigCheck").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                </TableRow>

                                <TableRow className="group-con">
                                    <TableCell>
                                        <Typography>Req. Config :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="checkboxReqConfigCheck"
                                            style={{ padding: "0" }}
                                            checked={ReqConfigCheck}
                                            onChange={ReqConfigCheckChanged}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    if (ReqConfigCheck) {
                                                        document.getElementById("ConfigWord").focus();
                                                    } else {
                                                        document.getElementById("DupStart").focus();
                                                    }
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Config. Word :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="ConfigWord"
                                            size="small"
                                            fullWidth
                                            value={txtConfigWord.toUpperCase()}
                                            disabled={txtConfigWordDisabled}
                                            style={{
                                                backgroundColor: txtConfigWordDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length <= 5) {
                                                    handlekeyConfigWord(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("ConfigStart").focus();
                                                }
                                            }}
                                            error={ErrorConfigWord}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorConfigWordMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="group-con">
                                    <TableCell>
                                        <Typography>Config. Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="ConfigStart"
                                            size="small"
                                            fullWidth
                                            value={txtConfigStart}
                                            disabled={txtConfigStartDisabled}
                                            style={{
                                                backgroundColor: txtConfigStartDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 3) {
                                                    handlekeyConfigStart(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("ConfigEnd").focus();
                                                }
                                            }}
                                            error={ErrorConfigStart}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Config. Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="ConfigEnd"
                                            size="small"
                                            fullWidth
                                            value={txtConfigEnd}
                                            disabled={txtConfigEndDisabled}
                                            style={{
                                                backgroundColor: txtConfigEndDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 3) {
                                                    handlekeyConfigEnd(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("checkboxConfigRunCheck").focus();
                                                }
                                            }}
                                            error={ErrorConfigEnd}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorConfigStartMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorConfigEndMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="group-con">
                                    <TableCell>
                                        <Typography>Req. Config Running :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="checkboxConfigRunCheck"
                                            style={{ padding: "0" }}
                                            disabled={cbxReqConfigRunDisabled}
                                            checked={ReqConfigRunCheck}
                                            onChange={(e) => setReqConfigRunCheck(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("DupStart").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Check Dup. Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="DupStart"
                                            size="small"
                                            fullWidth
                                            value={txtDupStart}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 3) {
                                                    handlekeyDupStart(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("DupEnd").focus();
                                                }
                                            }}
                                            error={ErrorDupStart}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Check Dup. Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="DupEnd"
                                            size="small"
                                            fullWidth
                                            value={txtDupEnd}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 3) {
                                                    handlekeyDupEnd(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("AddInfo").focus();
                                                }
                                            }}
                                            error={ErrorDupEnd}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorDupStartMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorDupEndMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Addition Info. :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            className="input_txt"
                                            id="AddInfo"
                                            size="small"
                                            fullWidth
                                            value={txtAddInfo.toUpperCase()}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length <= 80) {
                                                    handlekeyAddInfo(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("Abbr").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    {visiblePassWord && (
                                        <TableCell>
                                            <Typography>PASSWORD :</Typography>
                                        </TableCell>
                                    )}
                                    {visibletxtPassWord && (
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                id="PassWord"
                                                size="small"
                                                fullWidth
                                                value={txtPassWord}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value.length <= 50) {
                                                        handlekeyPassWord(e);
                                                    }
                                                }}
                                                error={ErrorPassWord}
                                            />
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        <Typography>Abbreviation :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="Abbr"
                                            size="small"
                                            fullWidth
                                            value={txtAbbr.toUpperCase()}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length <= 50) {
                                                    handlekeyAbbr(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("SerialStartCode").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Serial Start Code :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="SerialStartCode"
                                            size="small"
                                            fullWidth
                                            value={txtSerialStartCode.toUpperCase()}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length <= 10) {
                                                    handlekeySerialStartCode(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    if (ReqCheckPrdShtCheck) {
                                                        document.getElementById("CheckPrdShtFrom").focus();
                                                    } else {
                                                        document.getElementById("CheckReqCheckPrdShtCheck").focus();
                                                    }
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorPassWordMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>

                                <TableRow className="group">
                                    <TableCell>
                                        <Typography>Req. Check Sheet PRD. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            id="CheckReqCheckPrdShtCheck"
                                            size="small"
                                            checked={ReqCheckPrdShtCheck}
                                            disabled={cbxReqCheckPrdShtDisabled}
                                            style={{
                                                padding: "0",
                                            }}
                                            onChange={ReqCheckPrdShtCheckChanged}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    if (ReqCheckPrdShtCheck) {
                                                        document.getElementById("CheckPrdShtFrom").focus();
                                                    }
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="group">
                                    <TableCell>
                                        <Typography>Sheet PRD. Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="CheckPrdShtFrom"
                                            size="small"
                                            fullWidth
                                            value={txtCheckPrdShtFrom}
                                            disabled={txtCheckPrdShtDisabled}
                                            style={{
                                                backgroundColor: txtCheckPrdShtDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyCheckPrdShtFrom(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("CheckPrdShtTo").focus();
                                                }
                                            }}
                                            error={ErrorCheckPrdShtFrom}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Sheet PRD. Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="CheckPrdShtTo"
                                            size="small"
                                            fullWidth
                                            value={txtCheckPrdShtTo}
                                            disabled={txtCheckPrdShtToDisabled}
                                            style={{
                                                backgroundColor: txtCheckPrdShtToDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyCheckPrdShtTo(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("rbtsel").focus();
                                                }
                                            }}
                                            error={ErrorCheckPrdShtTo}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorCheckPrdShtFromMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorCheckPrdShtToMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Sheet Control By :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={rbtselLotRoll}
                                            onChange={handlerbtLotRollChange}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("checkboxLotSht").focus();
                                                }
                                            }}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 19,
                                                            },
                                                        }}
                                                        value="rbtLotCheck"
                                                        id="rbtsel"
                                                    />
                                                }
                                                label="Lot"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 19,
                                                            },
                                                        }}
                                                        value="rbtRollCheck"
                                                        id="rbtsel"
                                                    />
                                                }
                                                label="Roll"
                                                sx={{ marginLeft: 5 }}
                                            />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="group-con">
                                    <TableCell>
                                        <Typography>Check Sheet Lot :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="checkboxLotSht"
                                            style={{ padding: "0" }}
                                            checked={ReqCheckLotShtCheck}
                                            onChange={ReqCheckLotShtCheckChanged}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    if (ReqCheckLotShtCheck) {
                                                        document.getElementById("CheckLotShtFrom").focus();
                                                    } else {
                                                        document.getElementById("selectStatus").focus();
                                                    }
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="group-con">
                                    <TableCell>
                                        <Typography>Sheet Lot Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="CheckLotShtFrom"
                                            size="small"
                                            fullWidth
                                            value={txtCheckLotShtFrom}
                                            disabled={txtCheckLotShtFromDisabled}
                                            style={{
                                                backgroundColor: txtCheckLotShtFromDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyCheckLotShtFrom(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("CheckLotShtTo").focus();
                                                }
                                            }}
                                            error={ErrorCheckLotShtFrom}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Sheet Lot Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="CheckLotShtTo"
                                            size="small"
                                            fullWidth
                                            value={txtCheckLotShtTo}
                                            disabled={txtCheckLotShtToDisabled}
                                            style={{
                                                backgroundColor: txtCheckLotShtToDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyCheckLotShtTo(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("selectStatus").focus();
                                                }
                                            }}
                                            error={ErrorCheckLotShtTo}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorCheckLotShtFromMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorCheckLotShtToMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Final Gate Status :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            className="Select_dropDown"
                                            id="selectStatus"
                                            value={selStatus}
                                            onChange={(e, value) => handleselStatus(value)}
                                            options={["ACTIVE", "INACTIVE"]}
                                            getOptionLabel={(option) => option}
                                            isOptionEqualToValue={(option, value) => option === value}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    sx={{ textAlign: "left" }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            document.getElementById("checkboxReqControlPlasma").focus();
                                                        }
                                                    }}
                                                />
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Check Double IC :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            id="selectProductMst"
                                            value={selCheckIC}
                                            onChange={(e, value) => handleselCheckIC(value)}
                                            disabled={selCheckIC === "N"}
                                            style={{
                                                backgroundColor: selCheckIC === "N" ? "#e0e0e0" : "#fff",
                                            }}
                                            options={["N", "Y"]}
                                            getOptionLabel={(option) => (option === "N" ? "No" : "Yes")}
                                            isOptionEqualToValue={(option, value) => option === value}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    sx={{ textAlign: "left" }}
                                                />
                                            )}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="group">
                                    <TableCell>
                                        <Typography>Pcs Control Plasma Time :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="checkboxReqControlPlasma"
                                            style={{ padding: "0" }}
                                            checked={ReqControlPlasmaCheck}
                                            onChange={ReqControlPlasmaCheckChanged}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    if (ReqControlPlasmaCheck) {
                                                        document.getElementById("PlasmaTime").focus();
                                                    } else {
                                                        document.getElementById("checkboxReqSt").focus();
                                                    }
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Pcs Control Plasma Time (Hrs.) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="PlasmaTime"
                                            size="small"
                                            fullWidth
                                            value={txtPlasmaTime}
                                            disabled={txtPlasmaTimeDisabled}
                                            style={{
                                                backgroundColor: txtPlasmaTimeDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 5) {
                                                    handlekeyPlasmaTime(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("rbtPlas").focus();
                                                }
                                            }}
                                            error={ErrorPlasmaTime}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorPlasmaTimeMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="group">
                                    <TableCell>
                                        <Typography>Record PDS Time By :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={rbtPlasmaTime}
                                            onChange={handlerbtPlasmaTimeChange}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("checkboxReqUpdate").focus();
                                                }
                                            }}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 19,
                                                            },
                                                        }}
                                                        id="rbtPlas"
                                                        value="rbtPlasmaTimePCSCheck"
                                                        disabled={rbtPlasmaTimePCSDisabled}
                                                    />
                                                }
                                                label="Piece"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 19,
                                                            },
                                                            padding: 0.5,
                                                        }}
                                                        disabled={rbtPlasmaTimeSHTDisabled}
                                                        value="rbtPlasmaTimeSHTCheck"
                                                    />
                                                }
                                                label="Sheet"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 19,
                                                            },
                                                            padding: 0.5,
                                                        }}
                                                        disabled={rbtPlasmaTimeGRPDisabled}
                                                        value="rbtPlasmaTimeGRPCheck"
                                                    />
                                                }
                                                label="Group"
                                            />
                                        </RadioGroup>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Req. Update Time After PDS :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="checkboxReqUpdate"
                                            style={{
                                                padding: "0",
                                            }}
                                            disabled={cbxReqUpdatePlasmaDisabled}
                                            checked={ReqUpdatePlasmaCheck}
                                            onChange={(e) => setReqUpdatePlasmaCheck(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("checkboxNotapply").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="group">
                                    <TableCell>
                                        <Typography>Not apply start PDS Time from ELT :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="checkboxNotapply"
                                            style={{
                                                padding: "0",
                                            }}
                                            disabled={cbxPlasmaNotStartELTDisabled}
                                            checked={PlasmaNotStartELTCheck}
                                            onChange={(e) => setPlasmaNotStartELTCheck(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("checkboxNotshow").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Not show PDS Time :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="checkboxNotshow"
                                            style={{
                                                padding: "0",
                                            }}
                                            disabled={cbxPlasmaNotShowTimeDisabled}
                                            checked={PlasmaNotShowTimeCheck}
                                            onChange={(e) => setPlasmaNotShowTimeCheck(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("checkboxReqSt").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="group-con">
                                    <TableCell>
                                        <Typography>Req. Start Seq. Code :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="checkboxReqSt"
                                            style={{ padding: "0" }}
                                            disabled={cbxReqStartSeqCodeDisabled}
                                            checked={ReqStartSeqCodeCheck}
                                            onChange={ReqStartSeqCodeCheckChanged}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    if (ReqStartSeqCodeCheck) {
                                                        document.getElementById("StartSeqCode").focus();
                                                    } else {
                                                        document.getElementById("cbxReqSheetELT").focus();
                                                    }
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Start Seq. Code :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="StartSeqCode"
                                            size="small"
                                            fullWidth
                                            value={txtStartSeqCode.toUpperCase()}
                                            disabled={txtStartSeqCodeDisabled}
                                            style={{
                                                backgroundColor: txtStartSeqCodeDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^[A-Za-z]*$/.test(value) && value.length <= 3) {
                                                    handlekeyStartSeqCode(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("StartSeqDigitFrom").focus();
                                                }
                                            }}
                                            error={ErrorStartSeqCode}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorStartSeqCodeMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="group-con">
                                    <TableCell>
                                        <Typography>Start Seq. Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="StartSeqDigitFrom"
                                            size="small"
                                            fullWidth
                                            value={txtStartSeqDigitFrom}
                                            disabled={txtStartSeqDigitFromDisabled}
                                            style={{
                                                backgroundColor: txtStartSeqDigitFromDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyStartSeqDigitFrom(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("StartSeqDigitTo").focus();
                                                }
                                            }}
                                            error={ErrorStartSeqDigitFrom}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Start Seq. Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="StartSeqDigitTo"
                                            size="small"
                                            fullWidth
                                            value={txtStartSeqDigitTo}
                                            disabled={txtStartSeqDigitToDisabled}
                                            style={{
                                                backgroundColor: txtStartSeqDigitToDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyStartSeqDigitTo(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxReqSheetELT").focus();
                                                }
                                            }}
                                            error={ErrorStartSeqDigitTo}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorStartSeqDigitFromMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorStartSeqDigitToMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Req. Sheet ELT :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqSheetELT"
                                            style={{ padding: "0" }}
                                            checked={ReqShtELTCheck}
                                            onChange={(e) => setReqShtELTCheck(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxReqSPIAOI").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Final Gate Req. SPI,Reflow,AOI,XRay :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqSPIAOI"
                                            style={{ padding: "0" }}
                                            checked={ReqSPIAOICheck}
                                            onChange={(e) => setReqSPIAOICheck(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxReqVendorLot").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="group">
                                    <TableCell>
                                        <Typography>Serial Req. Vendor Lot :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqVendorLot"
                                            style={{ padding: "0" }}
                                            checked={ReqVendorLotCheck}
                                            onChange={ReqVendorLotCheckChanged}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    if (ReqVendorLotCheck) {
                                                        document.getElementById("VendorLotLength").focus();
                                                    } else {
                                                        document.getElementById("cbxReqDateProc").focus();
                                                    }
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Vendor Lot Length :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="VendorLotLength"
                                            size="small"
                                            fullWidth
                                            value={txtVendorLotLength}
                                            disabled={txtVendorLotLengthDisabled}
                                            style={{
                                                backgroundColor: txtVendorLotLengthDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyVendorLotLength(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxReqDateProc").focus();
                                                }
                                            }}
                                            error={ErrorVendorLotLength}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorVendorLotLengthMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="group-con">
                                    <TableCell>
                                        <Typography>Req. Date by Process :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqDateProc"
                                            style={{ padding: "0" }}
                                            checked={ReqDateProcCheck}
                                            onChange={ReqDateProcCheckChanged}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    if (ReqDateProcCheck) {
                                                        document.getElementById("DateFromProc").focus();
                                                    } else {
                                                        document.getElementById("cbxReqSheetMC").focus(); //เผื่อแก้
                                                    }
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Date From Process :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="DateFromProc"
                                            size="small"
                                            fullWidth
                                            value={txtDateFromProc.toUpperCase()}
                                            disabled={txtDateFromProcDisabled}
                                            style={{
                                                backgroundColor: txtDateFromProcDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length <= 15) {
                                                    handlekeyDateFromProc(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxReqCheckWeekCode").focus();
                                                }
                                            }}
                                            error={ErrorDateFromProc}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorDateFromProcMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="group-c1">
                                    <TableCell>
                                        <Typography>Req. Check Week Code :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqCheckWeekCode"
                                            style={{ padding: "0" }}
                                            disabled={cbxReqCheckWeekCodeDisabled}
                                            checked={ReqCheckWeekCodeCheck}
                                            onChange={ReqCheckWeekCodeCheckChanged}
                                            onKeyDown={(e) => {
                                                if (ReqCheckWeekCodeCheck) {
                                                    document.getElementById("WeekCodeStart").focus();
                                                } else {
                                                    document.getElementById("cbxReqSheetMC").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="group-con">
                                    <TableCell>
                                        <Typography>Week Code Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="WeekCodeStart"
                                            size="small"
                                            fullWidth
                                            value={txtWeekCodeStart}
                                            disabled={txtWeekCodeStartDisabled}
                                            style={{
                                                backgroundColor: txtWeekCodeStartDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyWeekCodeStart(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("WeekCodeEnd").focus();
                                                }
                                            }}
                                            error={ErrorWeekCodeStart}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Week Code Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="WeekCodeEnd"
                                            size="small"
                                            fullWidth
                                            value={txtWeekCodeEnd}
                                            disabled={txtWeekCodeEndDisabled}
                                            style={{
                                                backgroundColor: txtWeekCodeEndDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyWeekCodeEnd(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxReqSheetMC").focus();
                                                }
                                            }}
                                            error={ErrorWeekCodeEnd}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorWeekCodeStartMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorWeekCodeEndMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Req. Connect Machine :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqSheetMC"
                                            style={{ padding: "0" }}
                                            checked={ReqSheetMCCheck}
                                            onChange={(e) => setReqSheetMCCheck(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxReqConRollLeaf").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="group">
                                    <TableCell>
                                        <Typography>Req. Connect Roll & Leaf :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqConRollLeaf"
                                            style={{ padding: "0" }}
                                            checked={ReqConRollLeafCheck}
                                            onChange={ReqConnectRollCheckChanged}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    if (ReqConRollLeafCheck) {
                                                        document.getElementById("LeafScan").focus();
                                                    } else {
                                                        document.getElementById("cbxReqConShtPcsRoll").focus();
                                                    }
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Leaf/Scan :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="LeafScan"
                                            size="small"
                                            fullWidth
                                            value={txtLeafScan}
                                            disabled={txtLeafScanDisabled}
                                            style={{
                                                backgroundColor: txtLeafScanDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyLeafScan(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("RollNoLength").focus();
                                                }
                                            }}
                                            error={ErrorLeafScan}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorLeafScanMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="group">
                                    <TableCell>
                                        <Typography>Roll No. Length :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="RollNoLength"
                                            size="small"
                                            fullWidth
                                            value={txtRollNoLength}
                                            disabled={txtRollNoLengthDisabled}
                                            style={{
                                                backgroundColor: txtRollNoLengthDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyRollNoLength(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("LeafNoLength").focus();
                                                }
                                            }}
                                            error={ErrorRollNoLength}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Leaf No. Length :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="LeafNoLength"
                                            size="small"
                                            fullWidth
                                            value={txtLeafNoLength}
                                            disabled={txtLeafNoLengthDisabled}
                                            style={{
                                                backgroundColor: txtLeafNoLengthDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyLeafNoLength(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxLeafReqSerial").focus();
                                                }
                                            }}
                                            error={ErrorLeafNoLength}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorRollNoLengthMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorLeafNoLengthMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="group">
                                    <TableCell>
                                        <Typography>Leaf Req. Serial Condition :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxLeafReqSerial"
                                            style={{ padding: "0" }}
                                            disabled={cbxLeafReqSerialDisabled}
                                            checked={LeafReqSerialCheck}
                                            onChange={(e) => setLeafReqSerialCheck(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxReqCheckPrdRoll").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Req Check Roll PRD. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqCheckPrdRoll"
                                            style={{ padding: "0" }}
                                            disabled={cbxReqCheckPrdRollDisabled}
                                            checked={ReqCheckPrdRollCheck}
                                            onChange={ReqCheckPrdRollCheckChanged}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    if (ReqCheckPrdRollCheck) {
                                                        document.getElementById("CheckRollPrdFrom").focus();
                                                    } else {
                                                        document.getElementById("cbxRollReqCheckPrdLeaf").focus();
                                                    }
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="group">
                                    <TableCell>
                                        <Typography>Roll PRD. Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="CheckRollPrdFrom"
                                            size="small"
                                            fullWidth
                                            value={txtCheckRollPrdFrom}
                                            disabled={txtCheckRollPrdFromDisabled}
                                            style={{
                                                backgroundColor: txtCheckRollPrdFromDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyCheckRollPrdFrom(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("CheckRollPrdTo").focus();
                                                }
                                            }}
                                            error={ErrorCheckRollPrdFrom}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Roll PRD. Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="CheckRollPrdTo"
                                            size="small"
                                            fullWidth
                                            value={txtCheckRollPrdTo}
                                            disabled={txtCheckRollPrdToDisabled}
                                            style={{
                                                backgroundColor: txtCheckRollPrdToDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyCheckRollPrdTo(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("CheckRollPrdWord").focus();
                                                }
                                            }}
                                            error={ErrorCheckRollPrdTo}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorCheckRollPrdFromMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorCheckRollPrdToMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="group">
                                    <TableCell>
                                        <Typography>Roll Check PRD. Word :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="CheckRollPrdWord"
                                            size="small"
                                            fullWidth
                                            value={txtCheckRollPrdWord.toUpperCase()}
                                            disabled={txtCheckRollPrdWordDisabled}
                                            style={{
                                                backgroundColor: txtCheckRollPrdWordDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length <= 10) {
                                                    handlekeyCheckRollPrdWord(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxRollReqCheckPrdLeaf").focus();
                                                }
                                            }}
                                            error={ErrorCheckRollPrdWord}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Req. Check Leaf PRD :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxRollReqCheckPrdLeaf"
                                            style={{ padding: "0" }}
                                            disabled={cbxRollReqCheckPrdLeafDisabled}
                                            checked={RollReqCheckPrdLeafCheck}
                                            onChange={RollReqCheckPrdLeafCheckChanged}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    if (RollReqCheckPrdLeafCheck) {
                                                        document.getElementById("RollCheckPrdLeafFrom").focus();
                                                    } else {
                                                        document.getElementById("cbxRollReqCheckLotLeaf").focus();
                                                    }
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorCheckRollPrdWordMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>

                                <TableRow className="group">
                                    <TableCell>
                                        <Typography>Leaf PRD. Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="RollCheckPrdLeafFrom"
                                            size="small"
                                            fullWidth
                                            value={txtRollCheckPrdLeafFrom}
                                            disabled={txtRollCheckPrdLeafFromDisabled}
                                            style={{
                                                backgroundColor: txtRollCheckPrdLeafFromDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyRollCheckPrdLeafFrom(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("RollCheckPrdLeafTo").focus();
                                                }
                                            }}
                                            error={ErrorRollCheckPrdLeafFrom}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Leaf PRD. Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="RollCheckPrdLeafTo"
                                            size="small"
                                            fullWidth
                                            value={txtRollCheckPrdLeafTo}
                                            disabled={txtRollCheckPrdLeafToDisabled}
                                            style={{
                                                backgroundColor: txtRollCheckPrdLeafToDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyRollCheckPrdLeafTo(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxRollReqCheckLotLeaf").focus();
                                                }
                                            }}
                                            error={ErrorRollCheckPrdLeafTo}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorRollCheckPrdLeafFromMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorRollCheckPrdLeafToMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="group">
                                    <TableCell>
                                        <Typography>Req. Check Leaf Lot :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxRollReqCheckLotLeaf"
                                            style={{ padding: "0" }}
                                            disabled={cbxRollReqCheckLotLeafDisabled}
                                            checked={RollReqCheckLotLeafCheck}
                                            onChange={RollReqCheckLotLeafCheckChanged}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    if (RollReqCheckLotLeafCheck) {
                                                        document.getElementById("RollCheckLotLeafFrom").focus();
                                                    } else {
                                                        document.getElementById("cbxReqConShtPcsRoll").focus();
                                                    }
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    {/* <TableCell>
                                        <Typography>Leaf Lot Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="RollCheckLotLeafFrom"
                                            size="small"
                                            fullWidth
                                            value={txtRollCheckLotLeafFrom}
                                            disabled={txtRollCheckLotLeafFromDisabled}
                                            style={{
                                                backgroundColor: txtRollCheckLotLeafFromDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyRollCheckLotLeafFrom(e);
                                                }
                                            }}
                                            error={ErrorRollCheckLotLeafFrom}
                                        />
                                    </TableCell> */}
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                </TableRow>

                                <TableRow className="group">
                                    <TableCell>
                                        <Typography>Leaf Lot Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="RollCheckLotLeafFrom"
                                            size="small"
                                            fullWidth
                                            value={txtRollCheckLotLeafFrom}
                                            disabled={txtRollCheckLotLeafFromDisabled}
                                            style={{
                                                backgroundColor: txtRollCheckLotLeafFromDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyRollCheckLotLeafFrom(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("RollCheckLotLeafTo").focus();
                                                }
                                            }}
                                            error={ErrorRollCheckLotLeafFrom}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Leaf Lot Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="RollCheckLotLeafTo"
                                            size="small"
                                            fullWidth
                                            value={txtRollCheckLotLeafTo}
                                            disabled={txtRollCheckLotLeafToDisabled}
                                            style={{
                                                backgroundColor: txtRollCheckLotLeafToDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 2) {
                                                    handlekeyRollCheckLotLeafTo(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxReqConShtPcsRoll").focus();
                                                }
                                            }}
                                            error={ErrorRollCheckLotLeafTo}
                                        />
                                    </TableCell>
                                    {/* <TableCell>
                                        <Typography>Connect Sheet Req. Roll :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqConShtPcsRoll"
                                            style={{ padding: "0" }}
                                            checked={ReqConShtPcsRollCheck}
                                            onChange={(e) => setReqConShtPcsRollCheck(e.target.checked)}
                                        />
                                    </TableCell> */}
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorRollCheckLotLeafFromMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorRollCheckLotLeafToMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Connect Sheet Req. Roll :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqConShtPcsRoll"
                                            style={{ padding: "0" }}
                                            checked={ReqConShtPcsRollCheck}
                                            onChange={(e) => setReqConShtPcsRollCheck(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxReqPreAOIF").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Sheet Check PRE-AOI :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <FormGroup
                                            row
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0", marginLeft: "10px" }}
                                                        checked={ReqPreAOIFCheck}
                                                        onChange={(e) => setReqPreAOIFCheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxReqPreAOIB").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="F Side"
                                                id="cbxReqPreAOIF"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0" }}
                                                        checked={ReqPreAOIBCheck}
                                                        onChange={(e) => setReqPreAOIBCheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxReqAOIF").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="B Side"
                                                id="cbxReqPreAOIB"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Sheet Check AOI :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <FormGroup
                                            row
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0", marginLeft: "10px" }}
                                                        checked={ReqAOIFCheck}
                                                        onChange={(e) => setReqAOIFCheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxReqAOIB").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="F Side"
                                                id="cbxReqAOIF"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0" }}
                                                        checked={ReqAOIBCheck}
                                                        onChange={(e) => setReqAOIBCheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxReqSPIF").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="B Side"
                                                id="cbxReqAOIB"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Sheet Check SPI :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <FormGroup
                                            row
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0", marginLeft: "10px" }}
                                                        checked={ReqSPIFCheck}
                                                        onChange={(e) => setReqSPIFCheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxReqSPIB").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="F Side"
                                                id="cbxReqSPIF"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0" }}
                                                        checked={ReqSPIBCheck}
                                                        onChange={(e) => setReqSPIBCheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxReqAOICoatF").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="B Side"
                                                id="cbxReqSPIB"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Sheet Check AOI Coating :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <FormGroup
                                            row
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0", marginLeft: "10px" }}
                                                        checked={ReqAOICoatFCheck}
                                                        onChange={(e) => setReqAOICoatFCheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxReqAOICoatB").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="F Side"
                                                id="cbxReqAOICoatF"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0" }}
                                                        checked={ReqAOICoatBCheck}
                                                        onChange={(e) => setReqAOICoatBCheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxReqReflowF").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="B Side"
                                                id="cbxReqAOICoatB"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Sheet Check Reflow :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <FormGroup
                                            row
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0", marginLeft: "10px" }}
                                                        checked={ReqReflowFCheck}
                                                        onChange={(e) => setReqReflowFCheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxReqReflowB").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="F Side"
                                                id="cbxReqReflowF"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0" }}
                                                        checked={ReqReflowBCheck}
                                                        onChange={(e) => setReqReflowBCheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxReqXrayF").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="B Side"
                                                id="cbxReqReflowB"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Sheet Check Xray :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <FormGroup
                                            row
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0", marginLeft: "10px" }}
                                                        checked={ReqXrayFCheck}
                                                        onChange={(e) => setReqXrayFCheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxReqXrayB").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="F Side"
                                                id="cbxReqXrayF"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0" }}
                                                        checked={ReqXrayBCheck}
                                                        onChange={(e) => setReqXrayBCheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxReqXrayOneTime").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="B Side"
                                                id="cbxReqXrayB"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Check Xray Over 1 time :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqXrayOneTime"
                                            style={{ padding: "0" }}
                                            checked={ReqXrayOneTimeCheck}
                                            onChange={(e) => setReqXrayOneTimeCheck(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxReqProcControlTime").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="group-con">
                                    <TableCell>
                                        <Typography>Req. Process Control Time :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqProcControlTime"
                                            style={{ padding: "0" }}
                                            checked={ReqProcControlTimeCheck}
                                            onChange={ReqProcControlTimeCheckChanged}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    if (ReqProcControlTimeCheck) {
                                                        document.getElementById("ProcControlTime").focus();
                                                    } else {
                                                        document.getElementById("cbxReqFinInspect").focus();
                                                    }
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Process Control Time (Hrs.) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="ProcControlTime"
                                            size="small"
                                            fullWidth
                                            value={txtProcControlTime}
                                            disabled={txtProcControlTimeDisabled}
                                            style={{
                                                backgroundColor: txtProcControlTimeDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 5) {
                                                    handlekeyProcControlTime(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxReqConnShtPcsTime").focus();
                                                }
                                            }}
                                            error={ErrorProcControlTime}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorProcControlTimeMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="group-c1">
                                    <TableCell>
                                        <Typography>Req. Include Connect Sht&Pcs Time :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqConnShtPcsTime"
                                            style={{
                                                padding: "0",
                                            }}
                                            disabled={cbxReqConnShtPcsTimeDisabled}
                                            checked={ReqConnShtPcsTimeCheck}
                                            onChange={(e) => setReqConnShtPcsTimeCheck(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxReqFinInspect").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="group">
                                    <TableCell>
                                        <Typography>Req. Final Inspection :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqFinInspect"
                                            style={{ padding: "0" }}
                                            checked={ReqFinInspectCheck}
                                            onChange={ReqFinInspectCheckChanged}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    if (ReqFinInspectCheck) {
                                                        document.getElementById("FinInspectProc").focus();
                                                    } else {
                                                        document.getElementById("cbxReqShtControlPlasma").focus();
                                                    }
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Req. Final Inspection Process :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="FinInspectProc"
                                            size="small"
                                            fullWidth
                                            value={txtFinInspectProc.toUpperCase()}
                                            disabled={txtFinInspectProcDisabled}
                                            style={{
                                                backgroundColor: txtFinInspectProcDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length <= 10) {
                                                    handlekeyFinInspectProc(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxReqShtControlPlasma").focus();
                                                }
                                            }}
                                            error={ErrorFinInspectProc}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorFinInspectProcMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="group-con">
                                    <TableCell>
                                        <Typography>Sheet Control Plasma Time :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqShtControlPlasma"
                                            style={{ padding: "0" }}
                                            checked={ReqShtControlPlasmaCheck}
                                            onChange={ReqShtControlPlasmaCheckChanged}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    if (ReqShtControlPlasmaCheck) {
                                                        document.getElementById("ShtPlasmaTime").focus();
                                                    } else {
                                                        document.getElementById("cbxPlasmaConnShtPcs").focus();
                                                    }
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Sheet Control Plasma Time (Hrs.) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="ShtPlasmaTime"
                                            size="small"
                                            fullWidth
                                            value={txtShtPlasmaTime}
                                            disabled={txtShtPlasmaTimeDisabled}
                                            style={{
                                                backgroundColor: txtShtPlasmaTimeDisabled ? "#e0e0e0" : "#fff",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 5) {
                                                    handlekeyShtPlasmaTime(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxPlasmaConnShtPcs").focus();
                                                }
                                            }}
                                            error={ErrorShtPlasmaTime}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorShtPlasmaTimeMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Combine Plasma Time&Connect Sht&Pcs :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxPlasmaConnShtPcs"
                                            style={{ padding: "0" }}
                                            checked={PlasmaConnShtPcsCheck}
                                            onChange={(e) => setPlasmaConnShtPcsCheck(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("BarcodeGrade").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Accept Barcode Grade :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="BarcodeGrade"
                                            size="small"
                                            fullWidth
                                            value={txtBarcodeGrade.toUpperCase()}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length <= 10) {
                                                    handlekeyBarcodeGrade(e);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxReqFinalPackingGroup").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Req. Final Gate Packing Group :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqFinalPackingGroup"
                                            style={{ padding: "0" }}
                                            checked={ReqFinalPackingGroupCheck}
                                            onChange={(e) => setReqFinalPackingGroupCheck(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxReqEFPCAOM").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Final Gate Req. EFPC: AOM,AOI,OST,AVI :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <FormGroup
                                            row
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0", marginLeft: "11px" }}
                                                        checked={ReqEFPCAOMCheck}
                                                        onChange={(e) => setReqEFPCAOMCheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxReqEFPCAOI").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="AOM-EFPC"
                                                id="cbxReqEFPCAOM"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0", marginLeft: "3px" }}
                                                        checked={ReqEFPCAOICheck}
                                                        onChange={(e) => setReqEFPCAOICheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxReqEFPCOST").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="AOI-EFPC"
                                                id="cbxReqEFPCAOI"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0", marginLeft: "3px" }}
                                                        checked={ReqEFPCOSTCheck}
                                                        onChange={(e) => setReqEFPCOSTCheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxReqEFPCAVI").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="OST-EFPC"
                                                id="cbxReqEFPCOST"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0", marginLeft: "3px" }}
                                                        checked={ReqEFPCAVICheck}
                                                        onChange={(e) => setReqEFPCAVICheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxConnShtReqBoardFlg").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="AVI-EFPC"
                                                id="cbxReqEFPCAVI"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Connect Sht&PCS Req Board No :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxConnShtReqBoardFlg"
                                            style={{ padding: "0" }}
                                            checked={ConnShtReqBoardFlg}
                                            onChange={(e) => setConnShtReqBoardFlg(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxAutoPressF").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Connect Sht&PCS Req Auto Press :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <FormGroup
                                            row
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0", marginLeft: "10px" }}
                                                        checked={AutoPressFCheck}
                                                        onChange={(e) => setAutoPressFCheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxAutoPressB").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="F Side"
                                                id="cbxAutoPressF"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        style={{ padding: "0" }}
                                                        checked={AutoPressBCheck}
                                                        onChange={(e) => setAutoPressBCheck(e.target.checked)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                document.getElementById("cbxConnShtserialstatusflg").focus();
                                                            }
                                                        }}
                                                    />
                                                }
                                                label="B Side"
                                                id="cbxAutoPressB"
                                            />
                                        </FormGroup>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Connect Sht&PCS Req Product Status :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxConnShtserialstatusflg"
                                            style={{ padding: "0" }}
                                            checked={ConnShtReqProductFlg}
                                            onChange={(e) => setConnShtReqProductFlg(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("cbxConnShtpcsduplicateflg").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Connect Sht&PCS Req. Duplicate S/N :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxConnShtpcsduplicateflg"
                                            style={{ padding: "0" }}
                                            checked={ConnShtDuplicateFlg}
                                            onChange={(e) => setConnShtDuplicateFlg(e.target.checked)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    btnSubmitClick();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Update By :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="UpdateBy"
                                            size="small"
                                            fullWidth
                                            value={txtUpdateBy}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{
                                                backgroundColor: "#e0e0e0",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length <= 30) {
                                                    handlekeyUpdateBy(e);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Update Date :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="UpdateDate"
                                            size="small"
                                            fullWidth
                                            value={txtUpdateDate}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{
                                                backgroundColor: "#e0e0e0",
                                            }}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value.length <= 30) {
                                                    handlekeyUpdateDate(e);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <FormControlLabel
                        sx={{ marginTop: "5px", color: "#ff4d4f" }}
                        control={
                            <Checkbox
                                size="small"
                                id="chk_DelFlg"
                                style={{
                                    padding: "0",
                                    color: "#ff4d4f"
                                }}
                                checked={chk_DelFlgCheck}
                                onChange={chk_DelFlgCheckChanged}
                            />
                        }
                        label="Delete Flag"
                    />
                    <Button
                        style={{
                            backgroundColor: "green",
                            width: "90px",
                            color: "white",
                            marginTop: "15px"
                        }}
                        onClick={btnSubmitClick}
                    >
                        Submit
                    </Button>
                </Box>
            </Card>
        </div>
    )
};

export default ProductMaster;