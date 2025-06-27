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
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSMTSerialControlTime.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTSerialControlTime } from "./fn_ScanSMTSerialControlTime";
import Pageimg from "/src/assets/1.jpg";
import { fn_Homepage } from "../Homepage/fn_Homepage";

function ScanSMTSerialControlTime() {

    const { menuName } = fn_Homepage();
    const {
        txtMachine, settxtMachine, handleChangeMachine, txtOperator, settxtOperator, txtTotalPcs, settxtTotalPcs, txtLotNo, settxtLotNo, selProduct,
        lblLot, lblLog, visiblelog, lblResult, lblResultcolor, txtMachineDisabled, txtOpDisabled, txtTotalPcsDisabled, txtLotDisabled, selProDisabled,
        ibtMCBackDisabled, ibtOperatorDisabled, ibtPcsBackDisabled, inputMachine, inputOperator, inputTotalPcs, inputLot, ddlProduct, pnlSerial, gvSerialData,
        gvScanResult, gvScanData, txtgvSerial, inputgvSerial, Productdata, ibtBackMCClick, handleChangeOperator, ibtBackOPClick, handleChangeTotalPcs, ibtPcsBackClick,
        handleChangeLot, ibtBackClick, handleChangeProduct, handleChangeSerial, btnSaveClick, btnCancelClick, handleKeygvSerial, columns, settxtgvSerial
    } = fn_ScanSMTSerialControlTime();
    let data = []
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
                            width: "450px",
                        }}
                    >
                        <Table className="Header_Left">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        {/* <Typography variant="h6">
                                            Confirm Process Time
                                        </Typography> */}
                                        {menuName ? menuName : "Confirm Process Time"}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography>Machine No. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="txtMachine"
                                            size="small"
                                            fullWidth
                                            inputRef={inputMachine}
                                            disabled={txtMachineDisabled}
                                            style={{
                                                backgroundColor: txtMachineDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            value={txtMachine}
                                            onChange={(e) => {
                                                const value = e.target.value.trim().toUpperCase();
                                                if (value.length <= 25 && !/[ก-๙]/.test(value)) {
                                                    settxtMachine(value);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangeMachine();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            className="btIcon"
                                            id="ibtBackMC"
                                            disabled={ibtMCBackDisabled}
                                            onClick={ibtBackMCClick}
                                        >
                                            <Tooltip title="Lock" placement="right-end">
                                                <BackspaceIcon className="Icon_ibtBack" />
                                            </Tooltip>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography>Operator :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="txtOperator"
                                            size="small"
                                            fullWidth
                                            inputRef={inputOperator}
                                            disabled={txtOpDisabled}
                                            style={{
                                                backgroundColor: txtOpDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            value={txtOperator}
                                            onChange={(e) => {
                                                const value = e.target.value.trim().toUpperCase();
                                                if (value.length <= 25 && !/[ก-๙]/.test(value)) {
                                                    settxtOperator(value);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangeOperator();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            className="btIcon"
                                            id="ibtBackOP"
                                            disabled={ibtOperatorDisabled}
                                            onClick={ibtBackOPClick}
                                        >
                                            <Tooltip title="Lock" placement="right-end">
                                                <BackspaceIcon className="Icon_ibtBack" />
                                            </Tooltip>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography>Total Pcs. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="txtTotalPcs"
                                            size="small"
                                            style={{
                                                width: "60px",
                                                backgroundColor: txtTotalPcsDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            inputRef={inputTotalPcs}
                                            value={txtTotalPcs.trim()}
                                            disabled={txtTotalPcsDisabled}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*$/.test(value) && value.length <= 3) {
                                                    settxtTotalPcs(value);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangeTotalPcs();
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
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            className="btIcon"
                                            id="ibtPcsBack"
                                            disabled={ibtPcsBackDisabled}
                                            onClick={ibtPcsBackClick}
                                        >
                                            <Tooltip title="Lock" placement="right-end">
                                                <BackspaceIcon className="Icon_ibtBack" />
                                            </Tooltip>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography>Lot No. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="txtLot"
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
                                        <Button className="btIcon" id="ibtBack" onClick={ibtBackClick}>
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
                                            id="ddlProduct"
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
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Paper
                        elevation={2}
                        style={{
                            width: "450px",
                            height: "40px",
                            display: 'flex',
                            alignItems: 'center',
                            // marginLeft: "4px",
                        }}
                    >
                        <Typography align="right"
                            style={{ padding: "5px" }}
                        >
                            Lot :
                        </Typography>
                        <Typography
                            id="lblLot"
                            style={{
                                fontSize: "16px",
                                paddingRight: "150px",
                            }}
                        >
                            {lblLot}
                        </Typography>
                    </Paper>

                    {visiblelog && (
                        <Paper
                            elevation={3}
                            className="Card-lblLog"
                            id="lblLog"
                            style={{
                                width: "451px",
                                // marginLeft: "2px",
                            }}
                        >
                            {lblLog}
                        </Paper>
                    )}

                    {pnlSerial && (
                        <div className="divgvSerialCon">
                            <TableContainer
                                component={Card}
                                style={{
                                    width: "450px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    marginTop: "10px",
                                    border: "1px solid #d9d9d9",
                                }}
                            >
                                <Table id="gvSerial">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell>Serial No.</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {txtgvSerial.map((serial, index) => (
                                            <tr key={index} style={{ borderBottom: "1px solid #d9d9d9" }}>
                                                <td style={{ textAlign: "center", borderRight: "1px solid #d9d9d9" }} >
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    <input
                                                        className="styleSeraial"
                                                        id={`txtSerial${index}`}
                                                        size="small"
                                                        fullWidth
                                                        defaultValue={serial}
                                                        ref={(el) => (inputgvSerial.current[index] = el)}
                                                        onChange={(e) => {
                                                            handleChangeSerial(index, e);
                                                        }}
                                                        onKeyDown={async (event) => {
                                                            if (event.key === "Enter") {
                                                                event.preventDefault();
                                                                data = await handleChangeSerial(index, event);
                                                                if (index < txtgvSerial.length - 1) {
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
                                        id="btnSave"
                                        type="primary"
                                        // onClick={btnSaveClick}
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
                    )}
                </Box>

                <div className="divgvScanResultCon">
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
            </Card>
        </div>
    )
};

export default ScanSMTSerialControlTime;