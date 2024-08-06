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
// import { Fn_ScanSMTRollSht } from "./function_ScanSMTRollSht";
function ScanSMTRoollSht() {
//   const {

//   } = Fn_ScanSMTRollSht();




  return (
    <div>
      <Hearder />
      <h1>Final Gate</h1>
      <Card component={Paper} className="Card-FinalGate" >
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
            <Table className="FinalGate" component={Paper}>
                <TableHead>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="h6">
                      Final Gate
                    </Typography>
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
                        style={{width:'80%'}}
                        // disabled={txt_lotNo.disbled} //true พิมไม่ได้
                        // style={txt_lotNo.style}
                        // inputRef={fc_txtLotNo}
                        // value={txt_lotNo.value}
                        // onChange={(e) => {
                        //   settxt_lotNo((prevState) => ({
                        //     ...prevState,
                        //     value: e.target.value,
                        //   }));
                        // }}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     handleLotxt_Lotno();
                        //   }
                        // }}
                        // onBlur={handleLotxt_Lotno}
                      
                      ></TextField>
                       <Button id="txtfild" >
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
                        //   value={sl_Product.value}
                        //   style={sl_Product.style}
                        //   disabled={sl_Product.disbled} //true พิมไม่ได้
                        //   onChange={(e, value) => HandleSL_Product(value)}
                        //   options={Product.map((item) => item.prd_name)}
                          renderInput={(params) => (
                            <TextField
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
                      <Typography>Packing No :</Typography>
                    </TableCell>
                    <TableCell colSpan={4}>
                      <TextField
                        id="txtfild"
                        size="small"
                        // label="Operator. :"
                       style={{width:'80%'}}
                        // inputRef={fc_txtOperator}
                        // // disabled
                        // value={txtOperator}
                        // onChange={(e) => {
                        //   settxtOperator(e.target.value);
                        // }}
                        
                      ></TextField>
                       <Button id="txtfild" >
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                   
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Lot :</Typography>
                    </TableCell>
                    <TableCell colSpan={1}>
                    lbllog
                    </TableCell>
                    <TableCell align="right">
                      <Typography>Ok :</Typography>
                    </TableCell>
                    <TableCell style={{ width: "70px" }} colSpan={2}>
                      lblLotTotal
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" style={{width:'100px'}}>
                      <Typography>Pcs/Tray</Typography>
                    </TableCell>
                    <TableCell  style={{ width: "130px", }}>
                      <TextField
                        id="txtfild"
                        size="small"
                        style={{ width: "60px", }}
                      ></TextField>
                     &nbsp; Not Use
                    </TableCell>
                    {/* <TableCell style={{ width: "70px",}}></TableCell> */}
                    <TableCell align="right" style={{ width:'40px'}}>
                      <Typography >NG :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                     lblSerialNG
                    </TableCell>
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
                  }}
                >
                
                    lbllog.value
                
                </Paper>
              {/* )} */}

              {/* <Table
                className="CSS-GvSerial"
                style={{ display: GvSerial.visble, marginTop: "20px" }}
                component={Card}
              >
                <TableHead>
                  <TableCell
                    sx={{ borderRight: "1px solid #d9d9d9" }}
                    align="center"
                  >
                    No.
                  </TableCell>
                  <TableCell align="center">Leaf No.</TableCell>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                  {/* <TableRow> */}

                  {/* {Array.from({ length: txtTotalLeaf }, (_, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="center"
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        {" "}
                        <TextField
                          id="txtfild"
                          size="small"
                          fullWidth
                          inputRef={fc_GvSerial}
                          value={txtLeafNo[index]}
                          onChange={(event) =>
                            handleTextFieldChange(index, event)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))} */}
{/* 
                  <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: "center" }}>
                      <Button className="BtSave" onClick={Bt_Save}>
                        Save
                      </Button>{" "}
                      &nbsp;&nbsp;
                      <Button className="BtCancel">Cancel</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table> */} 
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
