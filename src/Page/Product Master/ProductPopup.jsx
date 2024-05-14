import React, { useState, useEffect } from "react";
import "/src/Page/Style.css";
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
import { ProductMasterPopup } from "../function/function_ProductMasterPopup";
import { getFactory } from "../Common/function_Common";

function ProductPopup({ isOpen, onClose, item, searchFunction }) {

    const { factory, setFactory, DDL_Factory, setDDL_Factory } = getFactory();
    const { STATUS_P, DDL_ProductStatus, setDDL_ProductStatus, SerialStruc, DDL_SerialStruc, setDDL_SerialStruc, ShtStructure,
        DDL_ShtStructure, setDDL_ShtStructure, ShtType, DDL_ShtType, setDDL_ShtType, ProcessConTime, DDL_ProcessConTime, setDDL_ProcessConTime,
        DDL_RollReqLotSht, setDDL_RollReqLotSht, DDL_RollReqProSht, setDDL_RollReqProSht, DDL_FinalPDStimeELT, setDDL_FinalPDStimeELT,
        DDL_FinalPDSHidetime, setDDL_FinalPDSHidetime, isDateInproflag, setisDateInproflag, isBarcodeReqflag, setisBarcodeReqflag,
        isPlasmaTimeFlag, setisPlasmaTimeFlag, isConRollShtFlag, setisConRollShtFlag, isConRollLeafFlag, setisConRollLeafFlag,
        isConRollProFlag, setisConRollProFlag, isConRollSerialFlag, setisConRollSerialFlag, isConShtTimeFlag, setisConShtTimeFlag,
        isConShtPlasTimeFlag, setisConShtPlasTimeFlag, isProcessConTimeFlag, setisProcessConTimeFlag, isFinalPDStimeflag, setisFinalPDStimeflag,
        txtProductName, txtUpCount, txtConfig, txtStSeqSerial, txtStSeqCode, txtDateInProcess, txtPcsPerSHTEFPC, txtPcsPerSHTSMT, txtSerialFile,
        txtBarcodeGrade, txtshtFileFormat, txtShtperLotEFPC, txtShtperLotSMT, txtShtperscan, txtShtperlaser, txtShtModelCode, txtPlasmaTime,
        txtConRollShtLength, txtConRollLength, txtConLeafLength, txtConRollProSt, txtConRollProEnd, txtConRollLeafScan, txtRollLotShtSt, txtRollLotShtEnd,
        txtRollProShtSt, txtRollProShtEnd, txtRollProFix, txtConShtTime, txtConShtPlasTime, txtFinalpcstray, txtFinalpcsscan, txtFinalPDStime, txtFinalPDStimeby,
        checkHead, checkEmpty, checkData
    } = ProductMasterPopup();

    console.log("Serial", SerialStruc)

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
                                    onChange={(e) => setDDL_Factory(e.target.value)}
                                    style={{ width: "90%" }}
                                //   error={ERROR_SHT_Code}
                                >
                                    {factory.map((item) => (
                                        <MenuItem key={item.factory_code} value={item.factory_code}>
                                            {item.factory_desc}
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
                                <Typography style={{ fontSize: "small", color: "red", width: "71%" }}>
                                    {/* {ERROR_SHT_Code ? "Please input SHT Code" : null} */}
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
                                //   onChange={handleKEY_Plant_Code}ecked ? TXT_Plant_
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography>
                                    Update Count :
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
                                //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                //   onChange={handleKEY_Plant_Code}
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
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
                                //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                //   onChange={handleKEY_Plant_Code}
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
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
                                //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                //   onChange={handleKEY_Plant_Code}
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
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
                                //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                //   onChange={handleKEY_Plant_Code}
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
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
                                    onChange={(e) => setDDL_ProductStatus(e.target.value)}
                                    style={{ width: "90%" }}
                                //   error={ERROR_SHT_Code}
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
                                    id="txtConnSheetConTime"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                        backgroundColor: isDateInproflag ? "inherit" : "#F5F7F8",
                                    }}
                                    value={isDateInproflag ? txtDateInProcess : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    disabled={!isDateInproflag}
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
                                    Pcs Per Sheet (EFPC) :
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
                                //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                //   onChange={handleKEY_Plant_Code}
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography>
                                    Pcs Per Sheet (SMT) :
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
                                //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                //   onChange={handleKEY_Plant_Code}
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
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
                                //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                //   onChange={handleKEY_Plant_Code}
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
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
                                    //   value={TXT_SHT_Code}
                                    //   onChange={handleKEY_SHT_Code}
                                    style={{ width: "90%" }}
                                //   error={ERROR_SHT_Code}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography style={{ marginLeft: "8%" }}>
                                    Serial Structure :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <Select
                                    id="ddlFactory"
                                    variant="outlined"
                                    size="small"
                                    value={DDL_SerialStruc}
                                    onChange={(e) => setDDL_SerialStruc(e.target.value)}
                                    style={{ width: "90%" }}
                                //   error={ERROR_SHT_Code}
                                >
                                    {SerialStruc.map((item) => (
                                        <MenuItem key={item.tssm_sn_struc_code} value={item.tssm_sn_struc_code}>
                                            {item.tssm_sn_struc_name}
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
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    disabled={!isBarcodeReqflag}
                                />
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
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
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
                                        onChange={(e) => setDDL_ShtStructure(e.target.value)}
                                        style={{ width: "90%" }}
                                    //   error={ERROR_SHT_Code}
                                    >
                                        {ShtStructure.map((item) => (
                                            <MenuItem key={item.tstm_sht_struc_code} value={item.tstm_sht_struc_code}>
                                                {item.tstm_sht_struc_name}
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
                                        onChange={(e) => setDDL_ShtType(e.target.value)}
                                        style={{ width: "90%" }}
                                    //   error={ERROR_SHT_Code}
                                    >
                                        {ShtType.map((item) => (
                                            <MenuItem key={item.tstm_code} value={item.tstm_code}>
                                                {item.tstm_name}
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
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
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
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
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
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
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
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
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
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
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
                                        Sheet check Product Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
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
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
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
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
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
                                      value={isPlasmaTimeFlag ? txtPlasmaTime : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlasmaTimeFlag && ERROR_Plant_Code}
                                      disabled={!isPlasmaTimeFlag}
                                    />
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
                                        id="txtCoRollshLength"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                            backgroundColor: isConRollShtFlag ? "inherit" : "#F5F7F8",
                                        }}
                                      value={isConRollShtFlag ? txtConRollShtLength : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isConRollShtFlag && ERROR_Plant_Code}
                                      disabled={!isConRollShtFlag}
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
                                        id="txtCoRollLength"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                            backgroundColor: isConRollLeafFlag ? "inherit" : "#F5F7F8",
                                        }}
                                      value={isConRollLeafFlag ? txtConRollLength : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isConRollLeafFlag && ERROR_Plant_Code}
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
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isConRollLeafFlag && ERROR_Plant_Code}
                                      disabled={!isConRollLeafFlag}
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
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isConRollProFlag && ERROR_Plant_Code}
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
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                      disabled={!isConRollProFlag}
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
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isConRollSerialFlag && ERROR_Plant_Code}
                                      disabled={!isConRollSerialFlag}
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
                                        Conn Roll Req Lot Sheet :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Select
                                        id="ddlConRollReqLotSH"
                                        variant="outlined"
                                        size="small"
                                        value={DDL_RollReqLotSht}
                                        onChange={(e) => setDDL_RollReqLotSht(e.target.value)}
                                        style={{ width: "90%" }}
                                    //   error={ERROR_SHT_Code}
                                    >
                                        <MenuItem value="Yes">Yes</MenuItem>
                                        <MenuItem value="No">No</MenuItem>
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
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
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
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
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
                                        Conn Roll Req Product Sheet :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Select
                                        id="ddlConRollReqProSH"
                                        variant="outlined"
                                        size="small"
                                        value={DDL_RollReqProSht}
                                        onChange={(e) => setDDL_RollReqProSht(e.target.value)}
                                        style={{ width: "90%" }}
                                    //   error={ERROR_SHT_Code}
                                    >
                                        <MenuItem value="Yes">Yes</MenuItem>
                                        <MenuItem value="No">No</MenuItem>
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
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
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
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
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
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
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
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isConShtTimeFlag && ERROR_Plant_Code}
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
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
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
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isConShtPlasTimeFlag && ERROR_Plant_Code}
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
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
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
                                        Conn Sheet Mix Lot Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
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
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
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
                                        onChange={(e) => setDDL_ProcessConTime(e.target.value)}
                                        style={{ 
                                            width: "90%",
                                            backgroundColor: isProcessConTimeFlag ? "inherit" : "#F5F7F8",
                                         }}
                                        disabled={!isProcessConTimeFlag}
                                    //   error={ERROR_SHT_Code}
                                    >
                                        {ProcessConTime.map((item) => (
                                            <MenuItem key={item.tpct_code} value={item.tpct_code}>
                                                {item.tpct_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
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
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
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
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
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
                                        Final pack group flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
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
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
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
                                        onChange={(e) => setDDL_FinalPDStimeELT(e.target.value)}
                                        style={{ width: "90%" }}
                                    //   error={ERROR_SHT_Code}
                                    >
                                        <MenuItem value="Yes">Yes</MenuItem>
                                        <MenuItem value="No">No</MenuItem>
                                    </Select>
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
                                        onChange={(e) => setDDL_FinalPDSHidetime(e.target.value)}
                                        style={{ width: "90%" }}
                                    //   error={ERROR_SHT_Code}
                                    >
                                        <MenuItem value="Yes">Yes</MenuItem>
                                        <MenuItem value="No">No</MenuItem>
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
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isFinalPDStimeflag && ERROR_Plant_Code}
                                      disabled={!isFinalPDStimeflag}
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
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
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
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
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
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
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
                                        Final mix Lot flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
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
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
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
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
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
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
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
                                //   onClick={handleSaveClick}
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
                                        // Clear();
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