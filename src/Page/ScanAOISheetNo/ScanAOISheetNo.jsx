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
import BackspaceIcon from "@mui/icons-material/Backspace";
import Header from "../Header/Header";
import Pageimg from "/src/assets/1.jpg";
import "./ScanAOISheetNo.css";
import { fn_ScanAOISheetNo } from "./fn_ScanAOISheetNo";
import { fn_Homepage } from "../Homepage/fn_Homepage";

function ScanAOISheetNo() {
  const { menuName } = fn_Homepage();
  const {
    txtOperator,
    settxtOperator,
    txtTotalPcs,
    settxtTotalPcs,
    txtNo,
    settxtNo,
    txtLeaf,
    settxtLeaf,
    txtLayer,
    settxtLayer,
    txtLotNo,
    settxtLotNo,
    lblProduct,
    ibtOperator,
    ibtback,
    ibtLayerBack,
    ibtLotBack,
    pnlSerial,
    gvSerial,
    lblSEQ,
    txtgvSerial,
    lblResult,
    lblResultcolor,
    gvScanResult,
    txtOperatorDisabled,
    txtTotalPcsDisabled,
    txtLeafDisabled,
    txtLayerDisabled,
    txtLotNoDisabled,
    inputOperator,
    inputTotalPcs,
    inputLeaf,
    inputLayer,
    inputLot,
    inputSerial,
    handleChangeOperator,
    ibtOperator_Click,
    handleChangeTotalPcs,
    handleChangeNo,
    ibtBack_Click,
    handleChangeLeaf,
    handleChangeLayer,
    ibtLayerBack_Click,
    handleChangeLotNo,
    ibtLotBack_Click,
    handleChangeSerial,
    btnSave_Click,
    btnCancel_Click,
    columns,
    handleKeygvSerial,
    gvReject,
    columnsgvReject,
    pnlResult,
    pnlLog,
    lblLog,
    settxtgvSerial
  } = fn_ScanAOISheetNo();
  let data = [];

  return (
    <div>
      <Header />
      <Card component={Paper} className="Card-Common" sx={{ display: "flex" }}>
        <Box justifyContent="space-between">
          <TableContainer
            component={Card}
            style={{
              width: "450px",
            }}
          >
            <Table className="Header_Left">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    {menuName ? menuName : "AOI Sheet No."}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Operator :</Typography>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <TextField
                      className="input_txt"
                      size="small"
                      inputRef={(el) => (inputOperator.current = el)}
                      fullWidth
                      value={txtOperator.trim().toUpperCase()}
                      disabled={txtOperatorDisabled}
                      style={{
                        backgroundColor: txtOperatorDisabled
                          ? "#e0e0e0"
                          : "inherit",
                      }}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (newValue.length <= 30) {
                          settxtOperator(newValue);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeOperator();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      className="Bt_ibtBack"
                      disabled={ibtOperator.disabled}
                      onClick={ibtOperator_Click}
                    >
                      <Tooltip title="Lock" placement="right-end">
                        <BackspaceIcon className="Icon_ibtBack" />
                      </Tooltip>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Total Sht. :</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      className="input_txt"
                      size="small"
                      inputRef={(el) => (inputTotalPcs.current = el)}
                      fullWidth
                      value={txtTotalPcs.trim()}
                      disabled={txtTotalPcsDisabled}
                      style={{
                        width: "80px",
                        backgroundColor: txtTotalPcsDisabled
                          ? "#e0e0e0"
                          : "inherit",
                      }}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (/^\d*$/.test(newValue) && newValue.length <= 3) {
                          settxtTotalPcs(newValue);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeTotalPcs();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography style={{ marginLeft: "55px" }}>
                      No. :
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      className="input_txt"
                      size="small"
                      fullWidth
                      value={txtNo}
                      style={{
                        width: "80px",
                      }}
                      // onChange={(e) => {
                      //     settxtNo(e.target.value);
                      // }}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (/^\d*$/.test(newValue) && newValue.length <= 3) {
                          settxtNo(newValue);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeNo();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      className="Bt_ibtBack"
                      disabled={ibtback.disabled}
                      onClick={ibtBack_Click}
                    >
                      <Tooltip title="Lock" placement="right-end">
                        <BackspaceIcon className="Icon_ibtBack" />
                      </Tooltip>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Total Leaf :</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      className="input_txt"
                      size="small"
                      inputRef={(el) => (inputLeaf.current = el)}
                      fullWidth
                      value={txtLeaf}
                      disabled={txtLeafDisabled}
                      style={{
                        width: "80px",
                        backgroundColor: txtLeafDisabled
                          ? "#e0e0e0"
                          : "inherit",
                      }}
                      onChange={(e) => {
                        settxtLeaf(e.target.value.trim());
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeLeaf();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography style={{ marginLeft: "37px" }}>
                      Layer. :
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      className="input_txt"
                      size="small"
                      inputRef={(el) => (inputLayer.current = el)}
                      fullWidth
                      value={txtLayer}
                      disabled={txtLayerDisabled}
                      style={{
                        width: "80px",
                        backgroundColor: txtLayerDisabled
                          ? "#e0e0e0"
                          : "inherit",
                      }}
                      onChange={(e) => {
                        settxtLayer(e.target.value.trim().toUpperCase());
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeLayer();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      className="Bt_ibtBack"
                      disabled={ibtLayerBack.disabled}
                      onClick={ibtLayerBack_Click}
                    >
                      <Tooltip title="Lock" placement="right-end">
                        <BackspaceIcon className="Icon_ibtBack" />
                      </Tooltip>
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Lot No. :</Typography>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <TextField
                      className="input_txt"
                      size="small"
                      inputRef={(el) => (inputLot.current = el)}
                      fullWidth
                      value={txtLotNo.trim()}
                      disabled={txtLotNoDisabled}
                      style={{
                        backgroundColor: txtLotNoDisabled
                          ? "#e0e0e0"
                          : "inherit",
                      }}
                      onChange={(e) => {
                        settxtLotNo(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleChangeLotNo();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      className="Bt_ibtBack"
                      disabled={ibtLotBack.disabled}
                      onClick={ibtLotBack_Click}
                    >
                      <Tooltip title="Lock" placement="right-end">
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
                    <Typography>{lblProduct}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {pnlLog && (
            <Paper
              elevation={3}
              className="Card-lblLog"
              style={{
                width: "450px",
              }}
            >
              {lblLog}
            </Paper>
          )}

          {pnlSerial && (
            <div className="divgvSerialAOISheetNo">
              <TableContainer
                component={Card}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginTop: "10px",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell>Leaf</TableCell>
                      <TableCell>Sheet No.</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.from({ length: gvSerial.length }, (_, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{lblSEQ}</TableCell>
                        <TableCell align="center">
                          {gvSerial[index].SEQ}
                        </TableCell>
                        <TableCell>
                          {/* <TextField
                            className="input_txt"
                            size="small"
                            fullWidth
                            value={txtgvSerial[index] || ""}
                            inputRef={(el) => (inputSerial.current[index] = el)}
                            onChange={(e) => {
                              handleChangeSerial(index, e);
                            }}
                            onKeyDown={(e) => handleKeygvSerial(e, index)}
                          /> */}
                          <input
                            className="styleSeraial"
                            type="text"
                            // defaultValue={serial}
                            ref={(el) =>
                              (inputSerial.current[index] = el)
                            }
                            onChange={(e) => {
                              data = handleChangeSerial(index, e);
                            }}
                            onKeyDown={async (event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                data = await handleChangeSerial(index, event);
                                if (index < gvSerial.length - 1) {
                                  inputSerial.current[index + 1].focus();
                                } else {
                                  settxtgvSerial(data);
                                  btnSave_Click(data);
                                  event.target.blur();
                                }
                              }
                            }}
                          />
                        </TableCell>
                      </TableRow>
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
                    className="ButtonReplace"
                    type="primary"
                    onClick={() => {
                      settxtgvSerial(data);
                      btnSave_Click(data);
                    }}
                  >
                    Save
                  </AntButton>
                  &nbsp;&nbsp;
                  <AntButton
                    className="ButtonDelete"
                    style={{ height: "30px" }}
                    type="primary"
                    onClick={btnCancel_Click}
                  >
                    Cancel
                  </AntButton>
                </div>
              </TableContainer>
            </div>
          )}

          {pnlResult && (
            <div style={{ width: "100%", marginTop: "10px" }}>
              <Paper
                className="Card-lblResult"
                style={{
                  width: "450px",
                  background: lblResultcolor,
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
          )}
        </Box>

        <div className="divgvScanResultAOISheetNo">
          {gvScanResult.visible === false && (
            <>
              <img
                className="Img_GvResult"
                style={{ marginLeft: "35%" }}
                src={Pageimg} // Import the image
                alt="Description of the image"
              />
            </>
          )}

          {gvReject.visible && (
            <>
              <AntTable
                columns={columnsgvReject}
                dataSource={gvReject.value}
                rowKey={(record) => record.SEQ}
                style={{ width: "98%", marginLeft: "16px", marginBottom: "10px" }}
                pagination={false}
                size="small"
                bordered
                className="tableGvResult"
              />
            </>
          )}

          {gvScanResult.visible && (
            <>
              <AntTable
                columns={columns}
                dataSource={gvScanResult.value}
                rowKey={(record) => record.seq}
                style={{ width: "98%", marginLeft: "16px" }}
                pagination={false}
                size="small"
                bordered
                className="tableGvResult"
              />
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

export default ScanAOISheetNo;
