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
import Header from "../Header/Header";
import "./ScanSMTSerialSht.css";
import { fn_ScanSMTSerialSht } from "./fn_ScanSMTSerialSht";
import { fn_Homepage } from "../Homepage/fn_Homepage";

function ScanSMTSerialSht() {

    const { menuName } = fn_Homepage();
    const {
        txtLotNo, settxtLotNo, selProduct, Productdata, txtLotRef, settxtLotRef, lblTotalSht, lblTotalPcs, txtRollLeaf, settxtRollLeaf,
        lblCheckRoll, lblCheckRollcolor, txtMachineNo, settxtMachineNo, pnlRollLeaf, pnlMachine, pnlLog, lblLog, lblResult, lblResultcolor,
        pnlBoard, txtBoardNoB, settxtBoardNoB, txtBoardNoF, settxtBoardNoF, pnlBackSide, hfShtScan, txtSideBack, gvBackSide, pnlFrontSide,
        txtSideFront, pnlSerial, gvSerialData, gvScanResult, gvScanData, txtgvSerial, handleChangeBoardNoB, txtLotDisabled, selProDisabled,
        txtRollLeafDisabled, inputLot, ddlProduct, inputRollLeaf, inputMachineNo, inputSideBack, inputgvSerial, handleChangeLot, ibtBackClick,
        handleChangeProduct, handleChangeLotRef, handleChangeRollLeaf, handleChangeMachine, handleChangeSerial, handleChangegvBackSide, handleChangegvFontSide,
        btnSaveClick, btnCancelClick, handleKeygvSerial, handleKeySideBack, handleChangeBoardNoF, columns, settxtgvSerial
    } = fn_ScanSMTSerialSht();
    let data = []
    return (
        <div>
            <Header />
            <Card
                component={Paper}
                className="Card-Common"
                sx={{ display: "flex" }}
            >
                <Box >
                    <TableContainer
                        component={Card}
                        style={{
                            width: "431px",
                            // margin: "4px",
                        }}
                    >
                        <Table className="Header_Left">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        {/* <Typography variant="h6">
                                            SMT Connect Sht & Pcs
                                        </Typography> */}
                                        {menuName ? menuName : "SMT Connect Sht & Pcs"}
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
                                            id="txtLot"
                                            className="input_txt"
                                            size="small"
                                            inputRef={inputLot}
                                            fullWidth
                                            // value={txtLotNo.trim()}
                                            disabled={txtLotDisabled}
                                            style={{
                                                backgroundColor: txtLotDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            // onChange={(e) => {
                                            //     settxtLotNo(e.target.value);
                                            // }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangeLot();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button id="ibtback" className="Bt_ibtBack" onClick={ibtBackClick}>
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
                                        <FormControl fullWidth>
                                            {/* <Autocomplete
                                                id="ddlProduct"
                                                className="Select_dropDown"
                                                disabled={selProDisabled}
                                                style={{
                                                    backgroundColor: selProDisabled ? "#e0e0e0" : "inherit",
                                                }}
                                                //value={selProduct}
                                                //onChange={(e, value) => handleChangeProduct(value)}
                                                options={Productdata.map((item) => item.prd_name)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        inputRef={ddlProduct}
                                                        {...params}
                                                        size="small"
                                                        sx={{ textAlign: "left" }}
                                                    />
                                                )}
                                            /> */}
                                            <select
                                                id="ddlProduct"
                                                className="Select_dropDown2"
                                                disabled={selProDisabled}
                                                style={{
                                                    width: "98%",
                                                    backgroundColor: selProDisabled
                                                        ? "#e0e0e0"
                                                        : "inherit",
                                                }}
                                                onChange={(e, value) =>
                                                    handleChangeProduct(value)
                                                }
                                            >
                                                {Productdata.map((item, index) => (
                                                    <option key={index} value={item.prd_name}>
                                                        {item.prd_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography>Lot Ref. No. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtLotRef"
                                            className="input_txt"
                                            size="small"
                                            fullWidth
                                            // value={txtLotRef}
                                            // onChange={(e) => {
                                            //     settxtLotRef(e.target.value);
                                            // }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangeLotRef();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography>Total Sht :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography id="lblTotalSht">{lblTotalSht}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography>Total Pcs :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography id="lblTotalPcs">{lblTotalPcs}</Typography>
                                    </TableCell>
                                </TableRow>
                                {pnlRollLeaf && (
                                    <>
                                        <TableRow>
                                            <TableCell align="right">
                                                <Typography>Roll Leaf No. :</Typography>
                                            </TableCell>
                                            <TableCell colSpan={3}>
                                                <TextField
                                                    id="txtRollLeaf"
                                                    className="input_txt"
                                                    size="small"
                                                    inputRef={inputRollLeaf}
                                                    fullWidth
                                                    //value={txtRollLeaf}
                                                    disabled={txtRollLeafDisabled}
                                                    style={{
                                                        backgroundColor: txtRollLeafDisabled ? "#e0e0e0" : "inherit",
                                                    }}
                                                    // onChange={(e) => {
                                                    //     settxtRollLeaf(e.target.value);
                                                    // }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            handleChangeRollLeaf();
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="right">
                                                <Typography>Check Roll :</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    id="lblCheckRoll"
                                                    style={{
                                                        color: "#fff",
                                                        backgroundColor: lblCheckRollcolor
                                                    }}
                                                >
                                                    {lblCheckRoll}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )}

                                {pnlMachine && (
                                    <TableRow>
                                        <TableCell align="right">
                                            <Typography>Machine No. :</Typography>
                                        </TableCell>
                                        <TableCell colSpan={3}>
                                            <TextField
                                                id="txtMachineNo"
                                                className="input_txt"
                                                size="small"
                                                inputRef={inputMachineNo}
                                                fullWidth
                                                // value={txtMachineNo}
                                                // onChange={(e) => {
                                                //     settxtMachineNo(e.target.value);
                                                // }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleChangeMachine();
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {pnlBackSide && (
                        <div className="divgvBackSidePcs">
                            <TableContainer
                                component={Card}
                                style={{
                                    width: "430px",
                                    marginTop: "10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    border: "1px solid #d9d9d9",
                                }}
                            >
                                <Table id="gvBackSide">
                                    <TableBody>
                                        {Array.from(
                                            { length: gvBackSide.length },
                                            (_, index) => (
                                                <TableRow key={index}>
                                                    <TableCell
                                                        sx={{ borderRight: "1px solid #d9d9d9" }}
                                                        align="center"
                                                    >
                                                        {gvBackSide[index].SEQ}
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            className="input_txt"
                                                            id="txtSideBack"
                                                            size="small"
                                                            fullWidth
                                                            //value={txtSideBack[index] || ""}
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
                        <div className="divgvFrontSideShtPcs">
                            <TableContainer
                                component={Card}
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Table id="gvFrontSide">
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
                                                    id="txtSideFront"
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

                    {pnlBoard && (
                        <Box className="divpnlBoardShtPcs">
                            <TableContainer
                                component={Card}
                                style={{
                                    width: "430px",
                                    border: "1px solid #d9d9d9",
                                    marginTop: "10px",
                                }}
                            >
                                <Table>
                                    <TableHead></TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell
                                                align="right"
                                            >
                                                Bottom Fixture :
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    className="input_txt"
                                                    id="txtBoardNoB"
                                                    size="small"
                                                    fullWidth
                                                    // value={txtBoardNoB}
                                                    // onChange={(e) => {
                                                    //     settxtBoardNoB(e.target.value);
                                                    // }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            handleChangeBoardNoB();
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                align="right"
                                            >
                                                Top Fixture :
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    className="input_txt"
                                                    id="txtBoardNoF"
                                                    size="small"
                                                    fullWidth
                                                    // value={txtBoardNoF}
                                                    // onChange={(e) => {
                                                    //     settxtBoardNoF(e.target.value);
                                                    // }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            handleChangeBoardNoF();
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}

                    {pnlLog && (
                        <Paper
                            elevation={3}
                            className="Card-lblLog"
                            style={{
                                width: "432px",
                            }}
                            id="lblLog"
                        >
                            {lblLog}
                        </Paper>
                    )}

                    {pnlSerial && (
                        <div className="divgvSerialShtPcs" id="pnlSerial">
                            <TableContainer
                                component={Card}
                                style={{
                                    width: "430px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    marginTop: "10px"
                                }}
                            >
                                <Table id="gvSerial">
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
                                                    {gvSerialData[index].SEQ}
                                                </TableCell>
                                                <TableCell>
                                                    {/* <TextField
                                                        className="input_txt"
                                                        size="small"
                                                        fullWidth
                                                        value={txtgvSerial[index]}
                                                        inputRef={el => inputgvSerial.current[index] = el}
                                                        onChange={(event) => {
                                                            handleChangeSerial(index, event);
                                                        }}
                                                        onKeyDown={async (event) => {
                                                            let data
                                                            if (event.key === "Enter") {
                                                                event.preventDefault();
                                                                data = await handleChangeSerial(index, event)
                                                                if (index < txtgvSerial.length - 1) {

                                                                    inputgvSerial.current[
                                                                        index + 1
                                                                    ].focus();

                                                                } else {
                                                                    event.target.blur();
                                                                    settxtgvSerial(data);
                                                                    btnSaveClick(data);
                                                                }
                                                            }
                                                        }}
                                                    /> */}
                                                    <input
                                                        className="styleSeraial"
                                                        id={`txtSerial${index}`}
                                                        type="text"
                                                        //defaultValue={serial}
                                                        onChange={(event) =>
                                                            data = handleChangeSerial(index, event)
                                                        }
                                                        ref={(el) =>
                                                            (inputgvSerial.current[index] = el)
                                                        }
                                                        onKeyDown={(event) => {

                                                            if (event.key === "Enter") {
                                                                event.preventDefault();
                                                                data = handleChangeSerial(index, event)
                                                                if (index < txtgvSerial.length - 1) {

                                                                    inputgvSerial.current[
                                                                        index + 1
                                                                    ].focus();

                                                                } else {
                                                                    event.target.blur();
                                                                    settxtgvSerial(data);
                                                                    btnSaveClick(data);
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </TableCell>
                                            </TableRow>
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
                                    <AntButton
                                        className="BtSave"
                                        id="btnSave"
                                        type="primary"
                                        onClick={() => {
                                            //settxtgvSerial(data);
                                            btnSaveClick(data);
                                        }}
                                    >
                                        Save
                                    </AntButton>
                                    &nbsp;&nbsp;
                                    <AntButton
                                        className="ButtonDelete"
                                        id="btnCancel"
                                        style={{ height: "30px" }}
                                        type="primary"
                                        onClick={btnCancelClick}
                                    >
                                        Cancel
                                    </AntButton>
                                </div>
                            </TableContainer>
                        </div>
                    )
                    }
                </Box >

                <div className="divgvScanResultShtPcs" >
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
                                        id="lblResult"
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
                                id="gvScanResult"
                                rowClassName={(record) => (record.SCAN_RESULT === "NG" ? "row-red" : record.SCAN_RESULT === "OK" ? "row-green" : "")}
                            />
                        </>
                    )}
                </div>
            </Card >
        </div >
    )
};

export default ScanSMTSerialSht;