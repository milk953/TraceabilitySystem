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
import "./ScanSmt.css";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { Fn_ScanSMTRollSht } from "./function_ScanSMTRollSht";
import { Table as AntTable } from 'antd';
function ScanSMTRoollSht() {
  const {
    settxt_lotNo,
    txt_lotNo,
    handleLotxt_Lotno,
    sl_Product,
    Product,
    HandleSL_Product,
    lbllog,
    settxtRollLeaf,
    txtRollLeaf,
    gvScanResult,
    txtTotalLeaf,
    settxtTotalLeaf,
    lblCheckRoll,
    lbltotalSht,
    GvSerial,
    hfSerialCount,
    Bt_Save,
    txtOperator,
    hfRollNo,
    SettxtLeafNo,
    txtLeafNo,
    handleTextFieldChange,
    ibtback_Click,
    settxtOperator,
    dataGvBackSide,
    lblResult,
    fc_txtRollleaf,
    fc_SlProduct,
    fc_GvSerial,
    fc_txtLotNo,
    fc_txtOperator,
    handletxtTotalLeaf,
    columns
  } = Fn_ScanSMTRollSht();
console.log('gvScanResult',gvScanResult)


  return (
    <div>
      <Hearder />
      <h1>ScanSMTRoollSht</h1>
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
            <Table className="ScanSMT" component={Paper}>
                <TableHead>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="h6">
                      Connect Roll/Sht & Leaf
                    </Typography>
                  </TableCell>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      <Typography> LotNo. :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        className="input_txt"
                        size="small"
                        fullWidth
                        disabled={txt_lotNo.disbled} //true พิมไม่ได้
                        style={txt_lotNo.style}
                  
                        inputRef={(el) => (fc_txtLotNo.current = el)}
                        value={txt_lotNo.value}
                        onChange={(e) => {
                          settxt_lotNo((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleLotxt_Lotno();
                          }
                        }}
                        onBlur={handleLotxt_Lotno}
                      
                      ></TextField>
                    </TableCell>
                    <TableCell >
                      <Button className="Bt_ibtBack" onClick={ibtback_Click}>
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
                          value={sl_Product.value}
                          style={sl_Product.style}
                          disabled={sl_Product.disbled} //true พิมไม่ได้
                          onChange={(e, value) => HandleSL_Product(value)}
                          options={Product.map((item) => item.prd_name)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              inputRef={(el) => (fc_SlProduct.current = el)}
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
                      <Typography>Check Roll :</Typography>
                    </TableCell>
                    <TableCell colSpan={1}>
                      {" "}
                      <div style={lblCheckRoll.style}>
                        <Typography
                          variant="button"
                          style={{
                            marginLeft: "15px",
                            color: "#FFF",
                            fontSize: "17px",
                          }}
                        >
                          {lblCheckRoll.value}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell colSpan={2}></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Operator :</Typography>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <TextField
                        className="input_txt"
                        size="small"
                        // label="Operator. :"
                        fullWidth
                        inputRef={(el) => (fc_txtOperator.current = el)}

                        // disabled
                        value={txtOperator}
                        onChange={(e) => {
                          settxtOperator(e.target.value);
                        }}
                      ></TextField>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Total Leaf :</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        className="input_txt"
                        size="small"
                        style={{ width: "70px" }}
                        value={txtTotalLeaf}
                        onChange={(e) => {
                          settxtTotalLeaf(e.target.value);
                        }}
                        onBlur={handletxtTotalLeaf}
                      ></TextField>
                    </TableCell>
                    <TableCell align="right">
                      <Typography>Total Sht. :</Typography>
                    </TableCell>
                    <TableCell style={{ width: "70px" }}>
                      <TextField
                        className="input_txt"
                        size="small"
                        value={lbltotalSht}
                      ></TextField>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Roll/Sht No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <TextField
                        className="input_txt"
                        size="small"
                        inputRef={(el) => (fc_txtRollleaf.current = el)}
                        disabled={txtRollLeaf.disbled} //true พิมไม่ได้
                        style={txtRollLeaf.style}
                        value={txtRollLeaf.value}
                        onChange={(e) => {
                          settxtRollLeaf((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        
                        }}
                        fullWidth
                      ></TextField>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
<br/>
              {lbllog.visble == true && (
                <Paper
                  elevation={3}
                  className="Card-lblLog"
                >
                    {lbllog.value}
                </Paper>
              )}
<br/>
              <Table
                className="CSS-GvSerial"
                style={{ display: GvSerial.visble, }}
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
     
                  {Array.from({ length: GvSerial.value.length }, (_, index) => (
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
                          className="input_txt"
                          size="small"
                          fullWidth
                        
                        inputRef={(el) => (fc_GvSerial.current = el)}

                          value={txtLeafNo[index]}
                          onChange={(event) =>
                            handleTextFieldChange(index, event)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}

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
              {gvScanResult.visble == false && (
                <> <img
                className="Img1"
                src={Pageimg} 
                alt="Description of the image"
              /></>)}
              {gvScanResult.visble == true && (
                <>
                 <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                 <Paper
                className="Card-lblResult"
                elevation={3}
                style={{
                  background: " #BA0900",
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
              </div>
              {/* <Table
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
              </Table> */}
              <br/>
               <AntTable 
                columns={columns}
                dataSource={gvScanResult.value}
                style={{ width:'100%'}}
                pagination={false}
                size="small"
                bordered
                className="tableGvResult"
                />
                </>
            )}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default ScanSMTRoollSht;