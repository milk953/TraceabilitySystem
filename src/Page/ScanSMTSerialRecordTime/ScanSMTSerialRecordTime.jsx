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
import {
    ArrowRightOutlined,
    DeleteOutlined,
    ArrowLeftOutlined,
    FileExcelFilled
} from "@ant-design/icons";
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
        btnSaveClick, btnCancelClick, pnlOP, lblOP
    } = fn_ScanSMTSerialRecordTime();

    return (
        <div>
            <Hearder />
            <h1>Serial/Sheet Record Time</h1>
            <Card
                component={Paper}
                style={{
                    margin: "auto",
                    width: "90%",
                    maxWidth: "1400px",
                    marginTop: "50px",
                    height: "auto",
                    maxHeight: "580px",
                    padding: "20px",
                    display: 'flex',
                }}
            >
                <Box justifyContent="space-between">
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
                                                id="txtfield"
                                                size="small"
                                                fullWidth
                                                inputRef={inputMachine}
                                                disabled={istxtMachineDisabled}
                                                style={{
                                                    backgroundColor: istxtMachineDisabled ? "#EEEEEE" : "inherit",
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
                                                className="btIcon"
                                                disabled={isibtMCBackDisabled}
                                                onClick={ibtMCBackClick}
                                            >
                                                <Tooltip title="Lock" placement="right-end">
                                                    <BackspaceIcon
                                                        style={{
                                                            fontSize: '24px'
                                                        }}
                                                    />
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
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            inputRef={inputOperator}
                                            disabled={istxtOpDisabled}
                                            style={{
                                                backgroundColor: istxtOpDisabled ? "#EEEEEE" : "inherit",
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
                                            className="btIcon"
                                            disabled={isibtOperatorDisabled}
                                            onClick={ibtOperatorClick}
                                        >
                                            <Tooltip title="Lock" placement="right-end">
                                                <BackspaceIcon
                                                    style={{
                                                        fontSize: '24px'
                                                    }}
                                                />
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
                                            id="txtfield"
                                            size="small"
                                            style={{
                                                width: "60px",
                                                backgroundColor: istxtTotalPcsDisabled ? "#EEEEEE" : "inherit",
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
                                            className="btIcon"
                                            disabled={isibtPcsBackDisabled}
                                            onClick={ibtPcsBackClick}
                                        >
                                            <Tooltip title="Lock" placement="right-end">
                                                <BackspaceIcon
                                                    style={{
                                                        fontSize: '24px'
                                                    }}
                                                />
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
                                            id="txtfield"
                                            size="small"
                                            inputRef={inputLot}
                                            fullWidth
                                            value={txtLotNo}
                                            disabled={istxtLotDisabled}
                                            style={{
                                                backgroundColor: istxtLotDisabled ? "#EEEEEE" : "inherit",
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
                                                <BackspaceIcon
                                                    style={{
                                                        fontSize: '24px'
                                                    }}
                                                />
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
                                            ref={ddlProduct}
                                            style={{
                                                backgroundColor: isselProDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            value={selProduct}
                                            onChange={(e, value) => handleChangeProduct(value)}
                                            options={Productdata.map((item) => item.prd_name || null)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
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
                                                id="txtfield"
                                                size="small"
                                                fullWidth
                                                disabled={istxtRackDisabled}
                                                style={{
                                                    backgroundColor: istxtRackDisabled ? "#EEEEEE" : "inherit",
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
                        <Card
                            component={Paper}
                            style={{
                                width: "452px",
                                height: "40px",
                                margin: 'auto',
                                textAlign: "center",
                                background: "#BB2525",
                                paddingTop: "16px",
                                marginTop: "1px",
                                marginLeft: "23px",
                            }}
                        >
                            <Typography
                                variant="h5"
                                style={{ color: "yellow" }}
                            >
                                {lblLog}
                            </Typography>
                        </Card>
                    )}

                    {pnlSerial && (
                        <div className="divgvSerial" style={{ position: "relative" }}>
                            <TableContainer
                                component={Paper}
                                style={{
                                    width: "100%",
                                    marginBottom: "10px",
                                    height: "180px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Table
                                    sx={{
                                        minWidth: 400,
                                        '& .MuiTableHead-root': {
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1,
                                            background: 'white',
                                        },
                                    }}
                                    aria-label="simple table"
                                >
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
                                                    style={{ textAlign: "center" }}
                                                >
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        id="txtfield"
                                                        size="small"
                                                        fullWidth
                                                        value={txtgvSerial[index] || ""}
                                                        inputRef={inputgvSerial}
                                                        onChange={(e) => {
                                                            handleChangeSerial(index, e);
                                                        }}
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
                                    marginLeft: "70px",
                                    marginBottom: "2px"
                                }}
                                >
                                    <Button
                                        variant="contained"
                                        size="small"
                                        style={{ marginRight: "20px" }}
                                        onClick={btnSaveClick}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="error"
                                        onClick={btnCancelClick}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </TableContainer>
                        </div>
                    )}
                </Box>

                <img
                    style={{
                        width: "320px",
                        height: "250px",
                        marginLeft: "280px",
                        display: gvScanResult ? 'none' : 'block'
                    }}
                    src="src/assets/1.jpg" // Import the image
                    alt="Description of the image"
                />
                <div className="divgvScanResultRec" style={{ position: "relative" }}>
                    <Paper
                        className="lblResultRec"
                        elevation={3}
                        style={{
                            background: lblResultcolor,
                            display: gvScanResult ? 'block' : 'none',
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            variant="h4"
                            style={{ paddingTop: "3px", color: "#fff" }}
                        >
                            {lblResult}
                        </Typography>
                    </Paper>
                    <TableContainer
                        component={Paper}
                        style={{
                            width: "84%",
                            marginBottom: "10px",
                            height: "250px",
                            display: gvScanResult ? 'block' : 'none'
                        }}
                    >
                        <Table
                            sx={{
                                minWidth: 710,
                                '& .MuiTableHead-root': {
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,
                                    background: 'white',
                                },
                            }}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>No.</TableCell>
                                    <TableCell>Serial/Sheet No.</TableCell>
                                    <TableCell>Scan Result</TableCell>
                                    <TableCell>Remark</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.from(
                                    { length: gvScanData.length }, (_, index) => (
                                        <TableRow key={index}>
                                            <TableCell
                                                style={{
                                                    textAlign: 'center',
                                                    borderRight: "1px solid #d9d9d9"
                                                }}
                                            >
                                                {gvScanData[index].SEQ}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    textAlign: 'left',
                                                    borderRight: "1px solid #d9d9d9"
                                                }}
                                            >
                                                {gvScanData[index].SERIAL}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    textAlign: 'center',
                                                    backgroundColor: gvScanData[index].SCAN_RESULT === 'OK' ? 'green' : '#ff4d4f',
                                                    borderRight: "1px solid #d9d9d9"
                                                }}
                                            >
                                                {gvScanData[index].SCAN_RESULT}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    textAlign: 'left',
                                                    borderRight: "1px solid #d9d9d9"
                                                }}
                                            >
                                                {gvScanData[index].REMARK}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Card>
        </div>
    )
};

export default ScanSMTSerialRecordTime;