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
import "./ScanConfirmMagazineP1.css";
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { FileExcelTwoTone, FileExcelFilled } from "@ant-design/icons";
import { Avatar } from "antd";
import "../Common/StyleCommon.css";
import { fn_ScanConfirmMagazineP1 } from "../ScanConfirmMagazineP1/fn_ScanConfirmMagazineP1";

function ScanConfirmMagazineP1() {
  const {} = fn_ScanConfirmMagazineP1();
  return (
    <div>
      <Hearder />
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} align="center">
              <Table
                className="ScanSMT"
                component={Paper}
                style={{ width: "50%" }}
              >
                <TableHead>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="h6">Confirm Magazine No.</Typography>
                  </TableCell>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      <Typography> Operator :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        id="txtLot_ScanSMTConnectRollConfirm_focus"
                        className="input_txt"
                        size="small"
                        fullWidth
                        // disabled={txtLot.disbled}
                        // style={txtLot.style}
                        // value={txtLot.value}
                        // onChange={(e) => {
                        //   setTxtLot((prevState) => ({
                        //     ...prevState,
                        //     value: e.target.value,
                        //   }));
                        // }}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     txtLot_TextChanged();
                        //   }
                        // }}
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
                      <Typography> Lot No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        id="txtLot_ScanSMTConnectRollConfirm_focus"
                        className="input_txt"
                        size="small"
                        fullWidth
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
                      <Typography> Magazine :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        id="txtLot_ScanSMTConnectRollConfirm_focus"
                        className="input_txt"
                        size="small"
                        fullWidth
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <Button className="Bt_ibtBack">
                        <FileExcelFilled
                          style={{
                            fontSize: "24px",
                            color: "green",
                          }}
                        />
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="right">
                      <Typography>Product :</Typography>
                    </TableCell>

                    <TableCell colSpan={3}>
                      <Grid container  alignItems="center">
                        <Grid xs={6} xd={6}>
                          <Typography
                            variant="body1"
                            style={{
                              width: "100%",
                              color: "#FF0066",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {10}
                          </Typography>
                        </Grid>
                        <Grid xs={6} xd={6}>
                          <Typography
                            variant="body1"
                            style={{
                              width: "100%",
                              color: "#FF0066",
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {10}
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* {lblpnlLog.visble == true && (
                <Paper elevation={3} className="Card-lblLog">
                  {lblpnlLog.value}
                </Paper>
              )} */}
                    
                <Paper elevation={3} className="Card-lblLog"  style={{ width: "50%" }}>
                  {10}
                </Paper>
          
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default ScanConfirmMagazineP1;
