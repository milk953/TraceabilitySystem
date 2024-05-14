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
import {
  ArrowRightOutlined
} from '@ant-design/icons';
import "/src/Page/Scan SMTRoollSht/ScanSmt.css";
import Hearder from "../Header/Hearder";
import {Fn_ScanSMTRollSht} from "../function/function_ScanSMTRollSht";
function ScanSMTRoollSht() {

  const { txt_lotNo,handleLotxt_Lotno,sl_Product} = Fn_ScanSMTRollSht();
  
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
            <TextField id="LotNo" size="small" fullWidth value={txt_lotNo} onChange={handleLotxt_Lotno}></TextField>
          </TableCell>
          <TableCell >
            <button className="BtLotno"> <ArrowRightOutlined /></button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="right">
            <Typography variant="h6">Product :</Typography>
          </TableCell>
          <TableCell colSpan={3}>
            {console.log('strPrdName',sl_Product)}
            <FormControl fullWidth>
              {/* <InputLabel id="demo-simple-select-label" size="small">
                Product :
              </InputLabel> */}
              <Select size="small"  value={sl_Product}>
                <MenuItem  value={sl_Product}>{sl_Product}</MenuItem>
                {/* <MenuItem value='2'>Twenty</MenuItem>
                <MenuItem value='3'>Thirty</MenuItem> */}
              </Select>
              {/* <TextField value={sl_Product}></TextField> */}
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
              // label="Check Roll. :"
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
              // label="Operator. :"
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
              // label="Roll/Sht No. :"
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
