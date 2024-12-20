import React, { useEffect } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Card
} from "@mui/material";
import  './SheetBinCheck.css'
import Hearder from "../Header/Header";
import {fn_SheetBinCheck} from "./fn_SheetBinCheck"
import { fn_Homepage } from "../Homepage/fn_Homepage";
function ScanBinCheck() {
const {txtSheetNo,settxtSheetNo,lblSheet,lblResult,txtSheetNo_TextChanged,FctxtSht,pnlResult} =fn_SheetBinCheck()
const { menuName } = fn_Homepage();
  return (
    <div>
      <Hearder />
      <h1></h1>
   <div className="Pageshow-SheetBin">
        <div className="pnlMain1">
          <Table id="TableMain1" component={Paper}>
            <TableHead>
              <TableRow>
                <TableCell style={{color:'white'}}colSpan={3}>{menuName}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell  sx={{fontSize:'15px'}}
                id="lbltxt"
                >Sheet No. :</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    className="txtField1"
                    value={txtSheetNo.trim()}
                    inputRef={FctxtSht}
                    onChange={(e) => {
                      settxtSheetNo(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        txtSheetNo_TextChanged();
                      }
                    }}
                  ></TextField>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: "center" ,fontSize:'16px' }}>
                  {lblSheet}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        {(pnlResult &&
      <div className="pnlResult1">
        <Table id="TableResult1" component={Card}>
          <TableRow sx={{height:'34px' }}>
            <TableCell
            sx={lblResult.styled}
            >
          {lblResult.text}
            </TableCell>
          </TableRow>
          
        </Table>
      </div>)}
     </div>
    </div>
  );
}

export default ScanBinCheck;
