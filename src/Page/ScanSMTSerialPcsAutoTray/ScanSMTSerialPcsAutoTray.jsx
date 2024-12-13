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
import BackspaceIcon from "@mui/icons-material/Backspace";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import "/src/Page/ScanSMTSerialPcsAutoTray/ScanSMTSerialPcsAutoTray.css";
import Header from "../Header/Header";
import { fn_ScanSMTSerialPcsAutoTray } from "./fn_ScanSMTSerialPcsAutoTray";

function ScanSMTSerialPcsAutoTray() {

    const {
        txtLot, selProduct, Productdata, txtPackingNo, lblLot, lblLotTotal, txtPcsTray, lblSerialNG, lblLog, visiblelog,
        lblResult, lblResultcolor, lblTime, pnlPackingGroup, pnlSerial, hfSerialCount, txtgvSerial, txtLotDisabled, selProDisabled,
        txtPackingNoDisabled, inputLot, ddlProduct, inputPackingNo, inputgvSerial, inputTray, handleChangeLot, ibtBackClick,
        handleChangeProduct, handleChangePackingNo, ibtPackingBackClick, handleChangePcsTray, settxtLot, settxtPackingNo,
        settxtPcsTray, handleChangeSerial, handleKeygvSerial, btnSaveClick, btnCancelClick, gvScanData, gvScanResult, lblTimecolor,
        lblLastTray, columns
    } = fn_ScanSMTSerialPcsAutoTray();

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
                        // marginLeft: "-6px",
                        // marginTop: "-10px"
                    }}
                >
                    <TableContainer
                        component={Paper}
                        style={{
                            width: "420px",
                            margin: "4px",
                        }}
                    >
                        <Table className="TbScanSMTSerialPcs">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography variant="h6">
                                            Final Gate Only Good
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography> Scan Lot :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            inputRef={inputLot}
                                            fullWidth
                                            value={txtLot}
                                            disabled={txtLotDisabled}
                                            style={{
                                                backgroundColor: txtLotDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            onChange={(e) => {
                                                settxtLot(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangeLot();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className="Bt_ibtBack" onClick={ibtBackClick}>
                                            <Tooltip title="Clear Lot" placement="right-end">
                                                <BackspaceIcon className="Icon_ibtBack" />
                                            </Tooltip>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Product :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <Autocomplete
                                            className="Select_dropDown"
                                            disabled={selProDisabled}
                                            style={{
                                                backgroundColor: selProDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            value={selProduct}
                                            onChange={(e, value) => handleChangeProduct(value)}
                                            options={Productdata.map((item) => item.prd_name)}
                                            renderInput={(params) => (
                                                <TextField
                                                    inputRef={ddlProduct}
                                                    {...params}
                                                    size="small"
                                                    sx={{ textAlign: "left" }}
                                                />
                                            )}
                                        />
                                    </TableCell>
                                </TableRow>

                                {pnlPackingGroup && (
                                    <TableRow>
                                        <TableCell>
                                            <Typography> Packing No :</Typography>
                                        </TableCell>
                                        <TableCell colSpan={3}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                inputRef={inputPackingNo}
                                                fullWidth
                                                value={txtPackingNo}
                                                disabled={txtPackingNoDisabled}
                                                style={{
                                                    backgroundColor: txtPackingNoDisabled ? "#e0e0e0" : "inherit",
                                                }}
                                                onChange={(e) => {
                                                    settxtPackingNo(e.target.value);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleChangePackingNo();
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button className="Bt_ibtBack" onClick={ibtPackingBackClick}>
                                                <Tooltip title="Clear Lot" placement="right-end">
                                                    <BackspaceIcon className="Icon_ibtBack" />
                                                </Tooltip>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}

                                <TableRow>
                                    <TableCell>
                                        <Typography>Lot :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{lblLot}</Typography>
                                    </TableCell>
                                    <TableCell id="lblLotNG">
                                        <Typography
                                            style={{ color: "green" }}
                                        >
                                            OK :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            style={{ color: "green" }}
                                        >
                                            {lblLotTotal}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Pcs/Tray :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                inputRef={inputTray}
                                                value={txtPcsTray}
                                                style={{
                                                    width: "60px"
                                                }}
                                                onChange={(e) => {
                                                    settxtPcsTray(e.target.value);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleChangePcsTray();
                                                    }
                                                }}
                                            />
                                            <Typography style={{ marginLeft: "10px" }}>
                                                {lblLastTray}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            style={{ color: "#ff4d4f" }}
                                        >
                                            NG :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            style={{ color: "#ff4d4f" }}
                                        >
                                            {lblSerialNG}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {visiblelog && (
                        <Paper
                            elevation={3}
                            className="Card-lblLog"
                            style={{
                                width: "420px",
                                //marginLeft: "22px",
                            }}
                        >
                            {lblLog}
                        </Paper>
                    )}

                    {pnlSerial && (
                        <div className="divgvSerialPcs">
                            <TableContainer
                                component={Paper}
                                style={{
                                    width: "460px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell>Serial No.</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Array.from({ length: hfSerialCount }, (_, index) => (
                                            <TableRow key={index}>
                                                <TableCell
                                                    sx={{ borderRight: "1px solid #d9d9d9" }}
                                                    align="center"
                                                >
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        className="input_txt"
                                                        size="small"
                                                        fullWidth
                                                        value={txtgvSerial[index] || ""}
                                                        inputRef={el => inputgvSerial.current[index] = el}
                                                        onChange={(e) => {
                                                            handleChangeSerial(index, e);
                                                        }}
                                                        onKeyDown={(e) => handleKeygvSerial(e, index)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <div style={{
                                    marginTop: "auto",
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "10px",
                                    marginLeft: "5px",
                                    marginBottom: "2px"
                                }}
                                >
                                    <Button
                                        className="BtSave"
                                        onClick={btnSaveClick}
                                    >
                                        Save
                                    </Button>{" "}
                                    &nbsp;&nbsp;
                                    <Button
                                        className="BtCancel"
                                        onClick={btnCancelClick}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </TableContainer>
                        </div>
                    )}
                    {/* <Button
                        style={{
                            width: '1px',
                            height: '1px',
                            padding: "0px"
                        }}
                        onClick={btnHiddenClick}
                    >
                        <FileDownloadOutlinedIcon />
                    </Button> */}
                </Box>


                <div className="divgvScanResultPcs">
                    {gvScanResult === false && (
                        <>
                            <img
                                className="Img_GvResult"
                                style={{
                                    marginLeft: "35%",
                                }}
                                src={Pageimg} // Import the image
                                alt="Description of the image"
                            />
                        </>
                    )}


                    {gvScanResult && (
                        <>
                            <div className="gvScanResultContainer">
                                <Paper
                                    className="Card-lblResult"
                                    elevation={3}
                                    style={{
                                        background: lblResultcolor,
                                        textAlign: "center",
                                        width: "70%",
                                    }}
                                >
                                    <Typography variant="h4" style={{ paddingTop: "3px", color: "#fff" }}>
                                        {lblResult}
                                    </Typography>
                                </Paper>

                                <Paper
                                    className="Card-lblResult"
                                    elevation={3}
                                    style={{
                                        background: lblTimecolor,
                                        textAlign: "center",
                                        marginLeft: "10px",
                                        width: "30%",
                                    }}
                                >
                                    <Typography variant="h4" style={{ paddingTop: "3px", color: "#fff" }}>
                                        {lblTime}
                                    </Typography>
                                </Paper>
                            </div>

                            <AntTable
                                columns={columns}
                                dataSource={gvScanData.filter((record) => record.SERIAL !== "")}
                                rowKey={(record) => record.SEQ}
                                style={{ width: "100%" }}
                                pagination={false}
                                size="small"
                                bordered
                                className="tableGvResult"
                                //rowClassName={(record) => (record.SCAN_RESULT === "NG" ? "row-red" : record.SCAN_RESULT ===  "OK" ? "row-green" : "")}
                            />
                        </>
                    )}
                </div>

            </Card>
        </div>
    )
};

export default ScanSMTSerialPcsAutoTray;