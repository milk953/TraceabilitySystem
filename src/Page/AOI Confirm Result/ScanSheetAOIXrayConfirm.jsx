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

import "./AOIXrayConfirm.css";
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../Common/StyleCommon.css";
import { fn_ScanSheetAOIXrayConfirm } from "../AOI Confirm Result/fn_ScanSheetAOIXrayConfirm";
import { fn_Homepage } from "../Homepage/fn_Homepage";
function ScanSheetMOTTime() {
  const { menuName } = fn_Homepage();
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
          <Grid className="Center_Layout">
            <Grid >
              <Table
                component={Card}
                className="Header_Center"
              
              >
                <TableHead >
                  <TableRow>
                    <TableCell
                      colSpan={3}
                    >
                    {menuName}
                      {/* AOI Confirm Result */}
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
                          settxtSheetNo(e.target.value.trim().toUpperCase());
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
                      {/* <BackspaceIcon
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={ibt_back}
                      /> */}
                         <Button type="text" onClick={ibt_back}>
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow style={{display: lblResult === '' ? 'none' : '',}}>
                    <TableCell
                      colSpan={3}
                      style={{ height: "40px",fontSize: "16px", }}
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
                      style={{ height: "300px", padding: "0" ,border: 0}}
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
                        <Typography
                          style={{
                            fontSize: "80px",
                            color: "#fff",
                          }}
                        >
                          {lblResult}
                        </Typography>

                        <Typography style={{ fontSize: "25px", color: "#fff" }}>
                          <span
                            dangerouslySetInnerHTML={{ __html: lblRemark }}
                          />
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        {/* </Box> */}
      {/* </Card> */}
      {/* </Card> */}
    </div>
  );
}

export default ScanSheetMOTTime;
