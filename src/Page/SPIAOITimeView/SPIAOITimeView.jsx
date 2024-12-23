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
import "./SPIAOITimeView.css";
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../Common/StyleCommon.css";
import { fn_SPIAOITimeView } from "../SPIAOITimeView/fn_SPIAOITimeView";
import { fn_Homepage } from "../Homepage/fn_Homepage";
function SPIAOITimeView() {
  const {
    btnRetrive,
    columns,
    gvData,
    btnRetrive_Click,
    txtSPIMCNo,
    setTxtSPIMCNo,
    txtAOIMCNo,
    setTxtAOIMCNo,
  } = fn_SPIAOITimeView();
  const { menuName } = fn_Homepage();
  return (
    <div>
      <Hearder />
      <div className="Center_Layout"></div>
      <div className="SPIAOITimeViewTableFirst">
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
              <TableCell sx={{ textAlign: "right" }}>SPI Machine :</TableCell>
              <TableCell sx={{ width: "60%" }}>
                <TextField
                  size="small"
                  className="input_txt"
                  style={{ width: "100%" }}
                  disabled={txtSPIMCNo.disbled}
                  fullWidth
                  autoComplete="off"
                  value={txtSPIMCNo.value}
                  onChange={(e) => {
                    setTxtSPIMCNo((prevState) => ({
                      ...prevState,
                      value: e.target.value,
                    }));
                  }}
                />
              </TableCell>
              <TableCell
                rowSpan={2}
                sx={{ verticalAlign: "middle", textAlign: "center" }}
              >
                <Button
                  style={{
                    height: "30px",
                    backgroundColor: "#F0F0F0",
                    padding: "0px",
                    color: "#000000",
                    border: "0px solid #000000",
                    boxShadow:
                      "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                  onClick={btnRetrive_Click}
                >
                  <TableRow>
                    <TableCell
                      align="center"
                      style={{
                        width: "125px",
                        height: "30px",
                        padding: "0px",
                        border: "0px",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "20px",
                          height: "30px",
                          alignContent: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {btnRetrive.value}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ textAlign: "right" }}>AOI Machine :</TableCell>
              <TableCell sx={{ width: "60%" }}>
                <TextField
                  size="small"
                  className="input_txt"
                  style={{ width: "100%" }}
                  fullWidth
                  autoComplete="off"
                  value={txtAOIMCNo.value}
                  disabled={txtAOIMCNo.disbled}
                  onChange={(e) => {
                    setTxtAOIMCNo((prevState) => ({
                      ...prevState,
                      value: e.target.value,
                    }));
                  }}
                />
              </TableCell>
            </TableRow>

            {/* <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={12} align="center"></Grid>
                <Grid item xs={1} md={1} align="center"></Grid>
                <Grid item xs={8} md={8} align="center">
                  <Table
                    component={Card}
                    className="ChangeSpiaoitimeview"
                    style={{ width: "100%", boxShadow: "0px" }}
                  >
                    <TableBody>
                      <TableRow>
                        <TableCell
                          align="right"
                          style={{
                            width: "150px",
                            backgroundColor: "#008000",
                            color: "#ffffff",
                          }}
                        >
                          <Typography>SPI Machine :</Typography>
                        </TableCell>
                        <TableCell colSpan={2}>
                          <TextField
                            size="small"
                            className="input_txt"
                            style={{ width: "100%" }}
                            disabled={txtSPIMCNo.disbled}
                            fullWidth
                            autoComplete="off"
                            value={txtSPIMCNo.value}
                            onChange={(e) => {
                              setTxtSPIMCNo((prevState) => ({
                                ...prevState,
                                value: e.target.value,
                              }));
                            }}
                            // onKeyDown={(e) => {
                            //   if (e.key === "Enter") {
                            //     btnRetrive_Click();
                            //   }
                            // }}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          align="right"
                          style={{
                            width: "150px",
                            backgroundColor: "#008000",
                            color: "#ffffff",
                            marginTop: "10px",
                          }}
                        >
                          <Typography>AOI Machine :</Typography>
                        </TableCell>
                        <TableCell colSpan={2}>
                          <TextField
                            size="small"
                            className="input_txt"
                            style={{ width: "100%" }}
                            fullWidth
                            autoComplete="off"
                            value={txtAOIMCNo.value}
                            disabled={txtAOIMCNo.disbled}
                            onChange={(e) => {
                              setTxtAOIMCNo((prevState) => ({
                                ...prevState,
                                value: e.target.value,
                              }));
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <Grid item xs={2} md={2} align="center">
                  <Button
                    style={{
                      height: "30px",
                      backgroundColor: "#F0F0F0",
                      padding: "0px",
                      color: "#000000",
                      border: "0px solid #000000",
                      boxShadow:
                        "0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease",
                    }}
                    onClick={btnRetrive_Click}
                  >
                    <TableRow>
                      <TableCell
                        align="center"
                        style={{
                          width: "125px",
                          height: "30px",
                          padding: "0px",
                          border: "0px",
                        }}
                      >
                        <Typography
                          style={{
                            fontSize: "20px",
                            height: "30px",
                            alignContent: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {btnRetrive.value}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </Button>
                </Grid>
                <Grid item xs={1} md={1} align="center"></Grid>
                <Grid item xs={12} md={12} align="center"></Grid>
              </Grid>
            </Box> */}
          </TableBody>
        </Table>
      </div>
      {gvData.visble && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: "5px",
          }}
        >
          <AntTable
            columns={columns}
            dataSource={gvData.value}
            pagination={false}
            size="small"
            bordered
            style={{ height: "100%", width: "93%", padding: "0px" }}
          />
        </div>
      )}
    </div>
  );
}

export default SPIAOITimeView;
