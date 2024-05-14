import React from "react";
import {
  TextField,
  Card,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import "/src/Page/Scan SMTRoollSht/ScanSmt.css";
import Hearder from "../Header/Hearder";
function ScanSMTRoollSht() {
  return (
    <div>
      <Hearder />
      <h1>ScanSMTRoollSht</h1>
      <Table className="ScanSMT" component={Paper}>
        <TableHead>
          <TableCell colSpan={4} align="center">
            <Typography variant="h4">Connect Roll/Sht & Leaf</Typography>
          </TableCell>
        </TableHead>
        <TableBody>
        <TableRow>
          <TableCell align="right">
            <Typography variant="h6">LotNo. :</Typography>
          </TableCell>
          <TableCell colSpan={2}>
            <TextField id="FamTo" size="small" label="LotNo. : " fullWidth></TextField>
          </TableCell>
          <TableCell >
            <button className="BtLotno"> Click</button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">
            <Typography variant="h6">Product :</Typography>
          </TableCell>
          <TableCell colSpan={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" size="small">
                Product :
              </InputLabel>
              <Select size="small" label="Product :">
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">
            <Typography variant="h6">Check Roll :</Typography>
          </TableCell>
          <TableCell colSpan={3}>
            <TextField
              id="FamTo"
              size="small"
              label="Check Roll. :"
              fullWidth
            ></TextField>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">
            <Typography variant="h6">Operator :</Typography>
          </TableCell>
          <TableCell colSpan={3}>
            <TextField
              id="FamTo"
              size="small"
              label="Operator. :"
              fullWidth
            ></TextField>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">
            <Typography variant="h6">Total Leaf :</Typography>
          </TableCell>
          <TableCell >
            <TextField
              id="FamTo"
              size="small"
              style={{width:'70px'}}
            ></TextField>
          </TableCell>
          <TableCell align="right" >
            <Typography variant="h6">Total Sht. :</Typography>
          </TableCell>
          <TableCell   style={{width:'70px'}}>
            <TextField
              id="FamTo"
              size="small"
              fullWidth
            ></TextField>
          </TableCell>
        </TableRow>
        <TableRow>
        <TableCell align="right">
            <Typography variant="h6">Roll/Sht No. :</Typography>
          </TableCell>
          <TableCell colSpan={3}>
            <TextField
              id="FamTo"
              size="small"
              label="Roll/Sht No. :"
              fullWidth
            ></TextField>
          </TableCell>
        </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
export default ScanSMTRoollSht;
