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
import confirmImg from "/src/assets/confirm.png";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSMTSerialRecordTime.css";
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
        ibtBackClick, handleChangeProduct, hfSerialCount, txtgvSerial, inputRackNo, inputgvSerial, handleChangeSerial, lblResultcolor, gvScanData,
        btnSaveClick, btnCancelClick, pnlOP, lblOP, handleKeygvSerial, columns, pnlOPReJudge, pnlAreaRejudge, txtOPRejudge, settxtOPRejudge, txtAreaRejudge,
        settxtAreaRejudge, ibtOPRejudgeDisabled, txtOPRejudgeDisabled, ibtAreaRejudgeDisabled, ibtAreaConfirmDisabled, txtAreaRejudgeDisabled, inputOPRejudge,
        inputAreaRejudge, handleChangeOPRejudge, handleChangeAreaRejudge, ibtOPRejudgeClick, ibtAreaRejudgeClick, ibtAreaConfirmClick
    } = fn_ScanSMTSerialRecordTime();

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
                            width: "490px",
                            margin: "4px",
                        }}
                    >
                        <Table className="TbScanSMTSerial">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography variant="h6">
                                            Serial Record Time
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
                                                value={txtMachine.toUpperCase()}
                                                onChange={(e) => {
                                                    const value = e.target.value;
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
                                                const value = e.target.value;
                                                if (value.length <= 100 && !/[ก-๙]/.test(value)) {
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

                                {pnlOPReJudge && (
                                    <TableRow>
                                        <TableCell>
                                            <Typography>OP-Rejudgement :</Typography>
                                        </TableCell>
                                        <TableCell colSpan={3}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                inputRef={inputOPRejudge}
                                                disabled={txtOPRejudgeDisabled}
                                                style={{
                                                    backgroundColor: txtOPRejudgeDisabled ? "#e0e0e0" : "inherit",
                                                }}
                                                value={txtOPRejudge.toUpperCase()}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value.length <= 100 && !/[ก-๙]/.test(value)) {
                                                        settxtOPRejudge(value);
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleChangeOPRejudge();
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                className="Bt_ibtBack"
                                                disabled={ibtOPRejudgeDisabled}
                                                onClick={ibtOPRejudgeClick}
                                            >
                                                <Tooltip title="Lock" placement="right-end">
                                                    <BackspaceIcon className="Icon_ibtBack" />
                                                </Tooltip>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}

                                {pnlAreaRejudge && (
                                    <TableRow>
                                        <TableCell>
                                            <Typography>Area-Rejudgement :</Typography>
                                        </TableCell>
                                        <TableCell colSpan={3}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                inputRef={inputAreaRejudge}
                                                disabled={txtAreaRejudgeDisabled}
                                                style={{
                                                    width: "230px",
                                                    backgroundColor: txtAreaRejudgeDisabled ? "#e0e0e0" : "inherit",
                                                }}
                                                value={txtAreaRejudge.toUpperCase()}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value.length <= 100 && !/[ก-๙]/.test(value)) {
                                                        settxtAreaRejudge(value);
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleChangeAreaRejudge();
                                                    }
                                                }}
                                            />
                                            <Button
                                                onClick={ibtAreaConfirmClick}
                                                disabled={ibtAreaConfirmDisabled}
                                                style={{ padding: 0, minWidth: 0 }}
                                            >
                                                <img
                                                    src={confirmImg}
                                                    alt="Example"
                                                    style={{ width: "30px", height: "30px", marginLeft: "6px" }}
                                                />
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                className="Bt_ibtBack"
                                                disabled={ibtAreaRejudgeDisabled}
                                                onClick={ibtAreaRejudgeClick}
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
                                    <TableCell colSpan={2}>
                                        <RadioGroup
                                            row
                                            value={selrbtPcsSht}
                                            onChange={handleChangerbtPcsSht}
                                            onKeyDown={handleChangerbtPcsSht}
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
                                                        id="selpcssht"
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
                                                        id="selpcssht"
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
                                            id="lotno"
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
                                                inputRef={inputRackNo}
                                                disabled={istxtRackDisabled}
                                                style={{
                                                    backgroundColor: istxtRackDisabled ? "#e0e0e0" : "inherit",
                                                }}
                                                value={txtRackNo.toUpperCase()}
                                                onChange={(e) => {
                                                    settxtRackNo(e.target.value);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        settxtRackNo(e.target.value);
                                                        setTimeout(() => {
                                                            inputgvSerial.current[0].focus();
                                                        }, 200);
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
                            width: "490px",
                            margin: "auto",
                            height: "40px",
                            display: 'flex',
                            alignItems: 'center',
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
                            style={{ padding: "5px", color: "green" }}
                        >
                            OK :
                        </Typography>
                        <Typography
                            style={{
                                fontSize: "18px",
                                color: "green"
                            }}
                        >
                            {lblLotTotal}
                        </Typography>
                    </Paper>

                    {pnlOP && (
                        <Paper
                            elevation={3}
                            style={{
                                width: "490px",
                                margin: "auto",
                                height: "auto",
                                display: 'flex',
                                alignItems: 'center',
                                //marginLeft: "24px",
                                padding: "0 10px",
                                boxSizing: "border-box",
                            }}
                        >
                            <Typography
                                style={{
                                    fontSize: "20px",
                                    marginLeft: "0",
                                    color: "black",
                                    overflow: "hidden",
                                    wordWrap: "break-word",
                                    lineHeight: "1.5",
                                    flexGrow: 1,
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
                                width: "490px",
                                marginLeft: "2px",
                            }}
                        >
                            {lblLog}
                        </Paper>
                    )}

                    {pnlSerial && (
                        <div className="divgvSerial">
                            <TableContainer
                                component={Card}
                                style={{
                                    width: "495px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    marginTop: "10px"
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
                                    marginTop: "8px",
                                    display: "flex",
                                    justifyContent: "center",
                                    // marginLeft: "5px",
                                    // marginBottom: "2px"
                                }}
                                >
                                    <AntButton className="BtSave"
                                        type="primary"
                                        onClick={btnSaveClick}
                                    >
                                        Save
                                    </AntButton>
                                    &nbsp;&nbsp;
                                    <AntButton
                                        className="ButtonCancel"
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


                <div className="divgvScanResultRec">
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

export default ScanSMTSerialRecordTime;