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
import "./ScanAVIConfirmResult.css";
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../Common/StyleCommon.css";
import { fn_ScanAVIConfirmResult } from "../ScanAVIConfirmResult/fn_ScanAVIConfirmResult";
import { fn_Homepage } from "../Homepage/fn_Homepage";
function ScanAVIConfirmResult() {
  const {
    ddlProduct,
    Product,
    ddlTestType,
    TestType,
    txtSerialBarcode,
    setTxtSerialBarcode,
    txtSerialBarcode_TextChanged,
    ddlProduct_SelectedIndexChanged,
    ddlTestType_SelectedIndexChanged,
    lblNo,
    tableData,
    ShowtableRow,
  } = fn_ScanAVIConfirmResult();
  const { menuName } = fn_Homepage();
  return (
    <div>
      <Hearder />
      <Box className="Center_Layout">
        <Grid container spacing={2}>
          <Grid item xs={10} md={12} align="center">
            <Table className="Header_Center" component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    {menuName}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell align="right">
                    <Typography> Product :</Typography>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <FormControl fullWidth>
                      <Autocomplete
                        size="small"
                        className="Select_dropDown"
                        value={ddlProduct.value}
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
                    <Typography>Test Type :</Typography>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <FormControl fullWidth>
                      <Autocomplete
                        size="small"
                        className="Select_dropDown"
                        value={ddlTestType.value}
                        style={{ width: "60%" }}
                        onChange={(e, value) =>
                          ddlTestType_SelectedIndexChanged(value)
                        }
                        options={TestType.map((item) => item.test_type)}
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
                    <Typography>Serial Barcode :</Typography>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <TextField
                      id="txtSerialBarcode"
                      // id="txtLot_ScanSMTConnectRollConfirm_focus"
                      className="input_txt"
                      size="small"
                      fullWidth
                      autoComplete="off"
                      disabled={txtSerialBarcode.disbled}
                      style={txtSerialBarcode.style}
                      value={txtSerialBarcode.value}
                      onChange={(e) => {
                        setTxtSerialBarcode((prevState) => ({
                          ...prevState,
                          value: e.target.value,
                        }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          txtSerialBarcode_TextChanged();
                        }
                      }}
                    ></TextField>
                  </TableCell>
                </TableRow>
                {lblNo.value !== "" && (
                  <TableRow style={{ backgroundColor: "yellow" }}>
                    <TableCell align="center" colSpan={2}>
                      <Typography
                        style={{ color: "#0000CC", fontSize: "16px" }}
                      >
                        {lblNo.value}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Box>

      {ShowtableRow.visble && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "5px",
          }}
        >
          <table style={{ height: "100%", width: "90%" }}>
            <tbody>{ShowtableRow.value}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ScanAVIConfirmResult;
