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


      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center",marginTop:'140px' }}>
          <Grid container spacing={2} style={{justifyContent: 'center' }}>
            <Grid >
              <Table
                className="TableMot1"
                component={Card}
                sx={{ width: "100%", maxWidth: "800px", minWidth: "800px" }}
              >
                <TableHead style={{ height: '60px' }}>
                  <TableRow>
                    <TableCell colSpan={3} align="center" style={{fontSize:'30px'}}>
                    
                        Pre-Baking <ArrowRightOutlined /> MOT2 Control Time
                      
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
                        onBlur={txtSheetNo_TextChanged}
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
                        onBlur={txtCBNo_TextChanged}
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
                        onBlur={txtSUSNo_TextChanged}
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
                  <TableRow style={{ height: "180px" }}>
                    <TableCell colSpan={3}>
                      <Card style={{ background: "#EFBC9B", height: "230px" }}>
                        <Typography
                          align="center"
                          style={{marginTop: "40px", fontSize: "90px"  }}
                          // { }
                        >
                          {lblResult.value}
                        </Typography>
                        <Typography align="center" style={{ fontSize: "20px",marginTop: "80px" }}>
                          {lblRemark}
                        </Typography>
                      </Card>
                    </TableCell>
                  </TableRow>
                  <TableRow  style={{display:pnlSave}}>
                    <TableCell colSpan={3} align="center">
                      <Button variant="contained" onClick={BtClick_Replace} >Replace</Button>&nbsp;
                      <Button variant="contained"onClick={BtClick_Delete} >Delete</Button>&nbsp;
                      <Button variant="contained" onClick={BtClick_Cancel}>Cancel</Button>&nbsp;
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Box>

    </div>
  );
  
}

export default ScanSheetMOTTime;
