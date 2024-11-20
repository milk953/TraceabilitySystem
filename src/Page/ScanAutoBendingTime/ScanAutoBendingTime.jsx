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
import "../Common/StyleCommon.css";
import Swal from "sweetalert2";
function ScanAutoBendingTime() {
const {txtMCNo,settxtMCNo,txtLotNo,settxtLotNo,lblProductName,lblResult,lblRemark,handletxtMCNo_TextChanged
  ,handletxtLotNo_TextChanged,fcLotNo,fcMCno,gvSerial,txtSerial,handleSerialChange,ibtback_Click,btnSave_Click,pnlDetail,pnlResult,gvBending,gvBendingVisible
,btnCancel,fcGvSerial_txtSerial_0 } = fn_ScanAutoBendingTime()
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
          <TableRow >
            <TableCell id="lbltxtBaking">Machine No :</TableCell>
            <TableCell>
              <TextField
                size="small"
                
                // className="txtFieldbending"
             
                disabled={txtMCNo.disbled}
                style={{ width: "350px" ,padding:'0px',backgroundColor: txtMCNo.disbled ? '#e0e0e0' : 'inherit',}}
                // autoFocus
                // sx={txtProcessState.styled}
                onChange={(e) => {
                  settxtMCNo((prevState)=>({...prevState,value:e.target.value}));
                }}
                inputRef={fcMCno}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handletxtMCNo_TextChanged();
                  }
                }}
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
                style={{ width: "350px", backgroundColor: txtLotNo.disbled ? '#e0e0e0' : 'inherit', }}
                disabled={txtLotNo.disbled}
              
                inputRef={fcLotNo}
                onChange={(e) => {
                  settxtLotNo((prevState)=>({...prevState,value:e.target.value}));
                }} 
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handletxtLotNo_TextChanged();
                  }
                }}
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
            <TableCell colSpan={3} sx={{fontSize:'20px'}}>
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
            <TableCell sx={{ width: '10%',fontWeight:'bold' }} align="center">No.</TableCell>
              <TableCell sx={{ width: '30%',fontWeight:'bold' }} align="center">Bending No.</TableCell>
              <TableCell sx={{ width: '30%',fontWeight:'bold' }} align="center">Serial No.</TableCell>
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
                          inputRef={(el) => (fcGvSerial_txtSerial_0.current[index] = el)}
                            value={txtSerial[index]}
                            onChange={(event) => {
                              const value = event.target.value;
                              // ตรวจสอบค่าให้รับเฉพาะตัวอักษรและตัวเลข
                              if (/['"]/g.test(value)) {
                                // แสดง Alert เมื่อมีการใส่เครื่องหมาย ' หรือ "
                                Swal.fire({
                                  title: "Special characters like ' and \" are not allowed.",
                                  icon: "error",
                                  timer: 2000,
                                  showConfirmButton: false,
                                });
                              } else {
                                handleSerialChange(index, event); // ส่งค่าให้ฟังก์ชัน handleSerialChange
                              }
                              
                            }}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                event.preventDefault(); // ป้องกันการทำงานค่าเริ่มต้นของ Enter
                                if (index < gvSerial.length - 1) {
                                  fcGvSerial_txtSerial_0.current[index + 1].focus();
                                }else{
                                  btnSave_Click()
                                  event.target.blur();
                                }
                              }
                            }}
                          />
                            </TableCell>
                          
                          </TableRow>
                        )
                      )}
                      <tr>
            <td align="center">
              <Button variant="contained"  onClick={btnSave_Click} 
              style={{ backgroundColor: 'green', color: 'white' }} >Save</Button>
            </td>
            <td align="center">
              <Button variant="contained" onClick={btnCancel} 
              style={{ backgroundColor: 'red', color: 'white' }}>Cancel</Button>
            </td>
          </tr>
          </TableBody>
        </Table>
         )}  
      </div>
      {pnlDetail&&(
      <div className="TableSave-bending" >
        <Table  >
          
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
      
    </>
  );
}

export default ScanAutoBendingTime;
