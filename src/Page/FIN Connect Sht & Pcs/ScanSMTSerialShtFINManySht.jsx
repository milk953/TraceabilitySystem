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
  Paper,
  Box,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSMTSerialShtFINManySht.css";

function ScanSMTSerialShtFINManySht() {
  const options = ["Option 1", "Option 2"];
  const lblStyle = {
    width: "100px",
    padding: "0px",
    height: "50px",
  };
  return (
    <div>
      <div>
        <h1>trace</h1>
      </div>
      <div >
        <Table className='mainTable' component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>FIN Connect Sht & Pcs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Lot No.:</TableCell>
              <TableCell>
                <TextField size="small"></TextField>
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
                <Autocomplete
                  size="small"
                    className="autocomplete"
                  renderInput={(params) => (
                    <TextField {...params} label="Controllable" />
                  )}
                />
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
      </div>
    </div>
  );
}

export default ScanSMTSerialShtFINManySht;
