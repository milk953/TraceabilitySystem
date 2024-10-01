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
import { Table as AntTable } from "antd";
import Pageimg from "/src/assets/1.jpg";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSMTConnectRollConfirm.css";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTSerialXrayConfirm } from "./fn_ScanSMTSerialXrayConfirm";

function ScanSMTSerialXrayConfirm() {
    const {} = fn_ScanSMTSerialXrayConfirm();
  return (
    <div>
    <Hearder />
    <h1> Confirm Connect Roll&Leaf</h1>
    <Card component={Paper} className="Card-Common">
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
                      className="input_txt"
                      size="small"
                      fullWidth
                    //   disabled={txtLot.disbled}
                    //   style={txtLot.style}
                    //   value={txtLot.value}
                    //   onChange={(e) => {
                    //     setTxtLot((prevState) => ({
                    //       ...prevState,
                    //       value: e.target.value,
                    //     }));
                    //   }}
                    //   onKeyDown={(e) => {
                    //     if (e.key === "Enter") {
                    //       txtLot_TextChanged();
                    //     }
                    //   }}
                    ></TextField>
                  </TableCell>
                  <TableCell>
                    <Button className="Bt_ibtBack">
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
                        // value={ddlProduct.value}
                        // style={ddlProduct.style}
                        // disabled={ddlProduct.disbled}
                        // onChange={(e, value) =>
                        //   ddlProduct_SelectedIndexChanged(value)
                        // }
                        // options={Product.map((item) => item.prd_name)}
                        // renderInput={(params) => (
                        //   <TextField
                        //     {...params}
                        //     size="small"
                        //     sx={{ textAlign: "left" }}
                        //   />
                        // )}
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

            {/* {lblpnlLog.visble == true && (
              <Paper elevation={3} className="Card-lblLog">
                {lblpnlLog.value}
              </Paper>
            )} */}
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
                {/* {Array.isArray(gvSerial.value) &&
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
                            fullWidth
                            id={`gvSerial_txtSerial_${index}`}
                            className="input_txt"
                            value={txtSerial[index]}
                            onChange={(event) =>
                              handleSerialChange(index, event)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )} */}
                <TableRow>
                  <TableCell colSpan={2} style={{ textAlign: "center" }}>
                    <Button className="BtSave" >
                      Save
                    </Button>{" "}
                    &nbsp;&nbsp;
                    <Button className="BtCancel" >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>

          {/* Result */}
          {/* <Grid
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
                  className="Img_GvResult"
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
                <AntTable
                  columns={columns}
                  dataSource={gvScanResult.value}
                  pagination={false}
                  size="small"
                  bordered
                  className="tableGvResult"
                />
              </>
            )}
          </Grid> */}
          
        </Grid>
      </Box>
    </Card>
  </div>
  )
}

export default ScanSMTSerialXrayConfirm