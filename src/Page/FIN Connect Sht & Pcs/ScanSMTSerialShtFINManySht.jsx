import React, { useEffect, useState } from "react";
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
import axios from "axios";
function ScanSMTSerialShtFINManySht() {
  const {
    lot,
    product,
    selectproduct,
    setselectproduct,
    dtData1,
    lblError,
    lblErrorState,
    serialData,
    panalSerialOpen,
    pnlRollLeafOpen,
    lblCheckRoll,
    pnlMachineOpen,
    lblTotalSht,
    lblTotalPcs,
    txtLottxtChange,
    lblresult,
    gvScanResult,
    gvScanResultState,
    lblresultState,
  } = fn_ScanSMTSerialShtFINManySht();
  const handleProductChange = (event, value) => {
    setselectproduct(value);
  };

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
              <TableCell sx={{width:'400px'}}>Lot No.:</TableCell>
              <TableCell>
                <TextField
                  size="small"
                  id="txtField"
                  defaultValue={lot}
                  // onChange={(e) => txtLottxtChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      txtLottxtChange(e.target.value);
                    }
                  }}
                ></TextField>
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
                    id="ddlProduct"
                    readOnly={false}
                    options={product}
                    value={selectproduct}
                    onChange={handleProductChange}
                    getOptionLabel={(option) => option[0]}
                    renderInput={(params) => (
                      <TextField {...params} size="small" />
                    )}
                  />
                </FormControl>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Lot Ref. No.:</TableCell>
              <TableCell>
                <TextField size="small" id="txtField"></TextField>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Operator:</TableCell>
              <TableCell>
                <TextField size="small" id="txtField"></TextField>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Sht:</TableCell>
              <TableCell>{lblTotalSht}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Pcs:</TableCell>
              <TableCell>{lblTotalPcs}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            {pnlRollLeafOpen && (
              <>
                <TableRow>
                  <TableCell>Roll Leaf No.:</TableCell>
                  <TableCell>
                    <TextField size="small" id="txtField"></TextField>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Check Roll:</TableCell>
                  <TableCell>{lblCheckRoll}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </>
            )}
            {pnlMachineOpen && (
              <>
                <TableRow>
                  <TableCell>Machine No.:</TableCell>
                  <TableCell>
                    <TextField size="small" id="txtField"></TextField>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </>
            )}
          </TableBody>
        </Table>
        <div className="lblResult">
          {lblresultState && (
            <Table id="lblResult" sx={{ width: "1000px" }} component={Paper}>
              {lblresult}
            </Table>
          )}
          {gvScanResultState && (
            <Table id="gvScanResult" component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "70px" }}>Sheet No.</TableCell>
                  <TableCell sx={{ width: "70px" }}>No.</TableCell>
                  <TableCell>Serial No.</TableCell>
                  <TableCell>Scan Result</TableCell>
                  <TableCell>Remark</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gvScanResult.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell id="gvScanResultBodyNum">
                      {row.SheetNo}
                    </TableCell>
                    <TableCell id="gvScanResultBodyNum">{row.No}</TableCell>
                    <TableCell id="gvScanResultBodyTxt">
                      {row.SerialNo}
                    </TableCell>
                    <TableCell id="gvScanResultBodyNum">
                      {row.ScanResult}
                    </TableCell>
                    <TableCell id="gvScanResultBodyTxt">{row.Remark}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
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
            id="pnlSerial"
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

      {/* <Button onClick={getIntialSheet}>123</Button> */}
    </div>
  );
}

export default ScanSMTSerialShtFINManySht;
