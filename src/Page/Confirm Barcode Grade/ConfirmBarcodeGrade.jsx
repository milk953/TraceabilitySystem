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
  Grid 
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
    handleLotxt_Lotno,
    Product,
    Check_Master,
    setCheck_Master
  } = fn_ConfirmBarcodeGrade();
  return (
    <div>
    
      <Hearder />
      <h1>ConfirmBarcodeGrade</h1>
      <Card component={Paper} className="Card-ScanSheetMOTTime">
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table className="TableMot1" component={Card} sx={{ width: '100%' }}>
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
                        style={{ padding: '0' }}
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
                       onChange={(e) => {
                        settxt_lotNo(e.target.value);
                      }}
                      // onChange={(e) =>  settxt_lotNo(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleLotxt_Lotno();
                        }
                      }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{ background: '#D04848' }}
                        size="small"
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
                          // value={sl_Product}
                          // onChange={(e, value) => HandleSL_Product(value)}
                          options={Product.map(
                            (item) => item.prd_name
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              sx={{ textAlign: 'left' }}
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
                      <TextField id="txtfild" size="small" fullWidth />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Operator :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField id="txtfild" size="small" fullWidth />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Total Sht :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography>lblTotalSht</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Total Pcs :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <Typography>lblTotalPcs</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Roll Leaf No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField id="txtfild" size="small" fullWidth />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Machine No. :</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField id="txtfild" size="small" fullWidth />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
