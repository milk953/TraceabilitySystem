import React, { useEffect, useState, useRef } from "react";
import Hearder from "../Header/Header";
import {
  TextField,
  Card,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Paper,
  Typography,
  Button,
  FormControl,
  Autocomplete,
  Box,
  Grid,
} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { Table as AntTable, Button as AntButton } from "antd";
import { fn_Homepage } from "../Homepage/fn_Homepage";
import Pageimg from "/src/assets/1.jpg";
import "../Common/StyleCommon.css";
import "../Final Gate/SerialPcs.css";
import { fn_ScanSMTSerialPcsBox } from "./fn_ScanSMTSerialPcsBox";
function ScanSMTSerialPcsBox() {
  const {
    txtLot_TextChanged,
    txtLot,
    settxtLot,
    selectddlProduct,
    setselectddlProduct,
    ddlProduct_SelectedIndexChanged,
    ddlProduct,
    txtMachine_TextChanged,
    txtMachine,
    settxtMachine,
    ibtMachineBack_Click,
    txtOP_TextChanged,
    txtOP,
    settxtOP,
    ibtOPBack_Click,
    txtBox_TextChanged,
    txtBox,
    settxtBox,
    txtPack_TextChanged,
    txtPack,
    settxtPack,
    lblLot,
    lblLotTotal,
    txtPcsTray,
    settxtPcsTray,
    txtPcsTray_TextChanged,
    lblSerialNG,
    ibtBack_Click,
    gvSerial,
    pnlMachine,
    lblLastTray,
    lblBox,
    lblBoxTotal,
    lblPacking,
    lblPackingTotal,
    lblBoxStatus,
    lblLog,
    lblBoxFull,
    btnSave_Click,
    ibtBox_Click,
    ibtPack_Click,
    pnlSerial,
    txtSerial,
    pnlLog,
    pnlOP,
    handleSerialChange,
    lblResult,
    fntxtLot,
    fntxtMachine,
    fntxtTray,
    fntxtBox,
    fntxtPack,
    fc_txtSerial,
    fntxtOP,
    btnCancel_Click,
    gvScanResult,
    pnlgvScanResult,
    lblTime,
    lblOP,
    dis_ddlProduct,
    columns,
    settxtSerial,
  } = fn_ScanSMTSerialPcsBox();
  const { menuName } = fn_Homepage();
  let data = [];
  return (
    <div>
      <Hearder />
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={4}>
              <Table className="Header_Left" component={Paper}>
                <TableHead>
                  <TableCell colSpan={5} align="center">
                    {menuName ? menuName : "Packing Gate"}
                  </TableCell>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      <Typography> Scan Lot. :</Typography>
                    </TableCell>
                    <TableCell colSpan={4}>
                      <TextField
                        id="txtLot"
                        className="input_txt"
                        size="small"
                        style={{
                          ...txtLot.style,
                          backgroundColor: txtLot.disbled
                            ? "#e0e0e0"
                            : "inherit",
                        }}
                        disabled={txtLot.disbled}
                        inputRef={(el) => (fntxtLot.current = el)}
                        value={txtLot.value.trim()}
                        onChange={(e) => {
                          settxtLot((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtLot_TextChanged();
                          }
                        }}
                      ></TextField>
                      <Button className="Bt_ibtBack" onClick={ibtBack_Click}>
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Product :</Typography>
                    </TableCell>
                    <TableCell colSpan={4}>
                      <FormControl fullWidth>
                        <Autocomplete
                          id="ddlProduct"
                          className="Select_dropDown"
                          value={selectddlProduct.value}
                          disabled={dis_ddlProduct}
                          sx={{
                            "& .MuiAutocomplete-root": {
                              backgroundColor: dis_ddlProduct
                                ? "#e0e0e0"
                                : "inherit",
                            },
                            "& .MuiAutocomplete-inputRoot": {
                              backgroundColor: dis_ddlProduct
                                ? "#e0e0e0"
                                : "inherit",
                            },
                            "& .MuiAutocomplete-input": {
                              backgroundColor: dis_ddlProduct
                                ? "#e0e0e0"
                                : "inherit",
                            },
                            "& .MuiAutocomplete-inputDisabled": {
                              backgroundColor: "#e0e0e0",
                            },
                          }}
                          onChange={(e, value) =>
                            ddlProduct_SelectedIndexChanged(value)
                          }
                          options={ddlProduct.map((item) => item.prd_name)}
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
                  {pnlMachine && (
                    <>
                      <TableRow>
                        <TableCell align="right">
                          <Typography>Machine No :</Typography>
                        </TableCell>
                        <TableCell colSpan={4}>
                          <TextField
                            className="input_txt"
                            size="small"
                            id="txtMachine"
                            inputRef={(el) => (fntxtMachine.current = el)}
                            value={txtMachine.value}
                            onChange={(e) => {
                              settxtMachine((prevState) => ({
                                ...prevState,
                                value: e.target.value,
                              }));
                            }}
                            style={{
                              backgroundColor: txtMachine.disbled
                                ? "#e0e0e0"
                                : "inherit",
                            }}
                            disabled={txtMachine.disbled}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                txtMachine_TextChanged();
                              }
                            }}
                          ></TextField>
                          <Button
                            className="Bt_ibtBack"
                            onClick={ibtMachineBack_Click}
                          >
                            <BackspaceIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow style={{ display: "" }}>
                        <TableCell align="right">
                          <Typography>OP/Partial No. :</Typography>
                        </TableCell>
                        <TableCell colSpan={4}>
                          <TextField
                            className="input_txt"
                            size="small"
                            id="txtOP"
                            inputRef={(el) => (fntxtOP.current = el)}
                            value={txtOP.value}
                            onChange={(e) => {
                              settxtOP((prevState) => ({
                                ...prevState,
                                value: e.target.value,
                              }));
                            }}
                            style={{
                              backgroundColor: txtOP.disbled
                                ? "#e0e0e0"
                                : "inherit",
                            }}
                            disabled={txtOP.disbled}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                txtOP_TextChanged();
                              }
                            }}
                          ></TextField>
                          <Button
                            className="Bt_ibtBack"
                            onClick={ibtOPBack_Click}
                          >
                            <BackspaceIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Box No.:</Typography>
                    </TableCell>
                    <TableCell colSpan={4}>
                      <TextField
                        className="input_txt"
                        size="small"
                        id="txtBox"
                        inputRef={(el) => (fntxtBox.current = el)}
                        value={txtBox.value.trim()}
                        onChange={(e) => {
                          settxtBox((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        style={{
                          background: txtBox.disbled ? "#e0e0e0" : "inherit",
                        }}
                        disabled={txtBox.disbled}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtBox_TextChanged();
                          }
                        }}
                      ></TextField>
                      <Button className="Bt_ibtBack" onClick={ibtBox_Click}>
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ display: "" }}>
                    <TableCell align="right">
                      <Typography>Packing No :</Typography>
                    </TableCell>
                    <TableCell colSpan={4}>
                      <TextField
                        className="input_txt"
                        size="small"
                        id="txtPack"
                        value={txtPack.value}
                        onChange={(e) => {
                          settxtPack((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        style={{
                          backgroundColor: txtPack.disbled
                            ? "#e0e0e0"
                            : "inherit",
                        }}
                        disabled={txtPack.disbled}
                        inputRef={fntxtPack}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtPack_TextChanged();
                          }
                        }}
                      ></TextField>
                      <Button className="Bt_ibtBack" onClick={ibtPack_Click}>
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      <Typography>Lot :</Typography>
                    </TableCell>
                    <TableCell id="lblLot" colSpan={1}>
                      {lblLot.value}
                    </TableCell>
                    <TableCell align="right">
                      <Typography style={{ color: "green" }}>OK :</Typography>
                    </TableCell>
                    <TableCell
                      id="lblLotTotal"
                      style={{ width: "70px" }}
                      colSpan={2}
                    >
                      {lblLotTotal.value}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" style={{ width: "100px" }}>
                      <Typography>Pcs/Tray :</Typography>
                    </TableCell>
                    <TableCell
                      style={{
                        width: "130px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        className="input_txt"
                        size="small"
                        inputRef={(el) => (fntxtTray.current = el)}
                        value={txtPcsTray.value}
                        id="txtPcsTray"
                        onChange={(e) => {
                          const newValue = e.target.value;
                          if (/^\d*$/.test(newValue)) {
                            settxtPcsTray((prevState) => ({
                              ...prevState,
                              value: newValue,
                            }));
                          }
                        }}
                        style={{
                          backgroundColor: txtPcsTray.disbled
                            ? "#e0e0e0"
                            : "inherit",
                          width: "60px",
                        }}
                        disabled={txtPcsTray.disbled}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtPcsTray_TextChanged();
                          }
                        }}
                      ></TextField>
                      &nbsp; <p style={{ margin: 0 }}>{lblLastTray.value}</p>
                      {/* &nbsp; 
                      {lblLastTray.value} */}
                    </TableCell>
                    <TableCell align="right" style={{ width: "40px" }}>
                      <Typography style={{ color: "red" }}>NG :</Typography>
                    </TableCell>
                    <TableCell id="lblSerialNG" colSpan={2}>
                      {lblSerialNG.value}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Card sx={{ marginTop: "10px", width: "100%" }}>
                <Table>
                  <TableRow>
                    <TableCell
                      className="input_txt"
                      align="right"
                      sx={{ width: "15%", textAlign: "center" }}
                    >
                      Box :
                    </TableCell>
                    <TableCell
                      id="lblBox"
                      className="input_txt"
                      sx={{
                        width: "25%",
                        textAlign: "center",
                        backgroundColor: lblBox.value !== "" ? "#FFE8FF" : "",
                      }}
                    >
                      {lblBox.value}
                    </TableCell>
                    <TableCell
                      id="lblBoxFull"
                      className="input_txt"
                      sx={{
                        width: "10%",
                        textAlign: "center",
                        backgroundColor:
                          lblBoxFull.value !== "" ? "#d6eaf8" : "",
                      }}
                    >
                      {lblBoxFull.value}
                    </TableCell>
                    <TableCell
                      id="lblBoxTotal"
                      className="input_txt"
                      sx={{
                        width: "10%",
                        textAlign: "center",
                        backgroundColor:
                          lblBoxTotal.value !== "" ? "#fcf3cf" : "",
                      }}
                    >
                      {lblBoxTotal.value}
                    </TableCell>
                    <TableCell
                      className="input_txt"
                      id="lblBoxStatus"
                      rowSpan={2}
                      sx={{
                        textAlign: "center",
                        width: "15%",
                        fontWeight: "bold",
                        color: lblBoxStatus.value == "OK" ? "green" : "red",
                      }}
                    >
                      {lblBoxStatus.value}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="input_txt"
                      align="right"
                      sx={{ width: "15%", textAlign: "center" }}
                    >
                      Packing :
                    </TableCell>
                    <TableCell
                      id="lblPacking"
                      className="input_txt"
                      sx={{
                        width: "15%",
                        textAlign: "center",
                        backgroundColor:
                          lblPacking.value !== "" ? "#FFE8FF" : "",
                      }}
                    >
                      {lblPacking.value}
                    </TableCell>
                    <TableCell
                      id="lblPackingTotal"
                      className="input_txt"
                      sx={{
                        textAlign: "center",
                        width: "15%",
                        backgroundColor:
                          lblPackingTotal.value !== "" ? "#fcf3cf" : "",
                      }}
                      colSpan={2}
                    >
                      {lblPackingTotal.value}
                    </TableCell>
                  </TableRow>
                </Table>
              </Card>

              {pnlOP && (
                <Paper
                  elevation={3}
                  style={{
                    width: "400px",
                    height: "40px",
                    margin: "auto",
                    textAlign: "center",
                    background: "#aed6f1",
                    paddingTop: "18px",
                    color: "black",
                    fontWeight: "bold",
                    marginTop: "30px",
                  }}
                  id="lblOP"
                >
                  {lblOP.value}
                </Paper>
              )}

              {pnlLog && (
                <Paper id="lblLog" elevation={3} className="Card-lblLog">
                  {lblLog.value}
                </Paper>
              )}
              {pnlSerial && (
                <Table id="gvSerial" className="CSS-GvSerial" component={Card}>
                  <TableHead>
                    <TableCell
                      sx={{ borderRight: "1px solid #d9d9d9" }}
                      align="center"
                    >
                      No.
                    </TableCell>
                    <TableCell align="center">Serial No.</TableCell>
                    <TableRow></TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {Array.from({ length: gvSerial.length }, (_, index) => ( */}

                    {txtSerial.map((serial, index) => (
                      <tr
                        key={index}
                        style={{ borderBottom: "1px solid  #d9d9d9" }}
                      >
                        <td
                          align="center"
                          style={{ borderRight: "1px solid #d9d9d9" }}
                        >
                          {index + 1}
                        </td>
                        <td>
                          <input
                            //  key={index}
                            className="styleSeraial"
                            type="text"
                            fullWidth
                            ref={(el) => (fc_txtSerial.current[index] = el)}
                            defaultValue={serial}
                            onChange={async (event) =>
                              (data = await handleSerialChange(index, event))
                            }
                            // onKeyDown={(event) => {
                            //   if (event.key === "Enter") {
                            //     event.preventDefault();
                            //     if (index < gvSerial.length - 1) {
                            //       fc_txtSerial.current[index + 1].focus();
                            //     } else if(index == gvSerial.length - 1){
                            //       btnSave_Click()
                            //       event.target.blur();
                            //     }
                            //   }
                            // }}
                            onKeyDown={async (event) => {
                              if (event.key === "Enter") {
                                event.preventDefault();
                                data = await handleSerialChange(index, event);
                                if (index < txtSerial.length - 1) {
                                  fc_txtSerial.current[index + 1].focus();
                                } else {
                                  event.target.blur();
                                  settxtSerial(data);
                                  btnSave_Click(data);
                                }
                              }
                            }}
                          />
                        </td>
                      </tr>
                    ))}

                    <TableRow>
                      <TableCell colSpan={2} style={{ textAlign: "center" }}>
                        <AntButton
                          id="btnSave"
                          type="primary"
                          className="BtSave"
                          // onClick={btnSave_Click}
                          onClick={() => {
                            settxtSerial(data);
                            btnSave_Click(data);
                          }}
                        >
                          Save
                        </AntButton>{" "}
                        &nbsp;&nbsp;
                        <AntButton
                          id="btnCancel"
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
              {pnlgvScanResult == false && (
                <>
                  <img
                    style={{
                      width: "360px",
                      height: "300px",
                      marginBottom: "30px",
                    }}
                    src={Pageimg}
                  />
                </>
              )}

              {pnlgvScanResult && (
                <>
                  <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                    <Paper
                      className="Card-lblResult"
                      style={{
                        background: lblResult.value == "NG" ? "red" : "green",
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{ paddingTop: "5px", color: "#fff" }}
                        id="lblResult"
                      >
                        {lblResult.value}
                      </Typography>
                    </Paper>

                    <Paper
                      className="Card-lblTime"
                      style={{
                        ...lblTime.style,
                        display: lblTime.value === "" ? "none" : "",
                      }}
                    >
                      <Typography variant="h4" style={{ color: "#fff" }}>
                        {lblTime.value}
                      </Typography>
                    </Paper>
                  </div>

                  <AntTable
                    id="gvScanResult"
                    columns={columns}
                    dataSource={gvScanResult}
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
            </Grid>
          </Grid>
        </Box>
      </Card>
    </div>
  );
}

export default ScanSMTSerialPcsBox;
