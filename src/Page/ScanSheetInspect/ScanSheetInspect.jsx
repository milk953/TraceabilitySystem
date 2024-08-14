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
import "/src/Page/ScanSheetInspect/ScanSheetInspect.css";
import Hearder from "../Header/Header.jsx";
import { green } from "@mui/material/colors";
import { fn_ScanSheetInspect } from "./function_ScanSheetInspect.jsx";

function ScanSheetInspect() {
    const {
        txtLotNo, settxtLotNo, ClearLot, txtProduct, settxtProduct, txtRollNo, settxtRollNo, txtScanBy, settxtScanBy,
        txtScanDate, settxtScanDate, selShift, setselShift, txtWeekCode, settxtWeekCode, selBinNo, setselBinNo,
        txtShtNo, settxtShtNo, labellog, visiblelog, pnlSuccess, handleLotNo, inputLot, pnlSerial, hfUserID, hfUserStation,
        hfUserFactory, hfMode, hfCheckFlg, hfSerialStart, hfSerialEnd, hfControlStart, hfControlEnd, hfBINGroup, hfControlBy,
        gvScanResult, inputScanDate, ibtDateRefresh, BinNo, istxtLotDisabled, isBinNoDisabled, isShtNoDisabled, handleselShtBin,
        gvScanData, handleShtNo, ibtExportClick, inputScanBy, selShtBin, inputShtNo, btnCancel, btDelShtClick, btDelLotClick,
        btCancelClick
    } = fn_ScanSheetInspect();

    return (
        <div>
            <Hearder />
            <h1>ScanSheetInspect</h1>
            <Card
                component={Paper}
                style={{
                    margin: "auto",
                    width: "90%",
                    maxWidth: "1400px",
                    marginTop: "50px",
                    height: "auto",
                    maxHeight: "550px",
                    padding: "20px",
                    display: 'flex',
                }}
            >
                <Box justifyContent="space-between">
                    <TableContainer
                        component={Paper}
                        style={{
                            width: "410px",
                            margin: "10px"
                        }}
                    >
                        <Table className="TbScanSht">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        <Typography variant="h6">
                                            Sheet Inspection
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
                                            disabled={istxtLotDisabled}
                                            style={{
                                                backgroundColor: istxtLotDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={(e) => {
                                                settxtLotNo(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleLotNo();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className="btIcon" onClick={ClearLot}>
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
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtProduct}
                                            onChange={(e) => {
                                                settxtProduct(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    settxtProduct(e.target.value);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className="btIcon" onClick={ibtExportClick}>
                                            <Tooltip title="Export Data" placement="right-end">
                                                <FileExcelFilled
                                                    style={{
                                                        fontSize: '24px',
                                                        color: 'green'
                                                    }}
                                                />
                                            </Tooltip>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Roll No :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtRollNo}
                                            onChange={(e) => {
                                                settxtRollNo(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    settxtRollNo(e.target.value);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Scan By :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            inputRef={inputScanBy}
                                            value={txtScanBy}
                                            onChange={(e) => {
                                                settxtScanBy(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    settxtScanBy(e.target.value);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Scan Date :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            inputRef={inputScanDate}
                                            value={txtScanDate}
                                            onChange={(e) => {
                                                settxtScanDate(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    settxtScanDate(e.target.value);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className="btIcon" onClick={ibtDateRefresh}>
                                            <Tooltip title="Refresh Date" placement="right-end">
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
                                        <Typography>Shift :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            id="select"
                                            size="small"
                                            options={['A', 'B']}
                                            value={selShift}
                                            defaultValue='A'
                                            onChange={(e, value) => {
                                                setselShift(value);
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            setselShift(params.inputProps.value);
                                                        }
                                                    }}
                                                />
                                            )}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Week Code :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtWeekCode}
                                            onChange={(e) => {
                                                settxtWeekCode(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    settxtWeekCode(e.target.value);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Bin No. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            id="select"
                                            size="small"
                                            ref={selShtBin}
                                            style={{
                                                backgroundColor: isBinNoDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            options={BinNo.map((item) =>
                                            ({
                                                value: item.bin_no,
                                                bin_name: item.bin_name
                                            }))}
                                            value={selBinNo}
                                            getOptionLabel={(item) => item.bin_name || ""}
                                            onChange={(e, value) => handleselShtBin(value)}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            setselBinNo(params.inputProps.value);
                                                        }
                                                    }}
                                                />
                                            )}
                                            disabled={isBinNoDisabled}

                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Sheet No. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            inputRef={inputShtNo}
                                            value={txtShtNo}
                                            onChange={handleShtNo}
                                            style={{
                                                backgroundColor: isShtNoDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            disabled={isShtNoDisabled}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {pnlSuccess && (
                        <Paper
                            elevation={3}
                            style={{
                                width: "414px",
                                margin: "auto",
                                height: "50px",
                                textAlign: "center",
                                marginTop: "10px",
                                marginLeft: "20px",
                                backgroundColor: "Green",
                            }}
                        >
                            <Typography
                                variant="h4"
                                style={{ paddingTop: "5px", color: "#fff" }}
                            >
                                OK
                            </Typography>
                        </Paper>
                    )}

                    {visiblelog && (
                        <Paper
                            elevation={3}
                            style={{
                                width: "414px",
                                margin: "auto",
                                height: "50px",
                                textAlign: "center",
                                marginTop: "10px",
                                marginLeft: "20px",
                                backgroundColor: "#f5222d",
                            }}
                        >
                            <Typography
                                variant="h4"
                                style={{ paddingTop: "5px", color: "#fff" }}
                            >
                                NG
                            </Typography>
                        </Paper>
                    )}
                    {visiblelog && (
                        <Paper
                            elevation={3}
                            style={{
                                width: "414px",
                                margin: "auto",
                                height: "40px",
                                textAlign: "center",
                                marginTop: "1px",
                                marginLeft: "20px",
                                backgroundColor: "#f5222d",
                            }}
                        >
                            <Typography
                                variant="h5"
                                style={{ paddingTop: "5px", color: "#fff" }}
                            >
                                {labellog}
                            </Typography>
                        </Paper>
                    )}

                    {pnlSerial && (
                        <Paper
                            elevation={3}
                            style={{
                                width: "414px",
                                margin: "auto",
                                height: "40px",
                                textAlign: "center",
                                marginTop: "1px",
                                marginLeft: "20px",
                            }}
                        >
                            <Button
                                size="small"
                                style={{
                                    marginTop: "5px",
                                    marginRight: "50px",
                                    width: "30ox"
                                }}
                                onClick={btDelShtClick}
                            >
                                Delete Sheet
                            </Button>
                            <Button
                                size="small"
                                style={{
                                    marginTop: "5px",
                                    marginRight: "50px",
                                }}
                                onClick={btDelLotClick}
                            >
                                Delete Lot
                            </Button>
                            <Button
                                size="small"
                                style={{ marginTop: "5px" }}
                                inputRef={btnCancel}
                                onClick={btCancelClick}
                            >
                                Cancel
                            </Button>
                        </Paper>
                    )}
                    <div>
                        <input type="hidden" value={hfUserID} />
                        <input type="hidden" value={hfUserStation} />
                        <input type="hidden" value={hfUserFactory} />
                        <input type="hidden" value={hfMode} />
                        <input type="hidden" value={hfCheckFlg} />
                        <input type="hidden" value={hfSerialStart} />
                        <input type="hidden" value={hfSerialEnd} />
                        <input type="hidden" value={hfControlStart} />
                        <input type="hidden" value={hfControlEnd} />
                        <input type="hidden" value={hfBINGroup} />
                        <input type="hidden" value={hfControlBy} />
                    </div>
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
                <div className="divgvScan" style={{ position: "relative" }}>
                    <TableContainer
                        component={Paper}
                        style={{
                            width: "100%",
                            marginBottom: "10px",
                            height: "250px",
                            display: gvScanResult ? 'block' : 'none'
                        }}
                    >
                        <Table
                            sx={{
                                minWidth: 650,
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
                                    <TableCell>Roll No.</TableCell>
                                    <TableCell>Lot No.</TableCell>
                                    <TableCell>Shift</TableCell>
                                    <TableCell>Week Code</TableCell>
                                    <TableCell>Bin</TableCell>
                                    <TableCell>Sheet No.</TableCell>
                                    <TableCell>Scan By</TableCell>
                                    <TableCell>Scan Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {gvScanData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell style={{ textAlign: 'center' }}>{item.seq}</TableCell>
                                        <TableCell>{item.roll_no}</TableCell>
                                        <TableCell>{item.lot_no}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.shift}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.week_no}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.bin_no}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.sheet}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.scan_by}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.scan_date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Card>
        </div>
    )
}

export default ScanSheetInspect;