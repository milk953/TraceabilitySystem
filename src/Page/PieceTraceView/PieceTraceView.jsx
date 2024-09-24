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
import Header from "../Header/Header";
import "./PieceTraceView.css";

function PieceTraceView() {

    return (
        <div>
            <Header />
            <h1>View Trace (Piece)</h1>
            <Card
                component={Paper}
                className="Card-Common"
                sx={{ display: "flex" }}
            >
                <Box justifyContent="space-between"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: "column",
                        width: "100%"
                    }}

                >
                    <Table className="TbViewTracePiece">
                        <TableBody>
                            <TableRow>
                                <TableCell align="right" colSpan={4}>
                                    <Typography>
                                        Sheet No. :
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        // className="TxtField"
                                        size="small"
                                        sx={{ width: "123%" }}
                                    // inputRef={(el) => (inputShtNo.current = el)}
                                    // value={txtSheetNo}
                                    // onChange={(e) => {
                                    //     settxtSheetNo(e.target.value);
                                    // }}
                                    // onBlur={() => {
                                    //     if (txtSheetNo !== "") {
                                    //         btnShtDeleteClick();
                                    //     }
                                    // }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        sx={{ width: "20%" }}
                                    // onClick={btnRetriveClick}
                                    >
                                        Retrive
                                    </Button>{" "}
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant="contained"
                                        sx={{ width: "20%" }}
                                        color="error"
                                    // onClick={btnRetriveClick}
                                    >
                                        Clear
                                    </Button>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="right" colSpan={4}>
                                    <Typography>
                                        Piece Chip :
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <TextField
                                        // className="TxtField"
                                        size="small"
                                        sx={{ width: "123%" }}
                                    // inputRef={(el) => (inputShtNo.current = el)}
                                    // value={txtSheetNo}
                                    // onChange={(e) => {
                                    //     settxtSheetNo(e.target.value);
                                    // }}
                                    // onBlur={() => {
                                    //     if (txtSheetNo !== "") {
                                    //         btnShtDeleteClick();
                                    //     }
                                    // }}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <div>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography>
                                            Product :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            fullWidth
                                        // value={txtProduct}
                                        // onChange={(e) => {
                                        //     settxtProduct(e.target.value);
                                        // }}
                                        // onKeyDown={(e) => {
                                        //     if (e.key === "Enter") {
                                        //         handleChangeProduct();
                                        //     }
                                        // }}
                                        // onBlur={handleChangeProduct}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            Sheet No.(F) :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <a id="hypSheetNoF" href="/your-url" style={{ fontSize: "16px" }}>HyperLink</a>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>
                                            Lot No. :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <a id="hypLotNo" href="/your-url" style={{ fontSize: "16px" }}>HyperLink</a>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>
                                            Sheet No.(B) :
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </Box>
            </Card>
        </div>
    )
};

export default PieceTraceView;