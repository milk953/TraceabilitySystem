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
import Pageimg from "/src/assets/1.jpg";
import { Table as AntTable, Button as AntButton } from 'antd';
import "../Common/StyleCommon.css";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSMTSerialShtConfirm.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTSerialShtConfirm } from "./fn_ScanSMTSerialShtConfirm";
import { fn_Homepage } from "../Homepage/fn_Homepage";

function ScanSMTSerialShtConfirm() {

    const { menuName } = fn_Homepage();
    const {
        txtLotNo, settxtLotNo, selProduct, Productdata, lblTotalSht, visiblelog, lblLog, pnlSerial, txtLotDisabled, selProDisabled,
        gvScanResult, inputLot, ddlProduct, lblResultcolor, gvScanData, txtgvSerial, handleChangeLot, ibtBackClick, lblResult,
        handleChangeProduct, handleChangeSerial, btnSaveClick, btnCancelClick, hfShtScan, gvSerialData, inputgvSerial,
        handleKeygvSerial, columns, settxtgvSerial
    } = fn_ScanSMTSerialShtConfirm();
    let data = [];

    return (
        <div>
            <Hearder />
            <Card
                component={Paper}
                className="Card-Common"
                sx={{ display: "flex" }}
            >
                <Box justifyContent="space-between">
                    <TableContainer
                        component={Card}
                        style={{
                            width: "400px",
                            // margin: "4px",
                        }}
                    >
                        <Table className="Header_Left">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        {/* <Typography variant="h6">
                                            Confirm Sheet No.
                                        </Typography> */}
                                        {menuName ? menuName : "Confirm Sheet No."}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography>Lot No. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            inputRef={inputLot}
                                            fullWidth
                                            value={txtLotNo.trim()}
                                            disabled={txtLotDisabled}
                                            style={{
                                                backgroundColor: txtLotDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            onChange={(e) => {
                                                settxtLotNo(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangeLot();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className="btIcon" onClick={ibtBackClick}>
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
                                    <TableCell colSpan={2}>
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
                                                    {...params}
                                                    inputRef={ddlProduct}
                                                    size="small"
                                                    sx={{ textAlign: "left" }}
                                                />
                                            )}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography>Total Sht :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{lblTotalSht}</Typography>
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
                                width: "403px",
                                marginLeft: "2px",
                            }}
                        >
                            {lblLog}
                        </Paper>
                    )}

                    {pnlSerial && (
                        <div className="divgvSerialSht">
                            <TableContainer
                                component={Card}
                                style={{
                                    width: "400px",
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
                                            <TableCell>Sheet No.</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* {Array.from({ length: hfSerialCount }, (_, index) => ( */}
                                        {console.log(txtgvSerial, "txtgvSerial")}
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
                </Box>

                <div className="divgvScanResultSht">

                    {gvScanResult === false && (
                        <>
                            <img
                                className="Img_GvResult"
                                style={{ marginLeft: "35%", }}
                                src={Pageimg} // Import the image
                                alt="Description of the image"
                            />
                        </>
                    )}

                    {gvScanResult && (
                        <>

                            <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                                <Paper
                                    className="Card-lblResult"
                                    style={{
                                        background: lblResultcolor,
                                        width: "100%",
                                    }}
                                >
                                    <Typography
                                        variant="h4"
                                        style={{ paddingTop: "5px", color: "#fff" }}
                                    >
                                        {lblResult}
                                    </Typography>
                                </Paper>
                            </div>

                            <AntTable
                                columns={columns}
                                dataSource={gvScanData}
                                rowKey={(record) => record.SEQ}
                                style={{ width: '100%' }}
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

export default ScanSMTSerialShtConfirm;