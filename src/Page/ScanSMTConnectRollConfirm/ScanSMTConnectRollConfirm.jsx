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
  } = fn_ScanSMTConnectRollConfirm();

  return (
    <div>
      <Hearder />
      <h1>ScanSMTRoollSht</h1>
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
                        id="txtLot"
                        size="small"
                        fullWidth
                        // disabled={txtLot.disbled}
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
                        onBlur={txtLot_TextChanged}
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <Button>
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
                          id="ddlProduct"
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
                        id="txtfild"
                        size="small"
                        style={{ width: "70px" }}
                      ></TextField>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {/* {lbllog.visble == true && (
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
                
                    {lbllog.value}
                
                </Paper>
              )} */}

              <Table
                className="CSS-GvSerial"
                style={{ marginTop: "20px" }}
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

                  <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: "center" }}>
                      <Button className="BtSave">Save</Button> &nbsp;&nbsp;
                      <Button className="BtCancel">Cancel</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>

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
            ></Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default ScanSMTConnectRollConfirm;
