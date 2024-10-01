// import React from 'react'

// function rpt_SheetTraceView() {
//   return (
//     <div>rpt_SheetTraceView</div>
//   )
// }

// export default c
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
import "./rpt_SheetTraceView.css";
// import "./PieceTraceView.css";

function rpt_SheetTraceView() {

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

                > <Typography sx={{textAlign:'center',color:'red'}}>
                        [lblMessage]
                        </Typography>
                    <div 
                    className="divSheetTable"
                    >
                       
                        <Table 
                        className="TbViewTraceSheet"
                        >
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
<Card   className="card-style-product">
     <div 
                    className="Product"
                    >
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="color-bg-product" >
                                        <Typography  >
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
                                    
                                </TableRow>
                                <TableRow>
                                    <TableCell  className="color-bg-product">
                                        <Typography>
                                            Lot No. :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <a id="hypLotNo" href="/your-url" style={{ fontSize: "16px" }}>HyperLink</a>
                                    </TableCell>
                                   
                                </TableRow>
                                <TableRow>
                                    <TableCell className="color-bg-product">
                                        <Typography>
                                            SMPJ Cavity :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                    <FormControl fullWidth>
                        <Autocomplete
                         className="Select_dropDown"
                            // inputRef={fc_SlProduct}
                        //   value={selectddlProduct.value}
                        
                        //   disabled={dis_ddlProduct} //true พิมไม่ได้
                        //   sx={{
                        //     '& .MuiAutocomplete-input': {
                        //       backgroundColor: dis_ddlProduct ? '#e0e0e0' : 'inherit',
                        //     },
                        //     '& .MuiAutocomplete-inputDisabled': {
                        //       backgroundColor: '#e0e0e0',
                        //     }
                        //   }}
                          
                        //   onChange={(e, value) =>
                        //     ddlProduct_SelectedIndexChanged(value)
                        //   }
                         
                         
                        //   options={ddlProduct.map((item) => item.prd_name)}
                          renderInput={(params) => (
                            <TextField
                            // inputRef={(el) => (fc_SlProduct.current = el)}
                              {...params}
                              size="small"
                              sx={{ textAlign: "left" }}
                            />
                          )}
                        />
                      </FormControl>
                                    </TableCell>
                                 
                                </TableRow>
                                <TableRow>
                                    <TableCell className="color-bg-product">
                                        <Typography>
                                           Machine. :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                    <Typography  sx={{textAlign:'center'}}>
                                        [lblShtMachine]
                                    </Typography>
                                    <Typography  sx={{textAlign:'center'}}>
                                        [hypMaterial]
                                    </Typography>
                                    </TableCell>
                                 
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    </Card>
                   

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
                                        <TableCell rowSpan={"2"}sx={{width:'10%'}}>Type</TableCell>
                                        <TableCell rowSpan={"2"} sx={{width:'10%'}}> Process</TableCell>
                                    
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Result</TableCell>
                                        <TableCell>C</TableCell>
                                        <TableCell>Reg Time</TableCell>
                                        <TableCell>Machine</TableCell>
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

export default rpt_SheetTraceView;