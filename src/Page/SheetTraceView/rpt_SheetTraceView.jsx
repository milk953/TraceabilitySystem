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
  Box,
} from "@mui/material";
import { Table as AntTable } from "antd";
import { Input, Button } from "antd";
import "../Common/StyleCommon.css";
import Header from "../Header/Header";
import "./rpt_SheetTraceView.css";
import { SearchOutlined, UndoOutlined } from "@ant-design/icons";
import { fn_rpt_SheetTraceView } from "./fn_rpt_SheetTraceView";

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
          <div className="">
            <Table className="TbViewTraceSheet">
              <TableBody>
                <TableRow>
                  <TableCell align="right">
                    <Button
                      disabled
                      colSpan={4}
                      style={{ color: "white", backgroundColor: "#31363F" ,width:"97%"}}
                      type="primary"
                      className="LableView"
                      iconPosition={"end"}
                    >
                      Sheet No :
                    </Button>
                  </TableCell>

                  <TableCell align="center">
                    <Input
                      size="small"
                     // id="RollLeafTextFiledFirst"
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
                    <Button
                      type="primary"
                      className="RetriveBtn"
                      icon={<SearchOutlined />}
                      onClick={btnRetrive}
                    >
                      Search
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#f5222d",
                        borderColor: "#f5222d",
                      }}
                      className="ClearBtn"
                      icon={<UndoOutlined />}
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
          <div>
            <Table className="Sheet-Table-Search">
            <TableRow>
  <TableCell style={{ padding: '4px' }}>
    <Button
      disabled
      style={{
        color: "white",
        backgroundColor: "#31363F",
        width: "97%",
      }}
      type="primary"
      className="LableView"
      iconPosition={"end"}
    >
      Product :
    </Button>
  </TableCell>
  <TableCell style={{ padding: '4px' }}>
    <Input
      size="small"
      className="ViewInput"
      style={{ width: "170px" }}
      value={txtProduct}
      onChange={(e) => settxtProduct(e.target.value)}
      disabled
    />
  </TableCell>
  <TableCell style={{ padding: '4px' }}>
    <Button
      disabled
      style={{
        color: "white",
        backgroundColor: "#31363F",
        width: "97%",
      }}
      type="primary"
      className="LableView"
      iconPosition={"end"}
    >
      Lot No. :
    </Button>
  </TableCell>
  <TableCell style={{ padding: '4px' }}>
    <a
      href={`/TraceabilitySystem/LotTraceView?lot=${hypLotNo}`}
      style={{ fontSize: "16px" }}
    >
      {hypLotNo}
    </a>
  </TableCell>
</TableRow>
<TableRow >
  <TableCell style={{ padding: '4px' }}>
    <Button
      disabled
      style={{
        color: "white",
        backgroundColor: "#31363F",
        width: "97%",
      }}
      type="primary"
      className="LableView"
      iconPosition={"end"}
    >
      {lblCavity.value} :
    </Button>
  </TableCell>
  <TableCell style={{ padding: '4px' }}>
    <FormControl fullWidth>
      <Select
        style={{ height: "33px" }}
        size="small"
        value={selectddlCavity}
        onChange={(e) => ddlCavity_SelectedIndexChanged(e)}
        displayEmpty
      >
        {ddlCavity.map((option) => (
          <MenuItem key={option.pcs_no} value={option.pcs_no}>
            {option.pcs_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </TableCell>
  {lblShtMachine.visible && (
    <TableCell style={{ padding: '4px' }}>
      <Button
        disabled
        style={{
          color: "white",
          backgroundColor: "#31363F",
          width: "97%",
        }}
        type="primary"
        className="LableView"
        iconPosition={"end"}
      >
        Machine. :
      </Button>
    </TableCell>
  )}
  <TableCell style={{ padding: '4px' }}>
    <Typography>
      {lblShtMachine.value}
    </Typography>
    <Typography sx={{ textAlign: "center" }}>
      {hypMaterial.value}
    </Typography>
  </TableCell>
</TableRow>
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
                          ...btnAOMEFPC.style,
                          color: "white",
                        }}
                        className="hover-button"
                        disabled
                      >
                        {btnAOMEFPC.value}
                      </Button>
                    </TableCell>
                    <TableCell style={{ width: "40px" }}>
                      <TextField
                        className="input_txt"
                        size="small"
                        value={txtAOMEFPCCnt}
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
                      />
                    </TableCell>
                    <TableCell style={{ width: "250px" }}>
                      <TextField
                        className="input_txt"
                        size="small"
                        fullWidth
                        value={txtAOMEFPCTime}
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
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
                        disabled
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        className="input_txt"
                        size="small"
                        fullWidth
                        value={txtAOIEFPCTime}
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        className="input_txt"
                        size="small"
                        fullWidth
                        value={txtAOIEFPCMachine}
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
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
                          color: "white",
                          width: "90%",
                          ...btnOST.style,
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        className="input_txt"
                        size="small"
                        fullWidth
                        value={txtOSTTime}
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        className="input_txt"
                        size="small"
                        fullWidth
                        value={txtOSTMachine}
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
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
                          color: "white",
                          width: "90%",
                          ...btnAVI.style,
                        }}
                        className="hover-button"
                        disabled
                      >
                        {btnAVI.value}
                      </Button>
                    </TableCell>
                    <TableCell style={{ width: "40px" }}>
                      <TextField
                        className="input_txt"
                        size="small"
                        value={txtAVICnt}
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        className="input_txt"
                        size="small"
                        fullWidth
                        value={txtAVITime}
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
                      />
                    </TableCell>

                    <TableCell style={{ width: "250px" }}>
                      <TextField
                        className="input_txt"
                        size="small"
                        fullWidth
                        value={txtAVIMachine}
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
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
                          color: "white",
                          width: "90%",
                          ...btnFVI.style,
                        }}
                        className="hover-button"
                        disabled
                      >
                        {btnFVI.value}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <TextField
                        className="input_txt"
                        size="small"
                        value={txtFVICnt}
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
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
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        className="input_txt"
                        size="small"
                        fullWidth
                        value={txtPreTime}
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <TextField
                        className="input_txt"
                        size="small"
                        fullWidth
                        value={txtPreMachine}
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
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
                        disabled
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
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
                          ...btnAOICOA.style,
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
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
                        disabled
                        sx={{
                          pointerEvents: "none",
                          caretColor: "transparent",
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
