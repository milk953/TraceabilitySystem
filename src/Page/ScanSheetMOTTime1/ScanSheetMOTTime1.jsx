import React, { useEffect, useState, useRef } from "react";
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
  Checkbox,
  Grid,
  Input,
} from "@mui/material";


import {
  ArrowRightOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import "../Common/StyleCommon.css";
import "../ScanSheetMOTTime1/ScanSheetMOTTime1.css"
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { fn_ScanSheetMOTTime } from "./fn_ScanSheetMOTTime1";
function ScanSheetMOTTime() {
  const {
    txtLotNo_TextChanged,
    settxtlot,
    txtlot,
    lblProductName,
    lblResult,
    lblSheet,
    lblRemark,
    txtSheetNo_TextChanged,
    settxtSheet,
    txtSheet,
    settxtMCNo,
    txtMCNo,
    txtMCNo_TextChanged,
    fctxtMcNo,
    fctxtLotno,
    fctxtSheetNo,
    EnableLotNo,
    EnableMCNo,
    EnableSheetNo,
    BtClick_back,
    BtClick_Cancel,
    BtClick_Delete,
    BtClick_Replace,
    txtCBNo,
    txtSUSNo,
    fctxtCBNo,
    fctxtSUSNo,
    settxtCBNo,
    settxtSUSNo,
    txtCBNo_TextChanged,
    txtSUSNo_TextChanged,
    pnlSave
  } = fn_ScanSheetMOTTime();

  return (
    <div>
      <Hearder/>
     
      {/* <Card component={Paper} className="Card-ScanSheetMOTTime"> */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center",marginTop:'140px' }}>
          <Grid container spacing={2} style={{justifyContent: 'center' }}>
            <Grid >
              <Table
                className="TableMot1"
                component={Card}
                
              >
                <TableHead style={{ height: '60px' }}>
                  <TableRow>
                    <TableCell colSpan={3} align="center" style={{fontSize:'30px'}}>
                    
                        Pre-Baking <ArrowRightOutlined /> MOT1 Control Time
                      
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right" style={{ width: "150px" }}>
                      <Typography>MOT Machine/Line :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        fullWidth
                        value={txtMCNo.value}
                        // style={{}}
                        inputRef={(el) => (fctxtMcNo.current = el)}
                        disabled={txtMCNo.disbled} //falseพิมได้ 
                        style={txtMCNo.style}
                        onChange={(e) => {
                          settxtMCNo((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtMCNo_TextChanged(e.target.value);
                          }
                        }}
                        // onBlur={(e) => {txtMCNo_TextChanged(e.target.value)}}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Lot No. :</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        fullWidth
                        value={txtlot.value}
                        style={txtlot.style}
                        disabled={txtlot.disbled}
                        onChange={(e) => {
                          settxtlot((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtLotNo_TextChanged();
                          }
                        }}
                        // inputRef={fctxtLotno}
                        inputRef={(el) => (fctxtLotno.current = el)}
                        // onBlur={txtLotNo_TextChanged}
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={BtClick_back}>
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" style={{ height: '40px' }}>
                      <Typography>Product Name :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography>{lblProductName}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography align="right">Sheet No. :</Typography>
                    </TableCell>
  
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        fullWidth
                        value={txtSheet.value}
                        style={txtSheet.style}
                        disabled={txtSheet.disbled}
                        onChange={(e) => {
                          settxtSheet((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtSheetNo_TextChanged();
                          }
                        }}
                        // inputRef={fctxtSheetNo}
                        inputRef={(el) => (fctxtSheetNo.current = el)}
                        // onBlur={txtSheetNo_TextChanged}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ display: txtCBNo.visble }}>
                    <TableCell>
                      <Typography align="right">CB No. :</Typography>
                    </TableCell>
  
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        fullWidth
                        value={txtCBNo.value}
                        style={txtCBNo.style}
                        disabled={txtCBNo.disbled}
                        inputRef={(el) => (fctxtCBNo.current = el)}
                        onChange={(e) => {
                          settxtCBNo((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtCBNo_TextChanged();
                          }
                        }} 
                        // onBlur={txtCBNo_TextChanged}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ display: txtSUSNo.visble }}>
                    <TableCell>
                      <Typography align="right">SUS No. :</Typography>
                    </TableCell>
  
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        fullWidth
                        value={txtSUSNo.value}
                        disabled={txtSUSNo.disbled}
                        style={txtSUSNo.style}
                        // inputRef={fctxtSUSNo}
                        inputRef={(el) => (fctxtSUSNo.current = el)}
                        onChange={(e) => {
                          settxtSUSNo((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtSUSNo_TextChanged();
                          }
                        }} 
                        // onBlur={txtSUSNo_TextChanged}
                      />
                    </TableCell>
                  </TableRow>
  
                  <TableRow style={{ display: lblSheet === "" ? 'none' : "" }}>
                    <TableCell colSpan={3} align="center">
                      <Card
                        style={{
                          background: "#DAD3BE",
                          height: "40px",
                          paddingTop: "6px",
                          fontSize: "23px",
                        }}
                      >
                        {lblSheet}
                      </Card>
                    </TableCell>
                  </TableRow>
                  {/* {console.log('lblRemark1',lblResult.value,'---l',lblRemark)} */}
                  {((lblResult.value !== undefined && lblResult.value !== '') || (lblRemark !== undefined && lblRemark !== '')) && (
                  <TableRow style={{ height: "180px" }} >
                    <TableCell colSpan={3}>
                      <Card style={{ ...lblResult.style, height: "230px" }}>
                        <Typography
                          align="center"
                          style={{ color:'#fff', marginTop: "30px", fontSize: "90px"  }}
                        >
                          {lblResult.value}
                        </Typography>
                        <Typography align="center" style={{ fontSize: "34px",marginTop: lblResult.value === '' || lblResult.value === undefined ? "65px" : "0px",whiteSpace: "pre-line"}}>
                          {lblRemark}
                        </Typography>
                      </Card>
                    </TableCell>
                  </TableRow>
                  )}
                  <TableRow  style={{display:pnlSave}} > 
                    {/* style={{display:pnlSave}} */}
                    <TableCell colSpan={3} align="center">
                      <Button variant="contained" onClick={BtClick_Replace} className="ButtonReplace">Replace</Button>&nbsp;
                      <Button variant="contained"onClick={BtClick_Delete} className="ButtonDelete">Delete</Button>&nbsp;
                      <Button variant="contained" onClick={BtClick_Cancel} className="ButtonCancel">Cancel</Button>&nbsp;
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Box>
      {/* </Card> */}
    </div>
  );
  
}

export default ScanSheetMOTTime;
