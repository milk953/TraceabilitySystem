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
import "/src/Page/ScanSheetMOTTime/ScanSheetMOTTime.css";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Hearder from "../Header/Hearder";
import { fn_ScanSheetMOTTime } from "./fn_ScanSheetMOTTime";
function ScanSheetMOTTime() {
  const {
    txtLotNo_TextChanged,
    settxtlot,
    txtlot,
    lblProductName,
    lblResult,
    lblSheet,
    lblRemark,
    txtSheetNo_TextChanged,
    settxtSheet,
    txtSheet
  } = fn_ScanSheetMOTTime();
  return (
    <div>
      <Hearder />
      <h1>ScanSheetMOTTime</h1>
      <Card
        component={Paper}
        className="Card-ScanSheetMOTTime"
      >
        <Table className="TableMot1" component={Card} sx={{ width: "100%", maxWidth: "600px" }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} align="center" >
                <Typography variant="h5">
                  <b>
                    Pre-Baking <ArrowRightOutlined /> MOT1 Control Time
                  </b>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell  align="right"  style={{width:'150px'}}>
                <Typography>MOT Machine/Line :</Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <TextField id="txtfild" size="small" fullWidth></TextField>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell  align="right">
                <Typography>Lot No. :</Typography>
              </TableCell>
              <TableCell >
                <TextField id="txtfild" 
                size="small" 
                fullWidth 
                value={txtlot}
                onChange={(e) => {
                  settxtlot(e.target.value);
                }}
               
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    txtLotNo_TextChanged();
                  }
                }}
                ></TextField>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  style={{ background: "#D04848" }}
                  size="small"
                >
                  {" "}
                  <DeleteOutlined /> | Cancel
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell  align="right">
                <Typography>Product Name :</Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <Typography>{lblProductName}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography align="right">Sheet No. :</Typography>
              </TableCell>
              <TableCell colSpan={2}>
                <TextField 
                id="txtfild" 
                size="small" 
                fullWidth
                value={txtSheet}
                onChange={(e) => {
                  settxtSheet(e.target.value);
                }}
               
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    txtSheetNo_TextChanged();
                  }
                }}></TextField>
              </TableCell>
            </TableRow>
            <TableRow style={{height:'40px'}}>
              <TableCell colSpan={3} align="center">
                <Card style={{background:'3FEFFD2'}}> <Typography>{lblSheet}</Typography></Card>
                
              </TableCell>
            </TableRow>
            <TableRow style={{height:'180px'}}>
              <TableCell colSpan={3} >
                <Typography align="center" >{lblResult}</Typography>
                <Typography align="center">{lblRemark}</Typography>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={3} align="center">
                <Button variant="contained">Replace</Button> &nbsp;
                <Button variant="contained">Delete</Button>&nbsp;
                <Button variant="contained">Cancel</Button>&nbsp;
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export default ScanSheetMOTTime;
