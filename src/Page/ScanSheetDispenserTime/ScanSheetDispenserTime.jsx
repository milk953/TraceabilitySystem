import React, { useEffect } from "react";
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSheetDispenserTime.css";
import "../Common/StyleCommon.css";
import { fn_ScanSheetDispenserTime } from "./fn_ScanSheetDispenserTime";
import { fn_Homepage } from "../Homepage/fn_Homepage";
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

function ScanSheetDispenserTime() {
  const { menuName } = fn_Homepage();
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
    txtMcno_change,
    txtSheetno_change,
    handleCbNoChange,
    txtCbno_change,
    pnlResultState
  } = fn_ScanSheetDispenserTime();
  useEffect(() => {
    if (txtmcNo == "" && txtmcNoState.focused == true) {
      Fctxtmcno.current.focus();
    } else if (txtSheetNo == "" && txtSheetNoState.focused == true) {
      FctxtSheetNo.current.focus();
    } else if (txtCBno == "" && txtCBnoState.focused == true) {
      FctxtCBno.current.focus();
    }
  }, [
    txtmcNoState,
    txtmcNo,
    txtSheetNoState,
    txtSheetNo,
    txtCBnoState,
    txtCBno,
  ]);
  return (
    <div>
      <Hearder />
      {/* <h1>ScanSheetDispenserTime</h1> */}
      <div style={{marginTop:'80px'}}></div>
      <div className="DispenserpnlMain">
        <Table id="DispenserTableMain" component={Card}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>{menuName || 'Dispenser Control Time'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell id="Dispenserlbltxt">Machine/Line:</TableCell>
              <TableCell>
                <TextField
                  size="small"
                  className="DispensertxtField"
                  id='txtMcnoDispenser'
                  disabled={txtmcNoState.disabled}
                  sx={txtmcNoState.styled}
                  inputRef={Fctxtmcno}
                  // onBlur={txtMcno_change}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      txtMcno_change();
                    }
                  }}
                  onChange={(e) => {
                    setTxtmcNo(e.target.value);
                  }}
                  value={txtmcNo}
                ></TextField>
              </TableCell>
              <TableCell>
                <MuiBtn onClick={ibtback_Click}>
                  {" "}
                  <BackspaceIcon />
                </MuiBtn>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell id="Dispenserlbltxt">Sheet No.:</TableCell>
              <TableCell>
                <TextField
                  size="small"
                  className="DispensertxtField"
                  id = "txtSheetNoDispenser"
                  disabled={txtSheetNoState.disabled}
                  sx={txtSheetNoState.styled}
                  // onBlur={txtSheetno_change}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      txtSheetno_change();
                    }
                  }}
                  inputRef={FctxtSheetNo}
                  value={txtSheetNo}
                  onChange={(e) => {
                    setTxtSheetNo(e.target.value.trim());
                  }}
                ></TextField>
              </TableCell>

              <TableCell></TableCell>
            </TableRow>
            {txtCBnoState.open && (
              <TableRow>
                <TableCell id="Dispenserlbltxt">CB No.</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    id='txtCbnoDispenser'
                    className="DispensertxtField"
                    disabled={txtCBnoState.disabled}
                    // onBlur={txtSheetno_change}                    
                    sx={txtCBnoState.styled}
                    inputRef={FctxtCBno}
                    value={txtCBno}
                    onChange={(e) => {
                      handleCbNoChange(e);
                    }}
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        txtCbno_change()
                      }
                    }}
                  ></TextField>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                {lblSheet}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      &nbsp;
      {pnlResultState && (
      <div className="DispenserpnlResult">
        <Table id={lblResult.text == "NG" ? "DispenserTableResultred" : "DispenserTableResult"} component={Card} style={{ height: '180px' }}>
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
              whiteSpace: 'pre-line',
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
      {pnlSaveState && (
        <div className="DispenserpnlSave">
          <Table id="DispenserTableSave" component={Card}>
            <TableRow>
              <TableCell>
                <Button  className="ButtonReplace"  size='middle' onClick={btnReplace_Click}>Replace</Button>
              </TableCell>
              <TableCell>
                <Button  className="ButtonDelete" size='middle' onClick={btnDelete_Click}>Delete</Button>
              </TableCell>
              <TableCell>
                <Button  className="ButtonCancel" size='middle' onClick={btnCancel_Click}>Cancel</Button>
              </TableCell>
            </TableRow>
          </Table>
        </div>
      )}
     
    </div>
  );
}

export default ScanSheetDispenserTime;
