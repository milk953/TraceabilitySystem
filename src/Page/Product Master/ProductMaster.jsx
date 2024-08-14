import React, { useState, useEffect } from "react";
import "../Product Master/Style.css";
// import Hearder from "../Header/Hearder";
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
        PlasmaConnShtPcsCheck, setPlasmaConnShtPcsCheck, ConnShtReqBoardFlg, setConnShtReqBoardFlg, AutoPressFCheck, setAutoPressFCheck, AutoPressBCheck, setAutoPressBCheck, cbxReqPrdShtDisabled, txtCheckPrdShtDisabled,
        txtCheckPrdShtToDisabled, txtProcControlTimeDisabled, cbxReqConnShtPcsTimeDisabled, txtPlasmaTimeDisabled, rbtPlasmaTimePCSDisabled, rbtPlasmaTimeSHTDisabled, rbtPlasmaTimeGRPDisabled, cbxReqUpdatePlasmaDisabled,
        cbxPlasmaNotStartELTDisabled, cbxPlasmaNotShowTimeDisabled, visiblePassWord, visibletxtPassWord, txtProduct, handleKeyProductName, btnRetriveClick, ErrorPrdName, txtUpdateCount, txtChkStartDig, txtShtLot, txtChkEndDig,
        txtPcsSht, txtChkWord, selSheetType, txtSerialLength, selDateType, selDateTypeselChanged, txtPcsScan, txtEngCode, txtPcsTray, txtRevision, txtSerialFormat, selLaminationSide, txtSheetFormat, txtShtScan, txtShtLaser, ReqLotCheck, ReqVendorCheck,
        ReqConfigCheck, txtConfigWord, txtConfigStart, txtConfigEnd, ReqConfigRunCheck, txtDupStart, txtDupEnd, txtAddInfo, txtPassWord, txtAbbr, txtSerialStartCode, rbtselLotRoll, ReqCheckLotShtCheck, txtCheckLotShtFrom,
        txtCheckLotShtTo, selStatus, ReqControlPlasmaCheck, rbtPlasmaTime, ReqUpdatePlasmaCheck, PlasmaNotStartELTCheck, PlasmaNotShowTimeCheck, ReqStartSeqCodeCheck, ReqCheckWeekCodeCheck, ReqSheetMCCheck, txtWeekCodeStart,
        txtStartSeqCode, txtStartSeqDigitFrom, txtStartSeqDigitTo, ReqShtELTCheck, ReqSPIAOICheck, ReqVendorLotCheck, txtVendorLotLength, ReqDateProcCheck, txtDateFromProc, txtCheckRollPrdWord, RollReqCheckPrdLeafCheck, txtRollCheckPrdLeafFrom,
        txtWeekCodeEnd, ReqConRollLeafCheck, txtLeafScan, txtRollNoLength, txtLeafNoLength, LeafReqSerialCheck, ReqCheckPrdRollCheck, txtCheckRollPrdFrom, txtCheckRollPrdTo, ReqSPIBCheck, ReqAOICoatFCheck, ReqAOICoatBCheck,
        txtRollCheckPrdLeafTo, RollReqCheckLotLeafCheck, txtRollCheckLotLeafFrom, txtRollCheckLotLeafTo, ReqPreAOIFCheck, ReqPreAOIBCheck, ReqAOIFCheck, ReqAOIBCheck, ReqSPIFCheck, ReqEFPCAVICheck, txtUpdateBy, txtUpdateDate, chk_DelFlgCheck,
        ReqReflowFCheck, ReqReflowBCheck, ReqXrayFCheck, ReqXrayBCheck, ReqXrayOneTimeCheck, ReqFinInspectCheck, txtFinInspectProc, ReqEFPCAOMCheck, ReqEFPCAOICheck, ReqEFPCOSTCheck,
        setReqLotCheck, setReqVendorCheck, ReqConfigCheckChanged, setReqConfigRunCheck, handlerbtLotRollChange, ReqCheckLotShtCheckChanged, ReqControlPlasmaCheckChanged, handlerbtPlasmaTimeChange, setReqEFPCAVICheck, setReqSPIFCheck, setReqSPIBCheck,
        setReqUpdatePlasmaCheck, setPlasmaNotStartELTCheck, setPlasmaNotShowTimeCheck, ReqStartSeqCodeCheckChanged, setReqShtELTCheck, setReqSPIAOICheck, ReqVendorLotCheckChanged, ReqDateProcCheckChanged, ReqCheckWeekCodeCheckChanged, setReqAOICoatFCheck,
        setReqSheetMCCheck, ReqConnectRollCheckChanged, setLeafReqSerialCheck, ReqCheckPrdRollCheckChanged, RollReqCheckPrdLeafCheckChanged, RollReqCheckLotLeafCheckChanged, setReqPreAOIFCheck, setReqPreAOIBCheck, setReqAOIFCheck, setReqAOIBCheck, setReqAOICoatBCheck,
        setReqReflowFCheck, setReqReflowBCheck, setReqXrayFCheck, setReqXrayBCheck, setReqXrayOneTimeCheck, ReqFinInspectCheckChanged, setReqEFPCAOMCheck, setReqEFPCAOICheck, setReqEFPCOSTCheck,

    } = fn_ProductMaster();

    return (
        <div>
            <Hearder />
            <h1>Product Master</h1>
            <Card
                component={Paper}
                style={{
                    margin: "auto",
                    width: "95%",
                    maxWidth: "1400px",
                    marginTop: "30px",
                    height: "auto",
                    maxHeight: "600px",
                    padding: "20px",
                    display: 'flex',
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Box justifyContent="space-between"
                    sx={{
                        textAlign: "center",
                        marginRight: "0px",
                        width: "100%"
                    }}
                >
                    <TableContainer
                        style={{
                            height: "540px",
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
                                <TableRow>
                                    <TableCell>
                                        <Typography>Product Name :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtProduct}
                                            // disabled={txtLotDisabled}
                                            // style={{
                                            //     width: "80px"
                                            // }}
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
                                        <Typography style={{ fontSize: "small", color: "red" }}>
                                            {ErrorPrdName ? "Please input product name." : null}
                                        </Typography>
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Update Count :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtUpdateCount}
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                            // disabled={txtLotDisabled}
                                            style={{
                                                width: "360px"
                                            }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Sheet/Lot :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtShtLot}
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Pcs/Sheet :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtPcsSht}
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Sheet Type :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            id="selectProductMst"
                                            // disabled={selProDisabled}
                                            // style={{
                                            //     backgroundColor: selProDisabled ? "#EEEEEE" : "inherit",
                                            // }}
                                            value={selSheetType}
                                            // onChange={(e, value) => handleChangeProduct(value)}
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Serial Date Type :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            id="selectProductMst"
                                            // disabled={selProDisabled}
                                            // style={{
                                            //     backgroundColor: selProDisabled ? "#EEEEEE" : "inherit",
                                            // }}
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Serial Engineer Code :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtEngCode}
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Serial Revision :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtRevision}
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Lamination Side :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            id="selectProductMst"
                                            // disabled={selProDisabled}
                                            // style={{
                                            //     backgroundColor: selProDisabled ? "#EEEEEE" : "inherit",
                                            // }}
                                            value={selLaminationSide}
                                            // onChange={(e, value) => handleChangeProduct(value)}
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>SHT/SCAN :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtShtScan}
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
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
                                            checked={ReqVendorCheck}
                                            onChange={(e) => setReqVendorCheck(e.target.checked)}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Config. Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtConfigStart}
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Req. Config Running :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="checkboxReqLots"
                                            style={{ padding: "0" }}
                                            checked={ReqConfigRunCheck}
                                            onChange={(e) => setReqConfigRunCheck(e.target.checked)}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Check Dup. Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtDupStart}
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Addition Info. :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtAddInfo}
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
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
                                            // disabled={txtLotDisabled}
                                            // style={{
                                            //     width: "80px"
                                            // }}
                                            // onChange={(e) => {
                                            //     settxtLotNo(e.target.value);
                                            // }}
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Serial Start Code :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtSerialStartCode}
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>Req. Check Sheet PRD. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            checked={ReqCheckPrdShtCheck}
                                            disabled={cbxReqPrdShtDisabled}
                                            style={{
                                                padding: "0",
                                            }}
                                            onChange={ReqCheckPrdShtCheckChanged}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
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
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
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
                                    <TableCell>
                                        <Typography>Sheet Lot Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtCheckLotShtFrom}
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Final Gate Status :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            id="selectProductMst"
                                            // disabled={selProDisabled}
                                            // style={{
                                            //     backgroundColor: selProDisabled ? "#EEEEEE" : "inherit",
                                            // }}
                                            value={selStatus}
                                            // onChange={(e, value) => handleChangeProduct(value)}
                                            options={["ACTIVE", "INACTIVE"]}
                                            getOptionLabel={(option) => {
                                                if (option === "ACTIVE") return "ACTIVE";
                                                if (option === "INACTIVE") return "INACTIVE";
                                                return "";
                                            }}
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
                                            // disabled={selProDisabled}
                                            // style={{
                                            //     backgroundColor: selProDisabled ? "#EEEEEE" : "inherit",
                                            // }}
                                            value={selCheckIC}
                                            // onChange={(e, value) => handleChangeProduct(value)}
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
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
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
                                    <TableCell>
                                        <Typography>Req. Start Seq. Code :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="checkboxReqSt"
                                            style={{ padding: "0" }}
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Start Seq. Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtStartSeqDigitFrom}
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Req. Check Week Code :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxReqCheckWeekCode"
                                            style={{ padding: "0" }}
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
                                    <TableCell>
                                        <Typography>Week Code Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtWeekCodeStart}
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Roll No. Length :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtRollNoLength}
                                        // disabled={txtLotDisabled}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                        // disabled={txtLotDisabled}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Leaf Req. Serial Condition :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxLeafReqSerial"
                                            style={{ padding: "0" }}
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
                                            checked={ReqCheckPrdRollCheck}
                                            onChange={ReqCheckPrdRollCheckChanged}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Roll PRD. Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtCheckRollPrdFrom}
                                        // disabled={txtLotDisabled}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                        // disabled={txtLotDisabled}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Roll Check PRD. Word :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtCheckRollPrdWord}
                                        // disabled={txtLotDisabled}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                            checked={RollReqCheckPrdLeafCheck}
                                            onChange={RollReqCheckPrdLeafCheckChanged}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Leaf PRD. Digit (From) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtRollCheckPrdLeafFrom}
                                        // disabled={txtLotDisabled}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                        // disabled={txtLotDisabled}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Req. Check Leaf Lot :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            size="small"
                                            id="cbxRollReqCheckLotLeaf"
                                            style={{ padding: "0" }}
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
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     width: "80px"
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Typography>Leaf Lot Digit (To) :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtRollCheckLotLeafTo}
                                        // disabled={txtLotDisabled}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
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
                                        // disabled={txtLotDisabled}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
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
                                        // disabled={txtLotDisabled}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
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
                                        // disabled={txtLotDisabled}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>

                                <TableRow>
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
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
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
                            // onChange={(e) => setchk_DelFlgCheck(e.target.checked)}
                            />
                        }
                        label="Delete Flag"
                    />
                    <Button
                        variant="contained"
                        size="small"
                        color="success"
                        sx={{ marginTop: "20px" }}
                    // onClick={btnSubmit}
                    >
                        Submit
                    </Button>
                </Box>
            </Card>
        </div>
    )
};

export default ProductMaster;