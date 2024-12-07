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
import { Table as AntTable } from "antd";
import { Input, Button } from "antd";
import "../Common/StyleCommon.css";
import Pageimg from "/src/assets/1.jpg";
import Header from "../Header/Header";
import "./rpt_SheetTraceView.css";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { fn_rpt_SheetTraceView } from "./fn_rpt_SheetTraceView";
import styled from "styled-components";

function rpt_SheetTraceView() {
  const {
    lblMessage,
    txtSheetNo,
    settxtSheetNo,
    btnRetrive,
    btnClear,
    txtProduct,
    settxtProduct,
    hypLotNo,
    ddlCavity,
    selectddlCavity,
    lblShtMachine,
    hypMaterial,
    btnAOMEFPC,
    txtAOMEFPCCnt,
    txtAOMEFPCTime,
    txtAOMEFPCMachine,
    btnAOIEFPC,
    txtAOIEFPCCnt,
    txtAOIEFPCTime,
    btnOST,
    txtOSTCnt,
    txtOSTTime,
    txtOSTMachine,
    btnAVI,
    txtAVICnt,
    txtAVITime,
    txtAVIMachine,
    btnFVI,
    txtFVICnt,
    txtFVITime,
    txtFVIMachine,
    btnSPI,
    txtSPICnt,
    txtSPITime,
    txtSPIMachine,
    btnPre,
    TxtPreCnt,
    txtPreTime,
    txtPreMachine,
    btnReflow,
    txtReflowCnt,
    txtReflowTime,
    txtReflowMachine,
    btnAOI,
    txtAOICnt,
    txtAOITime,
    txtAOIMachine,
    btnXRay,
    txtXRayCnt,
    txtXRayTime,
    txtXRayMachine,
    btnAOICOA,
    txtAOICOACnt,
    txtAOICOATime,
    txtAOICOAMachine,
    btnSMTInt,
    txtSMTIntCnt,
    txtSMTIntTime,
    txtSMTIntMachine,
    tblData1,
    btnAllLInk,
    ddlCavity_SelectedIndexChanged,
    lblCavity,
    fntxtSheetNo,
    txtAOIEFPCMachine,
    columnstblData1,
  } = fn_rpt_SheetTraceView();
  return (
    <div>
      <Header />
      <Card component={Paper} className="Card-Common" sx={{ display: "flex" }}>
        <Box
          justifyContent="space-between"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {" "}
          <Typography sx={{ textAlign: "center", color: "red" }}>
            {lblMessage}
          </Typography>
          <div className="divSheetTable">
            <Table className="TbViewTraceSheet">
              <TableBody>
                <TableRow>
                  <TableCell align="right" colSpan={4}>
                    {/* <Typography>
                                            Sheet No. :
                                        </Typography>
                                         */}
                    <Button
                      disabled
                      colSpan={4}
                      style={{ color: "white", backgroundColor: "#31363F" }}
                      type="primary"
                      className="LableView"
                      iconPosition={"end"}
                    >
                      Sheet No :
                    </Button>
                  </TableCell>

                  <TableCell align="center">
                    {/* <TextField
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
                                         */}
                    <Input
                      size="small"
                      id="RollLeafTextFiledFirst"
                      className="ViewInput"
                      placeholder="Please Input Sheet No"
                      value={txtSheetNo}
                      onChange={(e) => settxtSheetNo(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          btnRetrive();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {/* <Button
                                            variant="contained"
                                            sx={{ width: "30%" }}
                                        onClick={btnRetrive}
                                        >
                                            Retrive
                                        </Button>{" "} */}
                    <Button
                      type="primary"
                      className="RetriveBtn"
                      icon={<SearchOutlined />}
                      onClick={btnRetrive}
                    >
                     Search
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    {/* <Button
                                            variant="contained"
                                            sx={{ width: "20%" }}
                                            color="error"
                                        onClick={btnClear}
                                        >
                                            Clear
                                        </Button> */}
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#f5222d",
                        borderColor: "#f5222d",
                      }}
                      className="ClearBtn"
                      icon={<ClearOutlined />}
                      onClick={btnClear}
                    >
                      Clear
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {/* <Card className="card-style-product"> */}
            <div className="Product">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                    // className="color-bg-product"
                     >
                      {/* <Typography>Product :</Typography> */}
                      <Button
                      disabled
                    //   colSpan={4}
                      style={{ color: "white", backgroundColor: "#31363F" ,width:'97%'}}
                      type="primary"
                      className="LableView"
                      iconPosition={"end"}
                    >
                     Product :
                    </Button>
                    </TableCell>
                    <TableCell>
                      {/* <TextField
                        className="input_txt"
                        size="small"
                        style={{ width: "194px", backgroundColor: "#e0e0e0"  }}
                        value={txtProduct}
                        onChange={(e) => {
                          settxtProduct(e.target.value);
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                      /> */}
                       <Input
                      size="small"
                      className="ViewInput"
                      style={{width:'170px'}}
                      value={txtProduct}
                      onChange={(e) => settxtProduct(e.target.value)}
                      disabled
                    />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell 
                    //className="color-bg-product"
                    >
                      {/* <Typography>Lot No. :</Typography> */}
                      <Button
                      disabled
                     
                      style={{ color: "white", backgroundColor: "#31363F" ,width:'97%' }}
                      type="primary"
                      className="LableView"
                      iconPosition={"end"}
                    >
                      Lot No. :
                    </Button>
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
                    <TableCell
                    //  className="color-bg-product"
                    >
                      {/* <Typography>{lblCavity.value}</Typography> */}
                      <Button
                      disabled
            
                      style={{ color: "white", backgroundColor: "#31363F" ,width:'97%'}}
                      type="primary"
                      className="LableView"
                      iconPosition={"end"}
                    >
                     {lblCavity.value} :
                    </Button>
                    </TableCell>
                    <TableCell>
                      <FormControl fullWidth>
                        {/* ตรงนี้ยังติด */}
                  
                        <FormControl fullWidth >
                          <Select
                           style={{height:"33px"}}
                            size="small"
                            value={selectddlCavity}
                           // onChange={ddlCavity_SelectedIndexChanged}
                            onChange={(e) => ddlCavity_SelectedIndexChanged(e)}
                            // onBlur={ddlCavity_SelectedIndexChanged}
                            displayEmpty
                          >
                            {ddlCavity.map((option) => (
                              <MenuItem
                                key={option.pcs_no}
                                value={option.pcs_no}
                              >
                                {option.pcs_name} {/* แสดง text */}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  {lblShtMachine.visible && (
                    <TableRow>
                      <TableCell 
                      //className="color-bg-product"
                      >
                        {/* <Typography>Machine. :</Typography> */}
                        <Button
                      disabled
                   
                      style={{ color: "white", backgroundColor: "#31363F" ,width:'97%' }}
                      type="primary"
                      className="LableView"
                      iconPosition={"end"}
                    >
                     Machine. :
                    </Button>
                      </TableCell>
                      <TableCell>
                        <Typography 
                        // sx={{ textAlign: "center" }}
                        >
                          {lblShtMachine.value}
                        </Typography>
                        <Typography sx={{ textAlign: "center" }}>
                          {hypMaterial.value}
                        </Typography>
                      </TableCell>
                    </TableRow>
                   )} 
                </TableBody>
              </Table>
            </div>
          {/* </Card> */}
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
                    <TableCell rowSpan={"2"} sx={{ width: "10%" }}>
                      Type
                    </TableCell>
                    <TableCell rowSpan={"2"} sx={{ width: "10%" }}>
                      {" "}
                      Process
                    </TableCell>
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
                        style={{
                          height: "33px",
                          width: "90%",
                          backgroundColor: "#B6BBC4", 
                          ...btnAOMEFPC.style, // รวมสไตล์เพิ่มเติมจาก btnAOMEFPC.style
                        }}
                        className="hover-button"
                      >
                        {btnAOMEFPC.value}
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
                        style={{
                          height: "33px",
                          backgroundColor: "#B6BBC4",
                          color: "white",
                          width: "90%",
                          ...btnAOIEFPC.style,
                        }}
                        className="hover-button"
                      >
                        {btnAOIEFPC.value}
                      </Button>
                    </TableCell>
                    <TableCell style={{ width: "40px" }}>
                      <TextField
                        className="input_txt"
                        size="small"
                        value={txtAOIEFPCCnt}
                      />
                    </TableCell>
                    <TableCell>
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

                  <TableRow></TableRow>
                  <TableRow>
                    <TableCell>OST</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => btnAllLInk("OST")}
                        style={{
                          height: "33px",
                          backgroundColor: "#B6BBC4", 
                          color: "white", // สีของข้อความ
                          width: "90%",
                          ...btnOST.style, // รวมสไตล์จาก btnOST.style
                        }}
                        className="hover-button"
                      >
                        {btnOST.value}
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
                        style={{
                          height: "33px",
                          backgroundColor: "#B6BBC4", 
                          color: "white", // สีข้อความ
                          width: "90%",
                          ...btnAVI.style, // รวมสไตล์เพิ่มเติมจาก btnAVI.style
                        }}
                        className="hover-button"
                      >
                        {btnAVI.value}
                      </Button>
                    </TableCell>
                    <TableCell style={{ width: "40px" }}>
                      <TextField
                        className="input_txt"
                        size="small"
                        value={txtAVICnt}
                      />
                    </TableCell>
                    <TableCell>
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
                        style={{
                          height: "33px",
                          backgroundColor: "#B6BBC4", 
                          color: "white", // สีของข้อความ
                          width: "90%",
                          ...btnFVI.style, // รวมสไตล์เพิ่มเติมจาก btnFVI.style
                        }}
                        className="hover-button"
                      >
                        {btnFVI.value}
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
                    <TableCell>
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
                      {console.log("btnSPI.style",btnSPI)}
                      <Button
                        onClick={() => btnAllLInk("SPI")}
                        style={{
                          height: "33px",
                          backgroundColor: "#B6BBC4", 
                          color: "white",
                          width: "90%",
                          ...btnSPI.style,
                        }}
                        className="hover-button"
                      >
                        {btnSPI.value}
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
                    <TableCell>
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
                        onClick={() => btnAllLInk("PRE_AOI")}
                        style={{
                          height: "33px",
                          backgroundColor: "#B6BBC4", 
                          color: "white",
                          width: "90%",
                          ...btnPre.style, 
                        }}
                        className="hover-button"
                      >
                        {btnPre.value}
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
                    <TableCell>
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
                        style={{
                          height: "33px",
                          backgroundColor: "#B6BBC4", 
                          color: "white",
                          width: "90%",
                        }}
                        className="hover-button"
                      >
                        {btnReflow.value}
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
                    <TableCell>
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
                  <TableRow>
                    <TableCell>AOI</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => btnAllLInk("AOI")}
                        style={{
                          height: "33px",
                          backgroundColor: "#B6BBC4", 
                          color: "white",
                          width: "90%",
                          ...btnAOI.style, 
                        }}
                        className="hover-button"
                      >
                        {btnAOI.value}
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
                    <TableCell>
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
                        onClick={() => btnAllLInk("XARY")}
                        style={{
                          height: "33px",
                          backgroundColor: "#B6BBC4", 
                          color: "white",
                          width: "90%",
                        }}
                        className="hover-button"
                      >
                        {btnXRay.value}
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
                    <TableCell>
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
                        onClick={() => btnAllLInk("AOI_COA")}
                        style={{
                          height: "33px",
                          backgroundColor: "#B6BBC4", 
                          color: "white",
                          width: "90%",
                          ...btnAOICOA.style, // ใช้สไตล์เพิ่มเติมจาก btnAOICOA.style
                        }}
                        className="hover-button"
                      >
                        {btnAOICOA.value}
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
                    <TableCell>
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
                        style={{
                          height: "33px",
                          backgroundColor: "#B6BBC4", 
                          color: "white",
                          width: "90%",
                        }}
                        className="hover-button"
                      >
                        {btnSMTInt.value}
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
                    <TableCell>
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
          <br />
          {tblData1.length > 0 && (
            <AntTable
              dataSource={tblData1}
              columns={columnstblData1}
              className="tableGvResultView"
              pagination={false}
              size="small"
              bordered
              scroll={{ y: 310 }}
            />
          )}
        </Box>
      </Card>
    </div>
  );
}

export default rpt_SheetTraceView;
