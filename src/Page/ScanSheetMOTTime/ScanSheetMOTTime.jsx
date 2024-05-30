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
  Autocomplete,
} from "@mui/material";

import {
  ArrowRightOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Hearder from "../Header/Hearder";
function ScanSheetMOTTime() {
  return (
    <div>
      <Hearder />
      <h1>ScanSheetMOTTime</h1>
      <Card
        component={Paper}
        style={{
          margin: "auto",
          width: "90%", 
          maxWidth: "1400px",
          marginTop: "50px",
          height: "auto", 
          maxHeight: "550px", 
          padding: "20px",
        }}
      >
        <Table component={Card} sx={{width:'100%',maxWidth:'600px'}}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} align="center">
              <Typography variant="h5"><b>Pre-Baking <ArrowRightOutlined /> MOT1 Control Time</b></Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
              <Typography >MOT Machine/Line</Typography>
              </TableCell>
              <TableCell colSpan={2}><TextField
                        id="txtfild"
                        size="small"
                        fullWidth
                      ></TextField></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
              <Typography >Lot No.</Typography>
              </TableCell>
              <TableCell ><TextField
                        id="txtfild"
                        size="small"
                        fullWidth
                      ></TextField></TableCell>
                      <TableCell><button style={{background:'#D04848',height:'20px'}} >
                        <DeleteOutlined /> | Cancel
                      </button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export default ScanSheetMOTTime;
