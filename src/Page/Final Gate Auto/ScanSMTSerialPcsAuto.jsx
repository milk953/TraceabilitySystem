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
import { Table as AntTable } from 'antd';
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTSerialPcsChrome } from "./fn_ScanSMTSerialPcsAuto";
import Pageimg from "/src/assets/1.jpg";
function ScanSMTRoollSht() {
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
  } = fn_ScanSMTSerialPcsChrome();
  console.log("lblTime", lblTime);
  return (
    // <div>
      <>
      <Hearder />
      <h1>Final Gate Auto</h1>
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start"}}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table className="FinalGateAuto" component={Paper}>
                <TableHead>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="h6">Final Gate Auto</Typography>
                  </TableCell>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      <Typography> Scan Lot. :</Typography>
                    </TableCell>
                    <TableCell colSpan={4}>
                      <TextField
                        id="txtfild"
                        size="small"
                        style={{ ...txtLot.style, width: "80%" }}
                        disabled={txtLot.disbled} //true พิมไม่ได้
                        inputRef={(el) => (fc_txtLotNo.current = el)}
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
                        onBlur={txtLot_TextChanged}
                      ></TextField>
                      <Button id="txtfild" onClick={ibtBack_Click}>
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
                          id="selectPd"
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
                        id="txtfild"
                        size="small"
                        inputRef={(el) => (fc_txtPackingNo.current = el)}
                        value={txtPackingNo.value}
                        onChange={(e) => {
                          settxtPackingNo((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        style={{ ...txtPackingNo.style, width: "80%" }}
                        disabled={txtPackingNo.disbled} //true พิมไม่ได้
                       
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtPackingNo_TextChanged();
                          }
                        }}
                        onBlur={txtPackingNo_TextChanged}
                      ></TextField>
                      <Button id="txtfild" onClick={ibtPackingBack_Click}>
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Lot :</Typography>
                    </TableCell>
                    <TableCell colSpan={1}>{lblLot}</TableCell>
                    <TableCell align="right">
                      <Typography>OK :</Typography>
                    </TableCell>
                    <TableCell style={{ width: "70px" }} colSpan={2}>
                      {lblLotTotal}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" style={{ width: "100px" }}>
                   
                    </TableCell>
                    <TableCell style={{ width: "130px" }}>
                   
                    </TableCell>
                 
                    <TableCell align="right" style={{ width: "40px" }}>
                      <Typography>NG :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>{lblSerialNG}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* {lbllog.visble == true && ( */}
              <br/>
              <Paper
                elevation={3}
                style={{
                  width: "450px",
                  height: "40px",
                  textAlign: "center",
                  background: "#BB2525",
                  paddingTop: "18px",
                  color: "yellow", 
                  fontWeight: "bold",
                  
                  display: lblLog.visble,
                }}
              >
                {lblLog.value}
              </Paper>
              {/* )} */}
              {/* {console.log('gvSerial.visble ',gvSerial.visble )} */}
              <br/>
              <Table
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

                  {Array.from({ length: gvSerial.value.length }, (_, index) => (
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
                          id="txtfild"
                          size="small"
                          fullWidth
                          inputRef={(el) => (fc_txtSerial.current[index] = el)}
                          value={txtSerial[index]}
                          onBlur={(event) => {
                            handleSerialChange(index, event);
                          }}
                          onChange={(event) => handleSerialChange(index, event)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault(); // ป้องกันการทำงานค่าเริ่มต้นของ Enter
                              if (index < gvSerial.value.length - 1) {
                                fc_txtSerial.current[index + 1].focus();
                                console.log(
                                  index,
                                  "---",
                                  gvSerial.value.length - 1
                                );
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
                      <Button className="BtSave" onClick={btnSave_Click}>
                        Save
                      </Button>{" "}
                      &nbsp;&nbsp;
                      <Button className="BtCancel" onClick={btnCancel_Click}>
                        Cancel
                      </Button>
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
                    style={{
                      width: "360px",
                      height: "300px",
                      marginBottom: "30px",
                    }}
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
                          lblResult.value === "OK" ? "#52c41a" : "#ff4d4f",
                        width: "70%", // ควบคุมขนาดของ Paper
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{ paddingTop: "5px", color: "#fff" }}
                      >
                        {lblResult.value}
                      </Typography>
                    </Paper>

                    <Paper
                      className="Card-lblResult"
                      style={{
                        ...lblTime.style,
                        width: "30%", // ควบคุมขนาดของ Paper
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{ paddingTop: "5px", color: "#fff" }}
                      >
                        {lblTime.value}
                      </Typography>
                    </Paper>
                  </div>
                  <AntTable 
                columns={columns}
                dataSource={gvScanResult.value}
                style={{ width:'100%'}}
                pagination={false}
                size="small"
                // bordered
                className="tableGvResult"
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