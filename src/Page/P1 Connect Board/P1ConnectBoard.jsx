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
import { Table as AntTable ,Button as AntButton} from "antd";
import { fn_Homepage } from "../Homepage/fn_Homepage";
function P1ConnectBoard() {
  const { menuName } = fn_Homepage();
  const {
    Product,
    ddlProduct,
    txtLot_TextChanged,
    txtLot,
    settxtLot,
    lblLog,
    btnSave_Click,
    GvSerial,
    GvBackSide,
    gvScanResult,
    txtLotRef,
    txtMachineNo,
    txtSerial,
    lblTotalPcs,
    lblTotalSht,
    txtRollLeaf,
    settxtLotRef,
    setddlProduct,
    settxtRollLeaf,
    settxtMachineNo,
    ddlProduct_SelectedIndexChanged,
    ibtBack_Click,
    txtRollLeaf_TextChanged,
    txtLotRef_TextChanged,
    handleBackSideChange,
    settxtSideBack,
    txtSideBack,
    settxtSerial,
    handleSerialChange,
    columns,
    fcLotNo,
    fcGvBackSide,
    fcGvSerial,
    fcProduct,
    fcRollleaf,
    fctMachchine,
    fcLotRef,
    lblResult,btnCancel_Click
  } = fn_P1ConnectBoard();
let data=[]

  return (
    <div>
      <Hearder />
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table className="Header_Left" component={Card}>
                <TableHead>
                  <TableCell colSpan={4} align="center">
                     {menuName}
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
                        disabled={txtLot.disbled} //true พิมไม่ได้
                        style={txtLot.style}
                        inputRef={(el) => (fcLotNo.current = el)}
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
                    </TableCell>
                    <TableCell>
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
                    <TableCell colSpan={3}>
                      <FormControl fullWidth>
                        <Autocomplete
                          className="Select_dropDown"
                          value={ddlProduct.value}
                          style={ddlProduct.style}
                          disabled={ddlProduct.disbled} //true พิมไม่ได้
                          onChange={(e, value) => ddlProduct_SelectedIndexChanged(value)}
                          options={Product.map((item) => item.prd_name)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              inputRef={(el) => (fcProduct.current = el)}
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
                        inputRef={(el) => (fcLotRef.current = el)}
                        disabled={txtLotRef.disbled} //true พิมไม่ได้
                        style={txtLotRef.style}
                        value={txtLotRef.value}
                        onChange={(e) => {
                          settxtLotRef((prevState) => ({
                            ...prevState,
                            value: e.target.value.trim(),
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtLotRef_TextChanged();
                          }
                        }}
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
                        disabled
                        style={{width:'80px',backgroundColor:'#e0e0e0'}}
                        inputProps={{
                          style: { textAlign: 'center' }, // จัดข้อความให้อยู่ตรงกลาง
                        }}
                        fullWidth
                        value={lblTotalSht.value}
                      ></TextField>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Total Pcs :</Typography>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <TextField
                       style={{width:'80px',backgroundColor:'#e0e0e0'}}
                        className="input_txt"
                        size="small"
                        disabled
                        value={lblTotalPcs.value}
                        inputProps={{
                          style: { textAlign: 'center' },
                        }}
                        fullWidth
                      ></TextField>
                    </TableCell>
                  </TableRow> 
                  <TableRow style={{display:txtRollLeaf.visble}}>
                    <TableCell align="right">
                      <Typography>Roll Leaf No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <TextField
                        className="input_txt"
                        size="small"
                        inputRef={(el) => (fcRollleaf.current = el)}
                        disabled={txtRollLeaf.disbled} //true พิมไม่ได้
                        value={txtRollLeaf.value}
                        onChange={(e) => {
                          settxtRollLeaf((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtRollLeaf_TextChanged();
                          }
                        }}
                        // onBlur={txtRollLeaf_TextChanged}
                        fullWidth
                      ></TextField>
                    </TableCell>
                  </TableRow>
                  <TableRow  style={{display:txtRollLeaf.visble}} >
                    <TableCell align="right">
                      <Typography>Machine No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={3}>
                      <TextField
                        className="input_txt"
                        size="small"
                        inputRef={(el) => (fctMachchine.current = el)}
                        disabled={txtMachineNo.disbled} //true พิมไม่ได้
                        style={txtMachineNo.style}
                        value={txtMachineNo.value}
                        onChange={(e) => {
                          settxtRollLeaf((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
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
                <Paper  component={Paper} className="Card-lblLog">
                 { lblLog.value}
                </Paper>
             )}

                 <Table component={Paper} className="gvBackSideBarcode"  style={{ display: GvBackSide.visble }} >
                  <TableBody>
                    {Array.from({ length: GvBackSide.value.length }, (_, index) => (
                      <TableRow
                        key={index}
                        style={{ backgroundColor: "White" }}
                      >
       
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #d9d9d9" }}
                        >
                            {GvBackSide.value[index].SEQ}
                        </TableCell>
                        <TableCell>
                          {" "}
                          <TextField
                            className="input_txt"
                            size="small"
                            fullWidth
                            value={txtSideBack[index]}
                            inputRef={(el) => (fcGvBackSide.current[index] = el)}
                            onChange={(event) => {
                              handleBackSideChange(index, event);
                            }}
              
                          
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                event.preventDefault(); 
                                if (index <  GvBackSide.value.length - 1) {
                                  fcGvBackSide.current[index + 1].focus();
                                  console.log("index1",index)
                                } else {
                                  fcGvSerial.current[0].focus();
                                  console.log("index0",index)
                                }
                              
                              }
                            }}
                          />
          
                        </TableCell>
                      </TableRow>
                     ))} 
                  </TableBody>
                </Table>
                 
              <Table
                className="CSS-GvSerial"
                style={{ display: GvSerial.visble }}
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
                    sx={{ borderRight: "1px solid #d9d9d9" ,width:'30px'}}
                    align="center"
                  >
                    No.
                  </TableCell>
                  <TableCell align="center"  sx={{ borderRight: "1px solid #d9d9d9" }}>Serial No.</TableCell>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                  {/* {Array.from({ length: GvSerial.value.length }, (_, index) => ( */}
                  {txtSerial.map((serial, index) => (
                    <tr key={index} style={{borderBottom: "1px solid #d9d9d9"}}>
                      <td
                        align="center"
                        style={{ borderRight: "1px solid #d9d9d9" }}
                        colSpan={GvSerial.value[index].SEQ === 0 ? 2 : 1} 
                      >
                        {GvSerial.value[index].SHEET}
                      </td>
                      {GvSerial.value[index].SEQ !== 0 && (
                        <td  align="center" style={{ borderRight: "1px solid #d9d9d9" }}> 
                          {GvSerial.value[index].SEQ}
                        </td>
                      )}
                      <td>
                      <input
                        className="styleSeraial"
                        defaultValue={serial}
                        ref={(el) => (fcGvSerial.current[index] = el)}
                        onChange={(event) =>
                          handleSerialChange(index, event)
                        }
                       
                        onKeyDown={async(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault(); 
                            data= await handleSerialChange(index, event)
                            if (index <  GvSerial.value.length - 1) {
                              fcGvSerial.current[index + 1].focus();
                            } else {
                              settxtSerial(data);
                              btnSave_Click(data);
                              event.target.blur();
                            }
                          }
                        }}
                      />         
                      </td>
                    </tr>
                  ))}

                  <TableRow>
                    <TableCell colSpan={3} style={{ textAlign: "center" }}>
                      <AntButton type="primary" className="BtSave" 
                      onClick={() => {
                        settxtSerial(data);
                        btnSave_Click(data);
                      }}
                      >
                        Save
                      </AntButton>{" "}
                      &nbsp;&nbsp;
                      <AntButton type="primary" className="BtCancel"  onClick={btnCancel_Click} >Cancel</AntButton>
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
                <>
                  <img
                    className="Img1"
                    src={Pageimg}
                  
                  />
                </>
              )}
            
              {gvScanResult.visble == true && (
                <>
                  <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                    <Paper
                      className="Card-lblResult"
                      elevation={3}
                      style={
                       lblResult.style
                   
                      }
                    >
                      <Typography
                        variant="h4"
                        style={{ paddingTop: "5px", color: "#fff" }}
                      >
                       { lblResult.value}
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

export default P1ConnectBoard;
