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
import { Table as AntTable, Button as AntButton } from 'antd';
import "../Common/StyleCommon.css";
import Pageimg from "/src/assets/1.jpg";
import BackspaceIcon from "@mui/icons-material/Backspace";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import "/src/Page/ScanSMTSerialPcsAutoTray/ScanSMTSerialPcsAutoTray.css";
import Header from "../Header/Header";
import { fn_ScanSMTSerialPcsAutoTray } from "./fn_ScanSMTSerialPcsAutoTray";
import { fn_Homepage } from "../Homepage/fn_Homepage";

function ScanSMTSerialPcsAutoTray() {

    const { menuName } = fn_Homepage();
    const {
        txtLot, selProduct, Productdata, txtPackingNo, lblLot, lblLotTotal, txtPcsTray, lblSerialNG, lblLog, visiblelog,
        lblResult, lblResultcolor, lblTime, pnlPackingGroup, pnlSerial, hfSerialCount, txtgvSerial, txtLotDisabled, selProDisabled,
        txtPackingNoDisabled, inputLot, ddlProduct, inputPackingNo, inputgvSerial, inputTray, handleChangeLot, ibtBackClick,
        handleChangeProduct, handleChangePackingNo, ibtPackingBackClick, handleChangePcsTray, settxtLot, settxtPackingNo,
        settxtPcsTray, handleChangeSerial, handleKeygvSerial, btnSaveClick, btnCancelClick, gvScanData, gvScanResult, lblTimecolor,
        lblLastTray, columns, settxtgvSerial, gvSerialData
    } = fn_ScanSMTSerialPcsAutoTray();
    let data = []

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
                        component={Card}
                        style={{
                            width: "420px",
                        }}
                    >
                        <Table className="Header_Left">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        {/* <Typography variant="h6">
                                            Final Gate Only Good
                                        </Typography> */}
                                        {menuName ? menuName : "Final Gate Only Good"}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography> Scan Lot :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            inputRef={inputLot}
                                            fullWidth
                                            value={txtLot.trim()}
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
                                    <TableCell align="right">
                                        <Typography>Product :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={4}>
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
                                        <TableCell align="right">
                                            <Typography> Packing No :</Typography>
                                        </TableCell>
                                        <TableCell colSpan={3}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                inputRef={inputPackingNo}
                                                fullWidth
                                                value={txtPackingNo.trim()}
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
                                    <TableCell align="right">
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
                                        // style={{ color: "green" }}
                                        >
                                            {lblLotTotal}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">
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
                                            style={{ color: "red" }}
                                        >
                                            NG :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                        // style={{ color: "red" }}
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
                                component={Card}
                                style={{
                                    width: "420px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    marginTop: "10px",
                                    border: "1px solid #d9d9d9",
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
                                        {/* {Array.from({ length: hfSerialCount }, (_, index) => ( */}
                                        {txtgvSerial.map((serial, index) => (
                                            <tr key={index}>
                                                <td align="center">{index + 1}</td>
                                                <td>
                                                    <input
                                                        // className="input_txt"
                                                        // size="small"
                                                        className="styleSeraial"
                                                        type="text"
                                                        fullWidth
                                                        // value={txtgvSerial[index] || ""}
                                                        defaultValue={serial}
                                                        // inputRef={(el) =>
                                                        //   (inputgvSerial.current[index] = el)
                                                        // }
                                                        ref={(el) =>
                                                            (inputgvSerial.current[index] = el)
                                                        }
                                                        onChange={(e) => {
                                                            handleChangeSerial(index, e);
                                                        }}
                                                        // onKeyDown={(e) => handleKeygvSerial(e, index)}
                                                        onKeyDown={async (event) => {
                                                            if (event.key === "Enter") {
                                                                event.preventDefault();
                                                                data = await handleChangeSerial(index, event);
                                                                if (index < gvSerialData.length - 1) {
                                                                    inputgvSerial.current[index + 1].focus();
                                                                } else {
                                                                    settxtgvSerial(data);
                                                                    btnSaveClick(data);
                                                                    event.target.blur();
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </TableBody>
                                </Table>
                                <div style={{
                                    marginTop: "8px",
                                    display: "flex",
                                    justifyContent: "center",
                                    // marginLeft: "5px",
                                    // marginBottom: "2px"
                                }}
                                >
                                    <AntButton className="BtSave"
                                        type="primary"
                                        onClick={() => {
                                            settxtgvSerial(data);
                                            btnSaveClick(data);
                                        }}
                                    >
                                        Save
                                    </AntButton>
                                    &nbsp;&nbsp;
                                    <AntButton
                                        className="ButtonDelete"
                                        style={{ height: "30px" }}
                                        type="primary"
                                        onClick={btnCancelClick}
                                    >
                                        Cancel
                                    </AntButton>
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
                                    //elevation={3}
                                    style={{
                                        background: lblResultcolor,
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography variant="h4" style={{ paddingTop: "5px", color: "#fff" }}>
                                        {lblResult}
                                    </Typography>
                                </Paper>

                                <Paper
                                    className="Card-lblResult"
                                    style={{
                                        background: lblTimecolor,
                                        textAlign: "center",
                                        marginLeft: "10px",
                                        width: "30%",
                                        display: lblTime === '' ? 'none' : '',
                                    }}
                                >
                                    <Typography variant="h4" style={{ paddingTop: "5px", color: "#fff" }}>
                                        {lblTime}
                                    </Typography>
                                </Paper>
                            </div>

                            <AntTable
                                columns={columns}
                                dataSource={gvScanData}
                                rowKey={(record) => record.SEQ}
                                style={{ width: "100%" }}
                                pagination={false}
                                size="small"
                                bordered
                                className="tableGvResult"
                                rowClassName={(record) => (record.SCAN_RESULT === "NG" ? "row-red" : record.SCAN_RESULT === "OK" ? "row-green" : "")}
                            />
                        </>
                    )}
                </div>

            </Card>
        </div>
    )
};

export default ScanSMTSerialPcsAutoTray;