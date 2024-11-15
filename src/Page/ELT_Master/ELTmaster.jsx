import React, { useState } from "react";
import Hearder from "../Header/Header";
import "../Reject/Reject.css";
import './ELTmaster.css'
import Checkbox from "@mui/material/Checkbox";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  TableHead,
  Paper,
  Typography,
} from "@mui/material";
import {fn_ELTmaster} from "./fn_ELTmaster"
function ELT_Master() {
    const {lblUser1,lblResult,txtSerialNo_TextChanged,ddlReason1,selectddlReason1,setselectddlReason1,txtUpdateBy,settxtSerialNo_TextChanged,Search_Data,Submit,FctxtSerial} = fn_ELTmaster();
  return (
    <>
      <Hearder />
      <h1>ELT Master</h1>
      <div className="Head-ELT">
    <table  className='Head-Textshow'>
    <tbody>
        <tr>
          <td>
            <Typography></Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography>{lblUser1}</Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Typography style={lblResult.styled}> {lblResult.text}</Typography>
          </td>
        </tr>
      </tbody>
    </table>
      </div>
    <div className="Head-Piece">
    <Table  component={Paper} className='Head-Textshow'>
    <TableBody>
        <TableRow>
        <TableCell  style={{ padding: '8px' }}>
            <Typography>PieceNo:</Typography>
          </TableCell>
          <TableCell  style={{padding: '8px', width: '80%' }} >
            <TextField size="small" style={{width:'100%'}} value={txtSerialNo_TextChanged}
            onChange={(e) => settxtSerialNo_TextChanged(e.target.value)}
            // onBlur={Search_Data}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                Search_Data();
              }
            }}
            inputRef={FctxtSerial}
            > 
            
            </TextField>
          </TableCell>
          <TableCell style={{ padding: '8px' }}>
          <Button
                  variant="contained"
                  color="primary"
                  onClick={Search_Data}
                > 
                Retrive
                </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
      </div>
      <br></br>
      <div className="DRejectTableSecond">
        <Table className="RejectTableSecond" component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell style={{textAlign:'center'}}>Before Reson</TableCell>
              <TableCell style={{textAlign:'center'}} >Update By</TableCell>
              <TableCell colSpan={2}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <select
                  onChange={(e) => setselectddlReason1(e.target.value)}
                 value={selectddlReason1}
                >
                  {ddlReason1.map((option, index) => (
                    <option key={index} value={`${option.rejcet_code}`}>
                      {option.rejcet_code === "DELETE"
                        ? "DELETE"
                        : option.rejcet_code === " "
                        ? ""
                        : `${option.rejcet_code} : ${option.rejcet_name}`}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell sx={{ width: "100px" }}>
              <input
                      style={{
                        width: "150px",
                        // border: "1px solid",
                        margin: "0px",
                        backgroundColor: "#E2E3DC"
                        
                      }}
                      type="text"
                      size="20"
                      value={txtUpdateBy}
                      disabled
                    />
              </TableCell>
              <TableCell sx={{ width: "100px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={Submit}
                >
                  Submit
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <br></br>
    </>
  );
}

export default ELT_Master;
