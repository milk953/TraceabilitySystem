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
import "./AOIXrayConfirm.css";
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../Common/StyleCommon.css";
import { Margin } from "@mui/icons-material";
import { fn_ScanSheetAOIXrayConfirm } from "../AOI Confirm Result/fn_ScanSheetAOIXrayConfirm";
function ScanSheetMOTTime() {
  const {
    settxtSheetNo,
    txtSheetNo,
    lblResult,
    lblSheet,
    lblRemark,
    fc_txtSheet,
    txtSheetNo_TextChanged,
    ibt_back,
  } = fn_ScanSheetAOIXrayConfirm();

  return (
    <div>
      <Hearder />

      {/* <Card component={Paper} className="Card-Common"> */}
        <Box sx={{ display: "flex", alignItems: "flex-start" ,marginTop:'80px'}}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={12} align="center">
              <Table
                component={Card}
                className="AOIConfirmResult"
                style={{ width: "50%" }}
              >
                <TableHead style={{ height: "60px" }}>
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={{ fontSize: "30px" }}
                    >
                      <b>AOI Confirm Result</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right" style={{ width: "150px" }}>
                      <Typography>Sheet No.:</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        className="input_txt"
                        fullWidth
                        inputRef={(el) => (fc_txtSheet.current = el)}
                        value={txtSheetNo}
                        onChange={(e) => {
                          settxtSheetNo(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtSheetNo_TextChanged();
                          }
                        }}
                        // onBlur={txtSheetNo_TextChanged}
                      />
                    </TableCell>
                    <TableCell>
                      <BackspaceIcon
                        style={{ marginLeft: "10px" }}
                        onClick={ibt_back}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow style={{display: lblResult === '' ? 'none' : '',}}>
                    <TableCell
                      colSpan={3}
                      style={{ height: "40px",fontSize: "23px", }}
                      align="center"
                    >
                        {lblSheet}
                   
                    </TableCell>
                  </TableRow>

                </TableBody>
              </Table>
              <br/>
              <Table
                component={Card}
                className="AOIConfirmResult"
                style={{ width: "50%" }}
              >
            
                <TableBody style={{display: lblResult === '' ? 'none' : '',}}>
                  <TableRow >
                    <TableCell
                      colSpan={3}
                      style={{ height: "300px" }}
                      align="center"
                    >
                      <Paper
                        style={{
                          height: "300px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background:
                            lblResult.toLowerCase() === "ok"
                              ? "#059212"
                              : lblResult.toLowerCase() === "ng"
                              ? "red"
                              : "transparent",
                          flexDirection: "column",
                          textAlign: "center", 
                        }}
                      >
                        <b
                          style={{
                            fontSize: "80px",
                            color: "#fff",
                          }}
                        >
                          {lblResult}
                        </b>

                        <b style={{ fontSize: "25px", color: "#fff" }}>
                          <span
                            dangerouslySetInnerHTML={{ __html: lblRemark }}
                          />
                        </b>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Box>
      {/* </Card> */}
      {/* </Card> */}
    </div>
  );
}

export default ScanSheetMOTTime;
