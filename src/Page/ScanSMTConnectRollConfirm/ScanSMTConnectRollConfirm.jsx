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
import "./ScanSMTConnectRollConfirm.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTConnectRollConfirm } from "./fn_ScanSMTConnectRollConfirm";
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
  } = fn_ScanSMTConnectRollConfirm();
  return (
    <div>
      <Hearder />
      <h1> Confirm Connect Roll&Leaf</h1>
      <Card component={Paper} className="Card-ConfirmBarcode">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table className="ScanSMT" component={Paper}>
                <TableHead>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="h6">
                      Confirm Connect Roll&Leaf
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
                        id="txtLot_ScanSMTConnectRollConfirm_focus"
                        size="small"
                        fullWidth
                        disabled={txtLot.disbled}
                        style={txtLot.style}
                        value={txtLot.value}
                        onChange={(e) => {
                          setTxtLot((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtLot_TextChanged();
                          }
                        }}
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <Button onClick={ibtBack_Click}>
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
                        size="small"
                        value={lblTotalSht}
                        style={{ width: "95%" }}
                      ></TextField>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography
                        variant="body1"
                        style={{
                          width: "100%",
                          color: "#FF0066",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {lblShtCount}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {lblpnlLog.visble == true && (
                <Paper
                  elevation={3}
                  style={{
                    width: "400px",
                    height: "40px",
                    margin: "auto",
                    textAlign: "center",
                    background: "#BB2525",
                    paddingTop: "18px",
                    color: "yellow",
                    fontWeight: "bold",
                    marginTop: "30px",
                  }}
                >
                  {lblpnlLog.value}
                </Paper>
              )}

              <Table
                className="CSS-GvSerial"
                style={{
                  display: pnlSerial.visble ? "" : "none",
                  marginTop: "20px",
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
                              //  key={`text_${index}`}
                              key={index}
                              size="small"
                              fullWidth
                              id={`gvSerial_txtSerial_${index}`}
                              value={txtSerial[index]}
                              onChange={(event) =>
                                handleSerialChange(index, event)
                              }

                              // inputRef={(el) => (gvSerialRefs.current[index] = el)}
                              // onBlur={(event) => {
                              //   handleSerialChange(index, event);
                              // }}
                              // onChange={(event) => handleSerialChange(index, event)}
                              // onKeyDown={(event) => {
                              //   if (event.key === "Enter") {
                              //     event.preventDefault();
                              //     if (index < gvSerial.length - 1) {
                              //       fc_txtSerial.current[index + 1].focus();
                              //     } else {
                              //       btnSave_Click();
                              //       event.target.blur();
                              //     }
                              //   }
                              // }}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: "center" }}>
                      <Button className="BtSave" onClick={btnSave_Click}>Save</Button> &nbsp;&nbsp;
                      <Button className="BtCancel" onClick={btnCancel_Click}>
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>

            {/* Result */}
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
              {gvScanResult.visble == false && (
                <>
                  {" "}
                  <img
                    style={{
                      width: "420px",
                      height: "350px",
                      marginBottom: "30px",
                    }}
                    src={Pageimg}
                    alt="Description of the image"
                  />
                </>
              )}

              {gvScanResult.visble == true && (
                <>
                  {lblResult.value !== "" && (
                    <Paper
                      className="Card-lblResult"
                      elevation={3}
                      style={{
                        background: "#ff4d4f",
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
                  )}

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
                          Roll No.
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
                              {gvScanResult.value[index].seq}
                            </TableCell>

                            <TableCell
                              sx={{ borderRight: "1px solid #d9d9d9" }}
                            >
                              {gvScanResult.value[index].roll_leaf_no}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ borderRight: "1px solid #d9d9d9" }}
                            >
                              {gvScanResult.value[index].sheet_no}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                borderRight: "1px solid #d9d9d9",
                                background:
                                  gvScanResult.value[index].scan_result === ""
                                    ? ""
                                    : gvScanResult.value[index].scan_result ===
                                      "OK"
                                    ? "green"
                                    : "#ff4d4f",
                              }}
                            >
                              {gvScanResult.value[index].scan_result}
                            </TableCell>
                            <TableCell
                              sx={{ borderRight: "1px solid #d9d9d9" }}
                            >
                              {gvScanResult.value[index].remark}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
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
