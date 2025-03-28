//  *** Khun *** //
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
import { Table as AntTable, Button as ButtonAndt } from "antd";
import Pageimg from "/src/assets/1.jpg";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSMTConnectRollConfirm.css";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTConnectRollConfirm } from "./fn_ScanSMTConnectRollConfirm";
import { fn_Homepage } from "../Homepage/fn_Homepage";
function ScanSMTConnectRollConfirm() {
  const {
    txtLot,
    setTxtLot,
    txtLot_TextChanged,
    ddlProduct,
    setDdlProduct,
    ddlProduct_SelectedIndexChanged,
    Product,
    lblTotalSht,
    lblShtCount,
    lblpnlLog,
    getInputSerial,
    ibtBack_Click,
    gvSerial,
    txtSerial,
    gvScanResult,
    gvSerialRefs,
    handleSerialChange,
    btnCancel_Click,
    lblResult,
    pnlSerial,
    btnSave_Click,
    columns,
    lblRemark,
    showSheetNo,
  } = fn_ScanSMTConnectRollConfirm();
  const { menuName } = fn_Homepage();
  return (
    <div>
      <Hearder />
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table className="Header_Left" component={Paper}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      {menuName ? menuName : "Confirm Roll Leaf"}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      <Typography> Lot No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        id="txtLot_ScanSMTConnectRollConfirm_focus"
                        className="input_txt"
                        size="small"
                        autoComplete="off"
                        fullWidth
                        disabled={txtLot.disbled}
                        style={txtLot.style}
                        value={txtLot.value}
                        onChange={(e) => {
                          setTxtLot((prevState) => ({
                            ...prevState,
                            value: e.target.value.trim(),
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            txtLot_TextChanged();
                            e.target.blur();
                          }
                        }}
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <Button onClick={ibtBack_Click} className="Bt_ibtBack">
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
                          id="ddlProduct_ScanSMTConnectRollConfirm_focus"
                          size="small"
                          className="Select_dropDown"
                          value={ddlProduct.value}
                          style={ddlProduct.style}
                          disabled={ddlProduct.disbled}
                          onChange={(e, value) =>
                            ddlProduct_SelectedIndexChanged(value)
                          }
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
                      <Typography>Total Leaf :</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="lblTotalSht_ScanSMTConnectRollConfirm_focus"
                        className="input_txt"
                        size="small"
                        value={lblTotalSht}
                        InputProps={{ readOnly: true }}
                        style={{ width: "95%" }}
                      ></TextField>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography
                        variant="body1"
                        style={{
                          width: "100%",
                          color: "green",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ color: "green" }}>OK : </span> &nbsp;
                        {lblShtCount}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {lblpnlLog.visble == true && (
                <Paper elevation={3} className="Card-lblLog">
                  {lblpnlLog.value}
                </Paper>
              )}
              <Table
                className="CSS-GvSerial"
                style={{
                  display: pnlSerial.visble ? "" : "none",
                }}
                component={Card}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ borderRight: "1px solid #d9d9d9" }}
                      align="center"
                    >
                      No.
                    </TableCell>
                    <TableCell align="center">Leaf No.</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(gvSerial.value) &&
                    Array.from(
                      { length: gvSerial.value.length },
                      (_, index) => (
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
                              size="small"
                              autoComplete="off"
                              fullWidth
                              id={`gvSerial_txtSerial_ScanSMTConnectRollConfirm_${index}`}
                              className="input_txt"
                              value={txtSerial[index] || ""}
                              onChange={(event) =>
                                handleSerialChange(index, event)
                              }
                              onKeyDown={(e) => {
                                // if (
                                //   e.key === "Enter" &&
                                //   txtSerial[index] !== "" &&
                                //   txtSerial[index] !== null &&
                                //   txtSerial[index] !== undefined
                                // ) {
                                //   btnSave_Click();
                                // }
                                if (e.key === "Enter") {
                                  btnSave_Click();
                                }
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  {/* <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: "center" }}>
                      <Button className="BtSave" onClick={btnSave_Click}>
                        Save
                      </Button>{" "}
                      &nbsp;&nbsp;
                      <Button className="BtCancel" onClick={btnCancel_Click}>
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <ButtonAndt
                        className="ButtonReplace"
                        onClick={btnSave_Click}
                      >
                        Save
                      </ButtonAndt>
                      &nbsp;&nbsp;
                      <ButtonAndt
                        className="ButtonDelete"
                        onClick={btnCancel_Click}
                      >
                        Cancel
                      </ButtonAndt>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>

            {/* Result */}
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
              {gvScanResult.visble === false && (
                <>
                  <img
                    className="Img_GvResult"
                    src={Pageimg}
                    alt="Description of the image"
                  />
                </>
              )}

              {gvScanResult.visble === true && (
                <>
                  {/* {lblResult.value !== "" && (
                    <div
                      style={{ display: "flex", gap: "10px", width: "100%" }}
                    >
                      <Paper
                        className="Card-lblResult"
                        elevation={3}
                        style={{
                          background:
                            lblResult.value === "OK" ? "green" : "red",
                          display: gvScanResult.visble ? "" : "none",
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
                  )}
                  {lblRemark !== "" && (
                           <div
                           style={{ display: "flex", gap: "10px", width: "100%" }}
                         >
                    <Paper
                      className="Card-lblResult"
                      elevation={3}
                      style={{
                        background: lblRemark === "" ? "green" : "red",
                        display: gvScanResult.visble ? "" : "none",
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{ paddingTop: "5px", color: "#fff" }}
                      >
                        {lblRemark}
                      </Typography>
                    </Paper>
                    </div>
                  )} */}
                  {(lblResult.value !== "" || lblRemark !== "") && (
                    <div
                      style={{ display: "flex", gap: "10px", width: "100%" }}
                    >
                      <Paper
                        className="Card-lblResult-ScanSMTConnectRollConfirm"
                        elevation={3}
                        style={{
                          background:
                            lblResult.value === "OK" ? "green" : "red",
                          display: gvScanResult.visble ? "" : "none",
                        }}
                      >
                        {lblResult.value !== "" && (
                          <Typography
                            variant="h4"
                            style={{ paddingTop: "5px", color: "#fff" }}
                          >
                            {lblResult.value}
                          </Typography>
                        )}
                        {lblRemark !== "" && (
                          <Typography
                            variant="h4"
                            style={{ paddingTop: "5px", color: "#fff" }}
                          >
                            {lblRemark}
                          </Typography>
                        )}
                      </Paper>
                    </div>
                  )}

                  <AntTable
                    columns={columns}
                    dataSource={gvScanResult.value}
                    pagination={false}
                    size="small"
                    bordered
                    className="tableGvResult"
                    rowClassName={(record) =>
                      record.scan_result === "NG"
                        ? "row-red"
                        : record.scan_result === "OK"
                        ? "row-green"
                        : ""
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

export default ScanSMTConnectRollConfirm;
