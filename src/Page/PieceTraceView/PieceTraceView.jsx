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
                        width: "100%",
                    }}

                >
                    <div className="divTb">
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
                                {/* <TableRow>
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
                                </TableRow> */}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="divTbProduct">
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
                                            style={{ width: "194px" }}
                                            // value={txtProduct}
                                            // onChange={(e) => {
                                            //     settxtProduct(e.target.value);
                                            // }}
                                            InputProps={{
                                                readOnly: true,
                                            }}
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
                                    <TableCell>
                                        <a id="hypSheetNoB" href="/your-url" style={{ fontSize: "16px" }}>HyperLink</a>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>
                                            Piece No. :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            style={{ width: "194px" }}
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
                                            SheetType. :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            style={{ width: "194px" }}
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
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <div className="TbPiece">
                        <TableContainer
                            component={Paper}
                            style={{
                                width: "100%",
                                margin: "auto",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                boxShadow: "none",
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell rowSpan={"2"}>Type</TableCell>
                                        <TableCell rowSpan={"2"}> Process</TableCell>
                                        <TableCell colSpan={"3"}>Front side</TableCell>
                                        <TableCell colSpan={"3"}>Back side</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Result</TableCell>
                                        <TableCell>C</TableCell>
                                        <TableCell>Reg Time</TableCell>
                                        <TableCell>Result</TableCell>
                                        <TableCell>C</TableCell>
                                        <TableCell>Reg Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell rowSpan={"6"}>EFPC</TableCell>
                                        <TableCell>AOM / Via AOI</TableCell>
                                        <TableCell style={{ width: "100px" }}>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell style={{ width: "40px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
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
                                        <TableCell style={{ width: "250px" }}>
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
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>AOI E-FPC</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell style={{ width: "40px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
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
                                        <TableCell >
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
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Barcode Grade</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell >
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
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>OST</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell style={{ width: "40px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
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
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>AVI</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell style={{ width: "40px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                            // value={txtAVICntF}
                                            // onChange={(e) => {
                                            //     settxtAVICntF(e.target.value);
                                            // }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                            // value={txtAVITimeF}
                                            // onChange={(e) => {
                                            //     settxtAVITimeF(e.target.value);
                                            // }}
                                            />
                                        </TableCell>
                                        <TableCell style={{ width: "100px" }}>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell style={{ width: "40px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                            // value={txtAVICntF}
                                            // onChange={(e) => {
                                            //     settxtAVICntF(e.target.value);
                                            // }}
                                            />
                                        </TableCell>
                                        <TableCell style={{ width: "250px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                            // value={txtAVITimeF}
                                            // onChange={(e) => {
                                            //     settxtAVITimeF(e.target.value);
                                            // }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>FVI</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtAVIMarkCntF}
                                                // onChange={(e) => {
                                                //     settxtAVIMarkCntF(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtAVITimeF}
                                                // onChange={(e) => {
                                                //     settxtAVITimeF(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtAVICntF}
                                                // onChange={(e) => {
                                                //     settxtAVICntF(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtAVITimeF}
                                                // onChange={(e) => {
                                                //     settxtAVITimeF(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell rowSpan={"10"}>SMT</TableCell>
                                        <TableCell>SPI</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtSPICntF}
                                                // onChange={(e) => {
                                                //     settxtSPICntF(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtSPITimeF}
                                                // onChange={(e) => {
                                                //     settxtSPITimeF(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtSPICntB}
                                                // onChange={(e) => {
                                                //     settxtSPICntB(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtSPITimeB}
                                                // onChange={(e) => {
                                                //     settxtSPITimeB(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>PreAOI</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtPreAOICntF}
                                                // onChange={(e) => {
                                                //     settxtPreAOICntF(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtPreTimeF}
                                                // onChange={(e) => {
                                                //     settxtPreTimeF(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtPreAOICntB}
                                                // onChange={(e) => {
                                                //     settxtPreAOICntB(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtPreTimeB}
                                                // onChange={(e) => {
                                                //     settxtPreTimeB(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>Reflow</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtReflowCntF}
                                                // onChange={(e) => {
                                                //     settxtReflowCntF(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtReflowTimeF}
                                                // onChange={(e) => {
                                                //     settxtReflowTimeF(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtReflowCntB}
                                                // onChange={(e) => {
                                                //     settxtReflowCntB(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtReflowTimeB}
                                                // onChange={(e) => {
                                                //     settxtReflowTimeB(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>AOI</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtAOICntF}
                                                // onChange={(e) => {
                                                //     settxtAOICntF(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtAOITimeF}
                                                // onChange={(e) => {
                                                //     settxtAOITimeF(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtAOICntB}
                                                // onChange={(e) => {
                                                //     settxtAOICntB(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtAOITimeB}
                                                // onChange={(e) => {
                                                //     settxtAOITimeB(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>X-RAY</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtXRAYCnt_F}
                                                // onChange={(e) => {
                                                //     settxtXRAYCnt_F(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtXRAYTime_F}
                                                // onChange={(e) => {
                                                //     settxtXRAYTime_F(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtXRAYCnt_B}
                                                // onChange={(e) => {
                                                //     settxtXRAYCnt_B(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtXRAYTime_B}
                                                // onChange={(e) => {
                                                //     settxtXRAYTime_B(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>AOI Coating</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtAOICOACntF}
                                                // onChange={(e) => {
                                                //     settxtAOICOACntF(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtAOICOATimeF}
                                                // onChange={(e) => {
                                                //     settxtAOICOATimeF(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtAOICOACntB}
                                                // onChange={(e) => {
                                                //     settxtAOICOACntB(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtAOICOATimeB}
                                                // onChange={(e) => {
                                                //     settxtAOICOATimeB(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>SMT-INT</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtSMTIntCntF}
                                                // onChange={(e) => {
                                                //     settxtSMTIntCntF(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtSMTIntTimeF}
                                                // onChange={(e) => {
                                                //     settxtSMTIntTimeF(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtSMTIntCntB}
                                                // onChange={(e) => {
                                                //     settxtSMTIntCntB(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtSMTIntTimeB}
                                                // onChange={(e) => {
                                                //     settxtSMTIntTimeB(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>Reject1</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtRejectCnt1}
                                                // onChange={(e) => {
                                                //     settxtRejectCnt1(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtRejectTime1}
                                                // onChange={(e) => {
                                                //     settxtRejectTime1(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>Re-judgement</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtTouchUpCnt}
                                                // onChange={(e) => {
                                                //     settxtTouchUpCnt(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtTouchUpTime}
                                                // onChange={(e) => {
                                                //     settxtTouchUpTime(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>Bending</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtBendingTime}
                                                // onChange={(e) => {
                                                //     settxtBendingTime(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell colSpan={"3"} style={{ textAlign: "left" }}>
                                            <Typography>lblBendingMachine</Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell rowSpan={"10"}>Common</TableCell>
                                        <TableCell>ELT1</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtELTCnt1}
                                                // onChange={(e) => {
                                                //     settxtELTCnt1(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtELTTime1}
                                                // onChange={(e) => {
                                                //     settxtELTTime1(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>ELT2</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtELTCnt2}
                                                // onChange={(e) => {
                                                //     settxtELTCnt2(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtELTTime2}
                                                // onChange={(e) => {
                                                //     settxtELTTime2(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>ELT3</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtELTCnt3}
                                                // onChange={(e) => {
                                                //     settxtELTCnt3(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtELTTime3}
                                                // onChange={(e) => {
                                                //     settxtELTTime3(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>ELT4</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtELTCnt4}
                                                // onChange={(e) => {
                                                //     settxtELTCnt4(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtELTTime4}
                                                // onChange={(e) => {
                                                //     settxtELTTime4(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>ELT5</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtELTCnt5}
                                                // onChange={(e) => {
                                                //     settxtELTCnt5(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtELTTime5}
                                                // onChange={(e) => {
                                                //     settxtELTTime5(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>ELT6</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtELTCnt6}
                                                // onChange={(e) => {
                                                //     settxtELTCnt6(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtELTTime6}
                                                // onChange={(e) => {
                                                //     settxtELTTime6(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>ELT7</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                // value={txtELTCnt7}
                                                // onChange={(e) => {
                                                //     settxtELTCnt7(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtELTTime7}
                                                // onChange={(e) => {
                                                //     settxtELTTime7(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>FQC</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtFQCTime}
                                                // onChange={(e) => {
                                                //     settxtFQCTime(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell colSpan={"3"} style={{ textAlign: "left" }}>
                                            <Typography>lblFQCMachine lblFQCOperator</Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>FinalGate</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtFinalGateTime}
                                                // onChange={(e) => {
                                                //     settxtFinalGateTime(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell colSpan={"3"} style={{ textAlign: "left" }}>
                                            <Typography>lblFinalGateRemark</Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>ScanPack</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                }}
                                            >
                                            </Button>
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                // value={txtPackingTime}
                                                // onChange={(e) => {
                                                //     settxtPackingTime(e.target.value);
                                                // }}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell colSpan={"3"} style={{ textAlign: "left" }}>
                                            <Typography>lblScanPackRemark</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div style={{ marginTop: "50px" }}>
                        <a href="/TraceabilitySystem">Return To Menu</a>
                    </div>
                </Box>
            </Card>
        </div>
    )
};

export default PieceTraceView;