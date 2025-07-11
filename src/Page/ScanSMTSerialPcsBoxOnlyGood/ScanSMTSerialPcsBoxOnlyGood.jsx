import React, { useEffect, useState, useRef } from "react";
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
import { Table as AntTable, Button as AntButton } from "antd";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Pageimg from "/src/assets/1.jpg";
import "../Common/StyleCommon.css";
import "../Final Gate/SerialPcs.css";
import Hearder from "../Header/Header";
import { fn_Homepage } from "../Homepage/fn_Homepage";
import { fn_ScanSMTSerialPcsBoxOnlyGood } from "./fn_ScanSMTSerialPcsBoxOnlyGood";
function ScanSMTRoollSht() {
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
    btnCancel,
    gvScanResult,
    pnlgvScanResult,
    lblTime,
    lblOP,
    dis_ddlProduct,
    columns,
    settxtSerial,
  } = fn_ScanSMTSerialPcsBoxOnlyGood();
  const { menuName } = fn_Homepage();
  let data;

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
                    {menuName ? menuName : "Packing gate only good"}
                  </TableCell>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      <Typography> Scan Lot. :</Typography>
                    </TableCell>
                    <TableCell colSpan={4}>
                      <TextField
                        className="input_txt"
                        size="small"
                        id="txtLot"
                        style={{
                          ...txtLot.style,
                          backgroundColor: txtLot.disbled
                            ? "#e0e0e0"
                            : "inherit", // สีพื้นหลังเมื่อ disabled
                        }}
                        disabled={txtLot.disbled} //true พิมไม่ได้
                        //inputRef={fntxtLot}
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
                        // onBlur={txtLot_TextChanged}
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
                          className="Select_dropDown"
                          // inputRef={fc_SlProduct}
                          id="ddlProduct"
                          value={selectddlProduct.value}
                          disabled={dis_ddlProduct} //true พิมไม่ได้
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
                              // inputRef={(el) => (fc_SlProduct.current = el)}
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
                            inputRef={(el) => (fntxtMachine.current = el)}
                            id="txtMachine"
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
                            disabled={txtMachine.disbled} //true พิมไม่ได้
                            // inputRef={fc_txtLotNo}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                txtMachine_TextChanged();
                              }
                            }}
                            //onBlur={txtMachine_TextChanged}
                          ></TextField>
                          <Button
                            className="Bt_ibtBack"
                            id="ibtMachineBack"
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
                            disabled={txtOP.disbled} //true พิมไม่ได้
                            // inputRef={fc_txtLotNo}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                txtOP_TextChanged();
                              }
                            }}
                            //onBlur={txtOP_TextChanged}
                          ></TextField>
                          <Button
                            className="Bt_ibtBack"
                            id="ibtOPBack"
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
                          backgroundColor: txtBox.disbled
                            ? "#e0e0e0"
                            : "inherit",
                        }}
                        disabled={txtBox.disbled} //true พิมไม่ได้
                        // inputRef={fntxtBox}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtBox_TextChanged();
                          }
                        }}
                        //onBlur={txtBox_TextChanged}
                      ></TextField>
                      <Button
                        id="ibtBox"
                        className="Bt_ibtBack"
                        onClick={ibtBox_Click}
                      >
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
                        // inputRef={(el) => (fc_txtPackingNo.current = el)}
                        id="txtPack"
                        value={txtPack.value.trim()}
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
                        disabled={txtPack.disbled} //true พิมไม่ได้
                        inputRef={fntxtPack}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtPack_TextChanged();
                          }
                        }}
                        //onBlur={txtPack_TextChanged}
                      ></TextField>
                      <Button
                        className="Bt_ibtBack"
                        id="ibtPack"
                        onClick={ibtPack_Click}
                      >
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
                        id="txtPcsTray"
                        inputRef={(el) => (fntxtTray.current = el)}
                        value={txtPcsTray.value}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, ""); // กรองอักขระพิเศษออก
                          settxtPcsTray((prevState) => ({
                            ...prevState,
                            value: value,
                          }));
                        }}
                        style={{
                          backgroundColor: txtPcsTray.disbled
                            ? "#e0e0e0"
                            : "inherit",
                          width: "60px",
                        }}
                        disabled={txtPcsTray.disbled} // true พิมไม่ได้
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtPcsTray_TextChanged();
                          }
                        }}
                        // onBlur={txtPcsTray_TextChanged}
                      ></TextField>
                      &nbsp;
                      {lblLastTray.value}
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
                      className="input_txt"
                      id="lblBox"
                      sx={{
                        width: "25%",
                        textAlign: "center",
                        backgroundColor: lblBox.value !== "" ? "#FFE8FF" : "",
                      }}
                    >
                      {lblBox.value}
                    </TableCell>
                    <TableCell
                      className="input_txt"
                      id="lblBoxFull"
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
                      className="input_txt"
                      id="lblBoxTotal"
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
                      className="input_txt"
                      id="lblPacking"
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
                      className="input_txt"
                      id="lblPackingTotal"
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
                <Table
                  className="CSS-GvSerial"
                  id="gvSerial"
                  // style={{ marginTop: "20px",
                  //    }}
                  component={Card}
                >
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
                    {/* <TableRow> */}

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
                            // key={index}
                            className="txtinput"
                            type="text"
                            fullWidth
                            ref={(el) => (fc_txtSerial.current[index] = el)}
                            defaultValue={serial}
                            // onBlur={(event) => {
                            //   handleSerialChange(index, event);

                            // }}
                            onChange={async (event) =>
                              (data = await handleSerialChange(index, event))
                            }
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
                          type="primary"
                          id="btnSave"
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
                          onClick={btnCancel}
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
              {pnlgvScanResult == false && (
                <>
                  <img
                    style={{
                      width: "360px",
                      height: "300px",
                      marginBottom: "30px",
                    }}
                    src={Pageimg} // Import the image
                    alt="Description of the image"
                  />
                </>
              )}

              {/* visiblegvScanResult */}
              {pnlgvScanResult && (
                <>
                  <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                    <Paper
                      className="Card-lblResult"
                      id="lblResult"
                      style={{
                        background: lblResult.value == "NG" ? "red" : "green",
                      }}
                    >
                      <Typography
                        variant="h4"
                        style={{ paddingTop: "5px", color: "#fff" }}
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
                      <Typography
                        variant="h4"
                        style={{ paddingTop: "5px", color: "#fff" }}
                      >
                        {lblTime.value}
                      </Typography>
                    </Paper>
                  </div>
                  <AntTable
                    columns={columns}
                    id="gvScanResult"
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

export default ScanSMTRoollSht;
