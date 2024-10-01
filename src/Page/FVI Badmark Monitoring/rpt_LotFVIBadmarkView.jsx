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
  Radio,
} from "@mui/material";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Table as AntTable } from "antd";
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../Common/StyleCommon.css";
import "./rpt_LotFVIBadmarkView.css";
import { fn_rpt_LotFVIBadmarkView } from "./fn_rpt_LotFVIBadmarkView";

function rpt_LotFVIBadmarkView() {
  const {
    selectedValue,
    handleRadioChange,
    rbtLot,
    rbtSheet,
    btnHidden,
    txtBarcode_TextChanged,
    txtBarcode,
    settxtBarcode,
    lblNo,
    setlblNo,
    lblProduct,
    setlblProduct,
    tableCells,
    tblData1,
  } = fn_rpt_LotFVIBadmarkView();
  return (
    <div>
      <Hearder />
      <h1>FVI Badmark Monitoring</h1>
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={12} align="center">
              <Table
                component={Card}
                className="FVI-Input "
                style={{ width: "40%", marginTop: "20px" }}
              >
                <TableHead style={{ height: "50px" }}>
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ fontSize: "30px" }}
                    >
                      <b>FVI Badmark Monitoring</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      <Radio
                        checked={rbtLot} // จะเป็น true หรือ false
                        onChange={handleRadioChange} // จัดการการเปลี่ยนแปลง
                        value="rbtLot"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Lot" }}
                      />
                      Lot No.
                    </TableCell>
                    <TableCell align="center">
                      <Radio
                        checked={rbtSheet} // จะเป็น true หรือ false
                        onChange={handleRadioChange}
                        value="rbtSheet"
                        name="radio-buttons"
                        inputProps={{ "aria-label": "Sheet" }}
                      />
                      Sheet No.
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={4}>
                      <TextField
                        size="small"
                        //  inputRef={(el) => (fntxtSerialRefer.current = el)}
                        className="input_txt"
                        disabled={txtBarcode.disbled}
                        style={{
                          backgroundColor: txtBarcode.disbled
                            ? "#e0e0e0"
                            : "inherit",
                        }}
                        fullWidth
                        value={txtBarcode.value}
                        onChange={(e) => {
                          settxtBarcode((prevState) => ({
                            ...prevState,
                            value: e.target.value,
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtBarcode_TextChanged();
                          }
                        }}
                        onBlur={txtBarcode_TextChanged}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      align="center"
                      style={{ width: "150px" }}
                    >
                      <Typography>{lblProduct.value}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      {lblNo.value}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Box>
        <br/>

        <TableContainer >
          <Table>
            <TableBody >
              {tblData1.map((rowData, rowIndex) => (
                <TableRow key={rowIndex}>
                  {rowData.map((cellData, colIndex) => (
                    <React.Fragment key={`${rowIndex}-${colIndex}`}>
                      {cellData ? (
                        <TableCell
                          style={{
                            backgroundColor: cellData.BADMARK_COLOR,
                            width: "10%",
                            textAlign:'center',
                            padding:'3px',
                            border:'1px solid grey'
                          }}
                        >
                          {cellData.BADMARK_COUNT}
                        </TableCell>
                      ) : (
                        <TableCell colSpan="15">No Data</TableCell>
                      )}
                    </React.Fragment>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <div>
        <Button
          sx={{
            width: "1px",
            height: "1px",
            backgroundColor: "red",
          }}
          onClick={btnHidden}
        ></Button>
      </div>
      {/* </Card> */}
    </div>
  );
}

export default rpt_LotFVIBadmarkView;
