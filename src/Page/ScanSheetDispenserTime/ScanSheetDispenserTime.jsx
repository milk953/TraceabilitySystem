import React, { useEffect } from "react";
import Hearder from "../Header/Hearder";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSheetDispenserTime.css";
import { fn_ScanSheetDispenserTime } from "./fn_ScanSheetDispenserTime";
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
function ScanSheetDispenserTime() {
  const {
    pnlSaveState,
    btnReplace_Click,
    btnDelete_Click,
    btnCancel_Click,
    ibtback_Click,
    lblResult,
    lblRemark,
    lblSheet,
    btnReturn_Click,
    txtmcNo,
    setTxtmcNo,
    txtSheetNo,
    setTxtSheetNo,
    txtCBno,
    setTxtCBno,
    Fctxtmcno,
    FctxtSheetNo,
    FctxtCBno,
    txtCBnoState,
    txtSheetNoState,
    txtmcNoState,
  } = fn_ScanSheetDispenserTime();
  useEffect(() => {
    if (txtmcNo == "" && txtmcNoState.focused == true) {
      Fctxtmcno.current.focus();
    }
  }, [txtmcNoState,txtmcNo]);
  return (
    <div>
      <Hearder />
      <h1>ScanSheetDispenserTime</h1>
      <div className="DispenserpnlMain">
        <Table id="DispenserTableMain" component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>Reflow - Dispenser Control Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell id="Dispenserlbltxt">Machine/Line:</TableCell>
              <TableCell>
                <TextField
                  size="small"
                  className="DispensertxtField"
                    disabled={txtmcNoState.disabled}
                    sx={txtmcNoState.styled}
                  inputRef={Fctxtmcno}
                  //   onBlur={handleTxtMcNo}
                  onChange={(e) => {
                    setTxtmcNo(e.target.value);
                  }}
                  value={txtmcNo}
                ></TextField>
              </TableCell>
              <TableCell>
                <Button onClick={ibtback_Click}>
                  {" "}
                  <BackspaceIcon />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell id="Dispenserlbltxt">Sheet No.:</TableCell>
              <TableCell>
                <TextField
                  size="small"
                  className="DispensertxtField"
                  //   disabled={txtSheetNoState.disabled}
                  //   sx={txtSheetNoState.styled}
                  //   onBlur={handleTxtSheetNo}
                  inputRef={FctxtSheetNo}
                  value={txtSheetNo}
                  onChange={(e) => {
                    setTxtSheetNo(e.target.value);
                  }}
                ></TextField>
              </TableCell>

              <TableCell></TableCell>
            </TableRow>
            {console.log(txtCBnoState, "txtCBno")}
            {txtCBnoState.open  && <TableRow>
              <TableCell id="Dispenserlbltxt">CB No.</TableCell>
              <TableCell>
                <TextField
                  size="small"
                  className="DispensertxtField"
                  //   disabled={txtSheetNoState.disabled}
                  //   onBlur={handleTxtSheetNo}
                  //   sx={txtSheetNoState.styled}
                  inputRef={FctxtCBno}
                  value={txtCBno}
                  onChange={(e) => {
                    setTxtCBno(e.target.value);
                  }}
                ></TextField>
              </TableCell>
              <TableCell></TableCell>
            </TableRow> }
            <TableRow>
              <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                {lblSheet}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="DispenserpnlResult">
        <Table id="DispenserTableResult" component={Paper}>
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
        <div className="DispenserpnlSave">
          <Table id="DispenserTableSave" component={Paper}>
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
        <Button sx={{ fontSize: "11px" }} onClick={btnReturn_Click}>
          {" "}
          Return to Menu
        </Button>
      </div>
    </div>
  );
}

export default ScanSheetDispenserTime;
