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
import Header from "../Header/Header";
import "../ScanSMTConfirmMOTP1/ScanSMTConfirmMOTP1.css";
import { fn_ScanSMTConfirmMOTP1 } from "./fn_ScanSMTConfirmMOTP1";

function ScanSMTConfirmMOTP1() {
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
                        marginLeft: "-20px",
                        marginTop: "-10px"
                    }}
                >
                    <TableContainer
                        component={Paper}
                        style={{
                            width: "430px",
                            margin: "4px",
                        }}
                    >
                        <Table className="TbScanSMTConfirm">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        <Typography variant="h6">
                                            P1 Confirm Process
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Scan Lot :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            // inputRef={(el) => (inputLot.current = el)}
                                            fullWidth
                                        // value={txtLot}
                                        // disabled={txtLotDisabled}
                                        // style={{
                                        //     backgroundColor: txtLotDisabled ? "#e0e0e0" : "inherit",
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLot(e.target.value);
                                        // }}
                                        // onKeyDown={(e) => {
                                        //     if (e.key === "Enter") {
                                        //         handleChangeLot();
                                        //     }
                                        // }}
                                        // onBlur={() => {
                                        //     if (txtLot !== "") {
                                        //         handleChangeLot();
                                        //     }
                                        // }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className="Bt_ibtBack"
                                        // onClick={ibtBackClick}
                                        >
                                            <Tooltip title="Lock" placement="right-end">
                                                <BackspaceIcon className="Icon_ibtBack" />
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
                                            // disabled={selProDisabled}
                                            // style={{
                                            //     backgroundColor: selProDisabled ? "#e0e0e0" : "inherit",
                                            // }}
                                            // value={selProduct}
                                            // onChange={(e, value) => handleChangeProduct(value)}
                                            // options={Productdata.map((item) => item.prd_name)}
                                            renderInput={(params) => (
                                                <TextField
                                                    // inputRef={(el) => (ddlProduct.current = el)}
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
                                        <Typography>Lot :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>[lblLot]</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* {pnlLog && ( */}
                    <Paper
                        elevation={3}
                        className="Card-lblLog"
                        style={{
                            width: "433px",
                            marginLeft: "23px",
                        }}
                    >
                        {/* {lblLog} */}
                    </Paper>
                    {/* )} */}

                    <div className="divgvSerialConfirm" style={{ position: "relative" }}>
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
                                    {/* {Array.from({ length: gvSerialData.length }, (_, index) => ( */}
                                    <TableRow>
                                        <TableCell
                                            align="center"
                                        >
                                            {/* {index + 1} */}
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                            // value={txtgvSerial[index] || ""}
                                            // inputRef={el => inputgvSerial.current[index] = el}
                                            // onChange={(e) => {
                                            //     handleChangeSerial(index, e);
                                            // }}
                                            // onKeyDown={(e) => handleKeygvSerial(e, index)}
                                            // onBlur={(e) => handleKeygvSerial(e, index)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    {/* ))} */}
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
                                // onClick={btnSaveClick}
                                >
                                    Save
                                </Button>{" "}
                                &nbsp;&nbsp;
                                <Button
                                    className="BtCancel"
                                // onClick={btnCancelClick}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </TableContainer>
                    </div>
                </Box>

                <div className="divgvScanResultCon">
                    <>
                        {/* <img
                            className="Img_GvResult"
                            style={{ marginLeft: "35%", }}
                            src={Pageimg} // Import the image
                            alt="Description of the image"
                        /> */}
                    </>
                    <>

                        <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                            <Paper
                                className="Card-lblResult"
                                style={{
                                    // background: lblResultcolor,
                                    width: "100%",
                                    marginLeft: "25px"
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    style={{ paddingTop: "5px", color: "#fff" }}
                                >
                                    {/* {lblResult} */}
                                </Typography>
                            </Paper>
                        </div>
                        <br />
                        <AntTable
                            // columns={columns}
                            // dataSource={gvScanData}
                            // rowKey={(record) => record.SEQ}
                            style={{
                                width: '98%',
                                marginLeft: "22px"
                            }}
                            pagination={false}
                            size="small"
                            bordered
                            className="tableGvResult"
                        />

                    </>
                </div>
            </Card>
        </div>
    )
};

export default ScanSMTConfirmMOTP1;