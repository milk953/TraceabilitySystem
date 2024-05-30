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
    fctextFieldlot,
    ibtBack,
    fctextFieldMachine,
    fctextFileRollLeaf,
    fcddlProduct,
    fcgvBackSide_txtSideback_0,
    fcgvSerial,
    fcOpertor,
    txtRollLeaf,
    txtLotRef,
    handleProductChange,
    txtLotRef_TextChanged,
    gvbacksideOpen,
    lblresultOpen,
  } = fn_ScanSMTSerialShtFINManySht();

  return (
    <div>
      <Hearder />
      <h1>ScanSMTRoollSht</h1>
      <Card
        component={Paper}
        style={{
          margin: "auto",
          width: "90%",
          maxWidth: "1400px",
          marginTop: "50px",
          height: "auto",
          minHeight: "200px",
          padding: "20px",
        }}
      >
        <table>
          <tr>
            <td>
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
                          options={product}
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
            <td style={{ textAlign: "center", width: "900px" }}>
              <img
                style={{
                  width: "320px",
                  height: "250px",
                }}
                src="src/assets/1.jpg" // Import the image
                alt="Description of the image"
              />
              {lblresultOpen && (
                <div className="lblResult">
                  {lblresultState && (
                    <Table
                      id="lblResult"
                      sx={{ width: "400px" }}
                      component={Paper}
                    >
                      {lblresult}
                    </Table>
                  )}
                  {gvScanResultState && (
                    <Table id="gvScanResult" component={Paper}>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ width: "70px" }}>
                            Sheet No.
                          </TableCell>
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
                            <TableCell id="gvScanResultBodyNum">
                              {row.No}
                            </TableCell>
                            <TableCell id="gvScanResultBodyTxt">
                              {row.SerialNo}
                            </TableCell>
                            <TableCell id="gvScanResultBodyNum">
                              {row.ScanResult}
                            </TableCell>
                            <TableCell id="gvScanResultBodyTxt">
                              {row.Remark}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              )}
            </td>
          </tr>
          <td>
            {gvbacksideOpen && (
              <div className="pnlBackside">
                <Table component={Paper} className="gvBackSide">
                  <TableBody>
                    {console.log(dtData1)}
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
                            onKeyDown={(e) => keyenter(e.keyCode, this, "")}
                          />
                          <Input
                            type="text"
                            style={{
                              width: "98%",
                              textTransform: "uppercase",
                            }}
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
            {console.log(lblErrorState)}
            {lblErrorState && (
              <div className="lblLog">
                <Table className="lblTbLog">
                  <TableCell>{lblError}</TableCell>
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
                      <TableCell className="gvSerialCell">Serial No.</TableCell>
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
                          {row.SEQ}
                        </TableCell>
                        <TableCell
                          className="gvSerialCell"
                          style={{ width: "40%", textAlign: "right" }}
                        >
                          {row.TITLE}
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
                            onKeyDown={(e) => keyenter(e.keyCode, this, "")}
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
                        <Button className="BtSave">OK</Button>
                        &nbsp;&nbsp;
                        <Button className="BtCancel"> Cancel</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </div>
          </td>
        </table>
      </Card>
    </div>
  );
}

export default ScanSMTSerialShtFINManySht;
