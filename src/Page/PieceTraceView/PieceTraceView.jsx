import React, { useState, useEffect } from "react";
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
    RadioGroup,
    Radio,
    InputLabel,
    Autocomplete,
    Box,
    Tooltip,
} from "@mui/material";
import { Table as AntTable } from 'antd';
import "../Common/StyleCommon.css";
import Pageimg from "/src/assets/1.jpg";
import Header from "../Header/Header";
import "./PieceTraceView.css";
import { fn_PieceTraceView } from "./fn_PieceTraceView";

function PieceTraceView() {
    const {
        txtSerialNo, settxtSerialNo, txtSerialChip, settxtSerialChip, lblSerialChip, txtProduct, settxtProduct, hypLotNo, hypSheetNoB, txtPcsNo, settxtPcsNo,
        txtShtType, settxtShtType, txtAOMEFPCCntF, settxtAOMEFPCCntF, txtAOMEFPCTimeF, settxtAOMEFPCTimeF, txtAOIEFPCCntF, settxtAOIEFPCCntF,
        txtAOIEFPCTimeF, settxtAOIEFPCTimeF, txtBarcodeGradeTime, settxtBarcodeGradeTime, txtOSTCntF, settxtOSTCntF, txtOSTTimeF, settxtOSTTimeF,
        txtAVICntF, settxtAVICntF, txtAVITimeF, settxtAVITimeF, txtAVICntB, settxtAVICntB, txtAVITimeB, settxtAVITimeB, txtAVIMarkCntF, settxtAVIMarkCntF,
        txtAVIMarkTimeF, settxtAVIMarkTimeF, txtAVIMarkCntB, settxtAVIMarkCntB, txtAVIMarkTimeB, settxtAVIMarkTimeB, txtSPICntF, settxtSPICntF, txtSPITimeF,
        settxtSPITimeF, txtSPICntB, settxtSPICntB, txtSPITimeB, settxtSPITimeB, txtPreAOICntF, settxtPreAOICntF, txtPreTimeF, settxtPreTimeF, txtPreAOICntB,
        settxtPreAOICntB, txtPreTimeB, settxtPreTimeB, txtReflowCntF, settxtReflowCntF, txtReflowTimeF, settxtReflowTimeF, txtReflowCntB, settxtReflowCntB,
        txtReflowTimeB, settxtReflowTimeB, txtAOICntF, settxtAOICntF, txtAOITimeF, settxtAOITimeF, txtAOICntB, settxtAOICntB, txtAOITimeB, settxtAOITimeB,
        txtXRAYCnt_F, settxtXRAYCnt_F, txtXRAYTime_F, settxtXRAYTime_F, txtXRAYCnt_B, settxtXRAYCnt_B, txtXRAYTime_B, settxtXRAYTime_B, txtAOICOACntF, settxtAOICOACntF,
        txtAOICOATimeF, settxtAOICOATimeF, txtAOICOACntB, settxtAOICOACntB, txtAOICOATimeB, settxtAOICOATimeB, txtSMTIntCntF, settxtSMTIntCntF, txtSMTIntTimeF, settxtSMTIntTimeF,
        txtSMTIntCntB, settxtSMTIntCntB, txtSMTIntTimeB, settxtSMTIntTimeB, txtRejectCnt1, settxtRejectCnt1, txtRejectTime1, settxtRejectTime1, txtTouchUpCnt, settxtTouchUpCnt,
        txtTouchUpTime, settxtTouchUpTime, txtBendingTime, settxtBendingTime, lblBendingMachine, txtELTCnt1, settxtELTCnt1, txtELTTime1, settxtELTTime1, txtELTCnt2, settxtELTCnt2,
        txtELTTime2, settxtELTTime2, txtELTCnt3, settxtELTCnt3, txtELTTime3, settxtELTTime3, txtELTCnt4, settxtELTCnt4, txtELTTime4, settxtELTTime4, txtELTCnt5, settxtELTCnt5,
        txtELTTime5, settxtELTTime5, txtELTCnt6, settxtELTCnt6, txtELTTime6, settxtELTTime6, txtELTCnt7, settxtELTCnt7, txtELTTime7, settxtELTTime7, txtFQCTime, settxtFQCTime,
        lblFQC, lblFQCMachine, lblFQCOperator, txtFinalGateTime, settxtFinalGateTime, lblFinalGateRemark, txtPackingTime, settxtPackingTime, lblScanPackRemark, lblScanPackRemarkColor,
        lblMessage, lblELT1, lblELT2, lblELT3, lblELT4, lblELT5, lblELT6, lblELT7, lblKeyType1, lblKeyType2, lblKeyType3, lblKeyType4, lblKeyType5, lblKeyType6, lblKeyType7, lblCheckID1,
        lblCheckID2, lblCheckID3, lblCheckID4, lblCheckID5, lblCheckID6, lblCheckID7, lblTestType1, lblTestType2, lblTestType3, lblTestType4, lblTestType5, lblTestType6, lblTestType7,
        lblBarcodeTitle, btnAOMEFPC, btnAOIEFPC, btnBarcodeGrade, btnOST, btnAVIF, btnAVIB, btnAVIMarkF, btnAVIMarkB, btnSPIF, btnSPIB, btnPreAOIF, btnPreAOIB, btnReflowF, btnReflowB,
        btnAOIF, btnAOIB, btnXRAY_F, btnXRAY_B, btnAOICOAF, btnAOICOAB, btnSMTIntF, btnSMTIntB, btnReject1, btnTouchUp, btnBending, btnELT1, btnELT2, btnELT3, btnELT4, btnELT5, btnELT6,
        btnELT7, btnFQC, btnFinalGate, btnScanPack, txtSPICntBColor, txtSPITimeBColor, txtPreAOICntBColor, txtPreTimeBColor, txtAOICntBColor, txtAOITimeBColor, txtSPICntFColor, txtSPITimeFColor,
        txtPreAOICntFColor, txtPreTimeFColor, txtAOICntFColor, txtAOITimeFColor, btnAOMEFPCColor, btnAOIEFPCColor, btnBarcodeGradeColor, btnOSTColor, btnAVIFColor, btnAVIBColor, btnAVIMarkFColor,
        btnAVIMarkBColor, btnSPIFColor, btnSPIBColor, btnPreAOIFColor, btnPreAOIBColor, btnReflowFColor, btnReflowBColor, btnAOIFColor, btnAOIBColor, btnXRAY_FColor, btnXRAY_BColor,
        btnAOICOAFColor, btnAOICOABColor, btnSMTIntFColor, btnSMTIntBColor, btnReject1Color, btnTouchUpColor, btnBendingColor, btnELT1Color, btnELT2Color, btnELT3Color, btnELT4Color, btnELT5Color,
        btnELT6Color, btnELT7Color, btnFQCColor, btnFinalGateColor, btnScanPackColor, btnPreAOIF_Click, btnClear_Click, btnSPIB_Click, btnPreAOIB_Click, btnAOIF_Click, btnAOIB_Click, btnReject1_Click,
        btnTouchUp_Click, btnELT1_Click, btnELT2_Click, btnELT3_Click, btnELT4_Click, btnELT5_Click, btnELT6_Click, btnELT7_Click, btnXRAY_Click, btnXRAY_B_Click, btnFinalGate_Click, btnAOICOAF_Click,
        btnAOICOAB_Click, btnRetrive_Click, btnSPIF_Click, btnOST_Click, hypSheetNoF
    } = fn_PieceTraceView();

    return (
        <div>
            <Header />
            <Card
                component={Paper}
                className="Card-Common"
                sx={{ display: "flex" }}
            >
                <Box justifyContent="space-between"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: "column",
                        width: "100%",
                    }}

                >
                    <Typography sx={{ textAlign: 'center', color: 'red' }}>
                        {lblMessage}
                    </Typography>
                    <div className="divTb">
                        <Table className="TbViewTracePiece">
                            <TableBody>
                                <TableRow>
                                    <TableCell align="right" colSpan={4}>
                                        <Typography>
                                            Sheet No. :
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <TextField
                                            // className="TxtField"
                                            size="small"
                                            sx={{ width: "123%" }}
                                            value={txtSerialNo || ""}
                                            onChange={(e) => {
                                                settxtSerialNo(e.target.value);
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            sx={{ width: "20%" }}
                                            onClick={btnRetrive_Click}
                                        >
                                            Retrive
                                        </Button>{" "}
                                        &nbsp;&nbsp;&nbsp;
                                        <Button
                                            variant="contained"
                                            sx={{ width: "20%" }}
                                            color="error"
                                            onClick={btnClear_Click}
                                        >
                                            Clear
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right" colSpan={4}>
                                        {lblSerialChip.visible && (
                                            <Typography>
                                                {lblSerialChip.value}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell align="center">
                                        {txtSerialChip.visible && (
                                            <TextField
                                                size="small"
                                                sx={{ width: "123%" }}
                                                value={txtSerialChip.value}
                                                onChange={(e) => {
                                                    settxtSerialChip((prevState) => ({
                                                        ...prevState,
                                                        value: e.target.value,
                                                    }));
                                                }}
                                            />
                                        )}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <div className="divTbProduct">
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography>
                                            Product :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            style={{ width: "194px" }}
                                            value={txtProduct}
                                            onChange={(e) => {
                                                settxtProduct(e.target.value);
                                            }}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            Sheet No.(F) :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <a id="hypSheetNoF"
                                            href={`/TraceabilitySystem/SheetTraceView?SHEETNO=${hypSheetNoF}`}
                                            style={{ fontSize: "16px" }}
                                        >
                                            {hypSheetNoF}
                                        </a>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>
                                            Lot No. :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <a id="hypLotNo"
                                            href={`/TraceabilitySystem/LotTraceView?lot=${hypLotNo}`}
                                            style={{ fontSize: "16px" }}
                                        >
                                            {hypLotNo}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            Sheet No.(B) :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <a id="hypSheetNoB"
                                            href={`/TraceabilitySystem/SheetTraceView?SHEETNO=${hypSheetNoB}`}
                                            style={{ fontSize: "16px" }}
                                        >
                                            {hypSheetNoB}
                                        </a>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>
                                            Piece No. :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            style={{ width: "194px" }}
                                            value={txtPcsNo}
                                            onChange={(e) => {
                                                settxtPcsNo(e.target.value);
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            SheetType. :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            style={{ width: "194px" }}
                                            value={txtShtType}
                                            onChange={(e) => {
                                                settxtShtType(e.target.value);
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <div className="TbPiece">
                        <TableContainer
                            component={Paper}
                            style={{
                                width: "100%",
                                margin: "auto",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                boxShadow: "none",
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell rowSpan={"2"}>Type</TableCell>
                                        <TableCell rowSpan={"2"}> Process</TableCell>
                                        <TableCell colSpan={"3"}>Front side</TableCell>
                                        <TableCell colSpan={"3"}>Back side</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Result</TableCell>
                                        <TableCell>C</TableCell>
                                        <TableCell>Reg Time</TableCell>
                                        <TableCell>Result</TableCell>
                                        <TableCell>C</TableCell>
                                        <TableCell>Reg Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell rowSpan={"6"}
                                        // sx={{ backgroundColor: "#E5D9F2" }}
                                        >
                                            EFPC
                                        </TableCell>
                                        <TableCell>AOM / Via AOI</TableCell>
                                        <TableCell style={{ width: "100px" }}>
                                            <Button
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnAOMEFPCColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnAOMEFPCColor
                                                    }
                                                }}
                                                disabled={btnAOMEFPC.disabled}
                                            >
                                                {btnAOMEFPC.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell style={{ width: "40px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtAOMEFPCCntF}
                                                onChange={(e) => {
                                                    settxtAOMEFPCCntF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell style={{ width: "250px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtAOMEFPCTimeF}
                                                onChange={(e) => {
                                                    settxtAOMEFPCTimeF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>AOI E-FPC</TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnAOIEFPCColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnAOIEFPCColor
                                                    }
                                                }}
                                                disabled={btnAOIEFPC.disabled}
                                            >
                                                {btnAOIEFPC.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell style={{ width: "40px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtAOIEFPCCntF}
                                                onChange={(e) => {
                                                    settxtAOIEFPCCntF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtAOIEFPCTimeF}
                                                onChange={(e) => {
                                                    settxtAOIEFPCTimeF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        {lblBarcodeTitle.visible && (
                                            <TableCell>Barcode Grade</TableCell>
                                        )}
                                        {btnBarcodeGrade.visible && (
                                            <TableCell>

                                                <Button

                                                    sx={{
                                                        height: "33px",
                                                        backgroundColor: btnBarcodeGradeColor,
                                                        color: "white",
                                                        width: "90%",
                                                        "&:hover": {
                                                            backgroundColor: btnBarcodeGradeColor
                                                        }
                                                    }}
                                                >
                                                    {btnBarcodeGrade.value}
                                                </Button>
                                            </TableCell>
                                        )}
                                        {btnBarcodeGrade.visible && (
                                            <TableCell></TableCell>
                                        )}
                                        {txtBarcodeGradeTime.visible && (
                                            <TableCell>
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    fullWidth
                                                    value={txtBarcodeGradeTime.value}
                                                    onChange={(e) => {
                                                        settxtBarcodeGradeTime((prevState) => ({
                                                            ...prevState,
                                                            value: e.target.value,
                                                        }));
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </TableCell>
                                        )}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>OST</TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnOSTColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnOSTColor
                                                    }
                                                }}
                                                disabled={btnOST.disabled}
                                                onClick={btnOST_Click}
                                            >
                                                {btnOST.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell style={{ width: "40px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtOSTCntF}
                                                onChange={(e) => {
                                                    settxtOSTCntF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtOSTTimeF}
                                                onChange={(e) => {
                                                    settxtOSTTimeF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>AVI</TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnAVIFColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnAVIFColor
                                                    }
                                                }}
                                                disabled={btnAVIF.disabled}
                                            >
                                                {btnAVIF.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell style={{ width: "40px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtAVICntF}
                                                onChange={(e) => {
                                                    settxtAVICntF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtAVITimeF}
                                                onChange={(e) => {
                                                    settxtAVITimeF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell style={{ width: "100px" }}>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnAVIBColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnAVIBColor
                                                    }
                                                }}
                                                disabled={btnAVIB.disabled}
                                            >
                                                {btnAVIB.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell style={{ width: "40px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtAVICntB}
                                                onChange={(e) => {
                                                    settxtAVICntB(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell style={{ width: "250px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtAVITimeB}
                                                onChange={(e) => {
                                                    settxtAVITimeB(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>FVI</TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnAVIMarkFColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnAVIMarkFColor
                                                    }
                                                }}
                                                disabled={btnAVIMarkF.disabled}
                                            >
                                                {btnAVIMarkF.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtAVIMarkCntF}
                                                onChange={(e) => {
                                                    settxtAVIMarkCntF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtAVIMarkTimeF}
                                                onChange={(e) => {
                                                    settxtAVIMarkTimeF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnAVIMarkBColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnAVIMarkBColor
                                                    }
                                                }}
                                                disabled={btnAVIMarkB.disabled}
                                            >
                                                {btnAVIMarkB.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtAVIMarkCntB}
                                                onChange={(e) => {
                                                    settxtAVIMarkCntB(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtAVIMarkTimeB}
                                                onChange={(e) => {
                                                    settxtAVIMarkTimeB(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell rowSpan={"10"}>SMT</TableCell>
                                        <TableCell>SPI</TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnSPIFColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnSPIFColor
                                                    }
                                                }}
                                                disabled={btnSPIF.disabled}
                                                onClick={btnSPIF_Click}
                                            >
                                                {btnSPIF.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                style={{
                                                    backgroundColor: txtSPICntFColor,
                                                    color: "#fff"
                                                }}
                                                value={txtSPICntF}
                                                onChange={(e) => {
                                                    settxtSPICntF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                style={{
                                                    backgroundColor: txtSPITimeFColor,
                                                    color: "#fff"
                                                }}
                                                value={txtSPITimeF}
                                                onChange={(e) => {
                                                    settxtSPITimeF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnSPIBColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnSPIBColor
                                                    }
                                                }}
                                                onClick={btnSPIB_Click}
                                                disabled={btnSPIB.disabled}
                                            >
                                                {btnSPIB.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtSPICntB}
                                                style={{
                                                    backgroundColor: txtSPICntBColor,
                                                    color: "#fff"
                                                }}
                                                onChange={(e) => {
                                                    settxtSPICntB(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                style={{
                                                    backgroundColor: txtSPITimeBColor,
                                                    color: "#fff"
                                                }}
                                                value={txtSPITimeB}
                                                onChange={(e) => {
                                                    settxtSPITimeB(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>PreAOI</TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnPreAOIFColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnPreAOIFColor
                                                    }
                                                }}
                                                onClick={btnPreAOIF_Click}
                                                disabled={btnPreAOIF.disabled}
                                            >
                                                {btnPreAOIF.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                style={{
                                                    backgroundColor: txtPreAOICntFColor,
                                                    color: "#fff"
                                                }}
                                                value={txtPreAOICntF}
                                                onChange={(e) => {
                                                    settxtPreAOICntF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                style={{
                                                    backgroundColor: txtPreTimeFColor,
                                                    color: "#fff"
                                                }}
                                                value={txtPreTimeF}
                                                onChange={(e) => {
                                                    settxtPreTimeF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnPreAOIBColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnPreAOIBColor
                                                    }
                                                }}
                                                onClick={btnPreAOIB_Click}
                                                disabled={btnPreAOIB.disabled}
                                            >
                                                {btnPreAOIB.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                style={{
                                                    backgroundColor: txtPreAOICntBColor,
                                                    color: "#fff"
                                                }}
                                                value={txtPreAOICntB}
                                                onChange={(e) => {
                                                    settxtPreAOICntB(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                style={{
                                                    backgroundColor: txtPreTimeBColor,
                                                    color: "#fff"
                                                }}
                                                value={txtPreTimeB}
                                                onChange={(e) => {
                                                    settxtPreTimeB(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>Reflow</TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnReflowFColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnReflowFColor
                                                    }
                                                }}
                                                disabled={btnReflowF.disabled}
                                            >
                                                {btnReflowF.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtReflowCntF}
                                                onChange={(e) => {
                                                    settxtReflowCntF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtReflowTimeF}
                                                onChange={(e) => {
                                                    settxtReflowTimeF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnReflowBColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnReflowBColor
                                                    }
                                                }}
                                                disabled={btnReflowB.disabled}
                                            >
                                                {btnReflowB.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtReflowCntB}
                                                onChange={(e) => {
                                                    settxtReflowCntB(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtReflowTimeB}
                                                onChange={(e) => {
                                                    settxtReflowTimeB(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>AOI</TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnAOIFColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnAOIFColor
                                                    }
                                                }}
                                                onClick={btnAOIF_Click}
                                                disabled={btnAOIF.disabled}
                                            >
                                                {btnAOIF.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                style={{
                                                    backgroundColor: txtAOICntFColor,
                                                    color: "#fff"
                                                }}
                                                value={txtAOICntF}
                                                onChange={(e) => {
                                                    settxtAOICntF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                style={{
                                                    backgroundColor: txtAOITimeFColor,
                                                    color: "#fff"
                                                }}
                                                value={txtAOITimeF}
                                                onChange={(e) => {
                                                    settxtAOITimeF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnAOIBColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnAOIBColor
                                                    }
                                                }}
                                                onClick={btnAOIB_Click}
                                                disabled={btnAOIB.disabled}
                                            >
                                                {btnAOIB.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                style={{
                                                    backgroundColor: txtAOICntBColor,
                                                    color: "#fff"
                                                }}
                                                value={txtAOICntB}
                                                onChange={(e) => {
                                                    settxtAOICntB(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                style={{
                                                    backgroundColor: txtAOITimeBColor,
                                                    color: "#fff"
                                                }}
                                                value={txtAOITimeB}
                                                onChange={(e) => {
                                                    settxtAOITimeB(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>X-RAY</TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnXRAY_FColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnXRAY_FColor
                                                    }
                                                }}
                                                onClick={btnXRAY_Click}
                                            >
                                                {btnXRAY_F}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtXRAYCnt_F}
                                                onChange={(e) => {
                                                    settxtXRAYCnt_F(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtXRAYTime_F}
                                                onChange={(e) => {
                                                    settxtXRAYTime_F(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnXRAY_BColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnXRAY_BColor
                                                    }
                                                }}
                                                onClick={btnXRAY_B_Click}
                                            >
                                                {btnXRAY_B}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtXRAYCnt_B}
                                                onChange={(e) => {
                                                    settxtXRAYCnt_B(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtXRAYTime_B}
                                                onChange={(e) => {
                                                    settxtXRAYTime_B(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>AOI Coating</TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnAOICOAFColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnAOICOAFColor
                                                    }
                                                }}
                                                onClick={btnAOICOAF_Click}
                                                disabled={btnAOICOAF.disabled}
                                            >
                                                {btnAOICOAF.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtAOICOACntF}
                                                onChange={(e) => {
                                                    settxtAOICOACntF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtAOICOATimeF}
                                                onChange={(e) => {
                                                    settxtAOICOATimeF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnAOICOABColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnAOICOABColor
                                                    }
                                                }}
                                                onClick={btnAOICOAB_Click}
                                                disabled={btnAOICOAB.disabled}
                                            >
                                                {btnAOICOAB.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtAOICOACntB}
                                                onChange={(e) => {
                                                    settxtAOICOACntB(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtAOICOATimeB}
                                                onChange={(e) => {
                                                    settxtAOICOATimeB(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>SMT-INT</TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnSMTIntFColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnSMTIntFColor
                                                    }
                                                }}
                                            >
                                                {btnSMTIntF}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtSMTIntCntF}
                                                onChange={(e) => {
                                                    settxtSMTIntCntF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtSMTIntTimeF}
                                                onChange={(e) => {
                                                    settxtSMTIntTimeF(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnSMTIntBColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnSMTIntBColor
                                                    }
                                                }}
                                            >
                                                {btnSMTIntB}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtSMTIntCntB}
                                                onChange={(e) => {
                                                    settxtSMTIntCntB(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtSMTIntTimeB}
                                                onChange={(e) => {
                                                    settxtSMTIntTimeB(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>Reject1</TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnReject1Color,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnReject1Color
                                                    }
                                                }}
                                                onClick={btnReject1_Click}
                                            >
                                                {btnReject1}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtRejectCnt1}
                                                onChange={(e) => {
                                                    settxtRejectCnt1(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtRejectTime1}
                                                onChange={(e) => {
                                                    settxtRejectTime1(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>Re-judgement</TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnTouchUpColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnTouchUpColor
                                                    }
                                                }}
                                                onClick={btnTouchUp_Click}
                                            >
                                                {btnTouchUp}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtTouchUpCnt}
                                                onChange={(e) => {
                                                    settxtTouchUpCnt(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtTouchUpTime}
                                                onChange={(e) => {
                                                    settxtTouchUpTime(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>Bending</TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnBendingColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnBendingColor
                                                    }
                                                }}
                                            >
                                                {btnBending}
                                            </Button>
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtBendingTime}
                                                onChange={(e) => {
                                                    settxtBendingTime(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        {lblBendingMachine && (
                                            <TableCell colSpan={"3"} style={{ textAlign: "left" }}>
                                                <Typography>{lblBendingMachine}</Typography>
                                            </TableCell>
                                        )}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell rowSpan={"10"}>Common</TableCell>
                                        {lblELT1.visible && (
                                            <TableCell>{lblELT1.value}</TableCell>
                                        )}
                                        {btnELT1.visible && (
                                            <TableCell>
                                                <Button

                                                    sx={{
                                                        height: "33px",
                                                        backgroundColor: btnELT1Color,
                                                        color: "white",
                                                        width: "90%",
                                                        "&:hover": {
                                                            backgroundColor: btnELT1Color
                                                        }
                                                    }}
                                                    onClick={btnELT1_Click}
                                                >
                                                    {btnELT1.value}
                                                </Button>
                                            </TableCell>
                                        )}
                                        <TableCell>
                                            {txtELTCnt1.visible && (
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    value={txtELTCnt1.value}
                                                    onChange={(e) => {
                                                        settxtELTCnt1((prevState) => ({
                                                            ...prevState,
                                                            value: e.target.value,
                                                        }));
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {txtELTTime1.visible && (
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    fullWidth
                                                    value={txtELTTime1.value}
                                                    onChange={(e) => {
                                                        settxtELTTime1((prevState) => ({
                                                            ...prevState,
                                                            value: e.target.value,
                                                        }));
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            )}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        {lblELT2.visible && (
                                            <TableCell>{lblELT2.value}</TableCell>
                                        )}
                                        {btnELT2.visible && (
                                            <TableCell>
                                                <Button

                                                    sx={{
                                                        height: "33px",
                                                        backgroundColor: btnELT2Color,
                                                        color: "white",
                                                        width: "90%",
                                                        "&:hover": {
                                                            backgroundColor: btnELT2Color
                                                        }
                                                    }}
                                                    onClick={btnELT2_Click}
                                                >
                                                    {btnELT2.value}
                                                </Button>
                                            </TableCell>
                                        )}

                                        <TableCell>
                                            {txtELTCnt2.visible && (
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    value={txtELTCnt2.value}
                                                    onChange={(e) => {
                                                        settxtELTCnt2((prevState) => ({
                                                            ...prevState,
                                                            value: e.target.value,
                                                        }));
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            )}
                                        </TableCell>

                                        {txtELTTime2.visible && (
                                            <TableCell>
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    fullWidth
                                                    value={txtELTTime2.value}
                                                    onChange={(e) => {
                                                        settxtELTTime2((prevState) => ({
                                                            ...prevState,
                                                            value: e.target.value,
                                                        }));
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </TableCell>
                                        )}
                                    </TableRow>

                                    <TableRow>
                                        {lblELT3.visible && (
                                            <TableCell>{lblELT3.value}</TableCell>
                                        )}
                                        {btnELT3.visible && (
                                            <TableCell>

                                                <Button

                                                    sx={{
                                                        height: "33px",
                                                        backgroundColor: btnELT3Color,
                                                        color: "white",
                                                        width: "90%",
                                                        "&:hover": {
                                                            backgroundColor: btnELT3Color
                                                        }
                                                    }}
                                                    onClick={btnELT3_Click}
                                                >
                                                    {btnELT3.value}
                                                </Button>
                                            </TableCell>
                                        )}

                                        <TableCell>
                                            {txtELTCnt3.visible && (
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    value={txtELTCnt3.value}
                                                    onChange={(e) => {
                                                        settxtELTCnt3((prevState) => ({
                                                            ...prevState,
                                                            value: e.target.value,
                                                        }));
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            )}
                                        </TableCell>

                                        {txtELTTime3.visible && (
                                            <TableCell>
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    fullWidth
                                                    value={txtELTTime3.value}
                                                    onChange={(e) => {
                                                        settxtELTTime3((prevState) => ({
                                                            ...prevState,
                                                            value: e.target.value,
                                                        }));
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </TableCell>
                                        )}
                                    </TableRow>

                                    <TableRow>
                                        {lblELT4.visible && (
                                            <TableCell>{lblELT4.value}</TableCell>
                                        )}
                                        {btnELT4.visible && (
                                            <TableCell>
                                                <Button

                                                    sx={{
                                                        height: "33px",
                                                        backgroundColor: btnELT4Color,
                                                        color: "white",
                                                        width: "90%",
                                                        "&:hover": {
                                                            backgroundColor: btnELT4Color
                                                        }
                                                    }}
                                                    onClick={btnELT4_Click}
                                                >
                                                    {btnELT4.value}
                                                </Button>
                                            </TableCell>
                                        )}

                                        <TableCell>
                                            {txtELTCnt4.visible && (
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    value={txtELTCnt4.value}
                                                    onChange={(e) => {
                                                        settxtELTCnt4((prevState) => ({
                                                            ...prevState,
                                                            value: e.target.value,
                                                        }));
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            )}
                                        </TableCell>

                                        {txtELTTime4.visible && (
                                            <TableCell>
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    fullWidth
                                                    value={txtELTTime4.value}
                                                    onChange={(e) => {
                                                        settxtELTTime4((prevState) => ({
                                                            ...prevState,
                                                            value: e.target.value,
                                                        }));
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </TableCell>
                                        )}
                                    </TableRow>

                                    <TableRow>
                                        {lblELT5.visible && (
                                            <TableCell>{lblELT5.value}</TableCell>
                                        )}
                                        {btnELT5.visible && (
                                            <TableCell>
                                                <Button

                                                    sx={{
                                                        height: "33px",
                                                        backgroundColor: btnELT5Color,
                                                        color: "white",
                                                        width: "90%",
                                                        "&:hover": {
                                                            backgroundColor: btnELT5Color
                                                        }
                                                    }}
                                                    onClick={btnELT5_Click}
                                                >
                                                    {btnELT5.value}
                                                </Button>
                                            </TableCell>
                                        )}

                                        <TableCell>
                                            {txtELTCnt5.visible && (
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    value={txtELTCnt5.value}
                                                    onChange={(e) => {
                                                        settxtELTCnt5((prevState) => ({
                                                            ...prevState,
                                                            value: e.target.value,
                                                        }));
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            )}
                                        </TableCell>

                                        {txtELTTime5.visible && (
                                            <TableCell>
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    fullWidth
                                                    value={txtELTTime5.value}
                                                    onChange={(e) => {
                                                        settxtELTTime5((prevState) => ({
                                                            ...prevState,
                                                            value: e.target.value,
                                                        }));
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </TableCell>
                                        )}
                                    </TableRow>

                                    <TableRow>
                                        {lblELT6.visible && (
                                            <TableCell>{lblELT6.value}</TableCell>
                                        )}
                                        {btnELT6.visible && (
                                            <TableCell>
                                                <Button

                                                    sx={{
                                                        height: "33px",
                                                        backgroundColor: btnELT6Color,
                                                        color: "white",
                                                        width: "90%",
                                                        "&:hover": {
                                                            backgroundColor: btnELT6Color
                                                        }
                                                    }}
                                                    onClick={btnELT6_Click}
                                                >
                                                    {btnELT6.value}
                                                </Button>
                                            </TableCell>
                                        )}

                                        <TableCell>
                                            {txtELTCnt6.visible && (
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    value={txtELTCnt6.value}
                                                    onChange={(e) => {
                                                        settxtELTCnt6((prevState) => ({
                                                            ...prevState,
                                                            value: e.target.value,
                                                        }));
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            )}
                                        </TableCell>

                                        {txtELTTime6.visible && (
                                            <TableCell>
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    fullWidth
                                                    value={txtELTTime6.value}
                                                    onChange={(e) => {
                                                        settxtELTTime6((prevState) => ({
                                                            ...prevState,
                                                            value: e.target.value,
                                                        }));
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </TableCell>
                                        )}
                                    </TableRow>

                                    <TableRow>
                                        {lblELT7.visible && (
                                            <TableCell>{lblELT7.value}</TableCell>
                                        )}
                                        {btnELT7.visible && (
                                            <TableCell>
                                                <Button

                                                    sx={{
                                                        height: "33px",
                                                        backgroundColor: btnELT7Color,
                                                        color: "white",
                                                        width: "90%",
                                                        "&:hover": {
                                                            backgroundColor: btnELT7Color
                                                        }
                                                    }}
                                                    onClick={btnELT7_Click}
                                                >
                                                    {btnELT7.value}
                                                </Button>
                                            </TableCell>
                                        )}

                                        <TableCell>
                                            {txtELTCnt7.visible && (
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    value={txtELTCnt7.value}
                                                    onChange={(e) => {
                                                        settxtELTCnt7((prevState) => ({
                                                            ...prevState,
                                                            value: e.target.value,
                                                        }));
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            )}
                                        </TableCell>

                                        {txtELTTime7.visible && (
                                            <TableCell>
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    fullWidth
                                                    value={txtELTTime7.value}
                                                    onChange={(e) => {
                                                        settxtELTTime7((prevState) => ({
                                                            ...prevState,
                                                            value: e.target.value,
                                                        }));
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </TableCell>
                                        )}
                                    </TableRow>

                                    <TableRow>
                                        {lblFQC.visible && (
                                            <TableCell>{lblFQC.value}</TableCell>
                                        )}
                                        {btnFQC.visible && (
                                            <TableCell>
                                                <Button

                                                    sx={{
                                                        height: "33px",
                                                        backgroundColor: btnFQCColor,
                                                        color: "white",
                                                        width: "90%",
                                                        "&:hover": {
                                                            backgroundColor: btnFQCColor
                                                        }
                                                    }}
                                                >
                                                    {btnFQC.value}
                                                </Button>
                                            </TableCell>
                                        )}

                                        {btnFQC.visible && (
                                            <TableCell></TableCell>
                                        )}
                                        {txtFQCTime.visible && (
                                            <TableCell>
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    fullWidth
                                                    value={txtFQCTime.v}
                                                    onChange={(e) => {
                                                        settxtFQCTime((prevState) => ({
                                                            ...prevState,
                                                            value: e.target.value,
                                                        }));
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            </TableCell>
                                        )}
                                        {lblFQCMachine.visible && (
                                            <TableCell colSpan={"2"} style={{ textAlign: "left" }}>
                                                <Typography>
                                                    {lblFQCMachine.value}
                                                </Typography>
                                            </TableCell>
                                        )}

                                        {lblFQCOperator.visible && (
                                            <TableCell colSpan={"1"} style={{ textAlign: "left" }}>
                                                <Typography>
                                                    {lblFQCOperator.value}
                                                </Typography>
                                            </TableCell>
                                        )}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>FinalGate</TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnFinalGateColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnFinalGateColor
                                                    }
                                                }}
                                                onClick={btnFinalGate_Click}
                                            >
                                                {btnFinalGate}
                                            </Button>
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtFinalGateTime}
                                                onChange={(e) => {
                                                    settxtFinalGateTime(e.target.value);
                                                }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        {lblFinalGateRemark && (
                                            <TableCell colSpan={"3"} style={{ textAlign: "left" }}>
                                                <Typography>{lblFinalGateRemark}</Typography>
                                            </TableCell>
                                        )}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>ScanPack</TableCell>
                                        <TableCell>
                                            <Button

                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: btnScanPackColor,
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: btnScanPackColor
                                                    }
                                                }}
                                            >
                                                {btnScanPack}
                                            </Button>
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            {txtPackingTime.visible && (
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    fullWidth
                                                    value={txtPackingTime.value}
                                                    onChange={(e) => {
                                                        settxtPackingTime((prevState) => ({
                                                            ...prevState,
                                                            value: e.target.value,
                                                        }));
                                                    }}
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell colSpan={"3"}
                                            style={{
                                                textAlign: "left",
                                                backgroundColor: lblScanPackRemarkColor,
                                                color: "#fff"
                                            }}
                                        >
                                            <Typography>{lblScanPackRemark}</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div style={{ marginTop: "50px" }}>
                        <a href="/TraceabilitySystem">Return To Menu</a>
                    </div>
                </Box>
            </Card>
        </div>
    )
};

export default PieceTraceView;