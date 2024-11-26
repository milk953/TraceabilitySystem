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
import { Button, Avatar, Table as AntTable } from "antd";
import "../Common/StyleCommon.css";
import Pageimg from "/src/assets/1.jpg";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Header from "../Header/Header";
import excel from "/src/assets/excel.png";
import "../SheetInspection/SheetInspection.css";
import { fn_SheetInspection } from "./fn_SheetInspection";

function SheetInspection() {
    const {
        txtProductFrom, settxtProductFrom, txtProductTo, settxtProductTo, txtLotFrom, settxtLotFrom, txtLotTo, settxtLotTo, txtRollFrom, settxtRollFrom,
        txtRollTo, settxtRollTo, txtInvFrom, settxtInvFrom, txtInvTo, settxtInvTo, txtDateFrom, settxtDateFrom, txtDateTo, settxtDateTo, selectcbx,
        gvDataXOut, gvDataSheet, pnlGridWidth, handleChangecbx, btnExecute_Click, btnExport_Click, columnsXOutData, columnsSheetNoData
    } = fn_SheetInspection();

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
                        marginLeft: "-6px",
                        marginTop: "-10px",
                    }}
                >
                    <TableContainer
                        component={Paper}
                        style={{
                            width: "700px",
                            margin: "4px",
                        }}
                    >
                        <Table className="TbSheetInspection">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <Typography variant="h6">
                                            Sheet Inspection Report
                                        </Typography>
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
                                            fullWidth
                                            value={txtProductFrom}
                                            onChange={(e) => {
                                                settxtProductFrom(e.target.value.toUpperCase());
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    settxtProductTo(txtProductFrom);
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
                                            size="small"
                                            fullWidth
                                            value={txtProductTo}
                                            onChange={(e) => {
                                                settxtProductTo(e.target.value.toUpperCase());
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
                                            size="small"
                                            fullWidth
                                            value={txtLotFrom}
                                            onChange={(e) => {
                                                settxtLotFrom(e.target.value.toUpperCase());
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    settxtLotTo(txtLotFrom);
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
                                            size="small"
                                            fullWidth
                                            value={txtLotTo}
                                            onChange={(e) => {
                                                settxtLotTo(e.target.value.toUpperCase());
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
                                            size="small"
                                            fullWidth
                                            value={txtRollFrom}
                                            onChange={(e) => {
                                                settxtRollFrom(e.target.value.toUpperCase());
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    settxtRollTo(txtRollFrom);
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
                                            size="small"
                                            fullWidth
                                            value={txtRollTo}
                                            onChange={(e) => {
                                                settxtRollTo(e.target.value.toUpperCase());
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
                                            size="small"
                                            fullWidth
                                            value={txtInvFrom}
                                            onChange={(e) => {
                                                settxtInvFrom(e.target.value.toUpperCase());
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    settxtInvTo(txtInvFrom);
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
                                            size="small"
                                            fullWidth
                                            value={txtInvTo}
                                            onChange={(e) => {
                                                settxtInvTo(e.target.value.toUpperCase());
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Packing Date :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <TextField
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
                                            />
                                            <Typography style={{ marginLeft: "8px" }}>(DD/MM/YYYY)</Typography>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>To :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtDateTo}
                                                style={{
                                                    width: "120px",
                                                }}
                                                onChange={(e) => {
                                                    settxtDateTo(e.target.value.toUpperCase());
                                                }}
                                            />
                                            <Typography style={{ marginLeft: "8px" }}>(DD/MM/YYYY)</Typography>
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
                                            <Button
                                                className="BtExcute"
                                                onClick={btnExecute_Click}
                                            >
                                                Execute
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
                        <>
                            <AntTable
                                dataSource={gvDataXOut.value}
                                columns={columnsXOutData}
                                rowKey={(record) => record.lot_no}
                                className="tableGvDataXOut"
                                // style={{ width: pnlGridWidth }}
                                pagination={false}
                                size="small"
                                bordered
                                scroll={{ x: 'max-content' }}
                            />
                        </>
                    )}
                    <br />

                    {gvDataSheet.visible && (
                        <>
                            <AntTable
                                dataSource={gvDataSheet.value}
                                columns={columnsSheetNoData}
                                rowKey={(record) => record.seq}
                                className="tableGvData"
                                // style={{ width: pnlGridWidth }}
                                pagination={false}
                                size="small"
                                bordered
                                scroll={{ x: 'max-content' }}
                            />
                        </>
                    )}
                </Box>
            </Card>
        </div>
    )
};

export default SheetInspection;