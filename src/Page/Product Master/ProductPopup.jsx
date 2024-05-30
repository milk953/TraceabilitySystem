import React, { useState, useEffect } from "react";
import "../Product Master/Style.css";
import {
    Typography,
    FormControl,
    TableRow,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    Paper,
    TableHead,
    Select,
    MenuItem,
    Grid,
    TextField,
    Button,
    InputLabel,
    Card,
    CardContent,
    Box,
    Checkbox,
} from "@mui/material";
import { Empty } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import swal from "sweetalert";
import axios from "axios";
import { ProductMasterPopup } from "./function_ProductMasterPopup";
import { getFactory } from "../Common/function_Common";

function ProductPopup({ isOpen, onClose, item, searchFunction }) {

    const { factory, setFactory } = getFactory();
    const { STATUS_P, DDL_Factory, setDDL_Factory, DDL_ProductStatus, setDDL_ProductStatus, SerialStruc, DDL_Serialside, setDDL_Serialside, DDL_SerialStruc, setDDL_SerialStruc, ShtStructure,
        DDL_ShtStructure, setDDL_ShtStructure, ShtType, DDL_ShtType, setDDL_ShtType, ProcessConTime, DDL_ProcessConTime, setDDL_ProcessConTime,
        DDL_RollReqLotSht, setDDL_RollReqLotSht, DDL_RollReqProSht, setDDL_RollReqProSht, DDL_FinalPDStimeELT, setDDL_FinalPDStimeELT,
        DDL_FinalPDSHidetime, setDDL_FinalPDSHidetime, isDateInproflag, setisDateInproflag, isBarcodeReqflag, setisBarcodeReqflag, isShtcheckProflag, setisShtcheckProflag,
        isShtcheckLotflag, setisShtcheckLotflag, isShtXrayTimeflag, setisShtXrayTimeflag, isPlasmaTimeFlag, setisPlasmaTimeFlag, isConRollShtFlag, setisConRollShtFlag, isConRollLeafFlag, setisConRollLeafFlag,
        isConRollProFlag, setisConRollProFlag, isConRollSerialFlag, setisConRollSerialFlag, isConShtTimeFlag, setisConShtTimeFlag, isConShtsumFlag, setisConShtsumFlag, isConShtWeekCodeFlag, setisConShtWeekCodeFlag,
        isConShtPlasTimeFlag, setisConShtPlasTimeFlag, isProcessConTimeFlag, setisProcessConTimeFlag, isFinalPDStimeflag, setisFinalPDStimeflag, isConShtMixLotFlag, setisConShtMixLotFlag, isConShtMixProFlag,
        setisConShtMixProFlag, isFinalpackgroupflag, setisFinalpackgroupflag, isFinalweekcodeflag, setisFinalweekcodeflag, isFinalPDStimeconflag, setisFinalPDStimeconflag, isFinalconshtflag, setisFinalconshtflag,
        isFinalmixLotflag, setisFinalmixLotflag, isFinalmixProflag, setisFinalmixProflag, isFinalchecksumflag, setisFinalchecksumflag, isFinalchipIDflag, setisFinalchipIDflag,
        txtProductName, txtUpCount, txtConfig, txtStSeqSerial, txtStSeqCode, txtDateInProcess, txtPcsPerSHTEFPC, txtPcsPerSHTSMT, txtSerialFile,
        txtBarcodeGrade, txtshtFileFormat, txtShtperLotEFPC, txtShtperLotSMT, txtShtperscan, txtShtperlaser, txtShtModelCode, txtPlasmaTime,
        txtConRollShtLength, txtConRollLength, txtConLeafLength, txtConRollProSt, txtConRollProEnd, txtConRollLeafScan, txtRollLotShtSt, txtRollLotShtEnd,
        txtRollProShtSt, txtRollProShtEnd, txtRollProFix, txtConShtTime, txtConShtPlasTime, txtFinalpcstray, txtFinalpcsscan, txtFinalPDStime, txtFinalPDStimeby,
        checkHead, checkEmpty, checkData, handleDDLFactory, handleKeyProductName, handleKeyUpCount, handleKeyConfigCode, handleKeyStSeqSeriel, handleKeyStSeqCode, handleDDLProStatus,
        handleKeyDateInProcees, handleKeyPcsPerShtEFPC, handleKeyPcsPerShtSMT, handleKeySerialFile, handleDDLSerialside, handleDDLSerialStruc, handleKeyBarcodeGrade,
        handleKeyShtFileFormat, handleDDLShtStructure, handleDDLShtType, handleKeyShtperLotEFPC, handleKeyShtperLotSMT, handleKeyShtperscan, handleKeyShtperlaser,
        handleKeyShtModelCode, handleKeyShtPlasTime, handleKeyRollShtLength, handleKeyConRollLength, handleKeyConLeafLength, handleKeyConRollProSt, handleKeyConRollProEnd,
        handleKeyRollLeafScan, handleDDLRollReqLotSht, handleKeyRollLotShtSt, handleKeyRollLotShtEnd, handleDDLRollReqProSht, handleKeyRollProShtSt, handleKeyRollProShtEnd,
        handleKeyRollProFix, handleKeyConShtTime, handleKeyConShtPlasTime, handleDDLProcessConTime, handleKeyFinalpcstray, handleKeyFinalpcsscan, handleDDLFinalPDStimeELT,
        handleDDLFinalPDSHidetime, handleKeyFinalPDStime, handleKeyFinalPDStimeby, ErrorFactory, ErrorProdName, ErrorUpCount, ErrorConfigCode, ErrorStSeqSerial, ErrorStSeqCode, ErrorProStatus,
        ErrorDateInProcess, ErrorPcsPerShtEFPC, ErrorPcsPerShtSMT, ErrorSerialFile, ErrorSerialside, ErrorSerialStruc, ErrorBarcodeGrade, ErrorShtFileFormat, ErrorShtStruc, ErrorShtType, ErrorShtPerLotEFPC,
        ErrorShtPerLotSMT, ErrorShtPerscan, ErrorShtPerlaser, ErrorShtModelCode, ErrorShtPlasTime, ErrorRollShtLength, ErrorRollLength, ErrorConLeafLength, ErrorRollProSt, ErrorRollProEnd, ErrorRollLeafScan,
        ErrorRollReqLotSht, ErrorRollLotShtSt, ErrorRollLotShtEnd, ErrorRollReqProSht, ErrorRollProShtSt, ErrorRollProShtEnd, ErrorRollProFix, ErrorConShtConTime, ErrorConShtPlasTime, ErrorProcessConTime,
        ErrorFinalpcstray, ErrorFinalpcsscan, ErrorFinalPDStimeELT, ErrorFinalPDSHidetime, ErrorFinalPDStime, ErrorFinalPDStimeby, handleSaveClick, Clear
    } = ProductMasterPopup(onClose, item, searchFunction);

    if (!isOpen) {
        return null;
    }
    return (
        <div className="popup">
            <div className="popupcontect"
                style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                <Card className="ProductPopup">
                    <CardContent>
                        <Typography className="HeadPopup"
                            sx={{ fontSize: 20 }}>
                            Product Master
                        </Typography>
                    </CardContent>
                    <Box sx={{ flexGrow: 1, marginBottom: "10px" }}>
                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}>
                                <Typography>
                                    Factory :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <Select
                                    id="ddlFactory"
                                    variant="outlined"
                                    size="small"
                                    value={DDL_Factory}
                                    onChange={handleDDLFactory}
                                    style={{ width: "90%" }}
                                    error={ErrorFactory}
                                >
                                    {factory.map((item) => (
                                        <MenuItem key={item.p_factory_code} value={item.p_factory_code}>
                                            {item.p_factory_desc}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}></Grid>
                            <Grid item xs={1.7}>
                                <Typography style={{ fontSize: "small", color: "red" }}>
                                    {ErrorFactory ? "Please select Factory." : null}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}>
                                <Typography>
                                    Product Name :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtProductName"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                    value={txtProductName}
                                    onChange={handleKeyProductName}
                                    error={ErrorProdName}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography>
                                    Update Count :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtUpdateCount"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                    value={txtUpCount}
                                    onChange={handleKeyUpCount}
                                    error={ErrorUpCount}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography style={{ marginLeft: "8%" }}>
                                    Config Code :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtConnSheetConTime"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                    value={txtConfig}
                                    onChange={handleKeyConfigCode}
                                    error={ErrorConfigCode}
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}></Grid>
                            <Grid item xs={1.7}>
                                <Typography style={{ fontSize: "small", color: "red" }}>
                                    {ErrorProdName ? "Please input Product Name." : null}
                                </Typography>
                            </Grid>
                            <Grid item xs={2.2}></Grid>
                            <Grid item xs={1.7}>
                                <Typography style={{ fontSize: "small", color: "red" }}>
                                    {ErrorUpCount ? "Please input Update Count and Number only." : null}
                                </Typography>
                            </Grid>
                            <Grid item xs={2.2}></Grid>
                            <Grid item xs={1.7}>
                                <Typography style={{ fontSize: "small", color: "red" }}>
                                    {ErrorConfigCode ? "Please input Config Code." : null}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}>
                                <Typography>
                                    Start Seq Serial :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtConnSheetConTime"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                    value={txtStSeqSerial}
                                    onChange={handleKeyStSeqSeriel}
                                    error={ErrorStSeqSerial}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography>
                                    Start Seq Code :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtConnSheetConTime"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                    value={txtStSeqCode}
                                    onChange={handleKeyStSeqCode}
                                    error={ErrorStSeqCode}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography style={{ marginLeft: "8%" }}>
                                    Product Status :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <Select
                                    id="ddlFactory"
                                    variant="outlined"
                                    size="small"
                                    value={DDL_ProductStatus}
                                    onChange={handleDDLProStatus}
                                    style={{ width: "90%" }}
                                    error={ErrorProStatus}
                                >
                                    <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                                    <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}></Grid>
                            <Grid item xs={1.7}>
                                <Typography style={{ fontSize: "small", color: "red" }}>
                                    {ErrorStSeqSerial ? "Please input Start Seq Serial and Number only." : null}
                                </Typography>
                            </Grid>
                            <Grid item xs={2.2}></Grid>
                            <Grid item xs={1.7}>
                                <Typography style={{ fontSize: "small", color: "red" }}>
                                    {ErrorStSeqCode ? "Please input Start Seq Code." : null}
                                </Typography>
                            </Grid>
                            <Grid item xs={2.2}></Grid>
                            <Grid item xs={1.7}>
                                <Typography style={{ fontSize: "small", color: "red" }}>
                                    {ErrorProStatus ? "Please select Product Status." : null}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}>
                                <Typography>
                                    Date In process Flag :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <Checkbox
                                    style={{ padding: "0" }}
                                    checked={isDateInproflag}
                                    onChange={(e) => {
                                        setisDateInproflag(e.target.checked);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography>
                                    Date In Process :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtDateInProcess"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                        backgroundColor: isDateInproflag ? "inherit" : "#F5F7F8",
                                    }}
                                    value={txtDateInProcess}
                                    onChange={handleKeyDateInProcees}
                                    error={isDateInproflag && ErrorDateInProcess}
                                    disabled={!isDateInproflag}
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}></Grid>
                            <Grid item xs={1.7}></Grid>
                            <Grid item xs={2.2}></Grid>
                            <Grid item xs={1.7}>
                                <Typography style={{ fontSize: "small", color: "red" }}>
                                    {isDateInproflag && ErrorDateInProcess ?
                                        "Please input Date In Process." : null}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}>
                                <Typography>
                                    Pcs Per Sheet (EFPC) :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtPcsPerSHTEFPC"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                    value={txtPcsPerSHTEFPC}
                                    onChange={handleKeyPcsPerShtEFPC}
                                    error={ErrorPcsPerShtEFPC}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography>
                                    Pcs Per Sheet (SMT) :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtPcsPerSHTSMT"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                    value={txtPcsPerSHTSMT}
                                    onChange={handleKeyPcsPerShtSMT}
                                    error={ErrorPcsPerShtSMT}
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}></Grid>
                            <Grid item xs={1.7}>
                                <Typography style={{ fontSize: "small", color: "red" }}>
                                    {ErrorPcsPerShtEFPC ?
                                        "Please input Pcs Per Sheet (EFPC) and Number only." : null}
                                </Typography>
                            </Grid>
                            <Grid item xs={2.2}></Grid>
                            <Grid item xs={1.7}>
                                <Typography style={{ fontSize: "small", color: "red" }}>
                                    {ErrorPcsPerShtSMT ?
                                        "Please input Pcs Per Sheet (SMT) and Number only." : null}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}>
                                <Typography>
                                    Serial File Format :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtConnSheetConTime"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                    value={txtSerialFile}
                                    onChange={handleKeySerialFile}
                                    error={ErrorSerialFile}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography>
                                    Serial side :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <Select
                                    id="ddlFactory"
                                    variant="outlined"
                                    size="small"
                                    value={DDL_Serialside}
                                    onChange={handleDDLSerialside}
                                    style={{ width: "90%" }}
                                    error={ErrorSerialside}
                                    displayEmpty
                                >
                                    <MenuItem value="">-Select-</MenuItem>
                                    <MenuItem value="b">b</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography style={{ marginLeft: "8%" }}>
                                    Serial Structure :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <Select
                                    id="SerialStruc"
                                    variant="outlined"
                                    size="small"
                                    value={DDL_SerialStruc}
                                    onChange={handleDDLSerialStruc}
                                    style={{ width: "90%" }}
                                    error={ErrorSerialStruc}
                                    displayEmpty
                                >
                                    <MenuItem value="">
                                        -Select-
                                    </MenuItem>
                                    {SerialStruc.map((item) => (
                                        <MenuItem key={item.p_tssm_sn_struc_code} value={item.p_tssm_sn_struc_name}>
                                            {item.p_tssm_sn_struc_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}></Grid>
                            <Grid item xs={1.7}>
                                <Typography style={{ fontSize: "small", color: "red" }}>
                                    {ErrorSerialFile ? "Please input Serial File Format." : null}
                                </Typography>
                            </Grid>
                            <Grid item xs={2.2}></Grid>
                            <Grid item xs={1.7}>
                                <Typography style={{ fontSize: "small", color: "red" }}>
                                    {ErrorSerialside ? "Please select Serial side." : null}
                                </Typography>
                            </Grid>
                            <Grid item xs={2.2}></Grid>
                            <Grid item xs={1.7}>
                                <Typography style={{ fontSize: "small", color: "red" }}>
                                    {ErrorSerialStruc ? "Please select Serial Structure." : null}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}>
                                <Typography>
                                    Barcode Req Lot :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <Checkbox
                                    style={{ padding: "0" }}
                                    checked={isBarcodeReqflag}
                                    onChange={(e) => {
                                        setisBarcodeReqflag(e.target.checked);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography>
                                    Barcode Grade :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtConnSheetConTime"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                        backgroundColor: isBarcodeReqflag ? "inherit" : "#F5F7F8",
                                    }}
                                    value={isBarcodeReqflag ? txtBarcodeGrade : ''}
                                    onChange={handleKeyBarcodeGrade}
                                    error={isBarcodeReqflag && ErrorBarcodeGrade}
                                    disabled={!isBarcodeReqflag}
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}></Grid>
                            <Grid item xs={1.7}></Grid>
                            <Grid item xs={2.2}></Grid>
                            <Grid item xs={1.7}>
                                <Typography style={{ fontSize: "small", color: "red" }}>
                                    {isBarcodeReqflag && ErrorBarcodeGrade ?
                                        "Please input Barcode Grade." : null}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Box sx={{ flexGrow: 1, backgroundColor: "#e0f7fa" }}>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet File Format :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConnSheetConTime"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                        value={txtshtFileFormat}
                                        onChange={handleKeyShtFileFormat}
                                        error={ErrorShtFileFormat}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet Structure :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Select
                                        id="ddlFactory"
                                        variant="outlined"
                                        size="small"
                                        value={DDL_ShtStructure}
                                        onChange={handleDDLShtStructure}
                                        style={{ width: "90%" }}
                                        error={ErrorShtStruc}
                                        displayEmpty
                                    >
                                        <MenuItem value="">
                                            -Select-
                                        </MenuItem>
                                        {ShtStructure.map((item) => (
                                            <MenuItem key={item.p_tstm_sht_struc_code} value={item.p_tstm_sht_struc_name}>
                                                {item.p_tstm_sht_struc_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {ErrorShtFileFormat ?
                                            "Please input Sheet File Format." : null}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {ErrorShtStruc ?
                                            "Please select Sheet Structure." : null}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet Type :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Select
                                        id="ddlFactory"
                                        variant="outlined"
                                        size="small"
                                        value={DDL_ShtType}
                                        onChange={handleDDLShtType}
                                        style={{ width: "90%" }}
                                        error={ErrorShtType}
                                        displayEmpty
                                    >
                                        <MenuItem value="">-Select-</MenuItem>
                                        <MenuItem value="P">P</MenuItem>
                                        {ShtType.map((item) => (
                                            <MenuItem key={item.p_tstm_code} value={item.p_tstm_code}>
                                                {item.p_tstm_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet per Lot (EFPC) :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConnSheetConTime"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                        value={txtShtperLotEFPC}
                                        onChange={handleKeyShtperLotEFPC}
                                        error={ErrorShtPerLotEFPC}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Sheet per Lot (SMT) :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConnSheetConTime"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                        value={txtShtperLotSMT}
                                        onChange={handleKeyShtperLotSMT}
                                        error={ErrorShtPerLotSMT}
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {ErrorShtType ?
                                            "Please select Sheet Type." : null}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {ErrorShtPerLotEFPC ?
                                            "Please input Sheet per Lot (EFPC) and Number only." : null}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {ErrorShtPerLotSMT ?
                                            "Please input Sheet per Lot (SMT) and Number only." : null}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet per scan :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtSHperscan"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                        value={txtShtperscan}
                                        onChange={handleKeyShtperscan}
                                        error={ErrorShtPerscan}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet per laser :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtSHperlaser"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                        value={txtShtperlaser}
                                        onChange={handleKeyShtperlaser}
                                        error={ErrorShtPerlaser}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Sheet Model Code :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtSHModelCode"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                        value={txtShtModelCode}
                                        onChange={handleKeyShtModelCode}
                                        error={ErrorShtModelCode}
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {ErrorShtPerscan ?
                                            "Please input Sheet per scan and Number only." : null}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {ErrorShtPerlaser ?
                                            "Please input Sheet per laser and Number only." : null}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {ErrorShtModelCode ?
                                            "Please input Sheet Model Code." : null}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet check Product Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isShtcheckProflag}
                                        onChange={(e) => {
                                            setisShtcheckProflag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet check Lot Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isShtcheckLotflag}
                                        onChange={(e) => {
                                            setisShtcheckLotflag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Sheet Xray Time Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isShtXrayTimeflag}
                                        onChange={(e) => {
                                            setisShtXrayTimeflag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet Plasma Time Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isPlasmaTimeFlag}
                                        onChange={(e) => {
                                            setisPlasmaTimeFlag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet Plasma Time(Hrs.) :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtSHPlasmaTime"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                            backgroundColor: isPlasmaTimeFlag ? "inherit" : "#F5F7F8",
                                        }}
                                        value={txtPlasmaTime}
                                        onChange={handleKeyShtPlasTime}
                                        error={isPlasmaTimeFlag && ErrorShtPlasTime}
                                        disabled={!isPlasmaTimeFlag}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}></Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {isPlasmaTimeFlag && ErrorShtPlasTime ?
                                            "Please input Sheet Plasma Time(Hrs.) and Number only." : null}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Sheet Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isConRollShtFlag}
                                        onChange={(e) => {
                                            setisConRollShtFlag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Sheet Length :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollShtLength"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                            backgroundColor: isConRollShtFlag ? "inherit" : "#F5F7F8",
                                        }}
                                        value={isConRollShtFlag ? txtConRollShtLength : ''}
                                        onChange={handleKeyRollShtLength}
                                        error={ErrorRollShtLength}
                                        disabled={!isConRollShtFlag}
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}></Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {isConRollShtFlag && ErrorRollShtLength ?
                                            "Please input Conn Roll Sheet Length and Number only." : null}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Leaf Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isConRollLeafFlag}
                                        onChange={(e) => {
                                            setisConRollLeafFlag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Length :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollLength"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                            backgroundColor: isConRollLeafFlag ? "inherit" : "#F5F7F8",
                                        }}
                                        value={isConRollLeafFlag ? txtConRollLength : ''}
                                        onChange={handleKeyConRollLength}
                                        error={isConRollLeafFlag && ErrorRollLength}
                                        disabled={!isConRollLeafFlag}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Conn Leaf Length :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConLeafLength"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                            backgroundColor: isConRollLeafFlag ? "inherit" : "#F5F7F8",
                                        }}
                                        value={isConRollLeafFlag ? txtConLeafLength : ''}
                                        onChange={handleKeyConLeafLength}
                                        error={isConRollLeafFlag && ErrorConLeafLength}
                                        disabled={!isConRollLeafFlag}
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}></Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {isConRollLeafFlag && ErrorRollLength ?
                                            "Please input Conn Roll Length and Number only." : null}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {isConRollLeafFlag && ErrorConLeafLength ?
                                            "Please input Conn Leaf Length and Number only." : null}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Product Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isConRollProFlag}
                                        onChange={(e) => {
                                            setisConRollProFlag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Product Start :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollProSt"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                            backgroundColor: isConRollProFlag ? "inherit" : "#F5F7F8",
                                        }}
                                        value={isConRollProFlag ? txtConRollProSt : ''}
                                        onChange={handleKeyConRollProSt}
                                        error={isConRollProFlag && ErrorRollProSt}
                                        disabled={!isConRollProFlag}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Conn Roll Product End :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollProEnd"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                            backgroundColor: isConRollProFlag ? "inherit" : "#F5F7F8",
                                        }}
                                        value={isConRollProFlag ? txtConRollProEnd : ''}
                                        onChange={handleKeyConRollProEnd}
                                        error={isConRollProFlag && ErrorRollProEnd}
                                        disabled={!isConRollProFlag}
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}></Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {isConRollProFlag && ErrorRollProSt ?
                                            "Please input Conn Roll Product Start and Number only." : null}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {isConRollProFlag && ErrorRollProEnd ?
                                            "Please input Conn Roll Product End and Number only." : null}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Serial Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isConRollSerialFlag}
                                        onChange={(e) => {
                                            setisConRollSerialFlag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Leaf Scan :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollLeafscan"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                            backgroundColor: isConRollSerialFlag ? "inherit" : "#F5F7F8",
                                        }}
                                        value={isConRollSerialFlag ? txtConRollLeafScan : ''}
                                        onChange={handleKeyRollLeafScan}
                                        error={isConRollSerialFlag && ErrorRollLeafScan}
                                        disabled={!isConRollSerialFlag}
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}></Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {isConRollSerialFlag && ErrorRollLeafScan ?
                                            "Please input Conn Roll Leaf Scan and Number only." : null}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Req Lot Sheet :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Select
                                        id="ddlConRollReqLotSH"
                                        variant="outlined"
                                        size="small"
                                        value={DDL_RollReqLotSht}
                                        onChange={handleDDLRollReqLotSht}
                                        style={{ width: "90%" }}
                                        error={ErrorRollReqLotSht}
                                    >
                                        <MenuItem value="Y">Yes</MenuItem>
                                        <MenuItem value="N">No</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Lot Sheet Start :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollLotSHSt"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                            backgroundColor: DDL_RollReqLotSht === "Y" ? "#FFFFFF" : "#F5F7F8",
                                        }}
                                        value={txtRollLotShtSt}
                                        onChange={handleKeyRollLotShtSt}
                                        error={DDL_RollReqLotSht === "Y" && ErrorRollLotShtSt}
                                        disabled={DDL_RollReqLotSht === "N"}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Conn Roll Lot Sheet End :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollLotSHEnd"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                            backgroundColor: DDL_RollReqLotSht === "Y" ? "#FFFFFF" : "#F5F7F8",
                                        }}
                                        value={txtRollLotShtEnd}
                                        onChange={handleKeyRollLotShtEnd}
                                        error={DDL_RollReqLotSht === "Y" && ErrorRollLotShtEnd}
                                        disabled={DDL_RollReqLotSht === "N"}
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {ErrorRollReqLotSht ?
                                            "Please select Conn Roll Req Lot Sheet." : null}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {DDL_RollReqLotSht === "Y" && ErrorRollLotShtSt ?
                                            "Please input Conn Roll Lot Sheet Start and Number only." : null}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {DDL_RollReqLotSht === "Y" && ErrorRollLotShtEnd ?
                                            "Please input Conn Roll Lot Sheet End and Number only." : null}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Req Product Sheet :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Select
                                        id="ddlConRollReqProSH"
                                        variant="outlined"
                                        size="small"
                                        value={DDL_RollReqProSht}
                                        onChange={handleDDLRollReqProSht}
                                        style={{ width: "90%" }}
                                        error={ErrorRollReqProSht}
                                    >
                                        <MenuItem value="Y">Yes</MenuItem>
                                        <MenuItem value="N">No</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Product Sheet Start :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollProSHSt"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                            backgroundColor: DDL_RollReqProSht === "Y" ? "#FFFFFF" : "#F5F7F8",
                                        }}
                                        value={txtRollProShtSt}
                                        onChange={handleKeyRollProShtSt}
                                        error={DDL_RollReqProSht === "Y" && ErrorRollProShtSt}
                                        disabled={DDL_RollReqProSht === "N"}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Conn Roll Product Sheet End :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollProSHEnd"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                            backgroundColor: DDL_RollReqProSht === "Y" ? "#FFFFFF" : "#F5F7F8",
                                        }}
                                        value={txtRollProShtEnd}
                                        onChange={handleKeyRollProShtEnd}
                                        error={DDL_RollReqProSht === "Y" && ErrorRollProShtEnd}
                                        disabled={DDL_RollReqProSht === "N"}
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {ErrorRollReqProSht ?
                                            "Please select Conn Roll Req Product Sheet." : null}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {DDL_RollReqProSht === "Y" && ErrorRollProShtSt ?
                                            "Please input Conn Roll Product Sheet Start and Number only." : null}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {DDL_RollReqProSht === "Y" && ErrorRollProShtEnd ?
                                            "Please input Conn Roll Product Sheet End and Number only." : null}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Product Fix :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollProFix"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                        value={txtRollProFix}
                                        onChange={handleKeyRollProFix}
                                        error={ErrorRollProFix}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {ErrorRollProFix ?
                                            "Please input Conn Roll Product Fix." : null}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ flexGrow: 1, backgroundColor: "#e0f7fa" }}>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Sheet Control Time Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isConShtTimeFlag}
                                        onChange={(e) => {
                                            setisConShtTimeFlag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Sheet Control Time (Hrs.) :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConnSheetConTime"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                            backgroundColor: isConShtTimeFlag ? "inherit" : "#F5F7F8",
                                        }}
                                        value={isConShtTimeFlag ? txtConShtTime : ''}
                                        onChange={handleKeyConShtTime}
                                        error={isConShtTimeFlag && ErrorConShtConTime}
                                        disabled={!isConShtTimeFlag}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Conn Sheet check sum Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isConShtsumFlag}
                                        onChange={(e) => {
                                            setisConShtsumFlag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}></Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {isConShtTimeFlag && ErrorConShtConTime ?
                                            "Please input Conn Sheet Control Time (Hrs.) and Number only." : null}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}></Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Sheet Plasma Time Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isConShtPlasTimeFlag}
                                        onChange={(e) => {
                                            setisConShtPlasTimeFlag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Sheet Plasma Time (Hrs.) :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConnSheetConTime"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                            backgroundColor: isConShtPlasTimeFlag ? "inherit" : "#F5F7F8",
                                        }}
                                        value={isConShtPlasTimeFlag ? txtConShtPlasTime : ''}
                                        onChange={handleKeyConShtPlasTime}
                                        error={isConShtPlasTimeFlag && ErrorConShtPlasTime}
                                        disabled={!isConShtPlasTimeFlag}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Conn Sheet Week Code Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isConShtWeekCodeFlag}
                                        onChange={(e) => {
                                            setisConShtWeekCodeFlag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}></Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {isConShtPlasTimeFlag && ErrorConShtPlasTime ?
                                            "Please input Conn Sheet Plasma Time (Hrs.) and Number only." : null}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}></Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Sheet Mix Lot Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isConShtMixLotFlag}
                                        onChange={(e) => {
                                            setisConShtMixLotFlag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Sheet Mix Product Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isConShtMixProFlag}
                                        onChange={(e) => {
                                            setisConShtMixProFlag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Process Control Time Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isProcessConTimeFlag}
                                        onChange={(e) => {
                                            setisProcessConTimeFlag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Process Control Time :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Select
                                        id="ddlProConTime"
                                        variant="outlined"
                                        size="small"
                                        value={DDL_ProcessConTime}
                                        onChange={handleDDLProcessConTime}
                                        style={{
                                            width: "90%",
                                            backgroundColor: isProcessConTimeFlag ? "inherit" : "#F5F7F8",
                                        }}
                                        disabled={!isProcessConTimeFlag}
                                        error={ErrorProcessConTime}
                                        displayEmpty
                                    >
                                        <MenuItem value="">
                                            -Select-
                                        </MenuItem>
                                        {ProcessConTime.map((item) => (
                                            <MenuItem key={item.p_tpct_code} value={item.p_tpct_code}>
                                                {item.p_tpct_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}></Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {isProcessConTimeFlag && ErrorProcessConTime ?
                                            "Please select Process Control Time." : null}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final pcs per tray :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtFinalpcspertray"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                        value={txtFinalpcstray}
                                        onChange={handleKeyFinalpcstray}
                                        error={ErrorFinalpcstray}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final pcs per scan :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtFinalpcsperscan"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                        value={txtFinalpcsscan}
                                        onChange={handleKeyFinalpcsscan}
                                        error={ErrorFinalpcsscan}
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {ErrorFinalpcstray ?
                                            "Please input Final pcs per tray and Number only." : null}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {ErrorFinalpcsscan ?
                                            "Please input Final pcs per scan and Number only." : null}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final pack group flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isFinalpackgroupflag}
                                        onChange={(e) => {
                                            setisFinalpackgroupflag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final check week code flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isFinalweekcodeflag}
                                        onChange={(e) => {
                                            setisFinalweekcodeflag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Final PDS time skip ELT :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Select
                                        id="ddlFinalPDSELT"
                                        variant="outlined"
                                        size="small"
                                        value={DDL_FinalPDStimeELT}
                                        onChange={handleDDLFinalPDStimeELT}
                                        style={{ width: "90%" }}
                                        error={ErrorFinalPDStimeELT}
                                    >
                                        <MenuItem value="Y">Yes</MenuItem>
                                        <MenuItem value="N">No</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}></Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}></Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {ErrorFinalPDStimeELT ?
                                            "Please select Final PDS time skip ELT." : null}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final PDS time Hide time :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Select
                                        id="ddlFinalPDStht"
                                        variant="outlined"
                                        size="small"
                                        value={DDL_FinalPDSHidetime}
                                        onChange={handleDDLFinalPDSHidetime}
                                        style={{ width: "90%" }}
                                        error={ErrorFinalPDSHidetime}
                                    >
                                        <MenuItem value="Y">Yes</MenuItem>
                                        <MenuItem value="N">No</MenuItem>
                                    </Select>
                                </Grid>

                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final PDS time flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isFinalPDStimeflag}
                                        onChange={(e) => {
                                            setisFinalPDStimeflag(e.target.checked);
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Final PDS time (Hrs.) :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtFinalPDStime"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                            backgroundColor: isFinalPDStimeflag ? "inherit" : "#F5F7F8",
                                        }}
                                        value={isFinalPDStimeflag ? txtFinalPDStime : ''}
                                        onChange={handleKeyFinalPDStime}
                                        error={isFinalPDStimeflag && ErrorFinalPDStime}
                                        disabled={!isFinalPDStimeflag}
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {ErrorFinalPDSHidetime ?
                                            "Please select Final PDS time Hide time." : null}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}></Grid>
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {isFinalPDStimeflag && ErrorFinalPDStime ?
                                            "Please input Final PDS time (Hrs.) and Number only." : null}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final PDS time by :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtFinalPDStimeby"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                        value={txtFinalPDStimeby}
                                        onChange={handleKeyFinalPDStimeby}
                                        error={ErrorFinalPDStimeby}
                                    />
                                </Grid>

                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final PDS time confirm flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isFinalPDStimeconflag}
                                        onChange={(e) => {
                                            setisFinalPDStimeconflag(e.target.checked);
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Final conn sheet flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isFinalconshtflag}
                                        onChange={(e) => {
                                            setisFinalconshtflag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}></Grid>
                                <Grid item xs={1.7}>
                                    <Typography style={{ fontSize: "small", color: "red" }}>
                                        {ErrorFinalPDStimeby ?
                                            "Please input Final PDS time by." : null}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final mix Lot flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isFinalmixLotflag}
                                        onChange={(e) => {
                                            setisFinalmixLotflag(e.target.checked);
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final mix product flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isFinalmixProflag}
                                        onChange={(e) => {
                                            setisFinalmixProflag(e.target.checked);
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Final check sum flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isFinalchecksumflag}
                                        onChange={(e) => {
                                            setisFinalchecksumflag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final chip ID flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                        checked={isFinalchipIDflag}
                                        onChange={(e) => {
                                            setisFinalchipIDflag(e.target.checked);
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ flexGrow: 1, backgroundColor: "#e0f7fa" }}>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Require Result
                                    </Typography>
                                </Grid>
                                <Grid item xs={8.6}>
                                    <TableContainer
                                        component={Paper}
                                        style={{
                                            width: "90%",
                                            marginBottom: "2px",
                                            maxHeight: "400px",
                                            // visibility: checkHead,
                                        }}
                                    >
                                        <Table
                                            sx={{
                                                minWidth: 650,
                                                '& .MuiTableHead-root': {
                                                    position: 'sticky',
                                                    top: 0,
                                                    zIndex: 1,
                                                    background: 'white',
                                                },
                                            }}
                                            aria-label="simple table"
                                        >
                                            <TableHead style={{ backgroundColor: "#BCCEF8" }}>
                                                <TableRow>
                                                    <TableCell>No.</TableCell>
                                                    <TableCell>Item</TableCell>
                                                    <TableCell>Front Side</TableCell>
                                                    <TableCell>Back Side</TableCell>
                                                    <TableCell>Show Result</TableCell>
                                                    <TableCell>Control Conn Roll</TableCell>
                                                    <TableCell>Control Conn Sheet</TableCell>
                                                    <TableCell>Control Final Gate</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody style={{ overflowY: "auto" }}>
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell style={{ textAlign: "center" }}>
                                                        <Checkbox
                                                            style={{ padding: "0" }}
                                                        //   checked={isPlantChecked}
                                                        //   onChange={(e) => {
                                                        //     setIsPlantChecked(e.target.checked);
                                                        //   }}
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ textAlign: "center" }}>
                                                        <Checkbox
                                                            style={{ padding: "0" }}
                                                        //   checked={isPlantChecked}
                                                        //   onChange={(e) => {
                                                        //     setIsPlantChecked(e.target.checked);
                                                        //   }}
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ textAlign: "center" }}>
                                                        <Checkbox
                                                            style={{ padding: "0" }}
                                                        //   checked={isPlantChecked}
                                                        //   onChange={(e) => {
                                                        //     setIsPlantChecked(e.target.checked);
                                                        //   }}
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ textAlign: "center" }}>
                                                        <Checkbox
                                                            style={{ padding: "0" }}
                                                        //   checked={isPlantChecked}
                                                        //   onChange={(e) => {
                                                        //     setIsPlantChecked(e.target.checked);
                                                        //   }}
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ textAlign: "center" }}>
                                                        <Checkbox
                                                            style={{ padding: "0" }}
                                                        //   checked={isPlantChecked}
                                                        //   onChange={(e) => {
                                                        //     setIsPlantChecked(e.target.checked);
                                                        //   }}
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{ textAlign: "center" }}>
                                                        <Checkbox
                                                            style={{ padding: "0" }}
                                                        //   checked={isPlantChecked}
                                                        //   onChange={(e) => {
                                                        //     setIsPlantChecked(e.target.checked);
                                                        //   }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                {/* <TableRow style={{ visibility: checkEmpty }}>
                                                    <TableCell colSpan={8}>
                                                        <InfoCircleOutlined
                                                            style={{
                                                                visibility: checkData,
                                                                fontSize: "30px",
                                                                color: "#ffd580",
                                                                marginLeft: "500px",
                                                            }}
                                                        />
                                                        <span
                                                            style={{
                                                                visibility: checkData,
                                                                fontSize: "25px",
                                                                marginLeft: "10px",
                                                            }}
                                                        >
                                                            {" "}
                                                            Please fill in information{" "}
                                                        </span>
                                                        <Empty style={{ visibility: checkEmpty }} />
                                                    </TableCell>
                                                </TableRow> */}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Box>

                        <Grid
                            container
                            className="gridContainer"
                            spacing={0}
                        >
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    style={{
                                        width: "80%",
                                        marginTop: "7%",
                                    }}
                                    onClick={handleSaveClick}
                                >
                                    Save
                                </Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    style={{
                                        width: "80%",
                                        marginTop: "7%",
                                    }}
                                    color="error"
                                    onClick={() => {
                                        Clear();
                                        onClose();
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </div>
        </div>
    )
}

export default ProductPopup;