
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
  FormControl,
  Autocomplete,
  Box,
  Grid,
} from "@mui/material";
import {  Button} from "antd"
import "./ScanSMTSerialRecordTimeReplace.css";
import Hearder from "../Header/Header";
import "../Common/StyleCommon.css";
import  '../SheetBinChecking/SheetBinCheck.css'
import { fn_Homepage } from "../Homepage/fn_Homepage";
import {fn_ScanSMTSerialRecordTimeReplace} from './fn_ScanSMTSerialRecordTimeReplace'

function ScanSMTSerialRecordTimeReplace() {
  const { menuName } = fn_Homepage();
  const{  txtSerialNo_TextChanged,
    txtSerialRefer,
    settxtSerialRefer,
    txtSerialReplace_TextChanged,
    txtSerialReplace,
    settxtSerialReplace,
    ddlProduct_SelectedIndexChanged,
    ddlProduct,
    selectddlProduct,
    setselectddlProduct,
    BtnSubmit1_Click,
    pnlgvSerialReplace,
    lblStartTime,
    lblResult,
    lblSerial,
    handleSetSerial,
    lblGroup ,gvSerialReplace ,
    setlblSerial,fntxtSerialReplace,fntxtSerialRefer,
    columns,checkresult,fnddlProduct,BtnSubmit1_Cancel,pnlsubmit,gvSerialSubmit,serialrefer} =fn_ScanSMTSerialRecordTimeReplace()
  return (
    <div>
      <Hearder />
      {/* <Card component={Paper} className="Card-Common"> */}
      {/* <div className="Center_Layout"> */}
        <Box className="Center_Layout">
          <Grid container spacing={2}>
            <Grid item xs={10} md={12} align="center">
              <Table
                component={Card}
                className="ReplaceRecord"
                style={{ width: "600px" ,marginTop:'20px'}}
              >
                <TableHead style={{ height: "50px" }}>
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={{ fontSize: "24px" }}
                    >
                      {menuName}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right" >
                      <Typography>Product :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <FormControl fullWidth>
                        <Autocomplete
                          className="Select_dropDown"
                            sx={{width:'80%'}}
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
                    <TableCell align="right" style={{ width: "180px" }}>
                      <Typography>Reference Serial No :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        
                       inputRef={(el) => (fntxtSerialRefer.current = el)}
                        className="input_txt"
                        disabled={txtSerialRefer.disbled} 
                        style={{backgroundColor: txtSerialRefer.disbled ? '#e0e0e0' : 'inherit',width:"80%"}}
                        
                          value={txtSerialRefer.value}
                          onChange={(e) => {
                            settxtSerialRefer((prevState) => ({
                              ...prevState,
                              value: e.target.value,
                            }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              txtSerialNo_TextChanged();
                            }
                          }}
                         // onBlur={txtSerialNo_TextChanged}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" style={{ width: "150px" }}>
                      <Typography>New Serial No :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        className="input_txt"
                            inputRef={(el) => (fntxtSerialReplace.current = el)}
                            style={{ backgroundColor: txtSerialReplace.disbled ? '#e0e0e0' : 'inherit',width:"80%"}}
                         
                          disabled={txtSerialReplace.disbled} 
                          value={txtSerialReplace.value}
                          onChange={(e) => {
                            settxtSerialReplace((prevState) => ({
                              ...prevState,
                              value: e.target.value,
                            }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              txtSerialReplace_TextChanged();
                            }
                          }}
                          //onBlur={txtSerialReplace_TextChanged}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" style={{ width: "150px" }}>
                      <Typography>Group No :</Typography>
                    </TableCell>
                    <TableCell colSpan={2} >
                      <Typography>{lblGroup.value}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" style={{ width: "150px" }}>
                      <Typography>Start Time :</Typography>
                    </TableCell>
                    <TableCell colSpan={2} >
                    <Typography>{lblStartTime.value}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {(checkresult  &&
                <Paper
                elevation={3}
                className="Card-ResultSerialTime"
                style={{backgroundColor: 
                  lblResult.value === "Data Read Complete" || 
                  lblResult.value === "Data record time save complete."
                    ? "green"  
                    : "red",   }}
              >
                <Typography style={{
                    ...lblResult.style,fontSize:'30px'
               }}>{lblResult.value}</Typography>
           
              </Paper>
              )}
              {pnlgvSerialReplace &&(
              <Table
                className="CSS-GvSerial"
                style={{
                  width: "600px",
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
                  
                  <TableCell align="center">Serial No.</TableCell>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                  {/* <TableRow> */}
                  {Array.from(
                        { length: gvSerialReplace.length },
                        (_, index) => (
                          <TableRow key={index}>
                            <TableCell
                              align="center"
                              sx={{ borderRight: "1px solid #d9d9d9" }}
                            >
                              {gvSerialReplace[index].SEQ}
                            </TableCell>
                            <TableCell
                            align="center"
                              sx={{ borderRight: "1px solid #d9d9d9" }}
                            >
                              {gvSerialReplace[index].SERIAL_NO
                              }
                            </TableCell>
                          </TableRow>
                        )
                      )}
         

                  <TableRow>
                    <TableCell colSpan={3} style={{ textAlign: "center" }}>
                
                      <Button
                    style={{
                      backgroundColor: "green",
                      width: "90px",
                      color: "white",
                    }}
                    onClick={BtnSubmit1_Click}
                  >
                    Submit
                  </Button>
                  <Button
                    className="ButtonCancel"
                    style={{
                      width: "90px",
                      color: "white",
                    }}
                    onClick={BtnSubmit1_Cancel}
                  >
                    Cancel
                  </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
             )} 
              
              {pnlsubmit &&(
              <>
              <Table
                className="CSS-GvSerial"
                style={{
                  width: "600px",
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
                  <TableCell
                    sx={{ borderRight: "1px solid #d9d9d9" }}
                    align="center"
                  >
                   Reference Serial No.
                  </TableCell>
                  
                  <TableCell align="center">New Serial No.</TableCell>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                  {/* <TableRow> */}
                  {Array.from(
                        { length: gvSerialSubmit.length },
                        (_, index) => (
                          <TableRow key={index}>
                            <TableCell
                              align="center"
                              sx={{ borderRight: "1px solid #d9d9d9" }}
                            >
                              {gvSerialSubmit[index].SEQ}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ borderRight: "1px solid #d9d9d9" }}
                            >
                       {serialrefer}
                            </TableCell>
                            <TableCell
                            align="center"
                              sx={{ borderRight: "1px solid #d9d9d9" }}
                            >
                              {gvSerialSubmit[index].SERIAL_NO
                              }
                            </TableCell>
                          </TableRow>
                        )
                      )}
         

                 
                </TableBody>
              </Table>
              </>
              )}
            </Grid>
          </Grid>
        </Box>
       {/* </div>  */}
      {/* </Card> */}
      {/* </Card> */}
  
    </div>
    
  );
}

export default ScanSMTSerialRecordTimeReplace;
