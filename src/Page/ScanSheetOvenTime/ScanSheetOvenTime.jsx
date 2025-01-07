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
  Card,
} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSheetOvenTime.css";
import { fn_Homepage } from "../Homepage/fn_Homepage";
function ScanSheetOvenTime() {
  const { menuName } = fn_Homepage();
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
    handleTxtSheetNo,
    pnlResultState,
  } = fn_ScanSheetOvenTime();
  useEffect(() => {
    if (txtmcNo == "" && txtmcNoState.styled.focus == true) {
      FctxtmcNo.current.focus();
    }
    if (txtSheetNo == "" && txtSheetNoState.styled.focus == true) {
      FctxtSheetNo.current.focus();
    }
  }, [txtmcNoState, txtSheetNoState]);
  return (
    <div>
      <Hearder />
      <div style={{marginTop:'80px'}}></div>
      <div className="pnlMainOvenTime">
        <Table id="TableMainOvenTime" component={Card}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} rowSpan={3}>
              {menuName || 'UV Cure/Thermal Cure Control Time'}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell id="lbltxt">Machine/Line:</TableCell>
              <TableCell>
                <TextField
                  size="small"
                  className="txtFieldOven"
                  disabled={txtmcNoState.styled.disabled}
                  sx={txtmcNoState.styled}
                  inputRef={FctxtmcNo}
                  onChange={(e) => {
                    setTxtmcNo(e.target.value);
                  }}
                  // onBlur={handleTxtMcNo}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleTxtMcNo();
                    }
                  }}
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
                  className="txtFieldOven"
                  disabled={txtSheetNoState.styled.disabled}
                  sx={txtSheetNoState.styled}
                  value={txtSheetNo}
                  inputRef={FctxtSheetNo}
                  onChange={(e) => {
                    setTxtSheetNo(e.target.value.trim());
                  }}
                  // onBlur={handleTxtSheetNo}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleTxtSheetNo();
                    }
                  }}
                ></TextField>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                {lblSheet}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {pnlResultState && (
        <div className="pnlResultOven">
           <Table id={lblResult.text == "NG" ? "TableResultOvenTimered" : "TableResultOvenTime"} component={Card} style={{ height: '180px' }}>
            <TableRow>
              <TableCell
                 sx={{ fontSize: "60px", padding: "0px", color: lblResult.styled,backgroundColor:lblResult.backgroundColor }}
              >
                {lblResult.text}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                 sx={{ 
                  fontSize: "34px", 
                  padding: "0px",
                  color: lblRemark.color,
                  background: lblRemark.text === "" ? "white" : lblRemark.backgroundColor 
                }}
              >
                {lblRemark.text}
              </TableCell>
            </TableRow>
          </Table>
        </div>
      )}
    </div>
  );
}

export default ScanSheetOvenTime;
