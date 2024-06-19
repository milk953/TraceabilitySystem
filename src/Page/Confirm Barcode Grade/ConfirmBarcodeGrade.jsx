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
  Box,
  Checkbox,
  Grid,
  Input,
} from "@mui/material";
// import "/src/Page/ScanSheetMOTTime/ScanSheetMOTTime.css";
// import "/src/Page/Scan SMTRoollSht/ScanSmt.css";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import "../Confirm Barcode Grade/BarcodeGrade.css";
import Hearder from "../Header/Hearder";
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
    visiblgvBackSide,
    hfBarcodeSide,
    hfShtScan,
    hfSerialCount,
    visiblgvSerial,
    lblLog,
    visibleLog,
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
    visiblegvScanResult,
    fcRollleaf,
    fctMachchine,
    fcLotNo,
    fcOperator,
    fcProduct,
    fcGvSerial,
    fcGvBackSide_txtsideback_0,
    fcGvSerial_txtSerial_0,
    visibleRollLeaf,
    visibleMachine
  } = fn_ConfirmBarcodeGrade();
  // inputRef={}
  return (
    <div>
      <Hearder />
      <h1>ConfirmBarcodeGrade</h1>
      <Card component={Paper} className="Card-ConfirmBarcode">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2} >
            <Grid item xs={10} md={4} >
              <Table
                className="TableMot1"
                component={Card}
                sx={{ width: "100%" }}
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
                    <TableCell align="right">
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
                    <TableCell align="right">
                      <Typography>Lot No. :</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        id="txtfild"
                        size="small"
                        fullWidth
                        value={txt_lotNo}
                        inputRef={fcLotNo}
                        onChange={(e) => {
                          settxt_lotNo(e.target.value);
                        }}
                        // onChange={(e) =>  settxt_lotNo(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handletxt_Lotno();
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{ background: "#D04848" }}
                        size="small"
                        onClick={ibtBack_Click}
                      >
                        <DeleteOutlined />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Product :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <FormControl fullWidth>
                        <Autocomplete
                        inputRef={fcProduct}
                          id="selectPdBarcode"
                          value={SlProduct}
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
                    <TableCell align="right">
                      <Typography>Lot Ref. No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        id="txtfild"
                        value={txtLotRef}
                        onChange={(e) => settxtLotRef(e.target.value)}
                        size="small"
                        fullWidth
                       
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Operator :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        id="txtfild"
                        value={txtOperator}
                        onChange={(e) => settxtOperator(e.target.value)}
                        size="small"
                        fullWidth
                        inputRef={fcProduct}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Total Sht :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography>{lblTotalSht}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Total Pcs :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography>{lblTotalPcs}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow style={{display: visibleRollLeaf}}>
                    <TableCell align="right">
                      <Typography>Roll Leaf No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        id="txtfild"
                        size="small"
                        inputRef={fcRollleaf}
                        value={txtRollLeaf}
                        onChange={(e) => {
                          settxtRollLeaf(e.target.value);
                          handleTxt_RollLeaf();
                        }}
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow style={{display:visibleMachine}}>
                    <TableCell align="right">
                      <Typography>Machine No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        id="txtfild"
                        size="small"
                        value={txtMachineNo}
                        onChange={(e) => settxtMachineNo(e.target.value)}
                        fullWidth
                        inputRef={fctMachchine}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              {visiblgvBackSide == true && (
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
                            value={txtSideBack[index]}
                            inputRef={fcGvBackSide_txtsideback_0}
                             onChange={(event) => handleBackSideChange(index, event)}
                          />
                          <TextField
                            id="txtfild"
                            size="small"
                            fullWidth
                            value={txtSideFront[index]}
                             onChange={(event) => handleFrontSideChange(index, event)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {visibleLog == true && (
               <Card
               component={Paper}
               style={{
                 width: "400px",
                 height: "40px",
                 margin:'auto',
               
                 textAlign: "center",
                 background: "#BB2525",
                 paddingTop: "18px",
                 color: "yellow",  // กำหนดสีฟอนต์เป็นสีเหลือง
                 fontWeight: "bold",  // กำหนดความหนาของฟอนต์
                 marginTop: "30px",
               }}
             >
               {lblLog}
             </Card>
             
              )}
              {visiblgvSerial == true && (
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
                    <TableCell align="center">Leaf No.</TableCell>
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
                            onChange={(event) => handleSerialChange(index, event)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell align="center" colSpan={3}>
                        Please be confirm to save?
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <Button variant="contained" size="small"  onClick={btnSave_Click}>
                          Yes
                        </Button>{" "}
                        &nbsp;&nbsp;
                        <Button variant="contained" size="small" color="error"  onClick={btnCancel_Click} >
                          Cancel
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </Grid >
            {/* border:'1PX SOLID green' */}
            <Grid item xs={10} md={7} style={{ margin: 'auto', marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
            <img
                style={{
                  width: "420px",
                  height: "350px",
                  marginBottom:'30px'
                }}
                src="src/assets/1.jpg" // Import the image
                alt="Description of the image"
              />
                {visiblegvScanResult == true && (
                  <>
            <Paper
                className="Card-lblResult"
                elevation={3}
                style={{
                  background: " #ff4d4f",
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
                      Grade
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
                <TableBody>
             
                  {Array.from({ length: gvScanResult.length}, (_, index) => (
                    <TableRow key={index}>
                      <TableCell align="center" sx={{ borderRight: "1px solid #d9d9d9" }}>{gvScanResult[index].SHEET}</TableCell>
                      <TableCell sx={{ borderRight: "1px solid #d9d9d9" }}>
                       {gvScanResult[index].SEQ}
                      </TableCell>
                      <TableCell sx={{ borderRight: "1px solid #d9d9d9" }}>
                      {gvScanResult[index].SERIAL}
                      </TableCell>
                      <TableCell sx={{ borderRight: "1px solid #d9d9d9" }}>
                      {gvScanResult[index].SERIAL_GRADE}
                      </TableCell>
                      <TableCell sx={{ borderRight: "1px solid #d9d9d9" }}>
                      {gvScanResult[index].SCAN_RESULT}
                      </TableCell>
                      <TableCell sx={{ borderRight: "1px solid #d9d9d9" }}>
                      {gvScanResult[index].REMARK}
                      </TableCell>
                    </TableRow>
                  ))}
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
