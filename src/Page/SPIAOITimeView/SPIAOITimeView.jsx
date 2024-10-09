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

function SPIAOITimeView() {
  const {btnRetrive} = fn_SPIAOITimeView();
  return (
    <div>
      <Hearder />
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={12} align="center">
              {/* {lblMessage.value.trim() !== "" && (
                <Paper
                  className="Card-lblResult"
                  style={{
                    background: lblMessage.style,
                    backgroundColor: "#BA0900",
                    marginBottom: "10px",
                    width: "50%",
                    height: "auto",
                    display: lblMessage.visble,
                  }}
                >
                  <Typography
                    variant="h5"
                    style={{ paddingTop: "6px", color: "#fff" }}
                  >
                    {lblMessage.value}
                  </Typography>
                </Paper>
              )} */}
            </Grid>
            <Grid item xs={2} md={2} align="center"></Grid>
            <Grid item xs={6} md={6} align="center">
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
                        fullWidth
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
              { btnRetrive.value}
                    </Typography>
                  </TableCell>
                </TableRow>
              </Button>
            </Grid>
            <Grid item xs={2} md={2} align="center"></Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default SPIAOITimeView;
