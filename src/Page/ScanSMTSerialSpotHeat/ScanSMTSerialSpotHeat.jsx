import React, { useEffect, useState, useRef } from "react";
import {
  TextField,
  Card,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Paper,
  Typography,
  Button,
  FormControl,
  Autocomplete,
  Box,
  Checkbox,
  Grid,
} from "@mui/material";
import Pageimg from "/src/assets/1.jpg";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../Confirm Barcode Grade/BarcodeGrade.css";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { Table as AntTable } from 'antd';
import { fn_ScanSMTSerialSpotHeat } from "./fn_ScanSMTSerialSpotHeat";
function ScanSMTSerialSpotHeat() {
  const {
    handletxt_Lotno,
    txtLot,
    settxtLot,
    handleddlProduct,
    Product,
    SlProduct,
    txtTotalPCS,
    settxtTotalPCS,
    fcGvSerial_txtSerial_0,handleTotal_Sht,fcTotalSht,
    fcProduct,fcLotNo,lblLog,pnlLog,ibtBack_Click,btnSave_Click,setSlProduct,hfMode,txtSerial,handleSerialChange,
    gvScanResult,lblResult,visiblgvSerial,btnCancel_Click,fcGvSerial,visiblegvScanResult,visibledll_product,dataGvSerial,columns
  } = fn_ScanSMTSerialSpotHeat();
  return (
    <div>
      <Hearder />
      <h1>ConfirmBarcodeGrade</h1>
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table
                className="TableMot1"
                component={Card}
                sx={{ width: "100%" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Typography variant="h5">
                        <b>Spot Heat Result Checking</b>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">
                      <Typography>Lot No. :</Typography>
                    </TableCell>
                  
                    <TableCell>
                      <TextField
                        className="input_txt"
                        size="small"
                        fullWidth
                        disabled={txtLot.disbled} 
                        value={txtLot.value}
                        // inputRef={fcLotNo}
                        inputRef={(el) => (fcLotNo.current = el)}
                        style={{ backgroundColor: txtLot.disbled ? '#e0e0e0' : 'inherit'}}
                        onChange={(e) => {
                          settxtLot((prevState)=>({...prevState,value:e.target.value}));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handletxt_Lotno();
                          }
                        }}
                        onBlur={handletxt_Lotno}
                      />
                    </TableCell>
                    <TableCell>
                      <Button className="Bt_ibtBack"
                        onClick={ibtBack_Click}
                      >
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography>Product :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <FormControl fullWidth>
                        <Autocomplete
                            inputRef={fcProduct}
                          className="Select_dropDown"
                          value={SlProduct}
                          disabled={visibledll_product}
                          onChange={(e) => {
                            setSlProduct(e.target.value);
                            // handleddlProduct();
                          }}
                       
                          onInputChange={handleddlProduct}
                          options={Product.map((item) => item.prd_name)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              sx={{ textAlign: "left" }}
                            />
                          )}
                        />
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography>Total Sht :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        className="input_txt"
                        value={txtTotalPCS.value}
                        inputRef={fcTotalSht}
                        onChange={(e) => {
                          settxtTotalPCS((prevState)=>({...prevState,value:e.target.value}))
                        
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleTotal_Sht();
                          }
                        }}
                        onBlur={ handleTotal_Sht}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {pnlLog == true && (
                <Card
                  component={Paper}
                  style={{
                    width: "400px",
                    height: "40px",
                    margin: "auto",

                    textAlign: "center",
                    background: "#BB2525",
                    paddingTop: "18px",
                    color: "yellow", // กำหนดสีฟอนต์เป็นสีเหลือง
                    fontWeight: "bold", // กำหนดความหนาของฟอนต์
                    marginTop: "30px",
                  }}
                >
                  {lblLog}
                </Card>   )}
                {visiblgvSerial == true && (
              <Table className="CSS-GvSerial" component={Card}
              style={{ marginTop: "20px",}}
              inputRef={fcGvSerial}>
                <TableHead>

                  <TableCell
                    sx={{ borderRight: "1px solid #d9d9d9" }}
                    align="center"
                  >
                    No.
                  </TableCell>
                  <TableCell align="center">Serial No.</TableCell>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                
                {Array.from({ length: dataGvSerial.length }, (_, index) => (
                      <TableRow key={index}>
                      
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #d9d9d9" }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell>
                          {" "}
                          <TextField
                            className="input_txt"
                            size="small"
                            fullWidth
                          //  inputRef={fcGvSerial_txtSerial_0}
                           inputRef={(el) => (fcGvSerial_txtSerial_0.current[index] = el)}
                            value={txtSerial[index]}
                            onChange={(event) =>
                              handleSerialChange(index, event)
                            }
                            onBlur={(event) => {
                              handleSerialChange(index, event);
                             
                            }}
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                event.preventDefault(); // ป้องกันการทำงานค่าเริ่มต้นของ Enter
                                if (index < dataGvSerial.length - 1) {
                                  fcGvSerial_txtSerial_0.current[index + 1].focus();
                                } else{
                                  btnSave_Click()
                                  event.target.blur();
                                }
                              }
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  <TableRow>
                 
                  </TableRow>

                  <TableRow
                  // style={{display:visibleConfirm}}
                  >
                    
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Button
                       className="BtSave"
                       
                          onClick={btnSave_Click}
                      >
                        Save
                      </Button>{" "}
                      &nbsp;&nbsp;
                      <Button
                       className="BtCancel" 
                      
                        color="error"
                          onClick={btnCancel_Click}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>)}
            </Grid>
            {/* border:'1PX SOLID green' */}
            <Grid
              item
              xs={10}
              md={8}
              style={{
                margin: "auto",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >{visiblegvScanResult == false && (<>
              <img
                style={{
                  width: "420px",
                  height: "350px",
                  marginBottom: "30px",
                }}
                src={Pageimg} // Import the image
                alt="Description of the image"
              />
              </>)}
              {visiblegvScanResult == true && (
              <>
                <Paper
                  className="Card-lblResult"
                  elevation={3}
                  style={{ background: lblResult.text !=='OK'? "#BA0900":"#059212",}}
                  
                
                >
                  <Typography
                    variant="h4"
                    style={{ paddingTop: "3px", color: "#fff" }}
                  >{lblResult.text}</Typography>
                </Paper>
                {/* <Table
                  className="CSS-GvScanResult"
                  // style={{ display: gvScanResult }}
                  component={Card}
                >
                  <TableHead>
                    <TableRow>
                     
                      <TableCell
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                        width="200px"
                      >
                        No.
                      </TableCell>
                      <TableCell
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                        width="200px"
                      >
                        Serial No.
                      </TableCell>
                      
                      <TableCell
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                        width="150px"
                      >
                        Scan Result
                      </TableCell>
                      <TableCell width="300px">Remark</TableCell>
                    </TableRow>
                  </TableHead>

              
                  {Array.from(
                        { length: gvScanResult.length },
                        (_, index) => (
                          <TableRow key={index}>
                        
                            <TableCell
                              sx={{ borderRight: "1px solid #d9d9d9" ,textAlign:'center'}}
                            >
                              {gvScanResult[index].SEQ}
                            </TableCell>
                            <TableCell
                              sx={{ borderRight: "1px solid #d9d9d9",textAlign:'center' }}
                            >
                              {gvScanResult[index].SERIAL}
                            </TableCell>
                            
                            <TableCell
                              sx={{ borderRight: "1px solid #d9d9d9" ,textAlign:'center',background: gvScanResult[index].SCAN_RESULT  =='NO'? "#ff4d4f":""
                              }}
                            >
                              {gvScanResult[index].SCAN_RESULT}
                            </TableCell>
                            <TableCell
                              sx={{ borderRight: "1px solid #d9d9d9",textAlign:'center' }}
                            >
                              {gvScanResult[index].REMARK}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                </Table> */}
              <br/>
                <AntTable 
                columns={columns}
                dataSource={gvScanResult}
                style={{ width:'100%'}}
                pagination={false}
                size="small"
                bordered
                className="tableGvResult"
                />
              </>  )}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default ScanSMTSerialSpotHeat;
