import React, { useEffect } from "react";
import Hearder from "../Header/Hearder";
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
import "../ScanAutoBendingTime/ScanAutoBendingTime.css"
import {fn_ScanAutoBendingTime} from './fn_ScanAutoBendingTime'
import { Height } from "@mui/icons-material";
function ScanAutoBendingTime() {
const {txtMCNo,settxtMCNo,txtLotNo,settxtLotNo,lblProductName,lblResult,lblRemark,handletxtMCNo_TextChanged
  ,handletxtLotNo_TextChanged,fcLotNo,fcMCno
} = fn_ScanAutoBendingTime()
  return (
    <>
      <Hearder />
      <h1>Baking Time</h1>
      <Table id="TableMainBaking" component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3}>Serial Bending Record Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell id="lbltxtBaking">Machine No :</TableCell>
            <TableCell>
              <TextField
                size="small"
                className="txtFieldBaking"
                style={{ width: "350px" }}
                // disabled={txtProcessState.disabled}
                // autoFocus
                // sx={txtProcessState.styled}
                onChange={(e) => {
                  settxtMCNo((prevState)=>({...prevState,value:e.target.value}));
                }}
                inputRef={fcMCno}
                onBlur={handletxtMCNo_TextChanged}
                value={txtMCNo.value}
              ></TextField>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell id="lbltxtBaking">Lot No:</TableCell>
            <TableCell>
              <TextField
                size="small"
                className="txtField"
                style={{ width: "350px" }}
                disabled={txtLotNo.disbled}
                // sx={txtmcState.styled}
                inputRef={fcLotNo}
                onChange={(e) => {
                  settxtLotNo((prevState)=>({...prevState,value:e.target.value}));
                }}
                onBlur={handletxtLotNo_TextChanged}
                value={txtLotNo.value}
              ></TextField>
            </TableCell>
            <TableCell>
              <Button >
                <BackspaceIcon />
              </Button>
            </TableCell>
          </TableRow>
        <TableRow>
            <TableCell id="lbltxtBaking">Product Name:</TableCell>
            <TableCell colSpan={3}>
                {lblProductName.value}

            </TableCell>
           
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} sx={{ textAlign: "center" }}>
              {/* {lblSheet} */}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="pnlDetail" style={{ marginBottom: '20px' }}>
        <Table component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '30%' }} align="center">Bending No.</TableCell>
              <TableCell align="center">Serial No.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell align="center">Ex.</TableCell>
                <TableCell align="center">
                  <input className="custom-input" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="TableSave" style={{ marginBottom: '20px' }}>
        <Table component={Paper}>
          <TableRow>
            <TableCell align="center">
              <Button sx={{ border: '1px red solid' }} size="small">Save</Button>
            </TableCell>
            <TableCell align="center">
              <Button sx={{ border: '1px red solid' }} size="small">Cancel</Button>
            </TableCell>
          </TableRow>
        </Table>
      </div>
      
      <div className="pnlResult-Auto">
        <Table component={Paper}  >
          <TableRow>
            <TableCell sx={lblResult.style}>
            {lblResult.value}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={lblRemark.style}>
            {lblRemark.value}
            </TableCell>
          </TableRow>
        </Table>
      </div>
      <div className="gvBending" style={{ marginBottom: '20px' }}>
        <Table component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '30%' }} align="center">No.</TableCell>
              <TableCell align="center">Bending No.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell align="center">Ex.</TableCell>
                <TableCell align="center">
                <input className="custom-input" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}
      >
        <Button sx={{ fontSize: "11px" }}> Return to Menu</Button>
      </div>
    </>
  );
}

export default ScanAutoBendingTime;
