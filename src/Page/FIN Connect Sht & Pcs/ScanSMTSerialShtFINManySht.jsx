import React, { useEffect } from "react";
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
} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSMTSerialShtFINManySht.css";
import Hearder from "../Header/Hearder";
import {fn_ScanSMTSerialShtFINManySht} from "./fn_ScanSMTSerialShtFINManySht";
function ScanSMTSerialShtFINManySht() {
  const options = ["Option 1", "Option 2"];
  const lblStyle = {
    width: "100px",
    padding: "0px",
    height: "50px",
  };
  const {lot, setLot ,ipAddress} = fn_ScanSMTSerialShtFINManySht();



  return (
    <div>
      <Hearder />
      <div className="Head">
        <Table className="mainTable" component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>FIN Connect Sht & Pcs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Lot No.:</TableCell>
              <TableCell>
                <TextField size="small" id="txtLot"></TextField>
              </TableCell>
              <TableCell>
                <Button>
                  <BackspaceIcon />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Product:</TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <InputLabel size="small">Product :</InputLabel>
                  <Select className="select" size="small" label="Product :">
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lot Ref. No.:</TableCell>
              <TableCell>
                <TextField size="small"></TextField>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Operator:</TableCell>
              <TableCell>
                <TextField size="small"></TextField>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Sht:</TableCell>
              <TableCell>
                <TextField size="small"></TextField>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Pcs:</TableCell>
              <TableCell>
                <TextField size="small"></TextField>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        
        </Table>
        <Table className="pnlBackSide" component={Paper}>
          <TableRow>
            <TableCell className="IPTEst">{ipAddress}</TableCell>
            <TableCell>Databound</TableCell>
            <TableCell>
              <TextField size="small" id="txtLot"></TextField>
            </TableCell>
          </TableRow>
        </Table>
      </div>
    </div>
  );
}

export default ScanSMTSerialShtFINManySht;
