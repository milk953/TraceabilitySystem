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
import "./SerialPcs.css";
import Hearder from "../Header/Hearder";
import { fn_ScanSMTSerialPcsChrome } from "./fn_ScanSMTSerialPcsChrome";
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
    txtPcsTray_TextChanged,
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
    btnCancel_Click
  } = fn_ScanSMTSerialPcsChrome();

  return (
    <div>
      <Hearder />
      <h1>Final Gate</h1>
      <Card component={Paper} className="Card-FinalGate">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table className="FinalGate" component={Paper}>
                <TableHead>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="h6">Final Gate</Typography>
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
                          //   inputRef={fc_SlProduct}
                          value={Sl_Product.value}
                          style={Sl_Product.style}
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
                  <TableRow style={{display:''}}>
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
                        // inputRef={fc_txtLotNo}
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
                      <Typography>Pcs/Tray</Typography>
                    </TableCell>
                    <TableCell style={{ width: "130px" }}>
                      <TextField
                        id="txtfild"
                        size="small"
                        inputRef={(el) => (fc_txtTray.current = el)}
                        value={txtPcsTray.value}
                        onChange={(e) => {
                          settxtPcsTray((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        style={{ ...txtPcsTray.style, width: "60px" }}
                        disabled={txtPcsTray.disbled} //true พิมไม่ได้
                        // inputRef={fc_txtLotNo}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtPcsTray_TextChanged();
                          }
                        }}
                        onBlur={txtPcsTray_TextChanged}
                      ></TextField>
                      &nbsp; {lblLastTray}
                    </TableCell>
                    {/* <TableCell style={{ width: "70px",}}></TableCell> */}
                    <TableCell align="right" style={{ width: "40px" }}>
                      <Typography>NG :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>{lblSerialNG}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* {lbllog.visble == true && ( */}
              <Paper
                elevation={3}
                style={{
                  width: "400px",
                  height: "40px",
                  margin: "auto",
                  textAlign: "center",
                  background: "#BB2525",
                  paddingTop: "18px",
                  color: "yellow", // กำหนดสีฟอนต์เป็นสีเหลือง
                  fontWeight: "bold", // กำหนดความหนาของฟอนต์
                  marginTop: "30px",
                  display:lblLog.visble
                }}
              >
                {lblLog.value}
              </Paper>
              {/* )} */}
              {/* {console.log('gvSerial.visble ',gvSerial.visble )} */}
              <Table
                className="CSS-GvSerial"
                style={{ marginTop: "20px", display: gvSerial.visble }}
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
                <TableBody >
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
                              }
                            }
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: "center" }}>
                      <Button className="BtSave" onClick={btnSave_Click}>Save</Button> &nbsp;&nbsp;
                      <Button className="BtCancel" onClick={btnCancel_Click}>Cancel</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            {/* border:'1PX SOLID green' */}
            <Grid
              item
              xs={10}
              md={7}
              style={{
                margin: "auto",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* {gvScanResult.visble == false && (
                <> */}
              <img
                style={{
                  width: "360px",
                  height: "300px",
                  marginBottom: "30px",
                }}
                src="src/assets/1.jpg" // Import the image
                alt="Description of the image"
              />
              {/* </>)} */}

              {/* visiblegvScanResult */}
              {/* {gvScanResult.visble == true && (
                <>
                              <Paper
                className="Card-lblResult"
                elevation={3}
                style={{
                  background: " #ff4d4f",
                  display: gvScanResult,
                }}
              >
                <Typography
                  variant="h4"
                  style={{ paddingTop: "5px", color: "#fff" }}
                >
                  {lblResult.value}
                </Typography>
              </Paper>
              <Table
                className="CSS-GvScanResult"
                style={{ display: gvScanResult }}
                component={Card}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ borderRight: "1px solid #d9d9d9" }}
                      width="50px"
                    >
                      No.
                    </TableCell>
                    <TableCell
                      sx={{ borderRight: "1px solid #d9d9d9" }}
                      width="200px"
                    >
                      Roll/Sheet No.
                    </TableCell>
                    <TableCell
                      sx={{ borderRight: "1px solid #d9d9d9" }}
                      width="200px"
                    >
                      Leaf No.
                    </TableCell>
                    <TableCell
                      sx={{ borderRight: "1px solid #d9d9d9" }}
                      width="150px"
                    >
                      Scan Result
                    </TableCell>
                    <TableCell width="300px">Remark</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from(
                    { length: gvScanResult.value.length },
                    (_, index) => (
                      <TableRow key={index}>
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #d9d9d9" }}
                        >
                          {gvScanResult.value[index].SHT_SEQ}
                        </TableCell>

                        <TableCell sx={{ borderRight: "1px solid #d9d9d9" }}>
                          {gvScanResult.value[index].ROLL_LEAF}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #d9d9d9" }}
                        >
                          {gvScanResult.value[index].SHT_NO}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            borderRight: "1px solid #d9d9d9",
                            background: gvScanResult.value[index].SCAN_RESULT === ''
                              ? ''
                              : gvScanResult.value[index].SCAN_RESULT === 'OK'
                              ? 'green'
                              : '#ff4d4f'
                          }}
                        >
                          {gvScanResult.value[index].SCAN_RESULT}
                        </TableCell>
                        <TableCell sx={{ borderRight: "1px solid #d9d9d9" }}>
                          {gvScanResult.value[index].REMARK}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
                </>
            )} */}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default ScanSMTRoollSht;
