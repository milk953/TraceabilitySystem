import React from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TableHead,
  TableContainer,
  Box,
  Tooltip,
  Autocomplete,
  Grid,
  Paper,
  Tab,
} from "@mui/material";
import "./ScanSheetReflowTime.css";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Hearder from "../Header/Hearder";
import { fn_ScanSheetReflowTime } from "./fn_ScanSheetReflowTime";
import HomeIcon from '@mui/icons-material/Home';

function ScanSheetReflowTime() {
  const { txtmcNo, txtSheetNo, lblSheet, lblResult, lblRemark } =
    fn_ScanSheetReflowTime();
  return (
    <div>
      <Hearder />
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
                <TextField size="small" className="txtField"></TextField>
              </TableCell>
              <TableCell>
                <Button>
                  {" "}
                  <BackspaceIcon />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell id="lbltxt">Sheet No.:</TableCell>
              <TableCell>
                <TextField size="small" className="txtField"></TextField>
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
            <TableCell sx={{ fontSize: "60px", padding: "0px" }}>
              {lblResult}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ fontSize: "34px", padding: "0px" }}>
              {lblRemark}
            </TableCell>
          </TableRow>
        </Table>
      </div>
      <div className="pnlSave">
        <Table id="TableSave" component={Paper}>
          <TableRow>
            <TableCell>
              <Button>Replace</Button>
            </TableCell>
            <TableCell>
              <Button>Delete</Button>
            </TableCell>
            <TableCell>
              <Button>Cancel</Button>
            </TableCell>
          </TableRow>
        </Table>
      </div>
      <div style={{display:'flex',justifyContent:'center',marginTop:'5px'}}>
        <Button sx={{fontSize:'11px'}}> Return to Menu</Button>
      </div>
    </div>
  );
}

export default ScanSheetReflowTime;
