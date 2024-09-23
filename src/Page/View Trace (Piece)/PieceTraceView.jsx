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
                    }}

                >
                    <Table className="TbViewTracePiece">
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" colSpan={4}>
                                    <Typography
                                        style={{ marginLeft: "200px" }}
                                    >
                                        Sheet No. :
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        // className="TxtField"
                                        size="small"
                                        fullWidth
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
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        // onClick={btnRetriveClick}
                                    >
                                        Retrive
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
            </Card>
        </div>
    )
};

export default PieceTraceView;