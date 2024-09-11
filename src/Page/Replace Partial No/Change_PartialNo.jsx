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

import {
  ArrowRightOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Table as AntTable } from "antd";
import "./ChangePartialNO.css";
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../Common/StyleCommon.css";
import { fn_Change_PartialNo } from "../Replace Partial No/fn_Change_PartialNo";
function ScanSheetMOTTime() {
  const {
    columns
  } = fn_Change_PartialNo();

  return (
    <div>
      <Hearder />
      <h1>Replace Partial No.</h1>
      <Card component={Paper} className="Card-Common">

        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            {/* style={{border:'1px solid red'}} */}
            <Grid item xs={10} md={5} >
            <Table component={Card} className="ChangePartino">
          <TableHead style={{ height: "60px" }}>
            <TableRow>
              <TableCell
                colSpan={3}
                align="center"
                style={{ fontSize: "30px" }}
              >
                <b>Replace Partial No.</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="right" style={{ width: "150px" }}>
                <Typography>Total Partial No.:</Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <TextField
                  size="small"
                  className="input_txt"
                  style={{ width: "50%", }}
                  fullWidth
                //   inputProps={{
                //     style: { textAlign: 'center', }  
                //   }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
              <Table
                className="CSS-GvSerial"
                style={{
                  marginTop: "20px",
                  // display: gvSerial.visble
                }}
                component={Card}
              >
                <TableHead>
                  <TableCell
                    sx={{ borderRight: "1px solid #d9d9d9" }}
                    align="center"
                  >
                    No.
                  </TableCell>
                  <TableCell align="center"  sx={{ borderRight: "1px solid #d9d9d9" }}>Old Partial No.</TableCell>
                  <TableCell align="center">New Partial No.</TableCell>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                  {/* <TableRow> */}

                  {/* {Array.from({ length: gvSerial.value.length }, (_, index) => (
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
                          className="input_txt"
                          size="small"
                          fullWidth
                          inputRef={(el) => (fc_txtSerial.current[index] = el)}
                          value={txtSerial[index]}
                          onBlur={(event) => {
                            handleSerialChange(index, event);
                          }}
                          onChange={(event) => handleSerialChange(index, event)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault(); 
                              if (index < gvSerial.value.length - 1) {
                                fc_txtSerial.current[index + 1].focus();
                              } else {
                                btnSave_Click();
                                event.target.blur();
                              }
                            }
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))} */}

                  <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: "center" }}>
                      <Button
                        className="BtSave"
                        // onClick={btnSave_Click}
                      >
                        Save
                      </Button>{" "}
                      &nbsp;&nbsp;
                      <Button
                        className="BtCancel"
                        // onClick={btnCancel_Click}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={10} md={7} >            
            <AntTable
                    columns={columns}
                    // dataSource={gvScanResult.value}
                    pagination={false}
                    size="small"
                    bordered
                    className="tableGvResult"
                  />
            </Grid>

          </Grid>
        </Box>
      </Card>
      {/* </Card> */}
    </div>
  );
}

export default ScanSheetMOTTime;
