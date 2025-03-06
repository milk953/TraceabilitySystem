import React, { useState, useEffect } from "react";
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
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Autocomplete,
  Box,
  Tooltip,
} from "@mui/material";
import { Table as AntTable, Button as AntButton } from "antd";
import "../Common/StyleCommon.css";
import Pageimg from "/src/assets/1.jpg";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Header from "../Header/Header";
import "./ScanSMTSerialShtMaster.css";
import { fn_ScanSMTSerialShtMaster } from "./fn_ScanSMTSerialShtMaster";
import { fn_Homepage } from "../Homepage/fn_Homepage";

function ScanSMTSerialShtMaster() {
  const { menuName } = fn_Homepage();
  const {
    txtLotNo,
    settxtLotNo,
    selProduct,
    Productdata,
    txtLotRef,
    settxtLotRef,
    txtMasterCode,
    settxtMasterCode,
    lblTotalSht,
    lblTotalPcs,
    txtRollLeaf,
    settxtRollLeaf,
    txtMachineNo,
    settxtMachineNo,
    pnlRollLeaf,
    pnlMachine,
    pnlLog,
    lblLog,
    lblResult,
    lblResultcolor,
    pnlBackSide,
    txtSideBack,
    pnlFrontSide,
    txtSideFront,
    pnlSerial,
    gvSerialData,
    gvScanResult,
    gvScanData,
    txtgvSerial,
    txtLotDisabled,
    selProDisabled,
    txtRollLeafDisabled,
    inputLot,
    ddlProduct,
    inputRollLeaf,
    inputMachineNo,
    inputSideBack,
    inputgvSerial,
    inputMasterCode,
    handleChangeLot,
    ibtBackClick,
    handleChangeProduct,
    handleChangeLotRef,
    handleChangeMasterCode,
    handleChangeRollLeaf,
    handleChangeMachine,
    handleChangeSerial,
    handleChangegvBackSide,
    handleChangegvFontSide,
    btnSaveClick,
    btnCancelClick,
    handleKeygvSerial,
    handleKeySideBack,
    columns,
    gvBackSide,
    settxtgvSerial
  } = fn_ScanSMTSerialShtMaster();
  let data=[]
  return (
    <div>
      <Header />
      <Card component={Paper} className="Card-Common" sx={{ display: "flex" }}>
        <Box justifyContent="space-between">
          <TableContainer
            component={Card}
            style={{
              width: "430px",
              //margin: "3px",
            }}
          >
            <Table className="Header_Left">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    {menuName ? menuName : "Master Connect Sht&Pcs"}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Lot No. :</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      className="input_txt"
                      size="small"
                      inputRef={(el) => (inputLot.current = el)}
                      fullWidth
                      value={txtLotNo.trim()}
                      disabled={txtLotDisabled}
                      style={{
                        backgroundColor: txtLotDisabled ? "#e0e0e0" : "inherit",
                      }}
                      onChange={(e) => {
                        settxtLotNo(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeLot();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button className="Bt_ibtBack" onClick={ibtBackClick}>
                      <Tooltip title="Clear Lot" placement="right-end">
                        <BackspaceIcon className="Icon_ibtBack" />
                      </Tooltip>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Product :</Typography>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <Autocomplete
                      className="Select_dropDown"
                      disabled={selProDisabled}
                      style={{
                        backgroundColor: selProDisabled ? "#e0e0e0" : "inherit",
                      }}
                      value={selProduct}
                      onChange={(e, value) => handleChangeProduct(value)}
                      options={Productdata.map((item) => item.prd_name)}
                      renderInput={(params) => (
                        <TextField
                          inputRef={(el) => (ddlProduct.current = el)}
                          {...params}
                          size="small"
                          sx={{ textAlign: "left" }}
                        />
                      )}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Lot Ref. No. :</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      className="input_txt"
                      size="small"
                      fullWidth
                      value={txtLotRef}
                      onChange={(e) => {
                        settxtLotRef(e.target.value.trim().toUpperCase());
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeLotRef();
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Master Code :</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      className="input_txt"
                      size="small"
                      inputRef={(el) => (inputMasterCode.current = el)}
                      fullWidth
                      value={txtMasterCode}
                      onChange={(e) => {
                        settxtMasterCode(e.target.value.trim().toUpperCase());
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeMasterCode();
                        }
                      }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Total Sht :</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{lblTotalSht}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Total Pcs :</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{lblTotalPcs}</Typography>
                  </TableCell>
                </TableRow>
                {pnlRollLeaf && (
                  <>
                    <TableRow>
                      <TableCell>
                        <Typography>Roll Leaf No. :</Typography>
                      </TableCell>
                      <TableCell>
                        <TextField
                          className="input_txt"
                          size="small"
                          inputRef={(el) => (inputRollLeaf.current = el)}
                          fullWidth
                          value={txtRollLeaf.trim()}
                          disabled={txtRollLeafDisabled}
                          style={{
                            backgroundColor: txtRollLeafDisabled
                              ? "#e0e0e0"
                              : "inherit",
                          }}
                          onChange={(e) => {
                            settxtRollLeaf(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleChangeRollLeaf();
                            }
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  </>
                )}

                {pnlMachine && (
                  <TableRow>
                    <TableCell>
                      <Typography>Machine No. :</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        className="input_txt"
                        size="small"
                        inputRef={(el) => (inputMachineNo.current = el)}
                        fullWidth
                        value={txtMachineNo.trim()}
                        onChange={(e) => {
                          settxtMachineNo(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleChangeMachine();
                          }
                        }}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {pnlBackSide && (
            <div className="divgvBackSideMas">
              <TableContainer
                component={Card}
                style={{
                  width: "430px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  border: "1px solid #d9d9d9",
                }}
              >
                <Table>
                  <TableBody>
                    {Array.from({ length: gvBackSide.length }, (_, index) => (
                      <TableRow key={index}>
                        <TableCell
                          sx={{ borderRight: "1px solid #d9d9d9" }}
                          align="center"
                        >
                          {gvBackSide[index].SEQ}
                        </TableCell>
                        <TableCell>
                          <TextField
                            className="input_txt"
                            size="small"
                            fullWidth
                            value={txtSideBack[index] || ""}
                            inputRef={(el) =>
                              (inputSideBack.current[index] = el)
                            }
                            onChange={(e) => {
                              handleChangegvBackSide(index, e);
                            }}
                            onKeyDown={(e) => handleKeySideBack(e, index)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}

          {pnlFrontSide && (
            <div className="divgvFrontSideShtMas">
              <TableContainer
                component={Card}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  border: "1px solid #dcdcdc",
                }}
              >
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        sx={{ borderRight: "1px solid #d9d9d9" }}
                        align="center"
                      ></TableCell>
                      <TableCell>
                        <TextField
                          className="input_txt"
                          size="small"
                          fullWidth
                          value={txtSideFront}
                          onChange={(e) => {
                            handleChangegvFontSide(e.target.value);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}

          {pnlLog && (
            <Paper
              elevation={3}
              className="Card-lblLog"
              style={{
                width: "433px",
                //marginLeft: "23px",
              }}
            >
              {lblLog}
            </Paper>
          )}

          {pnlSerial && (
            <div className="divgvSerialShtMas">
              <TableContainer
                component={Card}
                style={{
                  width: "430px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "1px solid #d9d9d9",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sheet</TableCell>
                      <TableCell>No.</TableCell>
                      <TableCell>Serial No.</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {Array.from({ length: gvSerialData.length }, (_, index) => ( */}
                    {txtgvSerial.map((serial, index) => (
                      <tr key={index} style={{borderBottom:'1px solid #d9d9d9'}}>
                        <td
                          style={{ borderRight: "1px solid #d9d9d9" }}
                          align="center"
                        >
                          {gvSerialData[index].SHEET}
                        </td>
                        <td
                          style={{ borderRight: "1px solid #d9d9d9" }}
                          align="center"
                        >
                          {gvSerialData[index].SEQ}
                        </td>
                        <td>
                          <input
                            className="styleSeraial"
                           
                            defaultValue={serial}
                            ref={(el) =>
                              (inputgvSerial.current[index] = el)
                            }
                            onChange={(e) => {
                              data = handleChangeSerial(index, e);
                            }}
                            // onKeyDown={(e) => handleKeygvSerial(e, index)}
                            onKeyDown={async(event) => {
                            
                              if (event.key === "Enter") {
                                event.preventDefault();
                                data= await handleChangeSerial(index, event)
                                if (index < txtgvSerial.length - 1) {
                                  inputgvSerial.current[
                                    index + 1
                                  ].focus();
                              
                                } else {
                                  event.target.blur();
                                  settxtgvSerial(data);
                                  btnSaveClick(data);
                                }
                              }
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </TableBody>
                </Table>
                <div
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    justifyContent: "center",
                    // marginLeft: "5px",
                    // marginBottom: "2px"
                  }}
                >
                  <AntButton
                    className="BtSave"
                    type="primary"
                    // onClick={btnSaveClick}
                    onClick={() => {
                      settxtgvSerial(data);
                      btnSaveClick(data);
                    }}
                  >
                    Save
                  </AntButton>
                  &nbsp;&nbsp;
                  <AntButton
                    className="ButtonDelete"
                    style={{ height: "30px" }}
                    type="primary"
                    onClick={btnCancelClick}
                  >
                    Cancel
                  </AntButton>
                </div>
              </TableContainer>
            </div>
          )}
        </Box>

        <div className="divgvScanResultShtMas">
          {gvScanResult === false && (
            <>
              <img
                className="Img_GvResult"
                style={{ marginLeft: "35%" }}
                src={Pageimg} // Import the image
                alt="Description of the image"
              />
            </>
          )}

          {gvScanResult && (
            <>
              <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                <Paper
                  className="Card-lblResult"
                  style={{
                    background: lblResultcolor,
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{ paddingTop: "5px", color: "#fff" }}
                  >
                    {lblResult}
                  </Typography>
                </Paper>
              </div>

              <AntTable
                columns={columns}
                dataSource={gvScanData}
                rowKey={(record) => record.SEQ}
                style={{ width: "100%" }}
                pagination={false}
                size="small"
                bordered
                className="tableGvResult"
                rowClassName={(record) =>
                  record.SCAN_RESULT === "NG"
                    ? "row-red"
                    : record.SCAN_RESULT === "OK"
                    ? "row-green"
                    : ""
                }
              />
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

export default ScanSMTSerialShtMaster;
