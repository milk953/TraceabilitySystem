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
import "../Common/StyleCommon.css";
import { Table as AntTable, Button as AntButton } from "antd";
import { fn_ConfirmBarcodeGrade } from "./fn_ConfirmBarcodeGrade";
import { fn_Homepage } from "../Homepage/fn_Homepage";
function ConfirmBarcodeGrade() {
  const { menuName } = fn_Homepage();
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
    dataGvSerial,
    fcGvBackSide_txtsideback_1,
    columns,
  } = fn_ConfirmBarcodeGrade();

  return (
    <div>
      <Hearder />
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table className="Header_Left" component={Card}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      {/* <Typography variant="h5">
                        Confirm Barcode Grade
                      </Typography> */}
                      {menuName}
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
                        onChange={(e) => setCheck_Master(e.target.checked)} //trueเลือก false ไม่ได้เลือก
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      <Typography>Lot No. :</Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        className="input_txt"
                        size="small"
                        fullWidth
                        value={txt_lotNo.value}
                        // inputRef={fcLotNo}
                        inputRef={(el) => (fcLotNo.current = el)}
                        onChange={(e) => {
                          settxt_lotNo((prevState) => ({
                            ...prevState,
                            value: e.target.value.trim(),
                          }));
                        }}
                        disabled={txt_lotNo.disbled} //true พิมไม่ได้
                        style={{ background: txt_lotNo.style }}
                        // onBlur={handletxt_Lotno}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handletxt_Lotno();
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button className="Bt_ibtBack" onClick={ibtBack_Click}>
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
                          // inputRef={fcProduct}

                          className="Select_dropDown"
                          disabled={SlProduct.disbled}
                          value={SlProduct.value}
                          style={{ background: SlProduct.style }}
                          onChange={(e, value) => handleSL_Product(value)}
                          options={Product.map((item) => item.prd_name)}
                          renderInput={(params) => (
                            <TextField
                              inputRef={(el) => (fcProduct.current = el)}
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
                        className="input_txt"
                        value={txtLotRef.value}
                        onChange={(e) =>
                          settxtLotRef((prevState) => ({
                            ...prevState,
                            value: e.target.value.trim(),
                          }))
                        }
                        // onBlur={handleTxt_LotRef}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleTxt_LotRef();
                          }
                        }}
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
                        className="input_txt"
                        value={txtOperator.value}
                        disabled={txtOperator.disbled}
                        style={{ background: txtOperator.style }}
                        onChange={(e) =>
                          settxtOperator((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }))
                        }
                        size="small"
                        fullWidth
                        inputRef={(el) => (fcOperator.current = el)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleTxt_Opreator();
                          }
                        }}
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
                        className="input_txt"
                        size="small"
                        // inputRef={fcRollleaf}
                        inputRef={(el) => (fcRollleaf.current = el)}
                        value={txtRollLeaf.value}
                        onChange={(e) => {
                          // settxtRollLeaf(e.target.value);
                          settxtRollLeaf((prevState) => ({
                            ...prevState,
                            value: e.target.value.trim(),
                          }));
                        }}
                        // onBlur={handleTxt_RollLeaf}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleTxt_RollLeaf();
                          }
                        }}
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
                        className="input_txt"
                        size="small"
                        value={txtMachineNo.value}
                        onChange={(e) =>
                          settxtMachineNo((prevState) => ({
                            ...prevState,
                            value: e.target.value.trim(),
                          }))
                        }
                        fullWidth
                        inputRef={(el) => (fctMachchine.current = el)}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {/* visiblgvBackSide */}

              {txtSideBack.visble == true && (
                <Table component={Paper} className="gvBackSideBarcode">
                  <TableBody>
                    {Array.from({ length: hfShtScan }, (_, index) => (
                      <React.Fragment key={index}>
                        <TableRow style={{ backgroundColor: "White" }}>
                          <TableCell
                            align="center"
                            sx={{ borderRight: "1px solid #d9d9d9" }}
                            rowSpan={2} // ผสานเซลล์ในแนวตั้ง 2 แถว
                          >
                            {index + 1}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ borderRight: "1px solid #d9d9d9" }}
                            rowSpan={2} // ผสานเซลล์ในแนวตั้ง 2 แถว
                          >
                            {hfBarcodeSide === "F"
                              ? "Back/Front :"
                              : "Front/Back :"}
                          </TableCell>
                          <TableCell>
                            <TextField
                              className="input_txt"
                              size="small"
                              fullWidth
                              value={txtSideBack.value[index]}
                              onChange={(event) =>
                                handleBackSideChange(index, event)
                              }
                              inputRef={(el) =>
                                (fcGvBackSide_txtsideback_0.current[index] = el)
                              }
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                  fcGvBackSide_txtsideback_1.current[
                                    index
                                  ].focus();
                                }
                              }}
                            />
                          </TableCell>
                        </TableRow>

                        <TableRow style={{ backgroundColor: "White" }}>
                          <TableCell>
                            <TextField
                              className="input_txt"
                              size="small"
                              fullWidth
                              style={{ width: "100%" }}
                              value={txtSideFront[index]}
                              onChange={(event) =>
                                handleFrontSideChange(index, event)
                              }
                              inputRef={(el) =>
                                (fcGvBackSide_txtsideback_1.current[index] = el)
                              }
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                  if (index < hfShtScan - 1) {
                                    fcGvBackSide_txtsideback_0.current[
                                      index + 1
                                    ].focus();
                                  } else {
                                    fcGvSerial_txtSerial_0.current[0].focus();
                                  }
                                }
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              )}

              {lblLog.visble == true && (
                <Card
                  component={Paper}
                  className="Card-lblLog"
                  style={{ marginTop: "10px" }}
                >
                  {lblLog.value}
                </Card>
              )}

              {dataGvSerial.visble == true && (
                <Table
                  className="CSS-GvSerialBarcode"
                  component={Card}
                  style={{ marginTop: "10px" }}
                >
                  <TableHead>
                    <TableCell
                      sx={{ borderRight: "1px solid #d9d9d9", width: "10PX" }}
                      align="center"
                    >
                      Sheet
                    </TableCell>

                    <TableCell
                      sx={{ borderRight: "1px solid #d9d9d9" }}
                      align="center"
                    >
                      No...
                    </TableCell>
                    <TableCell align="center">Serial No.</TableCell>
                    <TableRow></TableRow>
                  </TableHead>
                  <TableBody>
                    {txtSerial.map((serial, index) => (
                      <tr
                        key={index}
                        style={{ borderBottom: "1px solid  #d9d9d9" }}
                      >
                        <td
                          style={{ borderRight: "1px solid  #d9d9d9" }}
                          align="center"
                        >
                          {dataGvSerial.value[index].SHEET}
                        </td>
                        <td
                          align="center"
                          style={{ borderRight: "1px solid  #d9d9d9" }}
                        >
                          {dataGvSerial.value[index].SEQ}
                        </td>
                        <td>
                          <input
                            className="txtinput"
                            type="text"
                            value={serial}
                            onChange={(event) =>
                              handleSerialChange(index, event)
                            }
                            ref={(el) =>
                              (fcGvSerial_txtSerial_0.current[index] = el)
                            }
                            onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                if (index < txtSerial.length - 1) {
                                  fcGvSerial_txtSerial_0.current[
                                    index + 1
                                  ].focus();
                                } else {
                                  btnSave_Click();
                                  event.target.blur();
                                }
                              }
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                    <TableRow style={{ display: lblConfirm.visble }}>
                      <TableCell align="center" colSpan={3}>
                        Please be confirm to save?
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        <AntButton
                          type="primary"
                          className="ButtonReplace"
                          onClick={btnSave_Click}
                        >
                          Yes
                        </AntButton>{" "}
                        &nbsp;&nbsp;
                        <AntButton
                          type="primary"
                          className="BtCancel"
                          onClick={btnCancel_Click}
                        >
                          Cancel
                        </AntButton>
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
              md={8}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {gvScanResult.visble == false && (
                <>
                  {" "}
                  <img
                    className="Img_GvResult"
                    src={Pageimg}
                    alt="Description of the image"
                  />
                </>
              )}

              {/* visiblegvScanResult */}
              {gvScanResult.visble == true && (
                <>
                  <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                    <Paper
                      className="Card-lblResult"
                      elevation={3}
                      style={{
                        background: lblResult !== "OK" ? "red" : "green",
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
                  </div>
                  <AntTable
                    columns={columns}
                    dataSource={gvScanResult.value}
                    style={{
                      width: "100%",
                      boxShadow: "rgba(0, 0, 0, 0.10) 0px 3px 8px",
                    }}
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
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default ConfirmBarcodeGrade;
