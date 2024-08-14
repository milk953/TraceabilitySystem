import React, { useEffect } from "react";
import Hearder from "../Header/Header";
import fn_ScanSheetBakeTime from "./fn_ScanSheetBakeTime";
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
import "./ScanSheetBakeTime.css";
function ScanSheetBakeTime() {
  const {
    lblProductName,
    lblSheet,
    lblResult,
    lblRemark,
    //txtField
    txtProcess,
    txtmc,
    txtLotNo,
    txtSheetNo,
    setTxtProcess,
    setTxtmc,
    setTxtLotNo,
    setTxtSheetNo,
    //State
    txtProcessState,
    txtmcState,
    txtLotNoState,
    txtSheetNoState,
    pnlSaveState,
    //foucus item
    FctxtProcess,
    Fctxtmc,
    FctxtLotNo,
    FctxtSheetNo,

    //txtChange
    handleTxtProcess_Change,
    handleTxtmc_Change,
    handleTxtLotNo_Change,
    handleTxtSheetNo_Change,

    //btn
    btnDelete,
    btnCancel,
    btnReplace,
    ibtback_click
  } = fn_ScanSheetBakeTime();
  useEffect(() => {
    if (txtmcState.Focus ==true && txtmc==""){
        Fctxtmc.current.focus();
    }else if (txtLotNoState.Focus == true && txtLotNo == ""){
      FctxtLotNo.current.focus();
    }else if (txtSheetNoState.Focus == true && txtSheetNo == ""){
      FctxtSheetNo.current.focus();
    }
  }, [txtmcState,txtmcState,txtLotNoState,txtSheetNoState]);

  return (
    <>
      <Hearder />
      <h1>Baking Time</h1>
      <Table id="TableMainBaking" component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3}>Baking Record Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell id="lbltxtBaking">Reference Process::</TableCell>
            <TableCell>
              <TextField
                size="small"
                className="txtFieldBaking"
                style={{ width: "200px" }}
                disabled={txtProcessState.disabled}
                autoFocus
                sx={txtProcessState.styled}
                onChange={(e) => {
                  setTxtProcess(e.target.value);
                }}
                inputRef={FctxtProcess}
                onBlur={handleTxtProcess_Change}
                value={txtProcess}
              ></TextField>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell id="lbltxtBaking">Baking Machine:</TableCell>
            <TableCell>
              <TextField
                size="small"
                className="txtField"
                style={{ width: "350px" }}
                disabled={txtmcState.disabled}
                sx={txtmcState.styled}
                inputRef={Fctxtmc}
                onChange={(e) => {
                  setTxtmc(e.target.value);
                }}
                onBlur={handleTxtmc_Change}
                value={txtmc}
              ></TextField>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell id="lbltxtBaking">Lot No.:</TableCell>
            <TableCell>
              <TextField
                size="small"
                className="txtField"
                style={{ width: "350px" }}
                disabled={txtLotNoState.disabled}
                sx={txtLotNoState.styled}
                inputRef={FctxtLotNo}
                onBlur={handleTxtLotNo_Change}
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {
                //     handleTxtLotNo_Change();
                //   }
                // }}
                onChange={(e) => {
                  setTxtLotNo(e.target.value);
                }}
                value={txtLotNo}
              ></TextField>
            </TableCell>
            <TableCell>
              <Button onClick={ibtback_click}>
                <BackspaceIcon />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell id="lbltxtBaking">Product Name:</TableCell>
            <TableCell colSpan={3}>{lblProductName}</TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell id="lbltxtBaking">Sheet No.:</TableCell>
            <TableCell>
              <TextField
                size="small"
                className="txtField"
                style={{ width: "350px" }}
                disabled={txtSheetNoState.disabled}
                sx={txtSheetNoState.styled}
                inputRef={FctxtSheetNo}
                onChange={(e) => {
                  setTxtSheetNo(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTxtSheetNo_Change();
                  }
                }}
                // onBlur={handleTxtSheetNo_Change()}
                value={txtSheetNo}
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
      <div className="pnlResultBaking">
        <Table id="TableResultBaking" component={Paper}>
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
      <div className="pnlSaveBaking">
        <Table id="TableSaveBaking" component={Paper}>
          <TableRow>
            <TableCell>
              <Button onClick={btnReplace}>Replace</Button>
            </TableCell>
            <TableCell>
              <Button onClick={btnDelete}>Delete</Button>
            </TableCell>
            <TableCell>
              <Button onClick={btnCancel}>Cancel</Button>
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
    </>
  );
}

export default ScanSheetBakeTime;
