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
import BackspaceIcon from "@mui/icons-material/Backspace";
import { Table as AntTable } from 'antd';
import "../Final Gate/SerialPcs.css";
import Hearder from "../Header/Header";
import "../Common/StyleCommon.css";
import Pageimg from "/src/assets/1.jpg";
import { fn_ScanSMTPackingConfirm } from "../ScanSMTPackingConfirm/fn_ScanSMTPackingConfirm";
function ScanSMTPackingConfirm() {
  const {
    txtLot,
    settxtLot,
    txtLot_TextChanged,
    ddlProduct,
    selectddlProduct,
    setselectddlProduct,
    lblTotalSht,
    lblShtCount,
    lblResult,
    txtSerial,
    settxtSerial,
    gvSerial,
    gvScanResult,
    pnlSerial,
    pnlgvScanResult,
    fntxtLot,
    fngvSerial_txtSerial_0,
    fnddlProduct,
    pnlLog,
    ibtBack_Click,
    btnCancel_Click,
    btnSave_Click,
    lblLog,
    ddlProduct_SelectedIndexChanged,
    handleSerialChange,
    lblRemark,
    columns
  } = fn_ScanSMTPackingConfirm();
  return (
    <div>
      <Hearder />
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table className="FinalGate" component={Paper}>
                <TableHead>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="h6">Packing Confirm Sheet</Typography>
                  </TableCell>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      <Typography> Lot No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={4}>
                      <TextField
                        className="input_txt"
                        size="small"
                        style={{ ...txtLot.style ,backgroundColor: txtLot.disbled ? '#e0e0e0' : 'inherit'}}
                        disabled={txtLot.disbled} 
                        inputRef={(el) => (fntxtLot.current = el)}
                        value={txtLot.value}
                        onChange={(e) => {
                          settxtLot((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtLot_TextChanged();
                          }
                        }}
                        // onBlur={txtLot_TextChanged}
                        
                      ></TextField>
                      <Button
                       className="Bt_ibtBack"
                         onClick={ibtBack_Click}
                      >
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Product :</Typography>
                    </TableCell>
                    <TableCell colSpan={4}>
                      <FormControl fullWidth>
                        <Autocomplete
                          className="Select_dropDown"
                          value={selectddlProduct.value}
                          onChange={(e, value) =>
                            ddlProduct_SelectedIndexChanged(value)
                          }
                          options={ddlProduct.map((item) => item.prd_name)}
                          renderInput={(params) => (
                            <TextField
                              inputRef={(el) => (fnddlProduct.current = el)}
                              {...params}
                              size="small"
                              sx={{ textAlign: "left" }}
                            />
                          )}
                        />
                      </FormControl>
                    </TableCell>
                  </TableRow>

                  <TableRow></TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Total Sheet. :</Typography>
                    </TableCell>
                    <TableCell align="center" sx={{backgroundColor:'#d5f5e3 ' }}>
                      {lblTotalSht.value}
                    </TableCell>
                    <TableCell align="center" sx={{ backgroundColor:'#fcf3cf'}}>
                      {lblShtCount.value}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {pnlLog  && (
              <Paper
                elevation={3}
                style={{
                  width: "400px",
                  height: "40px",
                  margin: "auto",
                  textAlign: "center",
                  background: "#BB2525",
                  paddingTop: "18px",
                  color: "yellow",
                  fontWeight: "bold",
                  marginTop: "30px",
                }}
              >
                {lblLog.value}
              </Paper>
             )} 
              {pnlSerial &&(
                <Table
                className="CSS-GvSerial"
                style={{
                  marginTop: "20px",
                }}
                component={Card}
              >
                
                <TableHead>
                  <TableCell
                    sx={{ borderRight: "1px solid #d9d9d9" }}
                    align="center"
                  >
                    No.
                  </TableCell>
                  <TableCell align="center">Sheet No.</TableCell>
                  <TableRow></TableRow>
                </TableHead>

                <TableBody>
                  {/* <TableRow> */}
                  
                  {Array.from({ length: gvSerial.length }, (_, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="center"
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <TextField
                          key={index}
                          className="input_txt"
                          size="small"
                          fullWidth
                          inputRef={(el) => (fngvSerial_txtSerial_0.current[index] = el)}
                          value={txtSerial[index]}
                          // onBlur={(event) => {
                          //   handleSerialChange(index, event);
                          // }}
                          onChange={(event) => handleSerialChange(index, event)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault(); 
                              if (index < gvSerial.length - 1) {
                                fngvSerial_txtSerial_0.current[index + 1].focus();
                               
                              } else {
                                btnSave_Click();
                                event.target.blur();
                              }
                            }
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: "center" }}>
                      <Button
                        className="BtSave"
                         onClick={btnSave_Click}
                      >
                        Save
                      </Button>{" "}
                      &nbsp;&nbsp;
                      <Button
                        className="BtCancel"
                        onClick={btnCancel_Click}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>)}
            </Grid>
            <Grid
              item
              xs={10}
              md={8}
              style={{
                margin: "auto",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {pnlgvScanResult == false && (
              <>
                <img
                  style={{
                    width: "360px",
                    height: "300px",
                    marginBottom: "30px",
                  }}
                  src={Pageimg} 
                  alt="Description of the image"
                />
              </>
              )} 

             
              <>
                {pnlgvScanResult &&(
                  <Paper
                    className=".Card-Result"
                    style={{
                      width: "70%", 
                      background:'#fcf3cf',
                      marginBottom:'10px'
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{ fontWeight:'bold',paddingTop: "5px",textAlign:'center',color:lblResult.value !== "OK" ? '#BA0900' : '#059212',fontSize:'70px'}}
                    >
                   
                   {lblResult.value}
 
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{ fontWeight:'bold',paddingTop: "5px",textAlign:'center',color: '#BA0900'}}
                    >
                   
                   {lblRemark.value}
 
                    </Typography>
                  </Paper>
)}
              
               
              {pnlgvScanResult &&(
                       <AntTable 
                columns={columns}
                dataSource={gvScanResult}
                style={{ width:'100%'}}
                pagination={false}
                size="small"
                bordered
                className="tableGvResult"
                />
              )}
                
              </>
              
              {/* )} */}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default ScanSMTPackingConfirm;
