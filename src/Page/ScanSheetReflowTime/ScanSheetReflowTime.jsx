import React, { useEffect } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Card,
  Button as MuiBtn,
} from "@mui/material";
import { Button } from "antd";
import "./ScanSheetReflowTime.css";
import "../Common/StyleCommon.css";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Hearder from "../Header/Header";
import { fn_ScanSheetReflowTime } from "./fn_ScanSheetReflowTime";
import { fn_Homepage } from "../Homepage/fn_Homepage";
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
    PnlShowresult,
  } = fn_ScanSheetReflowTime();
  function setFocus(id) {
    document.getElementById(id).focus();
  }
 useEffect(() => {
  const handleExternalSet = (e) => {
    const id = e.type; 
    const value = e.detail;
    switch (id) {
      case "txtMCNo":
        setTxtmcNo(value);
        break;
      case "txtSheetNo":
        setTxtSheetNo(value);
        break;
    }
  };

  const fields = ["txtMCNo", "txtSheetNo"]; 

  fields.forEach((field) => window.addEventListener(field, handleExternalSet));
  return () => {
    fields.forEach((field) => window.removeEventListener(field, handleExternalSet));
  };
}, []);


  useEffect(() => {
    if (txtSheetNoState.state == true && txtSheetNo == "") {
      setFocus("txtSheetNo");
    }
    if (txtmcNo == "") {
      setFocus("txtMCNo");
    }
  }, [txtSheetNoState, txtSheetNo, txtmcNo]);
  const { menuName } = fn_Homepage();
  return (
    <div>
      <Hearder />
      <div style={{ marginTop: "80px" }}></div>
      <div className="pnlMain">
        <Table id="TableMain" component={Card}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>{menuName}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell id="lbltxt">Machine/Line:</TableCell>
              <TableCell>
                <TextField
                  size="small"
                  className="txtFieldReflow"
                  id="txtMCNo"
                  disabled={txtmcNoState.disabled}
                  sx={txtmcNoState.styled}
                  inputRef={FctxtmcNo}
                  onChange={(e) => {
                    setTxtmcNo(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleTxtMcNo();
                    }
                  }}
                  value={txtmcNo}
                ></TextField>
              </TableCell>
              <TableCell>
                <MuiBtn id="ibtback" onClick={btnIbtback_Click}>
                  <BackspaceIcon />
                </MuiBtn>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell id="lbltxt">Sheet No.:</TableCell>
              <TableCell>
                <TextField
                  size="small"
                  id="txtSheetNo"
                  className="txtFieldReflow"
                  disabled={txtSheetNoState.disabled}
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
              <TableCell
                colSpan={3}
                sx={{ textAlign: "center", fontSize: "14px" }}
                id="lblSheet"
              >
                {lblSheet}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {PnlShowresult && (
        <div className="pnlResult">
          <Table
            id={
              lblResult.text == "NG"
                ? "TableResultReflowred"
                : "TableResultReflow"
            }
            component={Card}
          >
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "60px",
                  padding: "0px",
                  color: lblResult.styled?.color || "defaultColor",
                  background:
                    lblResult.styled?.background || "defaultBackground",
                }}
                id="lblResult"
              >
                {lblResult.text}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: "34px",
                  padding: "0px",

                  color: lblRemark.styled?.color || "defaultColor",
                  background:
                    lblRemark.styled?.background || "defaultBackground",
                  border: lblRemark.styled?.border || "defaultBorder",
                  whiteSpace: "pre-line",
                }}
                id="lblRemark"
              >
                {lblRemark.text}
              </TableCell>
            </TableRow>
          </Table>
        </div>
      )}
      {pnlSaveState && (
        <div className="pnlSave">
          <Table id="TableSave" component={Card}>
            <TableRow>
              <TableCell>
                <Button
                  variant="contained"
                  id="btnReplace"
                  className="ButtonReplace"
                  size="middle"
                  onClick={btnReplace_Click}
                >
                  Replace
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  id="btnDelete"
                  className="ButtonDelete"
                  size="middle"
                  onClick={btnDelete_Click}
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  id="btnCancel"
                  className="ButtonCancel"
                  size="middle"
                  onClick={btnCancel_Click}
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          </Table>
        </div>
      )}
    </div>
  );
}

export default ScanSheetReflowTime;
