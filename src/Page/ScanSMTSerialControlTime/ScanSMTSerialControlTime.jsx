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
import "/src/Page/ScanSMTSerialControlTime/ScanSMTSerialControlTime.css";
import Hearder from "../Header/Hearder";
import { fn_ScanSMTSerialControlTime } from "./fn_ScanSMTSerialControlTime";

function ScanSMTSerialControlTime() {

    const {
        txtMachine, settxtMachine, handleChangeMachine, txtOperator, settxtOperator, txtTotalPcs, settxtTotalPcs, txtLotNo, settxtLotNo, selProduct,
        lblLot, lblLog, visiblelog, lblResult, lblResultcolor, txtMachineDisabled, txtOpDisabled, txtTotalPcsDisabled, txtLotDisabled, selProDisabled,
        ibtMCBackDisabled, ibtOperatorDisabled, ibtPcsBackDisabled, inputMachine, inputOperator, inputTotalPcs, inputLot, ddlProduct, pnlSerial, gvSerialData,
        gvScanResult, gvScanData, txtgvSerial, inputgvSerial, Productdata, ibtBackMCClick, handleChangeOperator, ibtBackOPClick, handleChangeTotalPcs, ibtPcsBackClick,
        handleChangeLot, ibtBackClick, handleChangeProduct, handleChangeSerial, btnSaveClick, btnCancelClick
    } = fn_ScanSMTSerialControlTime();

    return (
        <div>
            <Hearder />
            <h1>Confirm Process Time</h1>
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
                        <Table className="TbScanSMTSerialCon">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        <Typography variant="h6">
                                            Confirm Process Time
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Machine No. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            inputRef={inputMachine}
                                            disabled={txtMachineDisabled}
                                            style={{
                                                backgroundColor: txtMachineDisabled ? "#EEEEEE" : "inherit",
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
                                            disabled={ibtMCBackDisabled}
                                            onClick={ibtBackMCClick}
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
                                        <Typography>Operator :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            inputRef={inputOperator}
                                            disabled={txtOpDisabled}
                                            style={{
                                                backgroundColor: txtOpDisabled ? "#EEEEEE" : "inherit",
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
                                            disabled={ibtOperatorDisabled}
                                            onClick={ibtBackOPClick}
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
                                                backgroundColor: txtTotalPcsDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            inputRef={inputTotalPcs}
                                            value={txtTotalPcs}
                                            disabled={txtTotalPcsDisabled}
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
                                    <TableCell>
                                        <Button
                                            className="btIcon"
                                            disabled={ibtPcsBackDisabled}
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
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            inputRef={inputLot}
                                            fullWidth
                                            value={txtLotNo}
                                            disabled={txtLotDisabled}
                                            style={{
                                                backgroundColor: txtLotDisabled ? "#EEEEEE" : "inherit",
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
                                    <TableCell>
                                        <Autocomplete
                                            id="selectPdControl"
                                            disabled={selProDisabled}
                                            ref={ddlProduct}
                                            style={{
                                                backgroundColor: selProDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            value={selProduct}
                                            onChange={(e, value) => handleChangeProduct(value)}
                                            options={Productdata.map((item) => item.prd_name)}
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
                    </Paper>

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
                                        {gvSerialData.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell
                                                    style={{ textAlign: "center" }}
                                                >
                                                    {item.SEQ}
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        id="txtfield"
                                                        size="small"
                                                        fullWidth
                                                        value={txtgvSerial[index]}
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

                <div className="divgvScanResultCon" style={{ position: "relative" }}>
                    <div className="lblResultCon"
                        style={{
                            display: gvScanResult ? 'block' : 'none'
                        }}
                    >
                        <Typography
                            variant="h4"
                            color={lblResultcolor}
                        >
                            {lblResult} lblResult
                        </Typography>
                    </div>
                    <TableContainer
                        component={Paper}
                        style={{
                            width: "87%",
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
                                    <TableCell>Serial No.</TableCell>
                                    <TableCell>Scan Result</TableCell>
                                    <TableCell>Remark</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.from(
                                    { length: gvScanData.length },
                                    (_, index) => (
                                        <TableRow >
                                            <TableCell
                                                style={{ textAlign: 'center' }}
                                            >
                                                {gvScanData[index].SEQ}
                                            </TableCell>
                                            <TableCell
                                                style={{ textAlign: 'left' }}
                                            >
                                                {gvScanData[index].SERIAL}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    textAlign: 'center',
                                                    backgroundColor: gvScanData[index].SCAN_RESULT === 'NG' ? '#ff4d4f' : 'inherit'
                                                }}
                                            >
                                                {gvScanData[index].SCAN_RESULT}
                                            </TableCell>
                                            <TableCell
                                                style={{ textAlign: 'left' }}
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

export default ScanSMTSerialControlTime;