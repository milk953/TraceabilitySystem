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
import "./SerialPcsAuto.css";
import { Table as AntTable,Button as AntButton  } from 'antd';
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTSerialPcsChrome } from "./fn_ScanSMTSerialPcsAuto";
import Pageimg from "/src/assets/1.jpg";
import { fn_Homepage } from "../Homepage/fn_Homepage";
function ScanSMTRoollSht() {
  const { menuName } = fn_Homepage();
  const {
    txtLot,
    settxtLot,
    lblLog,
    Product,
    Sl_Product,
    txtLot_TextChanged,
    lblLot,
    ddlProduct_SelectedIndexChanged,
    txtPackingNo,
    settxtPackingNo,
    txtPackingNo_TextChanged,
    lblLotTotal,
    txtPcsTray,
    settxtPcsTray,
    lblSerialNG,
    ibtBack_Click,
    ibtPackingBack_Click,
    lblLastTray,
    gvSerial,
    handleSerialChange,
    settxtSerial,
    txtSerial,
    fc_txtSerial,
    fc_txtLotNo,
    fc_txtPackingNo,
    fc_txtTray,
    fc_SlProduct,
    btnSave_Click,
    btnCancel_Click,
    gvScanResult,
    lblResult,
    lblTime,
    columns
  } = fn_ScanSMTSerialPcsChrome();
  let data  = []

  return (
    // <div>
      <>
      <Hearder />
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start"}}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table className="Header_Left" component={Paper}>
                <TableHead>
                  <TableCell colSpan={5} align="center">
                    {/* <Typography variant="h6">Final Gate Auto</Typography> */}
                    {menuName}
                  </TableCell>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      <Typography> Scan Lot. :</Typography>
                    </TableCell>
                    <TableCell colSpan={4}>
                      <TextField
                      id='txtLot'
                        className="input_txt"
                        size="small"
                        style={{ ...txtLot.style, width: "75%" }}
                        disabled={txtLot.disbled} //true พิมไม่ได้
                        inputRef={(el) => (fc_txtLotNo.current = el)}
                        value={txtLot.value}
                        onChange={(e) => {
                          settxtLot((prevState) => ({
                            ...prevState,
                            value: e.target.value.trim(),
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtLot_TextChanged();
                          }
                        }}
                        // onBlur={txtLot_TextChanged}
                      ></TextField>
                      <Button id='ibtback' className="Bt_ibtBack" onClick={ibtBack_Click}>
                        <BackspaceIcon className="Icon_ibtBack"/>
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
                        id='ddlProduct'
                          className="Select_dropDown"
                          value={Sl_Product.value}
                          // , background:'#e0e0e0'
                          style={{ ...Sl_Product.style }}
                          disabled={Sl_Product.disbled} //true พิมไม่ได้
                          onChange={(e, value) =>
                            ddlProduct_SelectedIndexChanged(value)
                          }
                          options={Product.map((item) => item.prd_name)}
                          renderInput={(params) => (
                            <TextField
                              inputRef={(el) => (fc_SlProduct.current = el)}
                              {...params}
                              size="small"
                              sx={{ textAlign: "left" }}
                            />
                          )}
                        />
                      </FormControl>
                    </TableCell>
                  </TableRow>

                  <TableRow style={{ display: txtPackingNo.visble }}>
                    <TableCell align="right">
                      <Typography>Packing No :</Typography>
                    </TableCell>
                    <TableCell colSpan={4}>
                      <TextField
                      id='txtPackingNo'
                        className="input_txt"
                        size="small"
                        inputRef={(el) => (fc_txtPackingNo.current = el)}
                        value={txtPackingNo.value}
                        onChange={(e) => {
                          settxtPackingNo((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        style={{ ...txtPackingNo.style, width: "75%"}}
                        disabled={txtPackingNo.disbled} //true พิมไม่ได้
                       
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtPackingNo_TextChanged();
                          }
                        }}
                        // onBlur={txtPackingNo_TextChanged}
                      ></TextField>
                      <Button id='ibtPackingBack' className="Bt_ibtBack" onClick={ibtPackingBack_Click}>
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography><label>Lot :</label></Typography>
                    </TableCell>
                    <TableCell colSpan={1}><label id='lblLot'>{lblLot}</label></TableCell>
                    <TableCell align="right">
                    <Typography style={{ color: 'green' }}><label>OK :</label></Typography>
                    </TableCell>
                    <TableCell style={{ width: "70px", color: 'green' }} colSpan={2}>
                     <label id='lblLotTotal'> {lblLotTotal}</label>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" style={{ width: "100px" }}>
                   
                    </TableCell>
                    <TableCell style={{ width: "130px" }}>
                   
                    </TableCell>
                 
                    <TableCell align="right" style={{ width: "40px" }}>
                      <Typography style={{ color: 'red' }}><label >NG :</label></Typography>
                    </TableCell>
                    <TableCell colSpan={2} style={{color: 'red' }}><label id='lblSerialNG'>{lblSerialNG}</label></TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* {lbllog.visble == true && ( */}
         
              <Paper
              id='lblLog'
                elevation={3}
                style={{
               display: lblLog.visble,
                }}
                className="Card-lblLog"
              >
                {lblLog.value}
              </Paper>
              {/* )} */}
   
            
              <Table
              id='gvSerial'
                className="CSS-GvSerial"
                style={{display: gvSerial.visble }}
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

                  {/* {Array.from({ length: gvSerial.value.length }, (_, index) => ( */}
                  {txtSerial.map((serial, index) => (
                    <tr key={index}>
                      <td
                        align="center"
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                      >
                        {index + 1}
                      </td>
                      <td>
                        <input
                        
                              
                           id={`txtSerial${index}`}                  
                          key={index}
                          className="styleSeraial"
                          ref={(el) => (fc_txtSerial.current[index] = el)}
                          defaultValue={serial}
                          onChange={async(event) => data=await handleSerialChange(index, event)}
                          onKeyDown={async(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault(); 
                              data= await handleSerialChange(index, event)
                              if (index < gvSerial.value.length - 1) {
                                fc_txtSerial.current[index + 1].focus();
                          
                              } else {
                                event.target.blur();
                                btnSave_Click(data);
                                settxtSerial(data);
                                
                              }
                            }
                          }}
                        />
                      </td>
                    </tr>
                  ))}

                  <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: "center" }}>
                      <AntButton id='btnSave' type="primary" className="ButtonReplace"  onClick={() => {
                             btnSave_Click(data);
                             settxtSerial(data);
                          }}>
                        Save
                      </AntButton>{" "}
                      &nbsp;&nbsp;
                      <AntButton id='btnCancel' type="primary" className="BtCancel"  onClick={btnCancel_Click}>
                        Cancel
                      </AntButton>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            {/* border:'1PX SOLID green' */}
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
              {gvScanResult.visble == false && (
                <>
                  <img
                className="Img_GvResult"
                    src={Pageimg} // Import the image
                    alt="Description of the image"
                  />
                </>
              )}

              {/* visiblegvScanResult */}
              {gvScanResult.visble == true && (
                <>
                  <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                    <Paper

                      className="Card-lblResult"
                      style={{
                        background:
                          lblResult.value === "OK" ? "green" : "red",
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{ paddingTop: "5px", color: "#fff" }}
                        id='lblResult'
                      >
                        {lblResult.value}
                      </Typography>
                    </Paper>

                    <Paper
                      className="Card-lblResult"
                      style={{
                        ...lblTime.style,
                        width: "30%", // ควบคุมขนาดของ Paper
                        display: lblTime.value === '' ? 'none' : ''
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{ paddingTop: "5px", color: "#fff"}}
                        id='lblTime'
                      >
                        {lblTime.value}
                      </Typography>
                    </Paper>
                  </div>
    
                  <AntTable 
                  id='gvScanResult'
                columns={columns}
                dataSource={gvScanResult.value}
                style={{ width:'100%'}}
                pagination={false}
                size="small"
                bordered
                className="tableGvResult"
                rowClassName={(record) => 
                  record.SERIAL === '' ? '' : 
                  record.SCAN_RESULT === "NG" ? "row-red" : 
                  record.SCAN_RESULT === "OK" ? "row-green" : ""
                }
                  
                />
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </Card>
   </>
  );
}

export default ScanSMTRoollSht;
