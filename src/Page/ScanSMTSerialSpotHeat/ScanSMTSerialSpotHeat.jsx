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

import BackspaceIcon from "@mui/icons-material/Backspace";
import "../Confirm Barcode Grade/BarcodeGrade.css";
import Hearder from "../Header/Hearder";
import { fn_ScanSMTSerialSpotHeat } from "./fn_ScanSMTSerialSpotHeat";
function ScanSMTSerialSpotHeat() {
  const {
    handletxt_Lotno,
    txt_lotNo,
    settxt_lotNo,
    handleddlProduct,
    Product,
    SlProduct,
    txtTotalPCS,
    settxtTotalPCS,
  } = fn_ScanSMTSerialSpotHeat();
  return (
    <div>
      <Hearder />
      <h1>ConfirmBarcodeGrade</h1>
      <Card component={Paper} className="Card-ConfirmBarcode">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table
                className="TableMot1"
                component={Card}
                sx={{ width: "100%" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Typography variant="h5">
                        <b>Spot Heat Result Checking</b>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">
                      <Typography>Lot No. :</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="txtfild"
                        size="small"
                        fullWidth
                        value={txt_lotNo}
                        // inputRef={fcLotNo}
                        onChange={(e) => {
                          settxt_lotNo(e.target.value);
                        }}
                        // disabled='false'
                        // onChange={(e) =>  settxt_lotNo(e.target.value)}
                        onBlur={handletxt_Lotno}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                      //   onClick={ibtBack_Click}
                      >
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography>Product :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <FormControl fullWidth>
                        <Autocomplete
                          //   inputRef={fcProduct}
                          id="selectPdBarcode"
                          value={SlProduct}
                          onChange={(e, value) => handleddlProduct(value)}
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
                    <TableCell align="left">
                      <Typography>Total Sht :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        id="txtfild"
                        value={txtTotalPCS}
                        // inputRef={fcLotNo}
                        onChange={(e) => {
                          settxtTotalPCS(e.target.value);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Card
                component={Paper}
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
              ></Card>

              <Table className="CSS-GvSerialBarcode" component={Card}>
                <TableHead>
                  <TableCell
                    sx={{ borderRight: "1px solid #d9d9d9" }}
                    align="center"
                  >
                    Sheet
                  </TableCell>

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
                  <TableRow>
                    <TableCell
                      sx={{ borderRight: "1px solid #d9d9d9" }}
                      align="center"
                    ></TableCell>
                    <TableCell
                      align="center"
                      sx={{ borderRight: "1px solid #d9d9d9" }}
                    ></TableCell>
                    <TableCell>
                      <TextField
                        id="txtfild"
                        size="small"
                        fullWidth
                        // inputRef={fcGvSerial_txtSerial_0}
                        // value={txtSerial[index]}
                        // onChange={(event) =>
                        //   handleSerialChange(index, event)
                        // }
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow
                  // style={{display:visibleConfirm}}
                  >
                    <TableCell align="center" colSpan={3}>
                      Please be confirm to save?
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Button
                        variant="contained"
                        size="small"
                        //   onClick={btnSave_Click}
                      >
                        Yes
                      </Button>{" "}
                      &nbsp;&nbsp;
                      <Button
                        variant="contained"
                        size="small"
                        color="error"
                        //   onClick={btnCancel_Click}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            {/* border:'1PX SOLID green' */}
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
              <img
                style={{
                  width: "420px",
                  height: "350px",
                  marginBottom: "30px",
                }}
                src="src/assets/1.jpg" // Import the image
                alt="Description of the image"
              />

              <>
                <Paper
                  className="Card-lblResult"
                  elevation={3}
                  style={{
                    background: " #ff4d4f",
                    // display: gvScanResult,
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{ paddingTop: "3px", color: "#fff" }}
                  ></Typography>
                </Paper>
                <Table
                  className="CSS-GvScanResult"
                  // style={{ display: gvScanResult }}
                  component={Card}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                        width="50px"
                      >
                        SHEET
                      </TableCell>
                      <TableCell
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                        width="200px"
                      >
                        No.
                      </TableCell>
                      <TableCell
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                        width="200px"
                      >
                        Serial No.
                      </TableCell>
                      <TableCell
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                        width="150px"
                      >
                        Grade
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
                    <TableRow>
                      <TableCell
                        align="center"
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                      ></TableCell>
                      <TableCell
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                      ></TableCell>
                      <TableCell
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                      ></TableCell>
                      <TableCell
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                      ></TableCell>
                      <TableCell
                        sx={{
                          borderRight: "1px solid #d9d9d9",
                          background: "#ff4d4f",
                        }}
                      ></TableCell>
                      <TableCell
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                      ></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default ScanSMTSerialSpotHeat;
