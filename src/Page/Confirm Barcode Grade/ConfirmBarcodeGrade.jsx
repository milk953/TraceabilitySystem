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
    visibleLog
  } = fn_ConfirmBarcodeGrade();
  return (
    <div>
      <Hearder />
      <h1>ConfirmBarcodeGrade</h1>
      <Card component={Paper} className="Card-ConfirmBarcode">
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
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Roll Leaf No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        id="txtfild"
                        size="small"
                        value={txtRollLeaf}
                        onChange={(e) => settxtRollLeaf(e.target.value)}
                        fullWidth
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
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
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* {console.log(
                visiblgvBackSide,
                "visiblgvBackSide",
                hfShtScan,
                hfBarcodeSide
              )} */}
             
            
              {/* style={{ background: "red" }} */}

              
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
                            // value={txtLeafNo[index]}
                            // onChange={(event) => handleTextFieldChange(index, event)}
                          />
                          <TextField
                            id="txtfild"
                            size="small"
                            fullWidth
                            // value={txtLeafNo[index]}
                            // onChange={(event) => handleTextFieldChange(index, event)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
              {visibleLog == true && (
               <Card component={Paper} style={{width:'400px',height:'40px',marginTop:'30px',textAlign:'center'}}>{lblLog}</Card>
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
                          No.
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
                            // value={txtLeafNo[index]}
                            // onChange={(event) => handleTextFieldChange(index, event)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell align="center" colSpan={3} >
                        Please be confirm to save?
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <Button  variant="contained" size="small">Yes</Button> &nbsp;&nbsp;
                        <Button  variant="contained" size="small"  color="error">Cancel</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </Grid>
            {/* <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid red' }}>
              <img
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                src="src/assets/1.jpg" // Make sure the path to the image is correct
                alt="Description of the image"
              />
            </Grid> */}
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default ConfirmBarcodeGrade;
