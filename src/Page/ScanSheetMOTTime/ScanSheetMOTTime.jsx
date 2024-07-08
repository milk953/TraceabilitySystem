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
} from "@mui/material";
import "/src/Page/ScanSheetMOTTime/ScanSheetMOTTime.css";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

import Hearder from "../Header/Hearder";
import { fn_ScanSheetMOTTime } from "./fn_ScanSheetMOTTime";
function ScanSheetMOTTime() {
  const {
    txtLotNo_TextChanged,
    settxtlot,
    txtlot,
    lblProductName,
    lblResult,
    lblSheet,
    lblRemark,
    txtSheetNo_TextChanged,
    settxtSheet,
    txtSheet,
    settxtMCNo,
    txtMCNo,
    txtMCNo_TextChanged,
    fctxtMcNo,
    fctxtLotno,
    fctxtSheetNo,
    EnableLotNo,
    EnableMCNo,
    EnableSheetNo,
    BtClick_back,
    BtClick_Cancel,
    BtClick_Delete,
    BtClick_Replace,
  } = fn_ScanSheetMOTTime();

  useEffect(() => {

   
   
  }, []);
  return (
    <div>
      <Hearder />
      <h1>ScanSheetMOTTime</h1>
      <Card component={Paper} className="Card-ScanSheetMOTTime">
        <Box
          sx={{
            display: "flex",
       
            alignItems: "flex-start",
          }}
        >
          <Table
            className="TableMot1"
            component={Card}
            sx={{ width: "100%", maxWidth: "600px", minWidth:'600px'}}
          >
            <TableHead>
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography variant="h5">
                    <b>
                      Pre-Baking <ArrowRightOutlined /> MOT1 Control Time
                    </b>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="right" style={{ width: "150px" }}>
                  <Typography>MOT Machine/Line :</Typography>
                </TableCell>
                <TableCell colSpan={2}>
                  <TextField
                    size="small"
                    id="txtfild"
                    fullWidth
                    value={txtMCNo}
                    inputRef={fctxtMcNo}
                    disabled={EnableMCNo}
                    onChange={(e) => {
                      settxtMCNo(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        txtMCNo_TextChanged();
                      }
                    }}
                    onBlur={txtMCNo_TextChanged}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                  <Typography>Lot No. :</Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    id="txtfild"
                    size="small"
                    fullWidth
                    value={txtlot}
                    onChange={(e) => {
                      settxtlot(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        txtLotNo_TextChanged();
                      }
                    }}
                    inputRef={fctxtLotno}
                    disabled={EnableLotNo}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={BtClick_back}
                    variant="contained"
                    style={{ background: "#D04848" }}
                    size="small"
                  >
                    <DeleteOutlined /> | Cancel
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                  <Typography>Product Name :</Typography>
                </TableCell>
                <TableCell colSpan={2}>
                  <Typography>{lblProductName}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography align="right">Sheet No. :</Typography>
                </TableCell>
                <TableCell colSpan={2}>
                  <TextField
                    id="txtfild"
                    size="small"
                    fullWidth
                    value={txtSheet}
                    onChange={(e) => {
                      settxtSheet(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        txtSheetNo_TextChanged();
                      }
                    }}
                    inputRef={fctxtSheetNo}
                    disabled={EnableSheetNo}
                  />
                </TableCell>
              </TableRow>
              <TableRow style={{ display: lblSheet === "" ? "table-row" : "" }}>
                <TableCell colSpan={3} align="center">
                  <Card style={{ background: "#DAD3BE" }}>
                    <Typography>{lblSheet}</Typography>
                  </Card>
                </TableCell>
              </TableRow>
              <TableRow style={{ height: "180px" }}>
                <TableCell colSpan={3}>
                  <Card style={{ background: "#EFBC9B", height: "180px" }}>
                    <Typography
                      align="center"
                      style={{ marginTop: "40px", fontSize: "60px" }}
                    >
                      {lblResult}
                    </Typography>
                    <Typography align="center" style={{ fontSize: "20px" }}>
                      {lblRemark}
                    </Typography>
                  </Card>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Button variant="contained">Replace</Button> &nbsp;
                  <Button variant="contained">Delete</Button>&nbsp;
                  <Button variant="contained">Cancel</Button>&nbsp;
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <img
            style={{
              width: "540px",
              height: "400px",
              marginLeft: "10%",
            }}
            src="src/assets/1.jpg" // Import the image
            alt="Description of the image"
          />
        </Box>
      </Card>
    </div>
  );
}

export default ScanSheetMOTTime;
