import React, { useEffect, useState, useRef } from "react";
import {
  TextField,
  Card,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Paper,
  Typography,
  Button,
  FormControl,
  Autocomplete,
  Box,
  Grid,
} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { Table as AntTable,Button as AntButton } from 'antd';
import "../Final Gate/SerialPcs.css";
import Hearder from "../Header/Header";
import "../Common/StyleCommon.css";
import { fn_Homepage } from "../Homepage/fn_Homepage";
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
    columns,

  } = fn_ScanSMTPackingConfirm();
    const { menuName } = fn_Homepage();
  return (
    <div>
      <Hearder />
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table className="Header_Left" component={Paper}>
                <TableHead>
                  <TableCell colSpan={5} align="center">
                   {menuName ? menuName : 'Packing Confirm Sheet'}
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
                        value={txtLot.value.trim()}
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
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Total Sheet. :</Typography>
                    </TableCell>
                    <TableCell  sx={{width:'150px' }}>
                      {lblTotalSht.value}
                    </TableCell>
                    <TableCell 
                    // align="center" 
                    sx={{ color:'green'}}>
                     OK :  {lblShtCount.value}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {pnlLog  && (
              <Paper
                elevation={3}
                 className="Card-lblLog"
              >
                {lblLog.value}
              </Paper>
              )}  
              {pnlSerial &&(
                <Table
                className="CSS-GvSerial"
              
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
         
                       <AntButton
                                                                     type="primary" className="BtSave"
                                                                      onClick={btnSave_Click}
                                                                    >
                                                                      Save
                                                                    </AntButton>{" "}
                                                                    &nbsp;&nbsp;
                                                                    <AntButton
                                                                      
                                                                     type="primary" className="BtCancel"
                                                                      onClick={btnCancel_Click}
                                                                    >
                                                                      Cancel
                                                                    </AntButton>
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
                {lblResult.value !== "" &&(
                  <Card
                    // className="Card-Result"
                    style={{
                      width: "100%", 
                      background:'#fcf3cf',
                      marginBottom:'10px',
                      borderRadius:'3px'
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{ paddingTop: "5px",textAlign:'center',backgroundColor:lblResult.value !== "OK" ? 'red' : 'green',fontSize:'40px',color:'white'}}
                    >
                   
                   {lblResult.value}
 
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{ paddingTop: "5px",textAlign:'center',backgroundColor:lblResult.value !== "OK" ? 'red' : 'green',color:'white'}}
                    >
                   
                   {lblRemark.value}
 
                    </Typography>
                  </Card>
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
                rowClassName={(record) => {
                  if (
                    (record.scan_result === " " || record.scan_result === "") && 
                    (record.confirm_result === " " || record.confirm_result === "")
                  ) {
                    return "row-black"; // สีดำทั้งแถว
                  } else if (record.scan_result === "NG" || record.scan_result === " ") {
                    return "row-red"; // สีแดง
                  } else if (record.scan_result === "OK") {
                    return "row-green"; // สีเขียว
                  }
                  return ""; // ไม่มีคลาส
                }}
                
                
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
