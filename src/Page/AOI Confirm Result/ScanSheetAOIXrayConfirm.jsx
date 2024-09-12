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
// import { fn_ScanSheetAOIXrayConfirm } from "../AOI Confirm Result/fn_ScanSheetAOIXrayConfirm";
function ScanSheetMOTTime() {
  // const {

  // } = fn_ScanSheetAOIXrayConfirm();

  return (
    <div>
      <Hearder />
      <h1>AOI Confirm Result</h1>
      <Card component={Paper} className="Card-Common">

        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
       
          <Grid container spacing={2}>
            <Grid item xs={10} md={12} align='center'>
            <Table component={Card} className="AOIConfirmResult" style={{width:'50%'}}>
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
              <TableCell >
                <TextField
                  className="input_txt"
                  fullWidth
                  // value={txtTotalPcs}
                  // onChange={(e) => {
                  //   settxtTotalPcs(e.target.value)
                  // }}
                  // onKeyDown={(e) => {
                  //   if (e.key === "Enter") {
                  //     txtTotalPcs_TextChanged();
                  //   }
                  // }}
                  // onBlur={txtTotalPcs_TextChanged}

                />
              </TableCell>
              <TableCell><BackspaceIcon style={{marginLeft:'10px'}}/></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} style={{height:'40px'}} align="center">
                  <b style={{fontSize:'18px'}}>lblSheet</b>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} style={{height:'300px'}} align="center">
                  <b style={{fontSize:'60px'}}>lblSheet</b><br/>  
                  <b style={{fontSize:'20px'}}>lblRemark</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>


            </Grid>

          </Grid>
        </Box>
      </Card>
      {/* </Card> */}
    </div>
  );
}

export default ScanSheetMOTTime;
