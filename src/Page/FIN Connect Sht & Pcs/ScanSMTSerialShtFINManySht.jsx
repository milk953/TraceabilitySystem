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
  Card,
  Typography,
} from "@mui/material";

import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSMTSerialShtFINManySht.css";
import Hearder from "../Header/Hearder";
import { fn_ScanSMTSerialShtFINManySht } from "./fn_ScanSMTSerialShtFINManySht";
import { Input } from "antd";
import { DisplaySettings } from "@mui/icons-material";
function ScanSMTSerialShtFINManySht() {
  const {
    lot,
    setLot,
    product,
    selectproduct,
    setselectproduct,
    dtData1,
    lblLog,
    lblLogState,
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
    fctextFieldlot,
    ibtBack,
    fctextFieldMachine,
    fctextFileRollLeaf,
    fcddlProduct,
    fctxtSideBack,
    fcgvSerial,
    fcOpertor,
    txtRollLeaf,
    txtLotRef,
    handleProductChange,
    txtLotRef_TextChanged,
    gvbacksideOpen,
    lblresultOpen,
    ShowTableResult,
    imageSize,
    gvBackSide_txtSideback_0,
    gvBackSide_txtSideback_0_Change,
    txtOperator_TextChanged,
    txtRollLeaf_TextChanged,
    txtOperator,
    handleFrontSideChange,
    txtSideFront,
    fctxtsideFront,
    handleBackSideChange,
    txtSideBack,
    handleFrontSide2Change,
    txtSideFront2,
    handleCancel,
  } = fn_ScanSMTSerialShtFINManySht();
  useEffect(() => {
    if (gvbacksideOpen === true) {
      fctxtSideBack.current.focus();
    }
  }, [gvbacksideOpen]);
  return (
    <div>
      <Hearder />
      <h1>ScanSMTRoollSht</h1>
      <Card
        component={Paper}
        style={{
          margin: "auto",
          width: "95%",
          maxWidth: "1400px",
          marginTop: "50px",
          maxHeight: "1200px",
          minHeight: "200px",
          padding: "20px",
          overflow: "auto",
        }}
      >
        <table>
          <tr>
            <td className="maintd">
              <Table className="mainTable" component={Paper}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      FIN Connect Sht & Pcs
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: "400px" }}>Lot No.:</TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        id="txtField"
                        value={lot}
                        inputRef={fctextFieldlot}
                        onChange={(e) => {
                          txtLottxtChange(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtLottxtChange(e.target.value);
                          }
                        }}
                      ></TextField>
                    </TableCell>
                    <TableCell>
                      <Button onClick={ibtBack}>
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
                          options={product.map((item) => item.prd_name)}
                          value={selectproduct}
                          onInputChange={handleProductChange}
                          getOptionLabel={(option) => option}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              inputRef={fcddlProduct}
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
                      <TextField
                        size="small"
                        id="txtField"
                        value={txtLotRef}
                        onChange={txtLotRef_TextChanged}
                      ></TextField>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Operator:</TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        id="txtField"
                        inputRef={fcOpertor}
                        value={txtOperator}
                        onChange={(e) => {
                          txtOperator_TextChanged(e.target.value);
                        }}
                      ></TextField>
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
                          <TextField
                            size="small"
                            id="txtField"
                            inputRef={fctextFileRollLeaf}
                            value={txtRollLeaf}
                            onChange={(e) => {
                              txtRollLeaf_TextChanged(e.target.value);
                            }}
                          ></TextField>
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
                          <TextField
                            size="small"
                            id="txtField"
                            inputRef={fctextFieldMachine}
                          ></TextField>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </td>
            <td
              style={{
                textAlign: "left",
                width: "900px",
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                padding: "0",
                margin: "0",
                verticalAlign: "top",
              }}
            >
              <img
                style={imageSize}
                src="src/assets/1.jpg"
                alt="Description of the image"
              />
              {lblresultOpen && (
                <div className="lblResult">
                  {lblresultState && (
                    <Paper
                      className="lblResultCard"
                      elevation={3}
                      style={{
                        alignItems: "center",
                        background: " #ff4d4f",
                        display: gvScanResult,
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{ paddingTop: "5px", color: "#fff" }}
                      >
                        {lblresult}
                      </Typography>
                    </Paper>
                  )}
                  {gvScanResultState && (
                    <Table
                      id="gvScanResult"
                      component={Paper}
                      style={{ width: "900px" ,margunBottom:"20px"}}
                    >
                      <TableHead sx={{ height: "20px" }}>
                        <TableRow>
                          <TableCell
                            sx={{
                              width: "70px",
                              height: "10px",
                              padding: "0px",
                            }}
                          >
                            Sheet No.
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "70px",
                              height: "10px",
                              padding: "1px",
                            }}
                          >
                            No.
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "100px",
                              height: "10px",
                              padding: "1px",
                            }}
                          >
                            Serial No.
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "70px",
                              height: "10px",
                              padding: "0px",
                            }}
                          >
                            Scan Result
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "300px",
                              height: "10px",
                              padding: "0px",
                            }}
                          >
                            Remark
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {gvScanResult.map((row, index) => (
                          <TableRow key={index}>
                            <TableCell id="gvScanResultSheet">
                              {row.SHEET}
                            </TableCell>
                            <TableCell id="gvScanResultSeq">
                              {row.SEQ}
                            </TableCell>
                            <TableCell id="gvScanResultSerial">
                              {row.SERIAL}
                            </TableCell>
                            <TableCell id="gvScanResultScan">
                              {row.SCAN_RESULT}
                            </TableCell>
                            <TableCell id="gvScanResultRemark">
                              {row.REMARK}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                     
                  )}
                   &nbsp; &nbsp;
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {gvbacksideOpen && (
                <div className="pnlBackside">
                  <Table component={Paper} className="gvBackSide">
                    <TableBody>
                      {dtData1.map((row, index) => (
                        <TableRow
                          key={index}
                          style={{ backgroundColor: "White" }}
                        >
                          <TableCell>{row.SEQ}</TableCell>
                          <TableCell>{row.TITLE}</TableCell>
                          <TableCell>
                            <Input
                              type="text"
                              style={{
                                width: "98%",
                                textTransform: "uppercase",
                              }}
                              maxLength="30"
                              className="styleEnable"
                              ref={fctxtSideBack}
                              value={txtSideBack[index]}
                              onChange={(e) => handleBackSideChange(index, e)}
                            />
                            <Input
                              type="text"
                              style={{
                                width: "98%",
                                textTransform: "uppercase",
                              }}
                              maxLength="30"
                              inputRef={fctxtsideFront}
                              className="styleEnable"
                              value={txtSideFront2[index]}
                              onChange={(e) => handleFrontSide2Change(index, e)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              {lblLogState && (
                <div className="lblLog">
                  <Table className="lblTbLog">
                    <TableCell>{lblLog}</TableCell>
                  </Table>
                </div>
              )}
              <div className="panelgvSerial">
                {panalSerialOpen && (
                  <Table classname="gvSerial" component={Paper}>
                    <TableHead className="gvSerialHead">
                      <TableRow>
                        <TableCell className="gvSerialCell">Sheet</TableCell>
                        <TableCell className="gvSerialCell">No.</TableCell>
                        <TableCell className="gvSerialCell">
                          Serial No.
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {serialData.map((row, index) => (
                        <TableRow
                          key={index}
                          style={{ padding: "4px 4px 4px 4px" }}
                        >
                          <TableCell
                            className="gvSerialCell"
                            style={{ width: "3%", textAlign: "right" }}
                          >
                            {row.SHEET}
                          </TableCell>
                          <TableCell
                            className="gvSerialCell"
                            style={{ width: "40%", textAlign: "right" }}
                          >
                            {row.SEQ}
                          </TableCell>
                          <TableCell
                            className="gvSerialCell"
                            style={{ width: "70%", paddingRight: "10px" }}
                          >
                            <Input
                              type="text"
                              style={{
                                width: "98%",
                                textTransform: "uppercase",
                              }}
                              maxLength="30"
                              className="styleEnable"
                              value={txtSideFront[index]}
                              onChange={(e) => handleFrontSideChange(index, e)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          style={{
                            textAlign: "center",
                            padding: "3px",
                            gap: "10px",
                          }}
                        >
                          <Button className="BtSave" onClick={ShowTableResult}>
                            OK
                          </Button>
                          &nbsp;&nbsp;
                          <Button className="BtCancel" onClick={handleCancel}>
                            {" "}
                            Cancel
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                )}
              </div>
            </td>
          </tr>
        </table>
      </Card>
    </div>
  );
}

export default ScanSMTSerialShtFINManySht;
