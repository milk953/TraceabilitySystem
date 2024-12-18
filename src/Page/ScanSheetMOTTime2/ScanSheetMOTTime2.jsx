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
  Button as MuiButton,
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
import { Button } from 'antd';
import {
  ArrowRightOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import "../ScanSheetMOTTime1/ScanSheetMOTTime1.css"
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { fn_ScanSheetMOTTime } from "../ScanSheetMOTTime1/fn_ScanSheetMOTTime1";
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
      <Hearder />


      {/* <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center",marginTop:'100px' }}> */}
          <div className='Center_Layout'>
            <Grid >
              <Table
                 className="Header_Center"
                 component={Card}x={{ width: "100%", maxWidth: "800px", minWidth: "800px" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} className="Header_Center">
                    
                       <b> Pre-Baking <ArrowRightOutlined /> MOT2 Control Time</b>
                      
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
                        // inputRef={fctxtMcNo}
                        inputRef={(el) => (fctxtMcNo.current = el)}
                        disabled={false} //falseพิมได้ 
                        style={txtMCNo.style}
                        onChange={(e) => {
                          settxtMCNo((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtMCNo_TextChanged();
                          }
                        }}
                        onBlur={txtMCNo_TextChanged}
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
                        onBlur={txtLotNo_TextChanged}
                      />
                    </TableCell>
                    <TableCell>
                    <MuiButton type="text" onClick={BtClick_back}>
                        <BackspaceIcon />
                      </MuiButton>
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
                  {console.log('lblRemark2',lblRemark,lblResult.value)}
                  <TableRow style={{ display: lblSheet === "" ? 'none' : "" }}>
                    <TableCell colSpan={3} align="center" style={{fontSize:'16px'}}>
                       {lblSheet}
                    </TableCell>
                  </TableRow>
       

                </TableBody>
              </Table>
              <br/>
              <Table  component={Card}>
              {lblResult.value !== '' && lblRemark !== '' && (
                  <TableRow style={{ height: "180px" }} >
                    <TableCell colSpan={3} style={{padding:0}}>
                      <Card style={{ ...lblResult.style, height: "230px" }}>
                        <Typography
                          align="center"
                          style={{ color:'#fff', marginTop: "40px", fontSize: "90px"  }}
                        >
                          {lblResult.value}
                        </Typography>
                        {/* marginTop: lblResult.value === '' ? "380px" : "0px", */}
                        <Typography align="center" style={{ fontSize: "34px",marginTop: lblResult.value === '' || lblResult.value === undefined ? "65px" : "0px",whiteSpace: "pre-line"}}>
                          {lblRemark}
                        </Typography>
                      </Card>
                    </TableCell>
                  </TableRow>
                  )}
                  <TableRow style={{display:pnlSave}} >
                  <TableCell colSpan={3} align="center">
                  <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                    <Box display="flex" justifyContent="space-between" alignItems="center" width="90%">
                      <Button  type="primary" size="large" onClick={BtClick_Replace} className="ButtonReplace">Replace</Button>
                      <Button  type="primary" size="large" onClick={BtClick_Delete} className="ButtonDelete">Delete</Button>
                      <Button  type="primary" size="large"  onClick={BtClick_Cancel} className="ButtonCancel">Cancel</Button>
                    </Box>
                  </Box>
                </TableCell>
                  </TableRow>
              </Table>
            </Grid>
          </div>
        {/* </Box> */}

    </div>
  );
  
}

export default ScanSheetMOTTime;
