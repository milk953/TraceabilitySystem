
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
import {fn_rpt_SheetTraceView} from './fn_rpt_SheetTraceView'
import styled from "styled-components";

function rpt_SheetTraceView() {
const{
    lblMessage,txtSheetNo,settxtSheetNo,btnRetrive,btnClear,txtProduct,settxtProduct,hypLotNo,
    ddlCavity,selectddlCavity,lblShtMachine,hypMaterial,
    btnAOMEFPC,txtAOMEFPCCnt,txtAOMEFPCTime,txtAOMEFPCMachine,btnAOIEFPC,txtAOIEFPCCnt,
    txtAOIEFPCTime,btnOST,txtOSTCnt,txtOSTTime,txtOSTMachine,btnAVI,txtAVICnt,txtAVITime,txtAVIMachine,
    btnFVI,txtFVICnt,txtFVITime,txtFVIMachine,btnSPI,txtSPICnt,txtSPITime,txtSPIMachine,
    btnPre,TxtPreCnt,txtPreTime,txtPreMachine,btnReflow,txtReflowCnt,txtReflowTime,txtReflowMachine,
    btnAOI,txtAOICnt,txtAOITime,txtAOIMachine,btnXRay,txtXRayCnt,txtXRayTime,txtXRayMachine,
    btnAOICOA,txtAOICOACnt,txtAOICOATime,txtAOICOAMachine,btnSMTInt,txtSMTIntCnt,txtSMTIntTime,txtSMTIntMachine,tblData1,
    btnAllLInk,ddlCavity_SelectedIndexChanged,lblCavity,fntxtSheetNo,
    txtAOIEFPCMachine,columnstblData1
}=fn_rpt_SheetTraceView();
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
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: "column",
                        width: "100%",
                    }}

                > <Typography sx={{textAlign:'center',color:'red'}}>
                        {lblMessage}
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
                                        inputRef={(el) => (fntxtSheetNo.current = el)}
                                        value={txtSheetNo}
                                        onChange={(e) => {
                                            settxtSheetNo(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                btnRetrive();
                                            }
                                          }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            sx={{ width: "30%" }}
                                        onClick={btnRetrive}
                                        >
                                            Retrive
                                        </Button>{" "}
                                        &nbsp;&nbsp;&nbsp;
                                        <Button
                                            variant="contained"
                                            sx={{ width: "20%" }}
                                            color="error"
                                        onClick={btnClear}
                                        >
                                            Clear
                                        </Button>
                                    </TableCell>
                                </TableRow>
                             
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
                                            style={{ width: "194px" ,backgroundColor:'#e0e0e0'}}
                                            value={txtProduct}
                                            onChange={(e) => {
                                                settxtProduct(e.target.value);
                                            }}
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
                                    <a
                                href={`/TraceabilitySystem/LotTraceView?lot=${hypLotNo}`}
                                style={{ fontSize: "16px" }}
>
  {hypLotNo}
</a>

                                    </TableCell>
                                   
                                </TableRow>
                                <TableRow>
                                    <TableCell className="color-bg-product">
                                        <Typography>
                                            {lblCavity.value}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                    <FormControl fullWidth>
                                    {/* ตรงนี้ยังติด */}
                        {/* <Autocomplete
                         className="Select_dropDown"
                            // inputRef={fc_SlProduct}
                          value={selectddlCavity}
                        
                        //   disabled={dis_ddlProduct} //true พิมไม่ได้
                        //   sx={{
                        //     '& .MuiAutocomplete-input': {
                        //       backgroundColor: dis_ddlProduct ? '#e0e0e0' : 'inherit',
                        //     },
                        //     '& .MuiAutocomplete-inputDisabled': {
                        //       backgroundColor: '#e0e0e0',
                        //     }
                        //   }}
                          
                          onChange={(e, value) =>
                            ddlCavity_SelectedIndexChanged(value)
                          }
                         
                          

                          options={ddlCavity.text.map((item) => console.log(item.pcs_name,'item.pcs_name'))}  // ใช้ map เพื่อดึงค่า pcs_name มาเป็น options
                          renderInput={(params) => (
                            <TextField
                            // inputRef={(el) => (fc_SlProduct.current = el)}
                              {...params}
                              size="small"
                              sx={{ textAlign: "left" }}
                            />
                          )}
                        /> */}
                        {/* <Autocomplete
  className="Select_dropDown"
  value={selectddlCavity}
  onChange={(e, value) => ddlCavity_SelectedIndexChanged(value)}
  options={ddlCavity.map((item) => item.pcs_name)} 
  renderInput={(params) => (
    <TextField
      {...params}
      size="small"
      sx={{ textAlign: "left" }}
    />
  )}
/> */}
<FormControl fullWidth size="small">
      <Select
        labelId="select-label"
        value={selectddlCavity}
        onChange={ddlCavity_SelectedIndexChanged}
        onBlur={ddlCavity_SelectedIndexChanged}
        displayEmpty
      >
        {ddlCavity.map((option) => (
          <MenuItem key={option.pcs_no} value={option.pcs_no}>
            {option.pcs_name} {/* แสดง text */}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

                      </FormControl>
                                    </TableCell>
                                 
                                </TableRow>
                                {lblShtMachine.visible &&(
                                <TableRow>
                                    <TableCell className="color-bg-product">
                                        <Typography>
                                           Machine. :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                    <Typography  sx={{textAlign:'center'}}>
                                    {lblShtMachine.value}
                                    </Typography>
                                    <Typography  sx={{textAlign:'center'}}>
                                        {hypMaterial.value}
                                    </Typography>
                                    </TableCell>
                                 
                                </TableRow>)}
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
                                                    width: "90%",
                                                    backgroundColor: "#B6BBC4",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    },
                                                    ...btnAOMEFPC.style
                                                    
                                                }}
                                            >{btnAOMEFPC.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell style={{ width: "40px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                            value={txtAOMEFPCCnt}
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
                                            value={txtAOMEFPCTime}
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
                                                value={txtAOMEFPCMachine}
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
                                                    ,...btnAOIEFPC.style,
                                                }}
                                            >{btnAOIEFPC.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell style={{ width: "40px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                            value={txtAOIEFPCCnt}
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                            value={txtAOIEFPCTime}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtAOIEFPCMachine}
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
                                             onClick={() => btnAllLInk('OST')}

                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    },...btnOST.style,
                                                }}
                                            >{btnOST.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell style={{ width: "40px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                            value={txtOSTCnt}
                                         
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                            value={txtOSTTime}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                                value={txtOSTMachine}
                                               
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
                                                    },...btnAVI.style
                                                }}
                                            >{btnAVI.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell style={{ width: "40px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                            value={txtAVICnt}
                                         
                                            />
                                        </TableCell>
                                        <TableCell >
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                            value={txtAVITime}
                                            
                                            />
                                        </TableCell>
                                       
                                        <TableCell style={{ width: "250px" }}>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                fullWidth
                                            value={txtAVIMachine}
                                           
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
                                                    },...btnFVI.style
                                                }}
                                            >{btnFVI.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtFVICnt}
                                            
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
                                                value={txtFVITime}
                                                
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
                                                value={txtFVIMachine}
                                        
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
                                           onClick={() => btnAllLInk('SPI')}
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    }
                                                    ,...btnSPI.style
                                                }}
                                            >{btnSPI.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtSPICnt}
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
                                                value={txtSPITime}
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
                                                value={txtSPIMachine}
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
                                            onClick={() => btnAllLInk('PRE_AOI')}
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    
                                                      
                                                          height: "33px",
                                                          backgroundColor: "#B6BBC4", // สีเทาเมื่อค่าเป็นค่าว่าง
                                                          color: "white",
                                                          width: "90%",
                                                          "&:hover": {
                                                            backgroundColor: "grey", // สีเทาเมื่อ hover
                                                          },
                                                        
                                                      
                                                          ...btnPre.style, // ใช้สไตล์จาก btnPre.style ถ้าค่าไม่ว่าง
                                                        
                                                  }}

                                            >{btnPre.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={TxtPreCnt}
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
                                                value={txtPreTime}
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
                                                value={txtPreMachine}
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
                                            >{btnReflow.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtReflowCnt}
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
                                                value={txtReflowTime}
                                               
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
                                                value={txtReflowMachine}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                                {console.log(btnAOI.style,"btnAOI.style")}
                                    <TableRow>
                                        <TableCell>AOI</TableCell>
                                        <TableCell>
                                            <Button
                                            onClick={() => btnAllLInk('AOI')}
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    },...btnAOI.style
                                                }}
                                            >{btnAOI.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtAOICnt}
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
                                                value={txtAOITime}
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
                                                value={txtAOIMachine}
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
                                            onClick={() => btnAllLInk('XARY')}
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
                                            >{btnXRay.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtXRayCnt}
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
                                                value={txtXRayTime}
                                                
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
                                                value={txtXRayMachine}
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
                                            onClick={() => btnAllLInk('AOI_COA')}
                                                variant="contained"
                                                sx={{
                                                    height: "33px",
                                                    backgroundColor: "#B6BBC4",
                                                    color: "white",
                                                    width: "90%",
                                                    "&:hover": {
                                                        backgroundColor: "grey"
                                                    },...btnAOICOA.style
                                                }}
                                            >{btnAOICOA.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtAOICOACnt}
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
                                                value={txtAOICOATime}
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
                                                value={txtAOICOAMachine}
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
                                            >{btnSMTInt.value}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                className="input_txt"
                                                size="small"
                                                value={txtSMTIntCnt}
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
                                                value={txtSMTIntTime}
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
                                                value={txtSMTIntMachine}
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
                   <br/>
                   {tblData1.length >0 &&(
       <AntTable
       
          dataSource={tblData1}
          columns={columnstblData1}
          className="tableGvResultView"
          pagination={false}
          size="small"
          bordered
          scroll={{ y: 310 }}
        />)}
                
                </Box>
                
            </Card>
        </div>
    )
};

export default rpt_SheetTraceView;