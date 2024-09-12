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
import "/src/Page/ScanSMTSerialRecordTime/ScanSMTSerialRecordTime.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTSerialRecordTime } from "./fn_ScanSMTSerialRecordTime";
import { green } from "@mui/material/colors";

function ScanSMTSerialRecordTime() {

    const {
        selectedrbt, txtMachine, settxtMachine, handleChangeMachine, txtOperator, settxtOperator, txtTotalPcs, settxtTotalPcs, txtLotNo, settxtLotNo,
        selProduct, setselProduct, txtRackNo, settxtRackNo, lblLot, lblLotTotal, lblLog, visiblelog, lblResult, pnlSerial, gvScanResult, istxtOpDisabled,
        istxtTotalPcsDisabled, istxtLotDisabled, isselProDisabled, istxtMachineDisabled, handleChangerbt, istxtRackDisabled, isibtMCBackDisabled,
        isibtOperatorDisabled, isibtPcsBackDisabled, inputMachine, inputOperator, inputTotalPcs, inputLot, pnlMachine, pnlRackNo, Productdata, ibtMCBackClick,
        handleChangeOperator, ibtOperatorClick, handleChangeTotalPcs, handleChangerbtPcsSht, ibtPcsBackClick, selrbtPcsSht, ddlProduct, handleChangeLot,
        ibtBackClick, handleChangeProduct, hfSerialCount, txtgvSerial, settxtgvSerial, inputgvSerial, handleChangeSerial, lblResultcolor, gvScanData,
        btnSaveClick, btnCancelClick, pnlOP, lblOP, handleKeygvSerial, columns
    } = fn_ScanSMTSerialRecordTime();

    return (
        <div>
            <Hearder />
            <h1>Serial/Sheet Record Time</h1>
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
                            width: "450px",
                            margin: "4px",
                        }}
                    >
                        <Table className="TbScanSMTSerial">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography variant="h6">
                                            Serial/Sheet Record Time
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <RadioGroup
                                            row
                                            value={selectedrbt}
                                            onChange={handleChangerbt}
                                        >
                                            <FormControlLabel
                                                value="rbtRecordTime"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 19,
                                                            },
                                                        }}
                                                        checked={selectedrbt === "rbtRecordTime"}
                                                    />
                                                }
                                                label="Process Time"
                                                sx={{ marginLeft: 7 }}
                                            />
                                            <FormControlLabel
                                                value="rbtPlasmaTime"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 19,
                                                            },
                                                        }}
                                                        checked={selectedrbt === "rbtPlasmaTime"}
                                                    />
                                                }
                                                label="Plasma Time"
                                                sx={{ marginLeft: 7 }}
                                            />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                {pnlMachine && (
                                    <TableRow>
                                        <TableCell>
                                            <Typography>Machine No. :</Typography>
                                        </TableCell>
                                        <TableCell colSpan={3}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                inputRef={inputMachine}
                                                disabled={istxtMachineDisabled}
                                                style={{
                                                    backgroundColor: istxtMachineDisabled ? "#e0e0e0" : "inherit",
                                                }}
                                                value={txtMachine}
                                                onChange={(e) => {
                                                    settxtMachine(e.target.value);
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
                                                className="Bt_ibtBack"
                                                disabled={isibtMCBackDisabled}
                                                onClick={ibtMCBackClick}
                                            >
                                                <Tooltip title="Lock" placement="right-end">
                                                    <BackspaceIcon className="Icon_ibtBack" />
                                                </Tooltip>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}
                                <TableRow>
                                    <TableCell>
                                        <Typography>OP/Partial No. :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            fullWidth
                                            inputRef={inputOperator}
                                            disabled={istxtOpDisabled}
                                            style={{
                                                backgroundColor: istxtOpDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            value={txtOperator}
                                            onChange={(e) => {
                                                settxtOperator(e.target.value);
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
                                            className="Bt_ibtBack"
                                            disabled={isibtOperatorDisabled}
                                            onClick={ibtOperatorClick}
                                        >
                                            <Tooltip title="Lock" placement="right-end">
                                                <BackspaceIcon className="Icon_ibtBack" />
                                            </Tooltip>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Total Pcs. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            style={{
                                                width: "60px",
                                                backgroundColor: istxtTotalPcsDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            inputRef={inputTotalPcs}
                                            value={txtTotalPcs}
                                            disabled={istxtTotalPcsDisabled}
                                            onChange={(e) => {
                                                settxtTotalPcs(e.target.value);
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
                                    <TableCell colSpan={2}>
                                        <RadioGroup
                                            row
                                            value={selrbtPcsSht}
                                            onChange={handleChangerbtPcsSht}
                                        >
                                            <FormControlLabel
                                                value="rbtPcs"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 19,
                                                            },
                                                        }}
                                                        checked={selrbtPcsSht === "rbtPcs"}
                                                    />
                                                }
                                                label="PCS"
                                                sx={{ marginLeft: 1 }}
                                            />
                                            <FormControlLabel
                                                value="rbtSht"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 19,
                                                            },
                                                        }}
                                                        checked={selrbtPcsSht === "rbtSht"}
                                                    />
                                                }
                                                label="SHT"
                                                sx={{ marginLeft: 1 }}
                                            />
                                        </RadioGroup>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            className="Bt_ibtBack"
                                            disabled={isibtPcsBackDisabled}
                                            onClick={ibtPcsBackClick}
                                        >
                                            <Tooltip title="Lock" placement="right-end">
                                                <BackspaceIcon className="Icon_ibtBack" />
                                            </Tooltip>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Lot No. :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            inputRef={inputLot}
                                            fullWidth
                                            value={txtLotNo}
                                            disabled={istxtLotDisabled}
                                            style={{
                                                backgroundColor: istxtLotDisabled ? "#e0e0e0" : "inherit",
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
                                            id="select"
                                            disabled={isselProDisabled}
                                            style={{
                                                backgroundColor: isselProDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            value={selProduct}
                                            onChange={(e, value) => handleChangeProduct(value)}
                                            options={Productdata.map((item) => item.prd_name || null)}
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
                                {pnlRackNo && (
                                    <TableRow>
                                        <TableCell>
                                            <Typography>Rack/Machine :</Typography>
                                        </TableCell>
                                        <TableCell colSpan={3}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                disabled={istxtRackDisabled}
                                                style={{
                                                    backgroundColor: istxtRackDisabled ? "#e0e0e0" : "inherit",
                                                }}
                                                value={txtRackNo}
                                                onChange={(e) => {
                                                    settxtRackNo(e.target.value);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        settxtRackNo(e.target.value);
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Paper
                        elevation={2}
                        style={{
                            width: "450px",
                            margin: "auto",
                            height: "40px",
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: "24px",
                        }}
                    >
                        <Typography align="left"
                            style={{ padding: "5px" }}
                        >
                            Lot :
                        </Typography>
                        <Typography
                            style={{
                                fontSize: "18px",
                                paddingRight: "150px",
                            }}
                        >
                            {lblLot}
                        </Typography>
                        <Typography
                            style={{ padding: "5px" }}
                        >
                            OK :
                        </Typography>
                        <Typography
                            style={{
                                fontSize: "18px",
                            }}
                        >
                            {lblLotTotal}
                        </Typography>
                    </Paper>

                    {pnlOP && (
                        <Paper
                            elevation={3}
                            style={{
                                width: "450px",
                                margin: "auto",
                                height: "40px",
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: "24px",
                            }}
                        >
                            <Typography
                                style={{
                                    fontSize: "20px",
                                    marginLeft: "200px"
                                }}
                            >
                                {lblOP}
                            </Typography>
                        </Paper>
                    )}

                    {visiblelog && (
                        <Paper
                            elevation={3}
                            className="Card-lblLog"
                            style={{
                                width: "453px",
                                marginLeft: "23px",
                            }}
                        >
                            {lblLog}
                        </Paper>
                    )}

                    {pnlSerial && (
                        <div className="divgvSerial" style={{ position: "relative" }}>
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
                                        {Array.from({ length: hfSerialCount }, (_, index) => (
                                            <TableRow key={index}>
                                                <TableCell
                                                    style={{ textAlign: "center", borderRight: "1px solid #d9d9d9" }}
                                                >
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        className="input_txt"
                                                        size="small"
                                                        fullWidth
                                                        value={txtgvSerial[index] || ""}
                                                        inputRef={(el) => (inputgvSerial.current[index] = el)}
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


                <div className="divgvScanResultRec" style={{ position: "relative" }}>
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

export default ScanSMTSerialRecordTime;