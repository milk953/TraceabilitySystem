import React, { useEffect, useState } from "react";
import { fn_ScanSheetOvenTime } from "./fn_ScanSheetOvenTime";
import Hearder from "../Header/Header";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  TableHead,
  Paper,
} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSheetOvenTime.css";
function ScanSheetOvenTime() {
  const {
    btnIbtback_Click,
    txtmcNo,
    txtSheetNo,
    lblSheet,
    lblResult,
    lblRemark,
    FctxtmcNo,
    FctxtSheetNo,
    setTxtmcNo,
    setTxtSheetNo,
    txtmcNoState,
    txtSheetNoState,
    handleTxtMcNo,
    handleTxtSheetNo
  } = fn_ScanSheetOvenTime();
  useEffect(() => {

    if (txtmcNo == "" && txtmcNoState.styled.focus == true) {
      FctxtmcNo.current.focus();
    }if (txtSheetNo == "" && txtSheetNoState.styled.focus == true) {
      FctxtSheetNo.current.focus();
    }
  }, [txtmcNoState,txtSheetNoState]);
  return (
    <div>
      <Hearder />
      <h1>123</h1>
      <div className="pnlMainOvenTime">
        <Table id="TableMainOvenTime" component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} rowSpan={3}>
                Dispenser - UV cure/Thermal cure <br /> Control Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell id="lbltxt">Machine/Line:</TableCell>
              <TableCell>
                <TextField
                  size="small"
                  className="txtField"
                  disabled={txtmcNoState.styled.disabled}
                  sx={txtmcNoState.styled}
                  inputRef={FctxtmcNo}
                  onChange={(e) => {
                    setTxtmcNo(e.target.value);
                  }}
                  onBlur={handleTxtMcNo}
                  value={txtmcNo}
                ></TextField>
              </TableCell>
              <TableCell>
                <Button onClick={btnIbtback_Click}>
                  {" "}
                  <BackspaceIcon />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell id="lbltxt">Sheet No.:</TableCell>
              <TableCell>
                <TextField
                  size="small"
                  className="txtField"
                  disabled={txtSheetNoState.styled.disabled}
                  sx={txtSheetNoState.styled}
                  value={txtSheetNo}
                  inputRef={FctxtSheetNo}
                  onChange={(e) => {
                    setTxtSheetNo(e.target.value);
                  }}
                    onBlur={handleTxtSheetNo}
                ></TextField>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                {lblSheet.text}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="pnlResult">
        <Table id="TableResult" component={Paper}>
          <TableRow>
            <TableCell
              sx={{ fontSize: "60px", padding: "0px", color: lblResult.styled }}
            >
              {lblResult.text}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontSize: "34px", padding: "0px" ,color:lblRemark.styled}}>
              {lblRemark.text}
            </TableCell>
          </TableRow>
        </Table>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}
      >
        <Button sx={{ fontSize: "11px" }}> Return to Menu</Button>
      </div>
    // </div>
  );
}

export default ScanSheetOvenTime;
