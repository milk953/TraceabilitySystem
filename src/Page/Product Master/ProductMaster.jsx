import React, { useState, useEffect } from "react";
import "../Product Master/Style.css";
// import "./master.css";
import Popup from "./ProductPopup.jsx";
import { Empty } from "antd";
import Hearder from "../Header/Header.jsx";
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
    Button,
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
import { fn_ProductMaster } from "./function_ProductMaster.jsx";
import * as XLSX from 'xlsx';

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
        ErrorSerialLength, ErrorSerialLengthMessage, ErrorSerialFormat, ErrorSerialFormatMessage, ErrorLaminationSide, ErrorLaminationSideMessage, ErrorPassWord, ErrorPassWordMessage, pnlMessage

    } = fn_ProductMaster();

    return (
        <div>
            <Hearder />
            <h1>Product Master</h1>
            <Card
                component={Paper}
                style={{
                    margin: "auto",
                    width: "93%",
                    maxWidth: "1380px",
                    marginTop: "30px",
                    height: "auto",
                    maxHeight: "3000px",
                    padding: "20px",
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {pnlMessage && (
                <Paper
                    className="lblMessage"
                    elevation={1}
                    style={{
                        background: lblMessageColor,
                        textAlign: "center",
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
                                        <Typography variant="h6">
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
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtProduct}
                                            onChange={handleKeyProductName}
                                            error={ErrorPrdName}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={btnRetriveClick}
                                        >
                                            Retrive
                                        </Button>
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
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtUpdateCount}
                                            onChange={handleKeyUpdateCount}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Check Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtChkStartDig}
                                            style={{
                                                width: "370px"
                                            }}
                                            onChange={handleKeyCheckDigitFrom}
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
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtShtLot}
                                            onChange={handleKeyShtLot}
                                            error={ErrorShtLot}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Check Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtChkEndDig}
                                            onChange={handleKeyCheckDigitTo}
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
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtPcsSht}
                                            onChange={handleKeyPcsSht}
                                            error={ErrorPcsSht}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Check Word :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtChkWord}
                                            onChange={handleKeyCheckWord}
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
                                            id="selectProductMst"
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
                                                    sx={{ textAlign: "left" }}
                                                    error={ErrorselSheetType}
                                                />
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Serial Length :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtSerialLength}
                                            onChange={handlekeySerialLength}
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
                                            id="selectProductMst"
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
                                                    sx={{ textAlign: "left" }}
                                                    error={ErrorselDateType}
                                                />
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>PCS/SCAN (Shipping tray) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtPcsScan}
                                            onChange={handlekeyPcsScan}
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
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtEngCode}
                                            onChange={handlekeyEngCode}
                                            error={ErrorEngCode}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>PCS/SCAN (In process tray) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtPcsTray}
                                            onChange={handlekeyPcsTray}
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
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtRevision}
                                            onChange={handlekeyRevision}
                                            error={ErrorRevision}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Serial btw Name :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtSerialFormat}
                                            onChange={handlekeySerialFormat}
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
                                            id="selectProductMst"
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
                                                    sx={{ textAlign: "left" }}
                                                    error={ErrorLaminationSide}
                                                />
                                            )}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Sheet btw Name :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtSheetFormat}
                                            onChange={handlekeySheetFormat}
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
                                        <Typography>SHT/SCAN :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtShtScan}
                                            onChange={handlekeyShtScan}
                                            error={ErrorShtScan}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>SHT/LASER :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtShtLaser}
                                            onChange={handlekeyShtLaser}
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
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Req. Vendor Code :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="checkboxReqLots"
                                            style={{ padding: "0" }}
                                            disabled={cbxReqVendorDisabled}
                                            checked={ReqVendorCheck}
                                            onChange={(e) => setReqVendorCheck(e.target.checked)}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Req. Config :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="checkboxReqLots"
                                            style={{ padding: "0" }}
                                            checked={ReqConfigCheck}
                                            onChange={ReqConfigCheckChanged}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Config. Word :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtConfigWord}
                                            disabled={txtConfigWordDisabled}
                                            style={{
                                                backgroundColor: txtConfigWordDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyConfigWord}
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

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Config. Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtConfigStart}
                                            disabled={txtConfigStartDisabled}
                                            style={{
                                                backgroundColor: txtConfigStartDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyConfigStart}
                                            error={ErrorConfigStart}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Config. Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtConfigEnd}
                                            disabled={txtConfigEndDisabled}
                                            style={{
                                                backgroundColor: txtConfigEndDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyConfigEnd}
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

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Req. Config Running :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="checkboxReqLots"
                                            style={{ padding: "0" }}
                                            disabled={cbxReqConfigRunDisabled}
                                            checked={ReqConfigRunCheck}
                                            onChange={(e) => setReqConfigRunCheck(e.target.checked)}
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
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtDupStart}
                                            onChange={handlekeyDupStart}
                                            error={ErrorDupStart}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Check Dup. Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtDupEnd}
                                            onChange={handlekeyDupEnd}
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
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtAddInfo}
                                            onChange={handlekeyAddInfo}
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
                                                id="txtfield"
                                                size="small"
                                                fullWidth
                                                value={txtPassWord}
                                                onChange={handlekeyPassWord}
                                                error={ErrorPassWord}
                                            />
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        <Typography>Abbreviation :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtAbbr}
                                            onChange={handlekeyAbbr}
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

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Serial Start Code :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtSerialStartCode}
                                            onChange={handlekeySerialStartCode}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Req. Check Sheet PRD. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            checked={ReqCheckPrdShtCheck}
                                            disabled={cbxReqCheckPrdShtDisabled}
                                            style={{
                                                padding: "0",
                                            }}
                                            onChange={ReqCheckPrdShtCheckChanged}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Sheet PRD. Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtCheckPrdShtFrom}
                                            disabled={txtCheckPrdShtDisabled}
                                            style={{
                                                backgroundColor: txtCheckPrdShtDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyCheckPrdShtFrom}
                                            error={ErrorCheckPrdShtFrom}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Sheet PRD. Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtCheckPrdShtTo}
                                            disabled={txtCheckPrdShtToDisabled}
                                            style={{
                                                backgroundColor: txtCheckPrdShtToDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyCheckPrdShtTo}
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
                                                    />
                                                }
                                                label="Roll"
                                                sx={{ marginLeft: 5 }}
                                            />
                                        </RadioGroup>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Check Sheet Lot :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="checkboxReqLots"
                                            style={{ padding: "0" }}
                                            checked={ReqCheckLotShtCheck}
                                            onChange={ReqCheckLotShtCheckChanged}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Sheet Lot Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtCheckLotShtFrom}
                                            disabled={txtCheckLotShtFromDisabled}
                                            style={{
                                                backgroundColor: txtCheckLotShtFromDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyCheckLotShtFrom}
                                            error={ErrorCheckLotShtFrom}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Sheet Lot Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtCheckLotShtTo}
                                            disabled={txtCheckLotShtToDisabled}
                                            style={{
                                                backgroundColor: txtCheckLotShtToDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyCheckLotShtTo}
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
                                            id="selectProductMst"
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
                                                backgroundColor: selCheckIC === "N" ? "#EEEEEE" : "inherit",
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

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Pcs Control Plasma Time :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="checkboxReqLots"
                                            style={{ padding: "0" }}
                                            checked={ReqControlPlasmaCheck}
                                            onChange={ReqControlPlasmaCheckChanged}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Pcs Control Plasma Time (hrs.) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtPlasmaTime}
                                            disabled={txtPlasmaTimeDisabled}
                                            style={{
                                                backgroundColor: txtPlasmaTimeDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyPlasmaTime}
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

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Record PDS Time By :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={rbtPlasmaTime}
                                            onChange={handlerbtPlasmaTimeChange}
                                        >
                                            <FormControlLabel
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 19,
                                                            },
                                                        }}
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
                                            id="checkboxReqLots"
                                            style={{
                                                padding: "0",
                                            }}
                                            disabled={cbxReqUpdatePlasmaDisabled}
                                            checked={ReqUpdatePlasmaCheck}
                                            onChange={(e) => setReqUpdatePlasmaCheck(e.target.checked)}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
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
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
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
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Start Seq. Code :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtStartSeqCode}
                                            disabled={txtStartSeqCodeDisabled}
                                            style={{
                                                backgroundColor: txtStartSeqCodeDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyStartSeqCode}
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

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Start Seq. Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtStartSeqDigitFrom}
                                            disabled={txtStartSeqDigitFromDisabled}
                                            style={{
                                                backgroundColor: txtStartSeqDigitFromDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyStartSeqDigitFrom}
                                            error={ErrorStartSeqDigitFrom}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Start Seq. Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtStartSeqDigitTo}
                                            disabled={txtStartSeqDigitToDisabled}
                                            style={{
                                                backgroundColor: txtStartSeqDigitToDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyStartSeqDigitTo}
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
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
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
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Vendor Lot Length :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtVendorLotLength}
                                            disabled={txtVendorLotLengthDisabled}
                                            style={{
                                                backgroundColor: txtVendorLotLengthDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyVendorLotLength}
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

                                <TableRow className="special-row">
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
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Date From Process :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtDateFromProc}
                                            disabled={txtDateFromProcDisabled}
                                            style={{
                                                backgroundColor: txtDateFromProcDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyDateFromProc}
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

                                <TableRow className="special-row">
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
                                        />
                                    </TableCell>
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
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Week Code Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtWeekCodeStart}
                                            disabled={txtWeekCodeStartDisabled}
                                            style={{
                                                backgroundColor: txtWeekCodeStartDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyWeekCodeStart}
                                            error={ErrorWeekCodeStart}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Week Code Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtWeekCodeEnd}
                                            disabled={txtWeekCodeEndDisabled}
                                            style={{
                                                backgroundColor: txtWeekCodeEndDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyWeekCodeEnd}
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
                                        <Typography>Req. Connect Roll & Leaf :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqConRollLeaf"
                                            style={{ padding: "0" }}
                                            checked={ReqConRollLeafCheck}
                                            onChange={ReqConnectRollCheckChanged}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Leaf/Scan :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtLeafScan}
                                            disabled={txtLeafScanDisabled}
                                            style={{
                                                backgroundColor: txtLeafScanDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyLeafScan}
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

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Roll No. Length :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtRollNoLength}
                                            disabled={txtRollNoLengthDisabled}
                                            style={{
                                                backgroundColor: txtRollNoLengthDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyRollNoLength}
                                            error={ErrorRollNoLength}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Leaf No. Length :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtLeafNoLength}
                                            disabled={txtLeafNoLengthDisabled}
                                            style={{
                                                backgroundColor: txtLeafNoLengthDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyLeafNoLength}
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

                                <TableRow className="special-row">
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
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Roll PRD. Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtCheckRollPrdFrom}
                                            disabled={txtCheckRollPrdFromDisabled}
                                            style={{
                                                backgroundColor: txtCheckRollPrdFromDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyCheckRollPrdFrom}
                                            error={ErrorCheckRollPrdFrom}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Roll PRD. Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtCheckRollPrdTo}
                                            disabled={txtCheckRollPrdToDisabled}
                                            style={{
                                                backgroundColor: txtCheckRollPrdToDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyCheckRollPrdTo}
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

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Roll Check PRD. Word :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtCheckRollPrdWord}
                                            disabled={txtCheckRollPrdWordDisabled}
                                            style={{
                                                backgroundColor: txtCheckRollPrdWordDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyCheckRollPrdWord}
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

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Leaf PRD. Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtRollCheckPrdLeafFrom}
                                            disabled={txtRollCheckPrdLeafFromDisabled}
                                            style={{
                                                backgroundColor: txtRollCheckPrdLeafFromDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyRollCheckPrdLeafFrom}
                                            error={ErrorRollCheckPrdLeafFrom}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Leaf PRD. Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtRollCheckPrdLeafTo}
                                            disabled={txtRollCheckPrdLeafToDisabled}
                                            style={{
                                                backgroundColor: txtRollCheckPrdLeafToDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyRollCheckPrdLeafTo}
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

                                <TableRow className="special-row">
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
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Leaf Lot Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtRollCheckLotLeafFrom}
                                            disabled={txtRollCheckLotLeafFromDisabled}
                                            style={{
                                                backgroundColor: txtRollCheckLotLeafFromDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyRollCheckLotLeafFrom}
                                            error={ErrorRollCheckLotLeafFrom}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorRollCheckLotLeafFromMessage}
                                        </Typography>
                                    </TableCell>
                                </TableRow>

                                <TableRow className="special-row">
                                    <TableCell>
                                        <Typography>Leaf Lot Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtRollCheckLotLeafTo}
                                            disabled={txtRollCheckLotLeafToDisabled}
                                            style={{
                                                backgroundColor: txtRollCheckLotLeafToDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyRollCheckLotLeafTo}
                                            error={ErrorRollCheckLotLeafTo}
                                        />
                                    </TableCell>
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
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Typography style={{ fontSize: "small", color: "#ff4d4f" }}>
                                            {ErrorRollCheckLotLeafToMessage}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
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
                                                        checked={ReqAOIBCheck}
                                                        onChange={(e) => setReqAOIBCheck(e.target.checked)}
                                                    />
                                                }
                                                label="B Side"
                                                id="cbxReqPreAOIB"
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
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
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
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Process Control Time (hrs.) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtProcControlTime}
                                            disabled={txtProcControlTimeDisabled}
                                            style={{
                                                backgroundColor: txtProcControlTimeDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyProcControlTime}
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

                                <TableRow className="special-row">
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
                                        />
                                    </TableCell>
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
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
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
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Req. Final Inspection Process :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtFinInspectProc}
                                            disabled={txtFinInspectProcDisabled}
                                            style={{
                                                backgroundColor: txtFinInspectProcDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyFinInspectProc}
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

                                <TableRow className="special-row">
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
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Sheet Control Plasma Time (hrs.) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtShtPlasmaTime}
                                            disabled={txtShtPlasmaTimeDisabled}
                                            style={{
                                                backgroundColor: txtShtPlasmaTimeDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={handlekeyShtPlasmaTime}
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
                                            id="cbxReqFinInspect"
                                            style={{ padding: "0" }}
                                            checked={PlasmaConnShtPcsCheck}
                                            onChange={(e) => setPlasmaConnShtPcsCheck(e.target.checked)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Accept Barcode Grade :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtBarcodeGrade}
                                            onChange={handlekeyBarcodeGrade}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell style={{ padding: "3px" }}></TableCell>
                                </TableRow>

                                <TableRow className="special-row">
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
                                        <Typography>Update By :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtUpdateBy}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{
                                                backgroundColor: "#EEEEEE",
                                            }}
                                            onChange={handlekeyUpdateBy}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Update Date :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtUpdateDate}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            style={{
                                                backgroundColor: "#EEEEEE",
                                            }}
                                            onChange={handlekeyUpdateDate}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <FormControlLabel
                        sx={{ marginTop: "25px", color: "#ff4d4f" }}
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
                        variant="contained"
                        size="small"
                        color="success"
                        sx={{ marginTop: "20px" }}
                        onClick={btnSubmitClick}
                    >
                        Submit
                    </Button>

                    <div style={{marginTop: "40px"}}>
                        <a href="/TraceabilitySystem">Return To Menu</a>
                    </div>
                </Box>
            </Card>
        </div>
    )
};

export default ProductMaster;