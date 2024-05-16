import React, { useEffect } from "react";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TableHead,
  TableContainer,
  Box,
  Tooltip,
  Autocomplete,
  Grid,
  Paper,
} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSMTSerialShtFINManySht.css";
import Hearder from "../Header/Hearder";
import { fn_ScanSMTSerialShtFINManySht } from "./fn_ScanSMTSerialShtFINManySht";
import { Input } from "antd";
function ScanSMTSerialShtFINManySht() {
  const {
    lot,
    setLot,
    product,
    setProduct,
    selectproduct,
    setselectproduct,
    getIntialSheet,
    dtData1,
    setDtData1,
    lblError,
    setLblError,
    lblErrorState,
    setLblErrorState,
    productState,
    setProductState,
    getInitialSerial,
    serialData,
    setSerialData,
    handleSave,
    handleCancel,
    panalSerialOpen,
    setPanalSerialOpen,
    pnlRollLeafOpen,
    setPnlRollLeafOpen,
  } = fn_ScanSMTSerialShtFINManySht();
  return (
    <div>
      <Hearder />
      <div className="Head">
        <Table className="mainTable" component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3}>FIN Connect Sht & Pcs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Lot No.:</TableCell>
              <TableCell>
                <TextField size="small" id="txtLot"></TextField>
              </TableCell>
              <TableCell>
                <Button>
                  <BackspaceIcon />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Product:</TableCell>
              <TableCell>
                <FormControl fullWidth>
                  <Autocomplete
                    readOnly={false}
                    value={selectproduct}
                    onChange={(e, value) => setselectproduct(value)}
                    options={product.map((item) => item[0])}
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
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lot Ref. No.:</TableCell>
              <TableCell>
                <TextField size="small"></TextField>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Operator:</TableCell>
              <TableCell>
                <TextField size="small"></TextField>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Sht:</TableCell>
              <TableCell>
                <TextField size="small"></TextField>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Pcs:</TableCell>
              <TableCell>
                <TextField size="small"></TextField>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            {pnlRollLeafOpen && (
              <>
                <TableRow>
                  <TableCell>Rool Leaf No.:</TableCell>
                  <TableCell>
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Pcs:</TableCell>
                  <TableCell>
                    <TextField size="small"></TextField>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="pnlBackside">
        <Table
          className="gvBackSide"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "15px",
          }}
        >
          <TableBody>
            {dtData1.map((row, index) => (
              <TableRow key={index} style={{ backgroundColor: "White" }}>
                <TableCell
                  style={{
                    width: "3%",
                    fontWeight: "bold",
                    textAlign: "right",
                    color: "White",
                    backgroundColor: "#006666",
                  }}
                >
                  {row.SEQ}
                </TableCell>
                <TableCell
                  style={{
                    width: "40%",
                    fontWeight: "bold",
                    textAlign: "right",
                    color: "White",
                    backgroundColor: "#006666",
                  }}
                >
                  {row.TITLE}
                </TableCell>
                <TableCell
                  style={{
                    width: "70%",
                    fontSize: "15px",
                    backgroundColor: "#006666",
                    color: "Black",
                    paddingRight: "10px",
                  }}
                >
                  <Input
                    type="text"
                    style={{ width: "98%", textTransform: "uppercase" }}
                    maxLength="30"
                    className="styleEnable"
                    onKeyDown={(e) => keyenter(e.keyCode, this, "")}
                  />
                  <Input
                    type="text"
                    style={{ width: "98%", textTransform: "uppercase" }}
                    maxLength="30"
                    className="styleEnable"
                    onKeyDown={(e) => keyenter(e.keyCode, this, "")}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {panalSerialOpen && (
        <div className="pnlSerial">
          <Table
            component={Paper}
            style={{
              width: "400px",
              borderCollapse: "collapse",
              fontSize: "15px",
              margin: "auto",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    width: "3%",
                    textAlign: "right",
                    color: "White",
                    backgroundColor: "#006666",
                    fontWeight: "bold",
                  }}
                >
                  Sheet
                </TableCell>
                <TableCell
                  style={{
                    width: "40%",
                    textAlign: "right",
                    color: "White",
                    backgroundColor: "#006666",
                    fontWeight: "bold",
                  }}
                >
                  No.
                </TableCell>
                <TableCell
                  style={{
                    width: "60%%",
                    textAlign: "right",
                    color: "White",
                    backgroundColor: "#006666",
                    fontWeight: "bold",
                  }}
                >
                  Serial No.
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {serialData.map((row, index) => (
                <TableRow key={index} style={{ backgroundColor: "White" }}>
                  <TableCell style={{ width: "3%", textAlign: "right" }}>
                    {row.SEQ}
                  </TableCell>
                  <TableCell style={{ width: "40%", textAlign: "right" }}>
                    {row.TITLE}
                  </TableCell>
                  <TableCell style={{ width: "70%", paddingRight: "10px" }}>
                    <Input
                      type="text"
                      style={{ width: "98%", textTransform: "uppercase" }}
                      maxLength="30"
                      className="styleEnable"
                      onKeyDown={(e) => keyenter(e.keyCode, this, "")}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      {lblErrorState && (
        <div className="lblLog">
          <Table className="lblTbLog">
            <TableCell>{lblError}</TableCell>
          </Table>
        </div>
      )}
    </div>
  );
}

export default ScanSMTSerialShtFINManySht;
