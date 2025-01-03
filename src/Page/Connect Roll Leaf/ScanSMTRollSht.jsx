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
import { Table as AntTable,Button as AntButton } from "antd";
import { fn_Homepage } from "../Homepage/fn_Homepage";
function ScanSMTRoollSht() {
  const { menuName } = fn_Homepage();
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
    columns,
    txtOperator_TextChanged,
    txtRollLeaf_TextChanged,
    ibtCancel_Click
  } = Fn_ScanSMTRollSht();

  return (
    <div>
      <Hearder />
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table className="Header_Left" component={Paper}>
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
                            value: e.target.value.trim(),
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleLotxt_Lotno();
                          }
                        }}
                      ></TextField>
                    </TableCell>
                    <TableCell>
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
                    {console.log(lblCheckRoll)}
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
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtOperator_TextChanged(e.target.value);
                          }
                        }}
                        fullWidth
                        inputRef={(el) => (fc_txtOperator.current = el)}
                        value={txtOperator}
                        onChange={(e, value) => {
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
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            settxtTotalLeaf(value);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handletxtTotalLeaf();
                          }
                        }}
                      ></TextField>
                    </TableCell>
                    <TableCell align="right">
                      <Typography>Total Sht. :</Typography>
                    </TableCell>
                    <TableCell style={{ width: "70px" }}>
                      <div
                        style={{
                          background: "#0D92F4",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        <Typography
                          variant="button"
                          style={{
                            color: "#FFF",
                            fontSize: "17px",
                          }}
                        >
                          {lbltotalSht}
                        </Typography>
                      </div>
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
                            value: e.target.value.trim(),
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtRollLeaf_TextChanged(e.target.value);
                          }
                        }}
                        
                        fullWidth
                      ></TextField>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {console.log(lbllog, "lbllog")}
              {lbllog.visible == true && (
                <Paper elevation={3} className="Card-lblLog">
                  {lbllog.value}
                </Paper>
              )}

              <Table
                className="CSS-GvSerial"
                style={{ display: GvSerial.visible }}
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
                {console.log(txtLeafNo,'GvSerial')}
                  {Array.from({ length: GvSerial.value.length }, (_, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="center"
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        {console.log('txtLeafNotxtLeafNo',txtLeafNo)}
                        <TextField
                          size="small"
                          fullWidth
                          className="input_txt"
                          inputRef={(el) => (fc_GvSerial.current[index] = el)}
                          value={txtLeafNo[index]}
                          onChange={(event) =>
                            handleTextFieldChange(index, event)
                          }
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              if (index < GvSerial.value.length - 1) {
                                fc_GvSerial.current[index + 1].focus();
                              } else {
                                Bt_Save();
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
                      <AntButton type="primary" className="ButtonReplace" onClick={Bt_Save}>
                        Save
                      </AntButton>{" "}
                      &nbsp;&nbsp;
                      <AntButton  type="primary" className="BtCancel" onClick={ibtCancel_Click}>Cancel</AntButton>
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
              {gvScanResult.visible == false && (
                <>
                  {" "}
                  <img
                    className="Img1"
                    src={Pageimg}
                    alt="Description of the image"
                  />
                </>
              )}
              {gvScanResult.visible == true && (
                <>
                  <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                    <Paper
                      className="Card-lblResult"
                      elevation={3}
                      style={{
                        backgroundColor: lblResult.value=='OK' ? "green" : "red" ,
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
                  <AntTable
                    columns={columns}
                    dataSource={gvScanResult.value}
                    style={{ width: "100%" }}
                    pagination={false}
                    size="small"
                    bordered
                    className="tableGvResult"
                    rowClassName={(record) => (record.SCAN_RESULT === "NG" ? "row-red" : record.SCAN_RESULT ===  "OK" ? "row-green" : "")}
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
