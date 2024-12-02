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
  Card,
} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSheetBakeTime.css";
import { TableView } from "@mui/icons-material";
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
    ibtback_click,
    PnlShowresult,
  } = fn_ScanSheetBakeTime();

  return (
    <>
      <Hearder />
      <h1>Baking Time</h1>
      <Table id="TableMainBaking" component={Card}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3}>Baking Record Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell id="lbltxtBaking">Reference Process::</TableCell>
            <TableCell className="CelltxtFieldbaging">
              <TextField
                size="small"
                className="txtFieldBaking"
                id="txtProcessBaking"
                // style={{ width: "220px" }}
                disabled={txtProcessState.disabled}
                sx={txtProcessState.styled}
                onChange={(e) => {
                  setTxtProcess(e.target.value);
                }}
                inputRef={FctxtProcess}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTxtProcess_Change();
                  }
                }}

                value={txtProcess}
              ></TextField>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell id="lbltxtBaking">Baking Machine:</TableCell>
            <TableCell className="CelltxtFieldbaging">
              <TextField
                size="small"
                // className="txtField"
                id="txtMcBaking"
                style={{ width: "280px" }}
                disabled={txtmcState.disabled}
                sx={txtmcState.styled}
                inputRef={Fctxtmc}
                onChange={(e) => {
                  setTxtmc(e.target.value);
                }}
                // onBlur={handleTxtmc_Change}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTxtmc_Change();
                  }
                }}
                value={txtmc}
              ></TextField>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell id="lbltxtBaking">Lot No.:</TableCell>
            <TableCell className="CelltxtFieldbaging">
              <TextField
                size="small"
                id="txtLotNoBaking"
                // className="txtField"
                style={{ width: "280px" }}
                disabled={txtLotNoState.disabled}
                sx={txtLotNoState.styled}
                inputRef={FctxtLotNo}
                // onBlur={handleTxtLotNo_Change}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTxtLotNo_Change();
                  }
                }}
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
            <TableCell className="CelltxtFieldbaging">
              <TextField
              
                size="small"
                // className="txtField"
                style={{ width: "280px", backgroundColor: "lightgray" }}
                disabled={true}
                value={lblProductName}
              ></TextField>
            </TableCell>
            {/* <TableCell colSpan={3}>{lblProductName}</TableCell> */}
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell id="lbltxtBaking">Sheet No.:</TableCell>
            <TableCell className="CelltxtFieldbaging">
              <TextField
                size="small"
                // className="txtField"
                id="txtSheetNoBaking"
                style={{ width: "280px" }}
                disabled={txtSheetNoState.disabled}
                sx={txtSheetNoState.styled}
                inputRef={FctxtSheetNo}
                onChange={(e) => {
                  setTxtSheetNo(e.target.value.toUpperCase());
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTxtSheetNo_Change();
                  }
                }}
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
      &nbsp;
       {PnlShowresult && (       
      <div className="pnlResultBaking">
        <Table id={lblResult.text == "NG" ? "TableResultBakingred" : "TableResultBaking"} component={Card} style={{ height: '180px' }} >
          <TableRow >
            <TableCell
              sx={{ fontSize: "60px", padding: "0px", color: lblResult.styled,backgroundColor:lblResult.backgroundColor}}
            >
              {lblResult.text}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontSize: "34px", padding: "0px" ,whiteSpace: "pre-line" ,color:lblRemark.color,background:lblRemark.backgroundColor}} >
              {lblRemark.text}
            </TableCell>
          </TableRow>
        </Table>
      </div>
      )}  
      { PnlShowresult && pnlSaveState && (
        <div className="pnlSaveBaking">
          <Table id="TableSaveBaking" component={Paper}>
            <TableRow>
              <TableCell>
                <Button variant="contained" className="ButtonReplace" onClick={btnReplace}>Replace</Button>
              </TableCell>
              <TableCell>
                <Button variant="contained" className="ButtonDelete" onClick={btnDelete}>Delete</Button>
              </TableCell>
              <TableCell>
                <Button variant="contained" className="ButtonCancel" onClick={btnCancel}>Cancel</Button>
              </TableCell>
            </TableRow>
          </Table>
        </div>
      )}
    </>
  );
}

export default ScanSheetBakeTime;
