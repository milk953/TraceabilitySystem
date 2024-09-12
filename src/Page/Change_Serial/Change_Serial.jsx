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
import "./Change_Serial.css";
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../Common/StyleCommon.css";
import { fn_Change_Serial } from "../Change_Serial/fn_Change_Serial";

function Change_Serial() {
  const { txtTotalPcs,txtTotalPcs_TextChanged,BtnSubmit_Click } = fn_Change_Serial();

  return (
    <div>
      <Hearder />
      <h1>Replace Partial No.</h1>
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={12} align="center">
              {/* <Paper
                className="Card-lblResult"
                style={{
                  background: "#059212",
                  marginBottom: "10px",
                  width: "40%",
                }}
              >
                <Typography
                  variant="h4"
                  style={{ paddingTop: "5px", color: "#fff" }}
                >
      
                </Typography>
              </Paper> */}
              <Table
                component={Card}
                className="ChangePartino"
                style={{ width: "50%" }}
              >
                <TableBody>
                  <TableRow>
                    <TableCell align="right" style={{ width: "150px" }}>
                      <Typography>Total Piece :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        className="input_txt"
                        style={{ width: "50%" }}
                        fullWidth
                        value={txtTotalPcs.value}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table
                className="CSS-GvSerial"
                style={{
                  width: "50%",
                  marginTop: "20px",
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
                  <TableCell
                    align="center"
                    sx={{ borderRight: "1px solid #d9d9d9" }}
                  >
                    Old Piece No.
                  </TableCell>
                  <TableCell align="center">New Piece No.</TableCell>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={3} style={{ textAlign: "center" }}>
                      <Button className="BtSave" onClick={BtnSubmit_Click} >
                        Submit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default Change_Serial;
