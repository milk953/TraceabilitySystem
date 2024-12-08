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
import  './SheetBinCheck.css'
import Hearder from "../Header/Header";
import {fn_SheetBinCheck} from "./fn_SheetBinCheck"
import { color } from "framer-motion";
function ScanBinCheck() {
const {txtSheetNo,settxtSheetNo,lblSheet,lblResult,txtSheetNo_TextChanged,FctxtSht,pnlResult} =fn_SheetBinCheck()

  return (
    <div>
      <Hearder />
      <h1></h1>
   <div className="Pageshow-SheetBin">
        <div className="pnlMain1">
         
          <Table id="TableMain1" component={Paper}>
     
            <TableHead>
              
              <TableRow>
                <TableCell style={{color:'white'}}colSpan={3}>Sheet Bin Checking</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
             
              <TableRow>
                <TableCell  sx={{fontSize:'20px'}}
                id="lbltxt"
                >Sheet No. :</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    className="txtField1"
                    value={txtSheetNo}
                    inputRef={FctxtSht}
                    onChange={(e) => {
                      settxtSheetNo(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        txtSheetNo_TextChanged();
                      }
                    }}
                    // onBlur={txtSheetNo_TextChanged}
                  ></TextField>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                  {/* {lblSheet} */}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        {(pnlResult &&
      <div className="pnlResult1">
        <Table id="TableResult1" component={Paper}>
        <TableRow>
          <TableCell sx={{fontSize:'30px' ,backgroundColor:'#d0d9ff'}}>
          {lblSheet}
          </TableCell>
        </TableRow >
          <TableRow sx={{height:'200px' ,backgroundColor:'yellow'}}>
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
