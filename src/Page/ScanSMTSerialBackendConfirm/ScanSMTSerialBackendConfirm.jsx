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
import "/src/Page/ScanSMTSerialBackendConfirm/ScanSMTSerialBackendConfirm.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTSerialBackendConfirm } from "./fn_ScanSMTSerialBackendConfirm";
import Pageimg from "/src/assets/1.jpg";
function ScanSMTSerialBackendConfirm() {

    const {
        txtLotNo, settxtLotNo, selProduct, Productdata, txtTotalPCS, settxtTotalPCS, lblLog, visiblelog, lblResultcolor, lblResult,
        pnlSerial, gvScanResult, txtgvSerial, txtLotDisabled, selProDisabled, txtTotalDisabled, gvScanData, handleChangeLot,
        handleChangeProduct, handleChangeTotalPCS, hfSerialCount, ibtBackClick, btnSaveClick, btnCancelClick, handleChangeSerial, inputLot,
        ddlProduct, inputTotal, inputgvSerial, handleKeygvSerial
    } = fn_ScanSMTSerialBackendConfirm();

    return (
        <div>
            <Hearder />
            <h1>SMT Backend E-Mapping</h1>
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
                                            id="selectPdSerialBack"
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
                                <TableRow>
                                    <TableCell>
                                        <Typography>Total Sht :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <TextField
                                                id="txtfield"
                                                size="small"
                                                inputRef={inputTotal}
                                                fullWidth
                                                value={txtTotalPCS}
                                                disabled={txtTotalDisabled}
                                                style={{
                                                    backgroundColor: txtTotalDisabled ? "#EEEEEE" : "inherit",
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
                        <Card
                            component={Paper}
                            style={{
                                width: "404px",
                                height: "40px",
                                margin: 'auto',
                                textAlign: "center",
                                background: "#BB2525",
                                paddingTop: "16px",
                                marginTop: "1px",
                                marginLeft: "21px",
                            }}
                        >
                            <Typography
                                variant="h6"
                                style={{ color: "yellow" }}
                            >
                                {lblLog}
                            </Typography>
                        </Card>
                    )}

                    {pnlSerial && (
                        <div className="divgvSerialBack" style={{ position: "relative" }}>
                            <TableContainer
                                component={Paper}
                                style={{
                                    width: "100%",
                                    marginBottom: "10px",
                                    height: "190px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Table
                                    sx={{
                                        minWidth: 380,
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
                                                        id="txtfield"
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
                    src={Pageimg} // Import the image
                    alt="Description of the image"
                />

                <div className="divgvScanResultBack" style={{ position: "relative" }}>

                    <Paper
                        className="lblResultBack"
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

export default ScanSMTSerialBackendConfirm;