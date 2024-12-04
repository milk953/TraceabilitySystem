import React, { useEffect } from "react";
import Hearder from "../Header/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
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
import "./AOIManualConfirmP1.css";
import { fn_AOIManualConfirmP1 } from "../AOIManualConfirmP1/fn_AOIManualConfirmP1";
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
  } = fn_AOIManualConfirmP1();
  console.log("ddlResult.value", ddlResult.value, "###");
  return (
    <>
      <Hearder />

      <Card
        component={Paper}
        className="Card-Common"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <TableRow
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TableCell
            sx={{
              width: "40%",
              borderBottom: "0px",
            }}
          >
            <Typography
              variant="h6"
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#ffffff",
                ...lblResult.style,
              }}
            >
              {lblResult.value}
            </Typography>
          </TableCell>
        </TableRow>

        <div className="DAOITableFirst">
          <Table className="AOITableFirst" component={Paper}>
            <TableHead>
              <TableCell colSpan={4}>P1 AOI/SPI Confirm</TableCell>
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
                    variant="contained"
                    color="primary"
                    sx={{ width: "100px" }}
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
                        value: e.target.value,
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
        <div className="DAOITableSecond">
          <Table className="AOITableSecond" component={Paper}>
            <TableHead>
              <TableRow>
                <TableCell>Result</TableCell>
                <TableCell>Operator</TableCell>
                <TableCell colSpan={2}>Inspect Count</TableCell>
                <TableCell colSpan={2}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ width: "20%" }}>
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
                      <MenuItem value=" ">-Select-</MenuItem>
                      <MenuItem value={"OK"}>OK</MenuItem>
                      <MenuItem value={"NG"}>NG</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell style={{ width: "35%" }}>
                  <TextField
                    className="field_text"
                    size="small"
                    disabled
                    fullWidth
                    autoComplete="off"
                    style={{ width: "99%", backgroundColor: "#e0e0e0" }}
                    value={txtOperatorCode.value}
                  ></TextField>
                </TableCell>
                <TableCell style={{ width: "35%" }}>
                  <TextField
                    className="field_text"
                    size="small"
                    disabled
                    fullWidth
                    autoComplete="off"
                    value={txtCnt.value}
                    style={{ width: "99%", backgroundColor: "#e0e0e0" }}
                  ></TextField>
                </TableCell>
                <TableCell sstyle={{ width: "10%" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: "100px" }}
                    onClick={BtnSubmit1_Click}
                  >
                    Submit
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <br></br>
      </Card>
    </>
  );
}

export default AOIManualConfirmP1;
