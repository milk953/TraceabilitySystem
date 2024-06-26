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
import "/src/Page/ScanSheetInspectXOut/ScanSheetInspectXOut.css";
import Hearder from "../Header/Hearder";
import { fn_ScanSheetInspectXOut } from "./fn_ScanSheetInspectXOut.jsx";

function ScanSheetInspectXOut() {

    const {
        txtLotNo, settxtLotNo, txtProduct, settxtProduct, txtRollNo, settxtRollNo, txtShift, settxtShift, txtWeekCode, settxtWeekCode,
        txtPackingBy, settxtPackingBy, txtPackingDate, settxtPackingDate, selBinNo, setselBinNo, BinNodata, lblTotalSht, inputPackingBy,
        labellog, visiblelog, pnlSuccess, pnlSerial, hfBINGroup, hfControlBy, hfCheckFlg, hfSerialStart, hfSerialEnd, hfControlStart,
        hfControlEnd, hfMode, hfUserID, hfUserStation, hfUserFactory, gvScanResult, gvScanData, pnlXOut, inputLot, inputPackingDate,
        selShtBin, btnCancel, ClearLot, isBinNoDisabled, istxtLotDisabled, LotTextChanged, selShtBinChanged, btSaveClick, btCancelClick
    } = fn_ScanSheetInspectXOut();

    return (
        <div>
            <Hearder />
            <h1>ScanSheetInspectXOut</h1>
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
                        <Table className="TbScanShtInXOut">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        <Typography variant="h6">
                                            Sheet Inspection X-Out
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
                                                    LotTextChanged();
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
                                            InputProps={{
                                                readOnly: true, 
                                            }}
                                        // onKeyDown={(e) => {
                                        //     if (e.key === "Enter") {
                                        //         handleLotNo();
                                        //     }
                                        // }}
                                        />
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
                                        <Typography>Shift :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtShift}
                                            onChange={(e) => {
                                                settxtShift(e.target.value);
                                            }}
                                        // onKeyDown={(e) => {
                                        //     if (e.key === "Enter") {
                                        //         settxtRollNo(e.target.value);
                                        //     }
                                        // }}
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
                                        <Typography>Packing By :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            inputRef={inputPackingBy}
                                            value={txtPackingBy}
                                            onChange={(e) => {
                                                settxtPackingBy(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    settxtPackingBy(e.target.value);
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Packing Date :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtPackingDate}
                                            inputRef={inputPackingDate}
                                            onChange={(e) => {
                                                settxtPackingDate(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    settxtPackingDate(e.target.value);
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
                                            options={BinNodata.map((item) =>
                                            ({
                                                value: item.bin_no,
                                                bin_name: item.bin_name
                                            }))}
                                            value={selBinNo}
                                            getOptionLabel={(item) => item.bin_name || ""}
                                            onChange={(e, value) => selShtBinChanged(value)}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            selShtBinChanged(params.inputProps.value);
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
                                        <Typography>Total Sheet :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            style={{
                                                fontSize: "20px",
                                                color: "#990033"
                                            }}
                                        >
                                            {lblTotalSht}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {pnlXOut && (
                        <div className="divgvXOut" style={{ position: "relative" }}>
                            <TableContainer
                                component={Paper}
                                style={{
                                    width: "100%",
                                    marginBottom: "10px",
                                    height: "160px",
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
                                            <TableCell>X-Out</TableCell>
                                            <TableCell>QTY(Sht.)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                </Table>
                            </TableContainer>
                        </div>
                    )}

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
                        elevation={2}
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
                                marginRight: "100px",
                                width: "30ox"
                            }}
                        onClick={btSaveClick}
                        >
                            Save
                        </Button>
                        <Button
                            size="small"
                            style={{ marginTop: "5px", color: "red" }}
                            ref={btnCancel}
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
                        display: gvScanResult ? 'none' : 'none'
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
                                minWidth: 750,
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
                                    <TableCell>Roll No.</TableCell>
                                    <TableCell>Lot No.</TableCell>
                                    <TableCell>Shift</TableCell>
                                    <TableCell>Week Code</TableCell>
                                    <TableCell>Bin</TableCell>
                                    <TableCell>X-Out</TableCell>
                                    <TableCell>QTY(Sht.)</TableCell>
                                    <TableCell>QTY(Pcs.)</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </div>
            </Card>
        </div>
    )
}

export default ScanSheetInspectXOut;