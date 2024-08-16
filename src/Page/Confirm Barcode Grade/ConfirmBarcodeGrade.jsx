import React, { useEffect, useState, useRef } from "react";
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
  Box,
  Checkbox,
  Grid,
  Input,
} from "@mui/material";
import Pageimg from "/src/assets/1.jpg";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../Confirm Barcode Grade/BarcodeGrade.css";
import Hearder from "../Header/Header";
import { fn_ConfirmBarcodeGrade } from "./fn_ConfirmBarcodeGrade";
function ConfirmBarcodeGrade() {
  const {
    settxt_lotNo,
    txt_lotNo,
    handletxt_Lotno,
    Product,
    Check_Master,
    setCheck_Master,
    SlProduct,
    setSlProduct,
    txtLotRef,
    settxtLotRef,
    settxtOperator,
    txtOperator,
    lblTotalPcs,
    lblTotalSht,
    txtRollLeaf,
    settxtRollLeaf,
    txtMachineNo,
    settxtMachineNo,
    ibtBack_Click,
    handleSL_Product,
    hfBarcodeSide,
    hfShtScan,
    hfSerialCount,
    lblLog,
    txtSerial,
    txtSideBack,
    txtSideFront,
    handleBackSideChange,
    handleFrontSideChange,
    handleSerialChange,
    gvScanResult,
    lblResult,
    btnCancel_Click,
    btnSave_Click,
    handleTxt_RollLeaf,
    handleTxt_LotRef,
    handleTxt_Opreator,
    fcRollleaf,
    fctMachchine,
    fcLotNo,
    fcOperator,
    fcProduct,
    fcGvSerial,
    fcGvBackSide_txtsideback_0,
    fcGvSerial_txtSerial_0,
    lblConfirm,
    dataGvSerial
  } = fn_ConfirmBarcodeGrade();


useEffect(() => {
 if(txtRollLeaf.visble!='none'){
  fcRollleaf.current.focus();
 }
}, [txtRollLeaf]);

useEffect(() => {
  if(txtSideBack.visble==true){
    fcGvBackSide_txtsideback_0.current.focus();
  }
}, [txtSideBack]);

  return (
    <div>
      <Hearder />
      <h1>ConfirmBarcodeGrade</h1>
      <Card component={Paper} className="Card-ConfirmBarcode">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table className="TableMot1"  component={Card}  sx={{ width: "100%" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Typography variant="h5">
                        <b>Confirm Barcode Grade</b>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">
                      <Typography>Master :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Checkbox
                        size="small"
                        id="checkboxMaster"
                        style={{ padding: "0" }}
                        onChange={(e) => setCheck_Master(e.target.checked)} //trueเลือก false ไม่ได้เลือก console.log(, 'checked');
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography>Lot No. :</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="txtfild"
                        size="small"
                        fullWidth
                        value={txt_lotNo.value}
                        inputRef={fcLotNo}
                        onChange={(e) => {
                          settxt_lotNo((prevState) =>({...prevState,value:e.target.value, }));
                        }}
                        disabled={txt_lotNo.disbled} //true พิมไม่ได้
                        style={{background:txt_lotNo.style}}
                        onBlur={handletxt_Lotno}
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={ibtBack_Click}>
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
                          id="selectPdBarcode"
                          value={SlProduct.value}
                          // style={{background:SlProduct.style}}
                          onChange={(e, value) => handleSL_Product(value)}
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
                      <Typography>Lot Ref. No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        id="txtfild"
                        value={txtLotRef.value}
                        onChange={(e) => settxtLotRef((prevState) =>({...prevState,value:e.target.value, }))}
                        onBlur={handleTxt_LotRef}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     handleTxt_LotRef();
                        //   }
                        // }}
                        size="small"
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography>Operator :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        id="txtfild"
                        value={txtOperator.value}
                        onChange={(e) => settxtOperator((prevState) =>({...prevState,value:e.target.value, }))}
                        size="small"
                        fullWidth
                        inputRef={fcProduct}
                        onBlur={handleTxt_Opreator}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     handleTxt_Opreator();
                        //   }
                        // }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography>Total Sht :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography>{lblTotalSht.value}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography>Total Pcs :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography>{lblTotalPcs.value}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ display: txtRollLeaf.visble }}>
                    <TableCell align="left">
                      <Typography>Roll Leaf No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        id="txtfild"
                        size="small"
                        inputRef={fcRollleaf}
                        value={txtRollLeaf.value}
                        onChange={(e) => {
                          // settxtRollLeaf(e.target.value);
                          settxtRollLeaf((prevState) =>({...prevState,value:e.target.value, }))
                        }}
                        onBlur={handleTxt_RollLeaf}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     handleTxt_RollLeaf();
                        //   }
                        // }}
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ display: txtMachineNo.visble }}>
                    <TableCell align="left">
                      <Typography>Machine No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        id="txtfild"
                        size="small"
                        value={txtMachineNo.value}
                        onChange={(e) =>  settxtMachineNo((prevState) =>({...prevState,value:e.target.value, }))}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     handle();
                        //   }}}
                        fullWidth
                        inputRef={fctMachchine}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* visiblgvBackSide */}
              { txtSideBack.visble== true && (
                <Table component={Paper} className="gvBackSideBarcode">
                  <TableBody>
                    {Array.from({ length: hfShtScan }, (_, index) => (
                      <TableRow
                        key={index}
                        style={{ backgroundColor: "White" }}
                      >
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #d9d9d9" }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #d9d9d9" }}
                        >
                          {hfBarcodeSide === "F"
                            ? "Back/Front :"
                            : "Front/Back :"}
                        </TableCell>
                        <TableCell>
                          {" "}
                          <TextField
                            id="txtfild"
                            size="small"
                            fullWidth
                            value={txtSideBack.value[index]}
                            inputRef={fcGvBackSide_txtsideback_0}
                            onChange={(event) =>
                              handleBackSideChange(index, event)
                            }
                          />
                          <TextField
                            id="txtfild"
                            size="small"
                            fullWidth
                            value={txtSideFront[index]}
                            onChange={(event) =>
                              handleFrontSideChange(index, event)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {lblLog.visble  == true && (
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
                  {lblLog.value}
                </Card>
              )}
              {dataGvSerial.visble == true && (
                <Table className="CSS-GvSerialBarcode" component={Card}>
                  <TableHead>
                    <TableCell
                      sx={{ borderRight: "1px solid #d9d9d9" }}
                      align="center"
                    >
                      Sheet
                    </TableCell>

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
                    {Array.from({ length: hfSerialCount }, (_, index) => (
                      <TableRow key={index}>
                        <TableCell
                          sx={{ borderRight: "1px solid #d9d9d9" }}
                          align="center"
                        >
                          {hfShtScan}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ borderRight: "1px solid #d9d9d9" }}
                        >
                          {index + 1}
                        </TableCell>
                       
                        <TableCell>
                          {" "}
                          <TextField
                            id="txtfild"
                            size="small"
                            fullWidth
                            inputRef={fcGvSerial_txtSerial_0}
                            value={txtSerial[index]}
                            onChange={(event) =>
                              handleSerialChange(index, event)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow style={{display:lblConfirm.visble}}>
                      <TableCell align="center" colSpan={3}>
                        Please be confirm to save?
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={btnSave_Click}
                        >
                          Yes
                        </Button>{" "}
                        &nbsp;&nbsp;
                        <Button
                          variant="contained"
                          size="small"
                          color="error"
                          onClick={btnCancel_Click}
                        >
                          Cancel
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </Grid>
            {/* border:'1PX SOLID green' */}
            <Grid
              item
              xs={10}
              md={7}
              style={{
                margin: "auto",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {gvScanResult.visble == false && (
                <> <img
                style={{
                  width: "420px",
                  height: "350px",
                  marginBottom: "30px",
                }}
                src={Pageimg} // Import the image
                alt="Description of the image"
              /></>)}
             
              {/* visiblegvScanResult */}
              {gvScanResult.visble == true && (
                <>
                  <Paper
                    className="Card-lblResult"
                    elevation={3}
                    style={{
                      background: lblResult !== 'OK' ? "#ff4d4f" : "green", 
                      // display: gvScanResult,
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{ paddingTop: "3px", color: "#fff" }}
                    >
                      {lblResult}
                    </Typography>
                  </Paper>
                  <Table
                    className="CSS-GvScanResult"
                    // style={{ display: gvScanResult }}
                    component={Card}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{ borderRight: "1px solid #d9d9d9" }}
                          width="50px"
                        >
                          SHEET
                        </TableCell>
                        <TableCell
                          sx={{ borderRight: "1px solid #d9d9d9" }}
                          width="50px"
                        >
                          No.
                        </TableCell>
                        <TableCell
                          sx={{ borderRight: "1px solid #d9d9d9" }}
                          width="250px"
                        >
                          Serial No.
                        </TableCell>
                        <TableCell
                          sx={{ borderRight: "1px solid #d9d9d9" }}
                          width="100px"
                        >
                          Grade
                        </TableCell>
                        <TableCell
                          sx={{ borderRight: "1px solid #d9d9d9" }}
                          width="100px"
                        >
                          Scan Result
                        </TableCell>
                        <TableCell width="380px">Remark</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.from(
                        { length: gvScanResult.value.length },
                        (_, index) => (
                          <TableRow key={index}>
                            <TableCell
                              align="center"
                              sx={{ borderRight: "1px solid #d9d9d9" }}
                            >
                              {gvScanResult.value[index].SHEET}
                            </TableCell>
                            <TableCell
                            align="center"
                              sx={{ borderRight: "1px solid #d9d9d9" }}
                            >
                              {gvScanResult.value[index].SEQ}
                            </TableCell>
                            <TableCell
                              sx={{ borderRight: "1px solid #d9d9d9" }}
                            >
                              {gvScanResult.value[index].SERIAL}
                            </TableCell>
                            <TableCell
                            align="center"
                              sx={{ borderRight: "1px solid #d9d9d9" }}
                            >
                              {gvScanResult.value[index].SERIAL_GRADE}
                            </TableCell>
                            <TableCell
                            align="center"
                            sx={{
                              borderRight: "1px solid #d9d9d9",
                              background: gvScanResult.value[index].SCAN_RESULT === '' 
                                ? '' 
                                : gvScanResult.value[index].SCAN_RESULT === 'OK' 
                                ? 'green' 
                                : '#ff4d4f'
                            }}
                            
                            >
                              {gvScanResult.value[index].SCAN_RESULT}
                            </TableCell>
                            <TableCell
                              sx={{ borderRight: "1px solid #d9d9d9" }}
                            >
                              {gvScanResult.value[index].REMARK}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default ConfirmBarcodeGrade;
