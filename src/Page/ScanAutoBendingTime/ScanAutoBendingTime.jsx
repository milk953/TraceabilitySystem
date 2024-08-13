import React, { useEffect } from "react";
import Hearder from "../Header/Header";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  TableHead,
  Paper,
  Card
} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../ScanAutoBendingTime/ScanAutoBendingTime.css"
import {fn_ScanAutoBendingTime} from './fn_ScanAutoBendingTime'
function ScanAutoBendingTime() {
const {txtMCNo,settxtMCNo,txtLotNo,settxtLotNo,lblProductName,lblResult,lblRemark,handletxtMCNo_TextChanged
  ,handletxtLotNo_TextChanged,fcLotNo,fcMCno,gvSerial,txtSerial,handleSerialChange,ibtback_Click,btnSave_Click,pnlDetail,pnlResult,gvBending,gvBendingVisible
,btnCancel} = fn_ScanAutoBendingTime()
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
                // className="txtFieldbending"
                style={{ width: "350px" ,padding:'0px'}}
                disabled={txtMCNo.disbled}
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
              <Button  onClick={ibtback_Click} >
                <BackspaceIcon  />
              </Button>
            </TableCell>
          </TableRow>
        <TableRow>
            <TableCell id="lbltxtBaking">Product Name:</TableCell>
            <TableCell colSpan={3} sx={{fontSize:'20px',fontWeight:'bold'}}>
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
        {pnlDetail &&(
        <Table component={Paper}>
          <TableHead>
            <TableRow>
            <TableCell sx={{ width: '10%' }} align="center">No.</TableCell>
              <TableCell sx={{ width: '30%' }} align="center">Bending No.</TableCell>
              <TableCell align="center">Serial No.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
         
          {Array.from(
                        { length: gvSerial.length },
                        (_, index) => (
                          <TableRow key={index}>
                        
                            <TableCell
                              sx={{ borderRight: "1px solid #d9d9d9" ,textAlign:'center'}}
                            >
                              {gvSerial[index].SEQ}
                            </TableCell>
                            <TableCell
                              sx={{ borderRight: "1px solid #d9d9d9",textAlign:'center' }}
                            >
                              {gvSerial[index].BENDING_NO}
                            </TableCell>
                            
                            <TableCell
                              sx={{ borderRight: "1px solid #d9d9d9" ,textAlign:'center' }}
                            >
                              <TextField
                            id="txtfild"
                            size="small"
                            fullWidth
                          //  inputRef={fcGvSerial_txtSerial_0}
                            value={txtSerial[index]}
                            onChange={(event) =>
                              handleSerialChange(index, event)
                            }
                          />
                            </TableCell>
                          
                          </TableRow>
                        )
                      )}
          </TableBody>
        </Table>
         )}  
      </div>
      {pnlDetail&&(
      <div className="TableSave-bending" >
        <Table  >
          <tr>
            <td align="center">
              <Button variant="contained" onClick={btnSave_Click}  >Save</Button>
            </td>
            <td align="center">
              <Button variant="contained" onClick={btnCancel} >Cancel</Button>
            </td>
          </tr>
        </Table>
      </div>
      )}  
    
      {pnlResult &&(
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
     )} 
      {gvBendingVisible &&(
      <div className="gvBending" style={{ marginBottom: '20px' }}>
        <Table component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '30%' }} align="center">No.</TableCell>
              <TableCell align="center">Bending No.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {Array.from(
                        { length: gvBending.length },
                        (_, index) => (
                          <TableRow key={index}>
                        
                            <TableCell
                              sx={{ borderRight: "1px solid #d9d9d9" ,textAlign:'center',height:'20px'}}
                            >
                              {gvBending[index].seq}
                            </TableCell>
                            <TableCell
                              sx={{ borderRight: "1px solid #d9d9d9",textAlign:'center',height:'20px' }}
                            >
                              {gvBending[index].bending_no}
                            </TableCell>
                          
                          </TableRow>
                        )
                      )}
            {/* {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell align="center">Ex.</TableCell>
                <TableCell align="center">
                <input className="custom-input" />
                </TableCell>
              </TableRow>
            ))} */}
          </TableBody>
        </Table>
      </div>)}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}
      >
        <Button sx={{ fontSize: "11px" }}> Return to Menu</Button>
      </div>
    </>
  );
}

export default ScanAutoBendingTime;
