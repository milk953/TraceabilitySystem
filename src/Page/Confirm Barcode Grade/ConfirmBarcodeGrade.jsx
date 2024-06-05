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

function ConfirmBarcodeGrade() {
  return (
    <div>
      <Hearder />
      <h1>ConfirmBarcodeGrade</h1>
      <Card component={Paper} className="Card-ScanSheetMOTTime">
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Table
            className="TableMot1"
            component={Card}
            sx={{ width: "100%", maxWidth: "420px", minWidth: "420px" }}
          >
            <TableHead>
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography variant="h5">
                    <b>confirm Barcode Grade</b>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="right" style={{}}>
                  <Typography>Master :</Typography>
                </TableCell>
                <TableCell colSpan={2}>
                  <Checkbox
                    size="small"
                    id="checkboxMaster"
                    style={{ padding: "0" }}
                    onChange={{}}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                  <Typography>Lot No. :</Typography>
                </TableCell>
                <TableCell>
                  <TextField id="txtfild" size="small" fullWidth />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    style={{ background: "#D04848" }}
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
                      //   size="small"
                      //   value={sl_Product}
                      //   onChange={(e, value) => HandleSL_Product(value)}
                      //   options={Product.map(
                      //     (item) => item.trc_001_getproductrollleafdata
                      //   )}
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
                  <TextField id="txtfild" size="small" fullWidth />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                  <Typography>Operator :</Typography>
                </TableCell>
                <TableCell colSpan={2}>
                  <TextField id="txtfild" size="small" fullWidth />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                  <Typography> Total Sht :</Typography>
                </TableCell>
                <TableCell colSpan={2}>
                  <Typography>lblTotalSht</Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                  <Typography>Total Pcs :</Typography>
                </TableCell>
                <TableCell colSpan={2}>
                  <Typography>lblTotalPcs</Typography>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                  <Typography>Roll Leaf No. :</Typography>
                </TableCell>
                <TableCell colSpan={2}>
                  <TextField id="txtfild" size="small" fullWidth />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">
                  <Typography>Machine No. :</Typography>
                </TableCell>
                <TableCell colSpan={2}>
                  <TextField id="txtfild" size="small" fullWidth />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <img
            style={{
              width: "540px",
              height: "400px",
              marginLeft: "10%",
            }}
            src="src/assets/1.jpg" // Import the image
            alt="Description of the image"
          />
        </Box>
      </Card>
    </div>
  );
}

export default ConfirmBarcodeGrade;
