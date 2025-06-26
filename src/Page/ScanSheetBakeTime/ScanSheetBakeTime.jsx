import React, { useEffect } from "react";
import Hearder from "../Header/Header";
import fn_ScanSheetBakeTime from "./fn_ScanSheetBakeTime";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button as MuiBtn,
  TableHead,
  Paper,
  Card,
} from "@mui/material";
import { Button } from "antd";
import { fn_Homepage } from "../Homepage/fn_Homepage";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSheetBakeTime.css";
import "../Common/StyleCommon.css";
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
  const { menuName } = fn_Homepage();
  return (
    <>
      <Hearder />
      <div style={{ marginTop: "80px" }} />
      <Table className="TableMainBaking" component={Card}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3}>
              {menuName || "Baking Record Time"}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell id="lbltxtBaking">Reference Process:</TableCell>
            <TableCell className="CelltxtFieldbaging">
              <input
                className="txtFileBaking"
                id="txtProcess"
                // style={{ width: "220px" }}
                disabled={txtProcessState.disabled}
                sx={txtProcessState.styled}
                onChange={(e) => {
                  setTxtProcess(e.target.value.trim());
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTxtProcess_Change();
                  }
                }}
                value={txtProcess}
              ></input>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell id="lbltxtBaking">Baking Machine:</TableCell>
            <TableCell className="CelltxtFieldbaging">
              <input
                className="txtFileBaking"
                id="txtMCNo"
                disabled={txtmcState.disabled}
                sx={txtmcState.styled}
                onChange={(e) => {
                  setTxtmc(e.target.value.trim());
                }}
                // onBlur={handleTxtmc_Change}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTxtmc_Change();
                  }
                }}
                value={txtmc}
              ></input>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell id="lbltxtBaking">Lot No.:</TableCell>
            <TableCell className="CelltxtFieldbaging">
              <input
                id="txtLotNo"
                className="txtFileBaking"
                disabled={txtLotNoState.disabled}
                sx={txtLotNoState.styled}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTxtLotNo_Change();
                  }
                }}
                onChange={(e) => {
                  setTxtLotNo(e.target.value.trim());
                }}
                value={txtLotNo}
              ></input>
            </TableCell>
            <TableCell>
              <MuiBtn onClick={ibtback_click}>
                <BackspaceIcon />
              </MuiBtn>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell id="lbltxtBaking">Product Name:</TableCell>
            <TableCell className="CelltxtFieldbaging">
              <input
                className="txtFileBaking"
                id="lblProductName"
                // className="txtField"
                style={{ backgroundColor: "#e0e0e0" }}
                disabled={true}
                value={lblProductName}
              ></input>
            </TableCell>
            {/* <TableCell colSpan={3}>{lblProductName}</TableCell> */}
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell id="lbltxtBaking">Sheet No.:</TableCell>
            <TableCell className="CelltxtFieldbaging">
              <input
                className="txtFileBaking"
                id="txtSheetNo"
                style={{ width: "280px" }}
                disabled={txtSheetNoState.disabled}
                sx={txtSheetNoState.styled}
                onChange={(e) => {
                  setTxtSheetNo(e.target.value.trim().toUpperCase());
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleTxtSheetNo_Change();
                  }
                }}
                value={txtSheetNo}
              ></input>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} sx={{ textAlign: "center" }} id="lblSheet">
              {lblSheet}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {PnlShowresult && (
        <div className="pnlResultBaking">
          <Table
            id={
              lblResult.text == "NG"
                ? "TableResultBakingred"
                : "TableResultBaking"
            }
            component={Card}
            style={{ height: "180px" }}
          >
            <TableRow>
              <TableCell
                id="lblResult"
                sx={{
                  fontSize: "60px",
                  padding: "0px",
                  color: lblResult.styled,
                  backgroundColor: lblResult.backgroundColor,
                }}
              >
                {lblResult.text}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                id="lblRemark"
                sx={{
                  fontSize: "34px",
                  padding: "0px",
                  whiteSpace: "pre-line",
                  color: lblRemark.color,
                  background:
                    lblRemark.text === "" ? "white" : lblRemark.backgroundColor,
                }}
              >
                {lblRemark.text}
              </TableCell>
            </TableRow>
          </Table>
        </div>
      )}
      {PnlShowresult && pnlSaveState && (
        <div className="pnlSaveBaking">
          <Table id="TableSaveBaking" component={Paper}>
            <TableRow>
              <TableCell>
                <Button
                  id="btnReplace"
                  className="ButtonReplace"
                  size="middle"
                  onClick={btnReplace}
                >
                  Replace
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  id="btnDelete"
                  className="ButtonDelete"
                  size="middle"
                  onClick={btnDelete}
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  id="btnCancel"
                  className="ButtonCancel"
                  size="middle"
                  onClick={btnCancel}
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          </Table>
        </div>
      )}
    </>
  );
}

export default ScanSheetBakeTime;
