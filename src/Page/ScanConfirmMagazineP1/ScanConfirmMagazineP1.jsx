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
  Avatar,
} from "@mui/material";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Table as AntTabl } from "antd";
import "./ScanConfirmMagazineP1.css";
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../Common/StyleCommon.css";
import excel from "../../../src/assets/excel.png";
import { fn_ScanConfirmMagazineP1 } from "../ScanConfirmMagazineP1/fn_ScanConfirmMagazineP1";
import { fn_Homepage } from "../Homepage/fn_Homepage";
function ScanConfirmMagazineP1() {
  const {
    txtOperator,
    setTxtOperator,
    txtOperator_TextChanged,
    ibtOperator_Click,
    txtLotNo,
    setTxtLotNo,
    txtLotNo_TextChanged,
    ibtLotBack_Click,
    txtMagNo,
    setTxtMagNo,
    txtMagNo_TextChanged,
    ibtLotBack,
    ibtOperator,
    ibtExcel,
    lblResult,
    lblTotalPcs,
    lblProduct,
    ibtExcel_Click,
  } = fn_ScanConfirmMagazineP1();
  const { menuName } = fn_Homepage();
  return (
    <div>
      <Hearder />
      {/* <Card
        component={Paper}
        className="Card-Common-Khun"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      > */}
      <Box className="Center_Layout">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} align="center">
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
                    <Typography> Operator :</Typography>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <TextField
                      id="txtOperator_ScanConfirmMagazineP1_focus"
                      className="input_txt"
                      size="small"
                      fullWidth
                      autoComplete="off"
                      disabled={txtOperator.disabled}
                      style={txtOperator.style}
                      value={txtOperator.value}
                      onChange={(e) => {
                        setTxtOperator((prevState) => ({
                          ...prevState,
                          value: e.target.value,
                        }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          txtOperator_TextChanged();
                        }
                      }}
                    ></TextField>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={ibtOperator_Click}
                      className="Bt_ibtBack"
                      disabled={ibtOperator.disabled}
                    >
                      <BackspaceIcon />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography> Lot No. :</Typography>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <TextField
                      id="txtLotNo_ScanConfirmMagazineP1_focus"
                      className="input_txt"
                      size="small"
                      fullWidth
                      autoComplete="off"
                      disabled={txtLotNo.disabled}
                      style={txtLotNo.style}
                      value={txtLotNo.value}
                      onChange={(e) => {
                        setTxtLotNo((prevState) => ({
                          ...prevState,
                          value: e.target.value.toUpperCase(),
                        }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          txtLotNo_TextChanged();
                        }
                      }}
                    ></TextField>
                  </TableCell>
                  <TableCell>
                    <Button
                      className="Bt_ibtBack"
                      disabled={ibtLotBack.disabled}
                      onClick={ibtLotBack_Click}
                    >
                      <BackspaceIcon />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography> Magazine :</Typography>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <TextField
                      id="txtMagNo_ScanConfirmMagazineP1_focus"
                      className="input_txt"
                      size="small"
                      fullWidth
                      autoComplete="off"
                      disabled={txtMagNo.disabled}
                      style={txtMagNo.style}
                      value={txtMagNo.value}
                      onChange={(e) => {
                        setTxtMagNo((prevState) => ({
                          ...prevState,
                          value: e.target.value.toUpperCase(),
                        }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          txtMagNo_TextChanged();
                        }
                      }}
                    ></TextField>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      disabled={ibtExcel.disabled}
                      startIcon={
                        <Avatar
                          variant="square"
                          src={excel}
                          sx={{ width: 18, height: 18 }}
                        />
                      }
                      onClick={ibtExcel_Click}
                      sx={{
                        textTransform: "none",
                        border: "1px solid #B7B7B7",
                        color: "black",
                        padding: "2px 4px",
                        marginLeft: "20px",
                      }}
                    >
                      Export
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell align="right">
                    <Typography>Product :</Typography>
                  </TableCell>

                  <TableCell colSpan={3}>
                    <Grid container alignItems="center">
                      <Grid xs={6} xd={6}>
                        <Typography
                          variant="body1"
                          style={{
                            width: "100%",
                            color: "#006699",
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "20px",
                          }}
                        >
                          {lblProduct.value}
                        </Typography>
                      </Grid>
                      <Grid xs={6} xd={6}>
                        <Typography
                          variant="body1"
                          style={{
                            width: "100%",
                            color: "yellow",
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "20px",
                          }}
                        >
                          {lblTotalPcs.value}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {lblResult.visble && (
              <Paper
                elevation={3}
                className={
                  lblResult.value == "OK" ? "ResultSuccess" : "ResultError"
                }
                style={{
                  marginTop: "5px",
                  height: "200px",
                 
                }}
                // className="ManglblLog"
                // style={{
                //   width: "600px",
                //   backgroundColor:
                //     lblResult.value == "OK" ? "#059212" : "#BA0900",
                // }}
              >
                <Typography
                  variant="h6"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "70px",

                    color: "#ffffff",
                  }}
                >
                  {lblResult.value}
                </Typography>
              </Paper>
            )}
            {/* 200784420 */}
            {/* <Paper
                elevation={3}
                className="ManglblLog"
                style={{
                  width: "50%",
                  color: lblResult.value == "OK" ? "#059212" : "#FF0066",
                }}
              >
                {lblResult.value}
              </Paper> */}
          </Grid>
        </Grid>
      </Box>
      {/* </Card> */}
    </div>
  );
}

export default ScanConfirmMagazineP1;
