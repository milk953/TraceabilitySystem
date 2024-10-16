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
import Header from "../Header/Header.jsx";
import { Table as AntTable } from 'antd';
import "../Common/StyleCommon.css";
import { fn_ScanSheetInspect } from "./function_ScanSheetInspect.jsx";
import Pageimg from "/src/assets/1.jpg";
function ScanSheetInspect() {
    const {
        txtLotNo, settxtLotNo, ClearLot, txtProduct, settxtProduct, txtRollNo, settxtRollNo, txtScanBy, settxtScanBy,
        txtScanDate, settxtScanDate, selShift, setselShift, txtWeekCode, settxtWeekCode, selBinNo, ddlShtBin,
        txtShtNo, labellog, visiblelog, pnlSuccess, handleLotNo, inputLot, pnlSerial, gvScanResult, inputScanDate,
        ibtDateRefresh, ddlBinNoData, istxtLotDisabled, isBinNoDisabled, isShtNoDisabled, handleselShtBin, gvScanData,
        handleShtNo, ibtExportClick, inputScanBy, inputShtNo, btnCancel, btDelShtClick, btDelLotClick, settxtShtNo,
        btCancelClick, columns
    } = fn_ScanSheetInspect();

    return (
        <div>
            <Header />
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
                                                    handleLotNo();
                                                }
                                            }}
                                            onBlur={() => {
                                                if (txtLotNo !== "") {
                                                    handleLotNo();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className="Bt_ibtBack" onClick={ClearLot}>
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
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
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
                                        <Button className="Bt_ibtBack" onClick={ibtExportClick}>
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
                                            className="input_txt"
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
                                            className="input_txt"
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
                                            className="input_txt"
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
                                        <Button className="Bt_ibtBack" onClick={ibtDateRefresh}>
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
                                            className="Select_dropDown"
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
                                            className="input_txt"
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
                                        {console.log(selBinNo,'kkkkkk')}
                                        <Autocomplete
                                            className="Select_dropDown"
                                            size="small"
                                            style={{
                                                backgroundColor: isBinNoDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            value={selBinNo}
                                            onChange={(e, value) => handleselShtBin(value)}
                                            options={["-select-", ...ddlBinNoData.map((item) => item.bin_name || "")]}
                                            isOptionEqualToValue={(option, value) => option === value || (value === "" && option === "-select-")}
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    // onKeyDown={(e) => {
                                                    //     if (e.key === "Enter") {
                                                    //         e.preventDefault();
                                                    //         setselBinNo(params.inputProps.value);
                                                    //     }
                                                    // }}
                                                    inputRef={ddlShtBin}
                                                    size="small"
                                                    sx={{ textAlign: "left" }}
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
                                            className="input_txt"
                                            size="small"
                                            fullWidth
                                            inputRef={inputShtNo}
                                            value={txtShtNo}
                                            onChange={(e) => {
                                                settxtShtNo(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleShtNo();
                                                }
                                            }}
                                            onBlur={handleShtNo}
                                            style={{
                                                backgroundColor: isShtNoDisabled ? "#e0e0e0" : "inherit",
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
                                backgroundColor: "#059212",
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
                                backgroundColor: "#BA0900",
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
                            className="Card-lblLog"
                            style={{
                                width: "414px",
                                marginLeft: "20px",
                            }}
                        >
                            {labellog}
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
                                ref={btnCancel}
                                onClick={btCancelClick}
                            >
                                Cancel
                            </Button>
                        </Paper>
                    )}
                </Box>

                <div className="divgvScan" style={{ position: "relative" }}>

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
                            <AntTable
                                columns={columns}
                                dataSource={gvScanData}
                                rowKey={(record) => record.seq}
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

export default ScanSheetInspect;