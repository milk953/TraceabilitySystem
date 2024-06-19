import React, { useEffect } from "react";
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
import "./ScanSheetReflowTime.css";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Hearder from "../Header/Hearder";
import { fn_ScanSheetReflowTime } from "./fn_ScanSheetReflowTime";
import HomeIcon from "@mui/icons-material/Home";
function ScanSheetReflowTime() {
  const {
    txtmcNo,
    txtSheetNo,
    lblSheet,
    lblResult,
    lblRemark,
    CompanyCode,
    Product_type,
    handleTxtMcNo,
    txtmcNoState,
    txtSheetNoState,
    handleTxtSheetNo,
    pnlSaveState,
    FctxtmcNo,
    FctxtSheetNo,
    setTxtmcNo,
    setTxtSheetNo,
    btnCancel_Click,
    btnReplace_Click,
    btnDelete_Click,
    btnIbtback_Click,
  } = fn_ScanSheetReflowTime();
  useEffect(() => {
    console.log(txtSheetNoState.state, "txtmcNoState");
    if (txtSheetNoState.state == true && txtSheetNo == "") {
      FctxtSheetNo.current.focus();
    }
    if (txtmcNo == "") {
      FctxtmcNo.current.focus();
    }
  }, [txtSheetNoState, txtSheetNo, txtmcNo]);
  return (
    <div>
      <Hearder />
      <h1>123</h1>
        <div className="pnlMain">
          <Table id="TableMain" component={Paper}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={3}>Reflow Control Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell id="lbltxt">Machine/Line:</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    className="txtField"
                    disabled={txtmcNoState.disabled}
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
                    disabled={txtSheetNoState.disabled}
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
                  {lblSheet}
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
            <TableCell sx={{ fontSize: "34px", padding: "0px" }}>
              {lblRemark}
            </TableCell>
          </TableRow>
        </Table>
      </div>
      {pnlSaveState && (
        <div className="pnlSave">
          <Table id="TableSave" component={Paper}>
            <TableRow>
              <TableCell>
                <Button onClick={btnReplace_Click}>Replace</Button>
              </TableCell>
              <TableCell>
                <Button onClick={btnDelete_Click}>Delete</Button>
              </TableCell>
              <TableCell>
                <Button onClick={btnCancel_Click}>Cancel</Button>
              </TableCell>
            </TableRow>
          </Table>
        </div>
      )}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}
      >
        <Button sx={{ fontSize: "11px" }}> Return to Menu</Button>
      </div>
    </div>
  );
}

export default ScanSheetReflowTime;
