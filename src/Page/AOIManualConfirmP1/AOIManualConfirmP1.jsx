import React, { useEffect } from "react";
import Hearder from "../Header/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Card,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Grid,
  TextField,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./AOIManualConfirmP1.css";
import "../Common/StyleCommon.css";
import { fn_AOIManualConfirmP1 } from "../AOIManualConfirmP1/fn_AOIManualConfirmP1";
import { fn_Homepage } from "../Homepage/fn_Homepage";
function AOIManualConfirmP1() {
  const {
    lblUser1,
    lblResult,
    txtOperatorCode,
    rbtAOIandSPIcheck,
    handleRadioChange,
    txtSerialNo,
    setTxtSerialNo,
    txtSerialNo_TextChanged,
    ddlResult,
    setDdlResult,
    txtCnt,
    btnRetrive_Click,
    BtnSubmit1_Click,
    BtnCancle_Click,
  } = fn_AOIManualConfirmP1();
  const { menuName } = fn_Homepage();
  return (
    <>
      <Hearder />
      <div className="Center_Layout"></div>
      {lblResult.value && (
        <div className="divAOIManualConfirmP1Result">
          <Card
            className={
              lblResult.style.background === "red"
                ? "AOIManualConfirmP1ResultError"
                : "AOIManualConfirmP1ResultSuccess"
            }
          >
            {lblResult.value}
          </Card>
        </div>
      )}
      {/* &nbsp; */}
      <div className="AOIManualConfirmP1TableFirst">
        <Table className="Header_Center" component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={4} align="center">
                {menuName ? menuName : "P1 AOI/SPI Confirm"}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ width: "90px", textAlign: "right" }}>
                Type :
              </TableCell>

              <TableCell>
                <Grid container spacing={0}>
                  <Grid item xs={6} md={6} style={{ background: "#CCFFFF" }}>
                    <FormControl>
                      <RadioGroup
                        row
                        value={rbtAOIandSPIcheck.value}
                        onChange={handleRadioChange}
                      >
                        <FormControlLabel
                          value="AOI"
                          control={<Radio size="small" />}
                          label="AOI"
                          style={{ margin: "0px" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={6} style={{ background: "#CCFFCC" }}>
                    <FormControl>
                      <RadioGroup
                        row
                        value={rbtAOIandSPIcheck.value}
                        onChange={handleRadioChange}
                      >
                        <FormControlLabel
                          value="SPI"
                          control={<Radio size="small" />}
                          label="SPI"
                          style={{ margin: "0px" }}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </TableCell>

              <TableCell
                rowSpan={2}
                sx={{ verticalAlign: "middle", textAlign: "center" }}
              >
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={btnRetrive_Click}
                >
                  Search
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ textAlign: "right" }}>Piece No. :</TableCell>

              <TableCell sx={{ width: "60%" }}>
                <TextField
                  id="txtSerialNo_AOIManualConfirmP1_focus"
                  className="input_txt"
                  size="small"
                  fullWidth
                  autoComplete="off"
                  // disabled={txtOperator.disabled}
                  // style={txtOperator.style}
                  value={txtSerialNo.value}
                  onChange={(e) => {
                    setTxtSerialNo((prevState) => ({
                      ...prevState,
                      value: e.target.value.trim().toLocaleUpperCase(),
                    }));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      txtSerialNo_TextChanged();
                    }
                  }}
                ></TextField>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {/* &nbsp; */}
      <div className="AOIManualConfirmP1TableLast">
        <Table className="Header_Center" component={Paper}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ width: "90px", textAlign: "right" }}>
                Result :{" "}
              </TableCell>
              <TableCell sx={{ width: "100px" }}>
                <FormControl style={{ width: "100%" }} size="small">
                  <Select
                    className="field_select"
                    sx={{
                      height: 28,
                      fontSize: 14,
                      // color: ddlResult.value == " " ? "rgba(0, 0, 0, 0)" : "",
                    }}
                    value={ddlResult.value === "" ? " " : ddlResult.value}
                    onChange={(e) => {
                      setDdlResult((prevState) => ({
                        ...prevState,
                        value: e.target.value,
                      }));
                    }}
                  >
                    {/* <MenuItem value=" " style={{ color: "rgba(0, 0, 0, 0)" }}>
                        <em>-SELECT-</em>
                      </MenuItem> */}
                    <MenuItem value=" ">--- Select ---</MenuItem>
                    <MenuItem value={"OK"}>OK</MenuItem>
                    <MenuItem value={"NG"}>NG</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell sx={{ width: "90px", textAlign: "right" }}>
                Operator :{" "}
              </TableCell>
              <TableCell sx={{ width: "200px" }}>
                <TextField
                  className="field_text"
                  size="small"
                  disabled
                  fullWidth
                  autoComplete="off"
                  style={{ width: "100%", backgroundColor: "#e0e0e0" }}
                  value={txtOperatorCode.value}
                ></TextField>
              </TableCell>
              <TableCell sx={{ width: "110px", textAlign: "right" }}>
                Inspect Count :{" "}
              </TableCell>
              <TableCell sx={{ width: "80px" }}>
                <TextField
                  className="field_text"
                  size="small"
                  disabled
                  fullWidth
                  autoComplete="off"
                  value={txtCnt.value}
                  style={{ width: "100%", backgroundColor: "#e0e0e0" }}
                ></TextField>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell
                colSpan={6}
                style={{ textAlign: "center", verticalAlign: "middle" }}
              >
                <Button
                  style={
                    {
                      // backgroundColor: "green",
                      // width: "90px",
                      // color: "white",
                      // marginRight: "16px",
                    }
                  }
                  className="ButtonReplace"
                  onClick={BtnSubmit1_Click}
                >
                  Submit
                </Button>
                &nbsp;&nbsp;
                <Button
                  // style={{
                  //   backgroundColor: "red",
                  //   width: "90px",
                  //   color: "white",
                  // }}
                  className="ButtonCancel"
                  onClick={BtnCancle_Click}
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <br></br>
    </>
  );
}

export default AOIManualConfirmP1;
