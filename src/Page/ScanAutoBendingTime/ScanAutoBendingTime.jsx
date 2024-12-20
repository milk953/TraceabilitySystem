import React, { useEffect } from "react";
import Hearder from "../Header/Header";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Card,
  Button
} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { Button as ButtonTable } from "antd";
import "../ScanAutoBendingTime/ScanAutoBendingTime.css";
import { fn_ScanAutoBendingTime } from "./fn_ScanAutoBendingTime";
import { fn_Homepage } from "../Homepage/fn_Homepage";
import "../Common/StyleCommon.css";
import Swal from "sweetalert2";
function ScanAutoBendingTime() {
  const { menuName } = fn_Homepage();
  const {
    txtMCNo,
    settxtMCNo,
    txtLotNo,
    settxtLotNo,
    lblProductName,
    lblResult,
    lblRemark,
    handletxtMCNo_TextChanged,
    handletxtLotNo_TextChanged,
    fcLotNo,
    fcMCno,
    gvSerial,
    txtSerial,
    handleSerialChange,
    ibtback_Click,
    btnSave_Click,
    pnlDetail,
    pnlResult,
    gvBending,
    gvBendingVisible,
    btnCancel,
    fcGvSerial_txtSerial_0,
  } = fn_ScanAutoBendingTime();
  return (
    <>
      <Hearder />
      <div className="Center_Layout">
        <Table className="TableBendingRecord" 
     
        component={Card}
        >
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>{menuName}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell id="lbltxtBending">Machine No :</TableCell>
              <TableCell>
                <TextField
                  size="small"
                  // className="txtFieldbending"

                  disabled={txtMCNo.disbled}
                  fullWidth
                  style={{
                    // width: "350px",
                    padding: "0px",
                    backgroundColor: txtMCNo.disbled ? "#e0e0e0" : "inherit",
                  }}
                  // autoFocus
                  // sx={txtProcessState.styled}
                  onChange={(e) => {
                    settxtMCNo((prevState) => ({
                      ...prevState,
                      value: e.target.value,
                    }));
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
              <TableCell id="lbltxtBending">Lot No:</TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  style={{
                    // width: "350px",
                    backgroundColor: txtLotNo.disbled ? "#e0e0e0" : "inherit",
                  }}
                  disabled={txtLotNo.disbled}
                  inputRef={fcLotNo}
                  onChange={(e) => {
                    settxtLotNo((prevState) => ({
                      ...prevState,
                      value: e.target.value,
                    }));
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
                <Button onClick={ibtback_Click}>
                  <BackspaceIcon />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell id="lbltxtBending">Product Name:</TableCell>
              <TableCell colSpan={3} sx={{ fontSize: "15px" }}>
                {lblProductName.value}
              </TableCell>
            </TableRow>
       
          </TableBody>
        </Table>
      </div>

    
        {pnlDetail &&(
        <Table component={Card} className="pnlDetail" >
  <TableHead>
    <TableRow>
      <TableCell sx={{ width: "5%", }} align="center">
        No.
      </TableCell>
      <TableCell sx={{ width: "10%", }} align="center">
        Bending No.
      </TableCell>
      <TableCell sx={{ width: "30%",  }} align="center">
        Serial No.
      </TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {Array.from({ length: gvSerial.length }, (_, index) => (
      <TableRow key={index}>
        <TableCell
          sx={{ borderRight: "1px solid #d9d9d9", textAlign: "center" }}
        >
          {gvSerial[index].SEQ}
        </TableCell>
        <TableCell
          sx={{ borderRight: "1px solid #d9d9d9", textAlign: "center" }}
        >
          {gvSerial[index].BENDING_NO}
        </TableCell>
        <TableCell
          sx={{ borderRight: "1px solid #d9d9d9",padding:'0px' }}
        >
          <TextField
            // id="txtfild"
            className="input_txt"
            style={{margin:'4px',width:'98%'}}
            size="small"
            fullWidth
            inputRef={(el) =>
              (fcGvSerial_txtSerial_0.current[index] = el)
            }
            value={txtSerial[index]}
            onChange={(event) => {
              const value = event.target.value;
              if (/['"]/g.test(value)) {
                Swal.fire({
                  title: "Special characters like ' and \" are not allowed.",
                  icon: "error",
                  timer: 2000,
                  showConfirmButton: false,
                });
              } else {
                handleSerialChange(index, event);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                if (index < gvSerial.length - 1) {
                  fcGvSerial_txtSerial_0.current[index + 1].focus();
                } else {
                  btnSave_Click();
                  event.target.blur();
                }
              }
            }}
          />
        </TableCell>
      </TableRow>
    ))}

    {/* Footer Row */}
    <TableRow>
      <TableCell colSpan={3} align="center">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            paddingTop:'5px'
          }}
        >
          <ButtonTable
            style={{
              backgroundColor: "green",
              color: "white",
            }}
            onClick={btnSave_Click}
          >
            Submit
          </ButtonTable>
          <ButtonTable
          className="ButtonCancel"
            style={{
              color: "white",
              width: "90px",
            }}
            onClick={btnCancel}
          >
            Cancel
          </ButtonTable>
        </div>
      </TableCell>
    </TableRow>
  </TableBody>
        </Table>
        )}  
      
    
      {pnlResult &&(
      <div className="pnlResult-Auto">
        <Table  
        component={Card}    
        sx={{
          border: '0px solid',
          borderColor: lblResult.value === 'OK' ? 'green' : 'red',
          '& .MuiTableCell-root': {
            borderColor: lblResult.value === 'OK' ? 'green' : 'red',
      },
    }} >
          <TableRow>
            <TableCell sx={lblResult.style}>{lblResult.value}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={lblRemark.style}>{lblRemark.value}</TableCell>
          </TableRow>
        </Table>
      </div>
      )} 
      {gvBendingVisible &&(
      <div className="gvBending" style={{ marginBottom: "20px" }}>
        <Table component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "30%" }} align="center">
                No.
              </TableCell>
              <TableCell align="center">Bending No.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: gvBending.length }, (_, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    borderRight: "1px solid #d9d9d9",
                    textAlign: "center",
                    height: "20px",
                  }}
                >
                  {gvBending[index].seq}
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "1px solid #d9d9d9",
                    textAlign: "center",
                    height: "20px",
                  }}
                >
                  {gvBending[index].bending_no}
                </TableCell>
              </TableRow>
            ))}
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
      </div>
      )}
    </>
  );
}

export default ScanAutoBendingTime;
