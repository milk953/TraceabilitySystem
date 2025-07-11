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
  Checkbox,
  Grid,
} from "@mui/material";
import Pageimg from "/src/assets/1.jpg";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../Confirm Barcode Grade/BarcodeGrade.css";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { Table as AntTable, Button as AntButton } from "antd";
import { fn_Homepage } from "../Homepage/fn_Homepage";
import { fn_ScanSMTSerialSpotHeat } from "./fn_ScanSMTSerialSpotHeat";
function ScanSMTSerialSpotHeat() {
  const {
    handletxt_Lotno,
    txtLot,
    settxtLot,
    handleddlProduct,
    Product,
    SlProduct,
    txtTotalPCS,
    settxtTotalPCS,
    fcGvSerial_txtSerial_0,
    handleTotal_Sht,
    fcTotalSht,
    fcProduct,
    fcLotNo,
    lblLog,
    pnlLog,
    ibtBack_Click,
    btnSave_Click,
    setSlProduct,
    hfMode,
    txtSerial,
    handleSerialChange,
    gvScanResult,
    lblResult,
    visiblgvSerial,
    btnCancel_Click,
    fcGvSerial,
    visiblegvScanResult,
    visibledll_product,
    dataGvSerial,
    columns,
    getRowClassName,
    settxtSerial,
  } = fn_ScanSMTSerialSpotHeat();
  const { menuName } = fn_Homepage();
  let data = [];

  return (
    <div>
      <Hearder />

      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table
                className="Header_Left"
                component={Card}
                sx={{ width: "100%" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Typography variant="h5">
                        {menuName ? menuName : "Spot Heat Result Checking"}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Lot No. :</Typography>
                    </TableCell>

                    <TableCell>
                      <TextField
                        className="input_txt"
                        size="small"
                        id="txtLot"
                        fullWidth
                        disabled={txtLot.disbled}
                        value={txtLot.value.trim()}
                        // inputRef={fcLotNo}
                        inputRef={(el) => (fcLotNo.current = el)}
                        style={{
                          backgroundColor: txtLot.disbled
                            ? "#e0e0e0"
                            : "inherit",
                        }}
                        onChange={(e) => {
                          settxtLot((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handletxt_Lotno();
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        id="ibtback"
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
                    <TableCell colSpan={2}>
                      <FormControl fullWidth>
                        <Autocomplete
                          id="ddlProduct"
                          // inputRef={fcProduct}
                          inputRef={(el) => (fcProduct.current = el)}
                          className="Select_dropDown"
                          value={SlProduct}
                          disabled={visibledll_product}
                          onChange={(e, value) => {
                            // setSlProduct(e.target.value);
                            handleddlProduct(value);
                          }}
                          // onInputChange={handleddlProduct}
                          options={Product.map((item) => item.prd_name)}
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
                      <Typography>Total Sht :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        className="input_txt"
                        id="txtTotalPCS"
                        value={txtTotalPCS.value}
                        inputRef={fcTotalSht}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, ""); // กรองอักขระที่ไม่ใช่ตัวเลขออก
                          settxtTotalPCS((prevState) => ({
                            ...prevState,
                            value: value,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleTotal_Sht();
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {pnlLog == true && (
                <Card component={Paper} className="Card-lblLog" id="lblLog">
                  {lblLog}
                </Card>
              )}
              {visiblgvSerial == true && (
                <Table
                  className="CSS-GvSerial"
                  component={Card}
                  inputRef={fcGvSerial}
                  id="gvSerial"
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
                    {/* 
                    {Array.from({ length: dataGvSerial.length }, (_, index) => ( */}
                    {txtSerial.map((serial, index) => (
                      <tr
                        key={index}
                        style={{ borderBottom: "1px solid  #d9d9d9" }}
                      >
                        <td
                          align="center"
                          style={{ borderRight: "1px solid #d9d9d9" }}
                        >
                          {index + 1}
                        </td>
                        <td>
                          <input
                            id={`txtSerial${index}`}
                            className="txtinput"
                            type="text"
                            fullWidth
                            //  inputRef={fcGvSerial_txtSerial_0}
                            // inputRef={(el) =>
                            //   (fcGvSerial_txtSerial_0.current[index] = el)
                            // }
                            ref={(el) =>
                              (fcGvSerial_txtSerial_0.current[index] = el)
                            }
                            // value={txtSerial[index]}
                            defaultValue={serial}
                            onChange={async (event) =>
                              (data = await handleSerialChange(index, event))
                            }
                            onKeyDown={async (event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                data = await handleSerialChange(index, event);
                                if (index < txtSerial.length - 1) {
                                  fcGvSerial_txtSerial_0.current[
                                    index + 1
                                  ].focus();
                                } else {
                                  event.target.blur();
                                  settxtSerial(data);
                                  btnSave_Click(data);
                                }
                              }
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                    <TableRow></TableRow>

                    <TableRow
                    // style={{display:visibleConfirm}}
                    ></TableRow>
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        {/* <Button
                       className="BtSave"
                       
                          onClick={btnSave_Click}
                      >
                        Save
                      </Button>{" "}
                      &nbsp;&nbsp;
                      <Button
                       className="BtCancel" 
                      
                        color="error"
                          onClick={btnCancel_Click}
                      >
                        Cancel
                      </Button> */}
                        <AntButton
                          id="btnSave"
                          type="primary"
                          className="BtSave"
                          // onClick={btnSave_Click}
                          onClick={() => {
                            settxtSerial(data);
                            btnSave_Click(data);
                          }}
                        >
                          Save
                        </AntButton>{" "}
                        &nbsp;&nbsp;
                        <AntButton
                          id="btnCancel"
                          type="primary"
                          className="BtCancel"
                          onClick={btnCancel_Click}
                        >
                          Cancel
                        </AntButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
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
              {visiblegvScanResult == false && (
                <>
                  <img
                    // className="Img1"
                    style={{
                      width: "360px",
                      height: "300px",
                      marginBottom: "30px",
                    }}
                    src={Pageimg}
                  />
                </>
              )}
              {visiblegvScanResult && (
                <>
                  <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                    <Paper
                      id="lblResult"
                      className="Card-lblResult"
                      // elevation={3}
                      style={{
                        background: lblResult.text !== "OK" ? "red" : "green",
                      }}
                    >
                      <Typography
                        variant="h4"
                        // id='txtNG'
                        style={{ paddingTop: "3px", color: "#fff" }}
                      >
                        {lblResult.text}
                      </Typography>
                    </Paper>
                  </div>
                  <AntTable
                    columns={columns}
                    id="gvScanResult"
                    dataSource={gvScanResult}
                    style={{ width: "100%" }}
                    pagination={false}
                    size="small"
                    bordered
                    className="tableGvResult"
                    rowClassName={getRowClassName}
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

export default ScanSMTSerialSpotHeat;
