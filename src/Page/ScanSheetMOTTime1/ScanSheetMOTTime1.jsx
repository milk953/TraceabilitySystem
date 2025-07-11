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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  Box,
  Checkbox,
  Grid,
  Input,
  Button as MuiButton,
} from "@mui/material";


import {
  ArrowRightOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Button } from 'antd';
import "../Common/StyleCommon.css";
import "../ScanSheetMOTTime1/ScanSheetMOTTime1.css"
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { fn_ScanSheetMOTTime } from "./fn_ScanSheetMOTTime1";
import { fn_Homepage } from "../Homepage/fn_Homepage";
function ScanSheetMOTTime() {
  const { menuName } = fn_Homepage();
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
        <div className='Center_Layout'>
          {/* <Grid container spacing={2} style={{justifyContent: 'center' }}> */}
            <Grid >
              <Table
                className="Header_Center"
                component={Card}
              >
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} >
                      {menuName}
                     {/* Pre-Baking <ArrowRightOutlined /> MOT1 Control Time */}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right" style={{ width: "150px" }} >
                      <Typography>MOT Machine/Line :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        id='txtMCNo'
                        fullWidth
                        // value={txtMCNo.value}
                        inputRef={(el) => (fctxtMcNo.current = el)}
                        disabled={txtMCNo.disbled} //falseพิมได้ 
                        style={txtMCNo.style}
                        // onChange={(e) => {
                        //   settxtMCNo((prevState) => ({
                        //     ...prevState,
                        //     value: e.target.value.trim(),
                        //   }));
                        // }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtMCNo_TextChanged();
                          }
                        }}
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
                        id='txtLotNo'
                        // value={txtlot.value}
                        style={txtlot.style}
                        disabled={txtlot.disbled}
                        // onChange={(e) => {
                        //   settxtlot((prevState) => ({
                        //     ...prevState,
                        //     value: e.target.value.trim(),
                        //   }));
                        // }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtLotNo_TextChanged();
                          }
                        }}
                        inputRef={(el) => (fctxtLotno.current = el)}
                      />
                    </TableCell>
                    <TableCell>
                      <MuiButton type="text" id='ibtback' onClick={BtClick_back}>
                        <BackspaceIcon />
                      </MuiButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" style={{ height: '40px' }}>
                      <Typography>Product Name :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography id='lblProductName'>{lblProductName}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography align="right">Sheet No. :</Typography>
                    </TableCell>
  
                    <TableCell colSpan={2}>
                      <TextField
                      id='txtSheetNo'
                        size="small"
                        fullWidth
                        // value={txtSheet.value}
                        style={txtSheet.style}
                        disabled={txtSheet.disbled}
                        // onChange={(e) => {
                        //   settxtSheet((prevState) => ({
                        //     ...prevState,
                        //     value: e.target.value.trim(),
                        //   }));
                        // }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtSheetNo_TextChanged();
                          }
                        }}
                        inputRef={(el) => (fctxtSheetNo.current = el)}
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
                        id='txtCBNo'
                        fullWidth
                        // value={txtCBNo.value}
                        style={txtCBNo.style}
                        disabled={txtCBNo.disbled}
                        inputRef={(el) => (fctxtCBNo.current = el)}
                        // onChange={(e) => {
                        //   settxtCBNo((prevState) => ({
                        //     ...prevState,
                        //     value: e.target.value.trim(),
                        //   }));
                        // }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtCBNo_TextChanged();
                          }
                        }} 
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ display: txtSUSNo.visble }}>
                    <TableCell>
                      <Typography align="right">SUS No. :</Typography>
                    </TableCell>
  
                    <TableCell colSptxtSUSNoan={2}>
                      <TextField
                        size="small"
                        id='txtSUSNo'
                        fullWidth
                        // value={txtSUSNo.value}
                        disabled={txtSUSNo.disbled}
                        style={txtSUSNo.style}
                        // inputRef={fctxtSUSNo}
                        inputRef={(el) => (fctxtSUSNo.current = el)}
                        // onChange={(e) => {
                        //   settxtSUSNo((prevState) => ({
                        //     ...prevState,
                        //     value: e.target.value.trim(),
                        //   }));
                        // }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtSUSNo_TextChanged();
                          }
                        }} 
                      />
                    </TableCell>
                  </TableRow>
  
                  <TableRow style={{ display: lblSheet === "" ? 'none' : "" }}>
                    <TableCell id= 'lblSheet' colSpan={3} align="center" style={{fontSize:'16px'}}>
                       {lblSheet}
                    </TableCell>
                  </TableRow>
       
                
                </TableBody>
              </Table>
              <br/>
              <Table  component={Card}>
              {((lblResult.value !== undefined && lblResult.value !== '') || (lblRemark !== undefined && lblRemark !== '')) && (
                  <TableRow style={{ height: "180px" }} >
                    <TableCell colSpan={3} style={{padding:0,border:0}}>
                      <Card style={{ ...lblResult.style, height: "230px" }}>
                        <Typography
                          align="center"
                          style={{ color:'#fff', marginTop: "40px", fontSize: "90px"  }}
                          id='lblResult'
                        >
                          {lblResult.value}
                        </Typography>
                        <Typography id='lblRemark' align="center" style={{ fontSize: "34px",marginTop: lblResult.value === '' || lblResult.value === undefined ? "65px" : "0px",whiteSpace: "pre-line"}}>
                          {lblRemark}
                        </Typography>
                      </Card>
                    </TableCell>
                  </TableRow>
                  )}
              <TableRow  style={{display:pnlSave}} > 
                <TableCell colSpan={3} align="center">
                  <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                    <Box display="flex" justifyContent="space-between" alignItems="center" width="90%">
                      <Button id='btnReplace' type="primary" size="middle" onClick={BtClick_Replace} className="ButtonReplace">Replace</Button>
                      <Button id='btnDelete' type="primary" size="middle" onClick={BtClick_Delete} className="ButtonDelete">Delete</Button>
                      <Button  id='btnCancel' type="primary" size="middle"  onClick={BtClick_Cancel} className="ButtonCancel">Cancel</Button>
                    </Box>
                  </Box>
                </TableCell>
                  </TableRow>
              </Table>
            </Grid>
          {/* </Grid> */}
        </div>
      {/* </Card> */}
    </div>
  );
  
}

export default ScanSheetMOTTime;
