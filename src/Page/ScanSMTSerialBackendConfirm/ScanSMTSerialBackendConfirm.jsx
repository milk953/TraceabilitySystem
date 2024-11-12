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
import BackspaceIcon from "@mui/icons-material/Backspace";
import "/src/Page/ScanSMTSerialBackendConfirm/ScanSMTSerialBackendConfirm.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTSerialBackendConfirm } from "./fn_ScanSMTSerialBackendConfirm";
import Pageimg from "/src/assets/1.jpg";
function ScanSMTSerialBackendConfirm() {

    const {
        txtLotNo, settxtLotNo, selProduct, Productdata, txtTotalPCS, settxtTotalPCS, lblLog, visiblelog, lblResultcolor, lblResult,
        pnlSerial, gvScanResult, txtgvSerial, txtLotDisabled, selProDisabled, txtTotalDisabled, gvScanData, handleChangeLot,
        handleChangeProduct, handleChangeTotalPCS, hfSerialCount, ibtBackClick, btnSaveClick, btnCancelClick, handleChangeSerial, inputLot,
        ddlProduct, inputTotal, inputgvSerial, handleKeygvSerial, columns
    } = fn_ScanSMTSerialBackendConfirm();

    return (
        <div>
            <Hearder />
            <Card
                component={Paper}
                className="Card-Common"
                sx={{ display: "flex" }}
            >
                <Box justifyContent="space-between"
                    sx={{
                        marginLeft: "0px",
                    }}
                >
                    <TableContainer
                        component={Paper}
                        style={{
                            width: "400px",
                            margin: "4px",
                        }}
                    >
                        <Table className="TbScanSMTSerialBack">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        <Typography variant="h6">
                                            SMT Backend E-Mapping
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Lot No. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            inputRef={inputLot}
                                            fullWidth
                                            value={txtLotNo}
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
                                            onBlur={() => {
                                                if (txtLotNo !== "") {
                                                    handleChangeLot();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className="Bt_ibtBack" onClick={ibtBackClick}>
                                            <Tooltip title="Clear Lot" placement="right-end">
                                                <BackspaceIcon className="Icon_ibtBack"/>
                                            </Tooltip>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Product :</Typography>
                                    </TableCell>
                                    <TableCell>
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
                                    <TableCell>
                                        <Typography>Total Sht :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                inputRef={inputTotal}
                                                fullWidth
                                                value={txtTotalPCS}
                                                disabled={txtTotalDisabled}
                                                style={{
                                                    backgroundColor: txtTotalDisabled ? "#e0e0e0" : "inherit",
                                                    width: "60px"
                                                }}
                                                onChange={(e) => {
                                                    settxtTotalPCS(e.target.value);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleChangeTotalPCS();
                                                    }
                                                }}
                                                InputProps={{
                                                    inputProps: {
                                                        style: {
                                                            textAlign: 'center',
                                                        },
                                                    },
                                                }}
                                            />
                                            <Typography style={{ marginLeft: "10px" }}
                                            >
                                                Pcs
                                            </Typography>
                                        </Box>
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
                                width: "404px",
                                marginLeft: "20px",
                            }}
                        >
                            {lblLog}
                        </Paper>
                    )}

                    {pnlSerial && (
                        <div className="divgvSerialBack" style={{ position: "relative" }}>
                            <TableContainer
                                component={Paper}
                                style={{
                                    width: "100%",
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
                                        {Array.from({ length: txtTotalPCS }, (_, index) => (
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
                </Box>

                <div className="divgvScanResultBack" >
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
                                        width: "70%",
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
                            <br />
                            <AntTable
                                columns={columns}
                                dataSource={gvScanData}
                                rowKey={(record) => record.SEQ}
                                style={{ width: '100%' }}
                                pagination={false}
                                size="small"
                                bordered
                                className="tableGvResult"
                            />

                        </>
                    )}
                </div>
            </Card>
        </div>
    )
};

export default ScanSMTSerialBackendConfirm;