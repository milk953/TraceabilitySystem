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
    // Button,
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Button, Avatar, Table as AntTable } from "antd";
import { SearchOutlined} from "@ant-design/icons";
import "../Common/StyleCommon.css";
import Pageimg from "/src/assets/1.jpg";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Header from "../Header/Header";
import excel from "/src/assets/excel.png";
import "../SheetInspection/SheetInspection.css";
import "../LotTraceView/ViewLot.css";
import { fn_SheetInspection } from "./fn_SheetInspection";
import { fn_Homepage } from "../Homepage/fn_Homepage";

function SheetInspection() {
    const { menuName } = fn_Homepage(); 
    const {
        txtProductFrom, settxtProductFrom, txtProductTo, settxtProductTo, txtLotFrom, settxtLotFrom, txtLotTo, settxtLotTo, txtRollFrom, settxtRollFrom,
        txtRollTo, settxtRollTo, txtInvFrom, settxtInvFrom, txtInvTo, settxtInvTo, txtDateFrom, settxtDateFrom, txtDateTo, settxtDateTo, selectcbx,
        gvDataXOut, gvDataSheet, pnlGridWidth, handleChangecbx, btnExecute_Click, btnExport_Click, columnsXOutData, columnsSheetNoData, inputProduct
    } = fn_SheetInspection();

    return (
        <div>
            <Header />
            <Card
                component={Paper}
                className="Card-Common"
                sx={{ display: "flex" }}
            >
                <Box justifyContent="space-between">
                    <TableContainer
                        component={Card}
                        style={{
                            width: "800px",
                            // margin: "4px",
                        }}
                    >
                        <Table className="Header_Left">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        {/* <Typography variant="h6">
                                            Sheet Inspection Report
                                        </Typography> */}
                                        {menuName ? menuName : "Sheet Inspection Report"}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Product :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            inputRef={(el) => (inputProduct.current = el)}
                                            fullWidth
                                            value={txtProductFrom}
                                            onChange={(e) => {
                                                settxtProductFrom(e.target.value.toUpperCase());
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    settxtProductTo(txtProductFrom);
                                                    document.getElementById("ProductTo").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>To :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="ProductTo"
                                            size="small"
                                            fullWidth
                                            value={txtProductTo}
                                            onChange={(e) => {
                                                settxtProductTo(e.target.value.toUpperCase());
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("lotfrom").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Lot No :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="lotfrom"
                                            size="small"
                                            fullWidth
                                            value={txtLotFrom}
                                            onChange={(e) => {
                                                settxtLotFrom(e.target.value.toUpperCase());
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    settxtLotTo(txtLotFrom);
                                                    document.getElementById("lotto").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>To :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="lotto"
                                            size="small"
                                            fullWidth
                                            value={txtLotTo}
                                            onChange={(e) => {
                                                settxtLotTo(e.target.value.toUpperCase());
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("rollfrom").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Roll No. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="rollfrom"
                                            size="small"
                                            fullWidth
                                            value={txtRollFrom}
                                            onChange={(e) => {
                                                settxtRollFrom(e.target.value.toUpperCase());
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    settxtRollTo(txtRollFrom);
                                                    document.getElementById("rollto").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>To :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="rollto"
                                            size="small"
                                            fullWidth
                                            value={txtRollTo}
                                            onChange={(e) => {
                                                settxtRollTo(e.target.value.toUpperCase());
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    document.getElementById("invfrom").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Invoice No :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="invfrom"
                                            size="small"
                                            fullWidth
                                            value={txtInvFrom}
                                            onChange={(e) => {
                                                settxtInvFrom(e.target.value.toUpperCase());
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    settxtInvTo(txtInvFrom);
                                                    document.getElementById("invto").focus();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>To :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="invto"
                                            size="small"
                                            fullWidth
                                            value={txtInvTo}
                                            onChange={(e) => {
                                                settxtInvTo(e.target.value.toUpperCase());
                                            }}
                                        // onKeyDown={(e) => {
                                        //     setTimeout(() => {
                                        //         const element = document.getElementById("datefrom");
                                        //         if (element) {
                                        //             element.focus();
                                        //         }
                                        //     }, 0);
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Packing Date :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            {/* <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtDateFrom}
                                                style={{
                                                    width: "120px",
                                                }}
                                                onChange={(e) => {
                                                    settxtDateFrom(e.target.value.toUpperCase());
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        settxtDateTo(txtDateFrom);
                                                    }
                                                }}
                                            /> */}
                                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                                <DatePicker
                                                    className="input_txt"
                                                    value={txtDateFrom ? dayjs(txtDateFrom, 'DD/MM/YYYY') : null}
                                                    onChange={(newValue) => {
                                                        const formattedDate = newValue ? newValue.format('DD/MM/YYYY') : '';
                                                        settxtDateFrom(formattedDate);
                                                        settxtDateTo(formattedDate);
                                                    }}
                                                    format="DD/MM/YYYY"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            settxtDateTo(txtDateFrom);
                                                        }
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            className="input_txt"
                                                            size="small"
                                                            id="datefrom"
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>To :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <div style={{ width: "260px" }}>
                                            {/* <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtDateTo}
                                                style={{
                                                    width: "120px",
                                                }}
                                                onChange={(e) => {
                                                    settxtDateTo(e.target.value.toUpperCase());
                                                }}
                                            /> */}
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    className="input_txt"
                                                    value={txtDateTo ? dayjs(txtDateTo, 'DD/MM/YYYY') : null}
                                                    onChange={(newValue) => {
                                                        settxtDateTo(newValue ? newValue.format('DD/MM/YYYY') : '');
                                                    }}
                                                    format="DD/MM/YYYY"
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            className="input_txt"
                                                            id="dateto"
                                                            size="small"
                                                            style={{ width: '120px' }}
                                                        // onKeyDown={(e) => {
                                                        //     if (e.key === "Enter") {
                                                        //         document.getElementById("xout").focus();
                                                        //     }
                                                        // }}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Report Type :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={selectcbx}
                                            onChange={handleChangecbx}
                                        >
                                            <FormControlLabel
                                                id="xout"
                                                value="cbxXOut"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 18,
                                                                padding: 0
                                                            },
                                                        }}
                                                        checked={selectcbx === "cbxXOut"}
                                                    />
                                                }
                                                label="X-Out"
                                                sx={{ marginLeft: 2 }}
                                            />
                                            <FormControlLabel
                                                id="sheetno"
                                                value="cbxSheetNo"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 18,
                                                                padding: 0
                                                            },
                                                        }}
                                                        checked={selectcbx === "cbxSheetNo"}
                                                    />
                                                }
                                                label="Sheet No."
                                                sx={{ marginLeft: 2 }}
                                            />
                                        </RadioGroup>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            {/* <Button
                                                className="BtExcute"
                                                onClick={btnExecute_Click}
                                            >
                                                Execute
                                            </Button> */}
                                            <Button
                                                type="primary"
                                                className="RetriveBtn"
                                                style={{height: "32px"}}
                                                icon={<SearchOutlined />}
                                                onClick={btnExecute_Click}
                                            >
                                                Search
                                            </Button>
                                            <Button
                                                style={{ marginLeft: "20px" }}
                                                icon={<Avatar shape="square" src={excel} size="small" />}
                                                onClick={btnExport_Click}
                                            >
                                                Export
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <br />
                    {gvDataXOut.visible && (

                        <AntTable
                            dataSource={gvDataXOut.value}
                            style={{ width: '1480px'}}
                            columns={columnsXOutData}
                            rowKey={(record) => record.lot_no}
                            className="tableGvResultViewLot"
                            pagination={false}
                            size="small"
                            bordered
                            scroll={{ x: 'max-content', y: 250 }}  // เปิดการเลื่อนทั้งแนวนอนและแนวตั้ง
                        />

                    )}
                    <br />

                    {gvDataSheet.visible && (

                        <AntTable
                            dataSource={gvDataSheet.value}
                            style={{ width: '1400px' }}
                            columns={columnsSheetNoData}
                            rowKey={(record) => record.seq}
                            className="tableGvResultViewLot"
                            // style={{ width: pnlGridWidth }}
                            pagination={false}
                            size="small"
                            bordered
                            scroll={{ x: 'max-content', y: 300 }}
                        />

                    )}
                </Box>
            </Card>
        </div>
    )
};

export default SheetInspection;