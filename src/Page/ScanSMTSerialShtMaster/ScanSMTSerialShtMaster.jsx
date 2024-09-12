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
import "/src/Page/ScanSMTSerialShtMaster/ScanSMTSerialShtMaster.css";
import { fn_ScanSMTSerialShtMaster } from "./fn_ScanSMTSerialShtMaster";

function ScanSMTSerialShtMaster() {
    const {
        txtLotNo, settxtLotNo, selProduct, Productdata, txtLotRef, settxtLotRef, txtMasterCode, settxtMasterCode, lblTotalSht, lblTotalPcs,
        txtRollLeaf, settxtRollLeaf, txtMachineNo, settxtMachineNo, pnlRollLeaf, pnlMachine, pnlLog, lblLog, lblResult, lblResultcolor,
        pnlBackSide, txtSideBack, pnlFrontSide, txtSideFront, pnlSerial, gvSerialData, gvScanResult, gvScanData, txtgvSerial, txtLotDisabled,
        selProDisabled, txtRollLeafDisabled, inputLot, ddlProduct, inputRollLeaf, inputMachineNo, inputSideBack, inputgvSerial, inputMasterCode,
        handleChangeLot, ibtBackClick, handleChangeProduct, handleChangeLotRef, handleChangeMasterCode, handleChangeRollLeaf, handleChangeMachine,
        handleChangeSerial, handleChangegvBackSide, handleChangegvFontSide, btnSaveClick, btnCancelClick, handleKeygvSerial, handleKeySideBack,
        columns, gvBackSide
    } = fn_ScanSMTSerialShtMaster();
    return (
        <div>
            <Header />
            <h1>Connect Master Sht & Pcs</h1>
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
                        <Table className="TbScanSMTSerialShtMas">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography variant="h6">
                                            Connect Master Sht & Pcs
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Lot No. :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            inputRef={(el) => (inputLot.current = el)}
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
                                        <Button className="Bt_ibtBack"
                                            onClick={ibtBackClick}
                                        >
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
                                                    inputRef={(el) => (ddlProduct.current = el)}
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
                                        <Typography>Lot Ref. No. :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            fullWidth
                                            value={txtLotRef}
                                            onChange={(e) => {
                                                settxtLotRef(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangeLotRef();
                                                }
                                            }}
                                            onBlur={handleChangeLotRef}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Master Code :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            inputRef={(el) => (inputMasterCode.current = el)}
                                            fullWidth
                                            value={txtMasterCode}
                                            onChange={(e) => {
                                                settxtMasterCode(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangeMasterCode();
                                                }
                                            }}
                                            onBlur={handleChangeMasterCode}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Total Sht :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{lblTotalSht}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Total Pcs :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{lblTotalPcs}</Typography>
                                    </TableCell>
                                </TableRow>
                                {pnlRollLeaf && (
                                    <>
                                        <TableRow>
                                            <TableCell>
                                                <Typography>Roll Leaf No. :</Typography>
                                            </TableCell>
                                            <TableCell colSpan={3}>
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    inputRef={(el) => (inputRollLeaf.current = el)}
                                                    fullWidth
                                                    value={txtRollLeaf}
                                                    disabled={txtRollLeafDisabled}
                                                    style={{
                                                        backgroundColor: txtRollLeafDisabled ? "#e0e0e0" : "inherit",
                                                    }}
                                                    onChange={(e) => {
                                                        settxtRollLeaf(e.target.value);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            handleChangeRollLeaf();
                                                        }
                                                    }}
                                                    onBlur={handleChangeRollLeaf}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )}

                                {pnlMachine && (
                                    <TableRow>
                                        <TableCell>
                                            <Typography>Machine No. :</Typography>
                                        </TableCell>
                                        <TableCell colSpan={3}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                inputRef={(el) => (inputMachineNo.current = el)}
                                                fullWidth
                                                value={txtMachineNo}
                                                onChange={(e) => {
                                                    settxtMachineNo(e.target.value);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleChangeMachine();
                                                    }
                                                }}
                                                onBlur={handleChangeMachine}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {pnlBackSide && (
                        <div className="divgvBackSideMas">
                            <TableContainer
                                component={Paper}
                                style={{
                                    width: "100%",
                                    marginBottom: "1px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Table
                                    sx={{
                                        minWidth: 380,
                                    }}
                                    aria-label="simple table"
                                >
                                    <TableBody>
                                        {Array.from(
                                            { length: gvBackSide.length },
                                            (_, index) => (
                                                <TableRow
                                                    key={index}
                                                >
                                                    <TableCell
                                                        sx={{ borderRight: "1px solid #d9d9d9" }}
                                                        align="center"
                                                    >
                                                        {gvBackSide[index].SEQ}
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            className="input_txt"
                                                            size="small"
                                                            fullWidth
                                                            value={txtSideBack[index] || ""}
                                                            inputRef={el => inputSideBack.current[index] = el}
                                                            onChange={(e) => {
                                                                handleChangegvBackSide(index, e);
                                                            }}
                                                            onKeyDown={(e) => handleKeySideBack(e, index)}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )}

                    {pnlFrontSide && (
                        <div className="divgvFrontSideShtMas">
                            <TableContainer
                                component={Paper}
                                style={{
                                    width: "100%",
                                    marginBottom: "1px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Table
                                    sx={{
                                        minWidth: 380,
                                    }}
                                    aria-label="simple table"
                                >
                                    <TableBody>
                                        <TableRow>
                                            <TableCell
                                                sx={{ borderRight: "1px solid #d9d9d9" }}
                                                align="center"
                                            >

                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    className="input_txt"
                                                    size="small"
                                                    fullWidth
                                                    value={txtSideFront}
                                                    onChange={(e) => {
                                                        handleChangegvFontSide(e.target.value);
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )}

                    {pnlLog && (
                        <Paper
                            elevation={3}
                            className="Card-lblLog"
                            style={{
                                width: "433px",
                                marginLeft: "23px",
                            }}
                        >
                            {lblLog}
                        </Paper>
                    )}

                    {pnlSerial && (
                        <div className="divgvSerialShtMas" style={{ position: "relative" }}>
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
                                            <TableCell>Sheet</TableCell>
                                            <TableCell>No.</TableCell>
                                            <TableCell>Serial No.</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Array.from({ length: gvSerialData.length }, (_, index) => (
                                            <TableRow key={index}>
                                                <TableCell
                                                    sx={{ borderRight: "1px solid #d9d9d9" }}
                                                    align="center"
                                                >
                                                    {gvSerialData[index].SHEET}
                                                </TableCell>
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
                                                        onBlur={(e) => handleKeygvSerial(e, index)}
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
                    )
                    }
                </Box >

                <div className="divgvScanResultShtMas" >
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
}

export default ScanSMTSerialShtMaster;