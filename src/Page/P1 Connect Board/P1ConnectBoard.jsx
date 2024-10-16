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
import Pageimg from "/src/assets/1.jpg";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ConnectBoard.css";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { fn_P1ConnectBoard } from "./fn_P1ConnectBoard";
import { Table as AntTable } from "antd";
function P1ConnectBoard() {
  const {
    Product,ddlProduct,txtLot_TextChanged,txtLot,settxtLot,lblLog,btnSave_Click,GvSerial
  } = fn_P1ConnectBoard();
  // console.log('gvScanResult',gvScanResult)

  return (
    <div>
      <Hearder />
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table className="ScanSMT" component={Paper}>
                <TableHead>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="h6">
                    P1 Connect CB & Pcs
                    </Typography>
                  </TableCell>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      <Typography> LotNo. :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      {/* {console.log(txtLot)} */}
                      <TextField
                        className="input_txt"
                        size="small"
                        fullWidth
                        disabled={txtLot.disbled} //true พิมไม่ได้
                        style={txtLot.style}
                        // inputRef={(el) => (fc_txtLotNo.current = el)}
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
                    </TableCell>
                    <TableCell>
                      <Button 
                      className="Bt_ibtBack" 
                      // onClick={ibtback_Click}
                      >
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Product :</Typography>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <FormControl fullWidth>
                        <Autocomplete
                          className="Select_dropDown"
                          value={ddlProduct.value}
                          // style={sl_Product.style}
                          // disabled={sl_Product.disbled} //true พิมไม่ได้
                          // onChange={(e, value) => HandleSL_Product(value)}
                          options={Product.map((item) => item.prd_name)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              // inputRef={(el) => (fc_SlProduct.current = el)}
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
                      <Typography>Lot Ref. No. :</Typography>
                    </TableCell>
                    
                    <TableCell colSpan={3}>
                      {" "}
                      <TextField
                        className="input_txt"
                        size="small"
                        // inputRef={(el) => (fc_txtRollleaf.current = el)}
                        // disabled={txtRollLeaf.disbled} //true พิมไม่ได้
                        // style={txtRollLeaf.style}
                        // value={txtRollLeaf.value}
                        // onChange={(e) => {
                        //   settxtRollLeaf((prevState) => ({
                        //     ...prevState,
                        //     value: e.target.value,
                        //   }));
                        // }}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     txtRollLeaf_TextChanged();
                        //   }
                        // }}
                        // onBlur={txtRollLeaf_TextChanged}
                        fullWidth
                      ></TextField>
                 
                    </TableCell>
                    <TableCell colSpan={2}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Total Sht :</Typography>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <TextField
                        className="input_txt"
                        size="small"
                        style={{width:'60px'}}
                        // label="Operator. :"
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     txtOperator_TextChanged();
                        //   }
                        // }}
                        inputProps={{
                          style: { textAlign: 'center' }, // จัดข้อความให้อยู่ตรงกลาง
                        }}
                        fullWidth
                        // inputRef={(el) => (fc_txtOperator.current = el)}
                        // value={txtOperator}
                        // onChange={(e, value) => settxtOperator(value)}
                        // onBlur={txtOperator_TextChanged}
                      ></TextField>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Total Pcs :</Typography>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <TextField
                       style={{width:'60px'}}
                        className="input_txt"
                        size="small"
                        // label="Operator. :"
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     txtOperator_TextChanged();
                        //   }
                        // }}
                        inputProps={{
                          style: { textAlign: 'center' }, // จัดข้อความให้อยู่ตรงกลาง
                        }}
                        fullWidth
                        // inputRef={(el) => (fc_txtOperator.current = el)}
                        // value={txtOperator}
                        // onChange={(e, value) => settxtOperator(value)}
                        // onBlur={txtOperator_TextChanged}
                      ></TextField>
                    </TableCell>
                  </TableRow> 
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Roll Leaf No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <TextField
                        className="input_txt"
                        size="small"
                        // inputRef={(el) => (fc_txtRollleaf.current = el)}
                        // disabled={txtRollLeaf.disbled} //true พิมไม่ได้
                        // style={txtRollLeaf.style}
                        // value={txtRollLeaf.value}
                        // onChange={(e) => {
                        //   settxtRollLeaf((prevState) => ({
                        //     ...prevState,
                        //     value: e.target.value,
                        //   }));
                        // }}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     txtRollLeaf_TextChanged();
                        //   }
                        // }}
                        // onBlur={txtRollLeaf_TextChanged}
                        fullWidth
                      ></TextField>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Machine No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <TextField
                        className="input_txt"
                        size="small"
                        // inputRef={(el) => (fc_txtRollleaf.current = el)}
                        // disabled={txtRollLeaf.disbled} //true พิมไม่ได้
                        // style={txtRollLeaf.style}
                        // value={txtRollLeaf.value}
                        // onChange={(e) => {
                        //   settxtRollLeaf((prevState) => ({
                        //     ...prevState,
                        //     value: e.target.value,
                        //   }));
                        // }}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     txtRollLeaf_TextChanged();
                        //   }
                        // }}
                        // onBlur={txtRollLeaf_TextChanged}
                        fullWidth
                      ></TextField>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {lblLog.visble == true && (
                <Paper  component={Paper}
                className="Card-lblLog">
                 { lblLog.value}
                </Paper>
             )} 

              <Table
                className="CSS-GvSerial"
                // style={{ display: GvSerial.visble }}
                component={Card}
              >
                <TableHead>
                <TableCell
                    sx={{ borderRight: "1px solid #d9d9d9",width:'30px' }}
                    align="center"
                  >
                    SHEET
                  </TableCell>
                  <TableCell
                    sx={{ borderRight: "1px solid #d9d9d9" ,width:'100px'}}
                    align="center"
                  >
                    No.
                  </TableCell>
                  <TableCell align="center"  sx={{ borderRight: "1px solid #d9d9d9" }}>Leaf No.</TableCell>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                  {Array.from({ length: GvSerial.value.length }, (_, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="center"
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                      >
                        {GvSerial.value[index].SEQ}
                      </TableCell>
                      <TableCell sx={{ borderRight: "1px solid #d9d9d9" }}>
                      {GvSerial.value[index].SHEET}                     
                      </TableCell>
                      <TableCell>
                      <TextField
                        className="input_txt"
                        size="small"
                        // inputRef={(el) => (fc_txtRollleaf.current = el)}
                        // disabled={txtRollLeaf.disbled} //true พิมไม่ได้
                        // style={txtRollLeaf.style}
                        // value={txtRollLeaf.value}
                        // onChange={(e) => {
                        //   settxtRollLeaf((prevState) => ({
                        //     ...prevState,
                        //     value: e.target.value,
                        //   }));
                        // }}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     txtRollLeaf_TextChanged();
                        //   }
                        // }}
                        // onBlur={txtRollLeaf_TextChanged}
                        fullWidth
                      ></TextField>         
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan={3} style={{ textAlign: "center" }}>
                      <Button className="BtSave" 
                      onClick={btnSave_Click}
                      >
                        Save
                      </Button>{" "}
                      &nbsp;&nbsp;
                      <Button className="BtCancel">Cancel</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
              {/* {gvScanResult.visble == false && ( */}
                <>
               
                  <img
                    className="Img1"
                    src={Pageimg}
                  
                  />
                </>
              {/* // )} */}
              {/* {gvScanResult.visble == true && ( */}
                <>
                  <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                    <Paper
                      className="Card-lblResult"
                      elevation={3}
                      style={{
                        background: " #BA0900",
                        // display: gvScanResult,
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{ paddingTop: "5px", color: "#fff" }}
                      >
                        lblResult.value
                      </Typography>
                    </Paper>
                  </div>

                  <AntTable
                    // columns={columns}
                    // dataSource={gvScanResult.value}
                    style={{ width: "100%" }}
                    pagination={false}
                    size="small"
                    bordered
                    className="tableGvResult"
                  />
                </>
              {/* )} */}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default P1ConnectBoard;
