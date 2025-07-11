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
import { Table as AntTable,Button as AntButton } from "antd";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./SerialPcs.css";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTSerialPcsChrome } from "./fn_ScanSMTSerialPcsChrome";
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
    btnCancel_Click,
    gvScanResult,
    lblResult,
    lblTime,
    columns,
    settxtMachine,
    txtMachine,
    settxtOP,
    txtOP,
    txtOP_TextChanged,
    txtMachine_TextChanged,fc_txtMachine,fc_txtOP,ibtOPBack_Click,ibtMachineBack_Click,lblOP
  } = fn_ScanSMTSerialPcsChrome();
  let data=[]
  return (
    <div>
      <Hearder />
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            {/* style={{border:'1px solid red'}} */}
            <Grid item xs={10} md={4}>
              <Table className="Header_Left" component={Paper}>
                <TableHead>
                  <TableCell colSpan={5} align="center">
                    {/* <Typography variant="h6">Final Gate</Typography> */}
                    {menuName}
                  </TableCell>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Scan Lot. :</Typography>
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
                  {/* style={{ display: txtPackingNo.visble }}   ซ่อนTableRow */}
                  <TableRow style={{ display: txtMachine.visble }}>
                    <TableCell align="right">
                      <Typography>Machine No :</Typography>
                    </TableCell>
                    <TableCell colSpan={4}>
                      <TextField
                        className="input_txt"
                        id='txtMachine'
                        size="small"
                        inputRef={(el) => (fc_txtMachine.current = el)}
                        value={txtMachine.value}
                        onChange={(e) => {
                          settxtMachine((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        style={{ ...txtMachine.style, width: "75%" }}
                        disabled={txtMachine.disbled} //true พิมไม่ได้
                        // // inputRef={fc_txtLotNo}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtMachine_TextChanged();
                          }
                        }}
                        // onBlur={txtPackingNo_TextChanged}
                      ></TextField>
                      <Button
                      id='ibtMachineBack'
                        className="Bt_ibtBack"
                        onClick={ibtMachineBack_Click}
                      >
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  {/* style={{ display: txtPackingNo.visble }} */}
               
                  <TableRow style={{ display: txtOP.visble  }}>
                    <TableCell align="right" style={{ width: "120px" }}>
                      <Typography> OP/Partial No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={4}>
                      <TextField
                        id='txtOP'
                        className="input_txt"
                        size="small"
                        inputRef={(el) => (fc_txtOP.current = el)}
                        value={txtOP.value}
                        onChange={(e) => {
                          settxtOP((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        style={{ ...txtOP.style, width: "75%" }}
                        disabled={txtOP.disbled} //true พิมไม่ได้
                        // inputRef={fc_txtLotNo}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtOP_TextChanged();
                          }
                        }}
                        // onBlur={txtPackingNo_TextChanged}
                      ></TextField>
                      <Button
                        id="ibtOPBack"
                        className="Bt_ibtBack"
                        onClick={ibtOPBack_Click}
                      >
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ display: txtPackingNo.visble }}>
                    <TableCell align="right">
                      <Typography>Packing No :</Typography>
                    </TableCell>
                    <TableCell colSpan={4}>
                      <TextField
                      id="txtPackingNo"
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
                        style={{ ...txtPackingNo.style, width: "75%" }}
                        disabled={txtPackingNo.disbled} //true พิมไม่ได้
                        // inputRef={fc_txtLotNo}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtPackingNo_TextChanged();
                          }
                        }}
                        // onBlur={txtPackingNo_TextChanged}
                      ></TextField>
                      <Button
                      id="ibtPackingBack"
                        className="Bt_ibtBack"
                        onClick={ibtPackingBack_Click}
                      >
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
                      <Typography style={{color:'green'}}><label>OK :</label></Typography>
                    </TableCell>
                    <TableCell style={{ width: "70px" }} colSpan={2}>
                     <label id='lblLotTotal'>{lblLotTotal}</label> 
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" style={{ width: "100px" }}>
                      <Typography>Pcs/Tray</Typography>
                    </TableCell>
                    <TableCell
                      style={{
                        width: "130px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                      id='txtPcsTray'
                        className="input_txt"
                        size="small"
                        inputRef={(el) => (fc_txtTray.current = el)}
                        value={txtPcsTray.value}
                        // onChange={(e) => {
                        //   settxtPcsTray((prevState) => ({
                        //     ...prevState,
                        //     value: e.target.value.trim(),
                        //   }));
                        // }}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d*$/.test(value)) {
                            // settxtTotalLeaf(value);
                            settxtPcsTray((prevState) => ({
                                  ...prevState,
                                  value:value
                                }));
                          }
                        }}
                        style={{ ...txtPcsTray.style, width: "60px" }}
                        disabled={txtPcsTray.disbled}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtPcsTray_TextChanged();
                          }
                        }}
                        // onBlur={txtPcsTray_TextChanged}
                      />
                      &nbsp;<p style={{ margin: 0 }}>{lblLastTray}</p>{" "}
                      {/* ลบ margin ออกจาก p */}
                    </TableCell>
                    {/* <TableCell style={{ width: "70px",}}></TableCell> */}
                    <TableCell align="right" style={{ width: "40px" }}>
                      <Typography style={{color:'red'}}><label>NG :</label></Typography>
                    </TableCell>
                    <TableCell colSpan={2}><label id="lblSerialNG">{lblSerialNG}</label></TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* {lbllog.visble == true && ( */}

              <Paper
                elevation={3}
                className="Card-lblLog"
                style={{
                  display: lblLog.visble,
                }}
                id='lblLog'
              >
                {lblLog.value}
              </Paper>

              <Paper
                elevation={3}
                className="Card-lblOP"
                style={{
           
                  display: lblOP.visble,
                }}
                id='lblOP'
              >
                {lblOP.value}
              </Paper>
              <Table
              id="gvSerial"
                className="CSS-GvSerial"
                style={{ marginTop: "10px", display: gvSerial.visble }}
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
                    <TableRow key={index}>
                      <TableCell
                        align="center"
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <input
                         id={`txtSerial${index}`}
                          key={index}
                          className="styleSeraial"
                          // size="small"
                          // fullWidth
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
                                //btnSave_Click();
                                event.target.blur();
                                settxtSerial(data);
                                btnSave_Click(data);
                                
                              }
                            }
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: "center" }}>
                      <AntButton className="BtSave" 
                      // onClick={btnSave_Click}
                      id='btnSave'
                      onClick={() => {
                        settxtSerial(data);
                        btnSave_Click(data);
                      }}
                      >
                        Save
                      </AntButton>{" "}
                      &nbsp;&nbsp;
                      <AntButton id='btnCancel' className="BtCancel" onClick={btnCancel_Click}>
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
                    style={{
                      width: "300px",
                      height: "260px",
                      marginBottom: "30px",
                    }}
                    src={Pageimg}
                    alt="Description of the image"
                  />
                </>
              )}

              {/* visiblegvScanResult */}
              {gvScanResult.visble == true && (
                <>
                  <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                    <Paper
                    id='lblResult'
                      className="Card-lblResult"
                      style={{
                        background:
                          lblResult.value === "OK" ? "green" : "red",
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
                    id='lblTime'
                      className="Card-lblTime"
                      style={{
                        ...lblTime.style,
                          display: lblTime.value === '' ? 'none' : ''
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
                    id='gvScanResult'
                    columns={columns}
                    dataSource={gvScanResult.value}
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
    </div>
  );
}

export default ScanSMTRoollSht;
