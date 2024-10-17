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
} from "@mui/material";
import "./AOIManualConfirmP1.css";
import { fn_AOIManualConfirmP1 } from "../AOIManualConfirmP1/fn_AOIManualConfirmP1";
function AOIManualConfirmP1() {
  const {} = fn_AOIManualConfirmP1();
  let lblResult = "update complete.";
  let lblUser1 = "Welcom to Serial Trace System, PLANT_CODE : 5 ";
  return (
    <>
      <Hearder />

      <Card component={Paper} className="Card-Common">
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {lblUser1}
        </h3>
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            color: lblResult === "update complete." ? "blue" : "red",
          }}
        >
          {lblResult}
        </h3>
        <div className="DAOITableFirst">
          <Table className="AOITableFirst" component={Paper}>
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: "90px", textAlign: "center" }}>
                  Type :
                </TableCell>

                <TableCell>
                  <Grid container spacing={0} >
                    <Grid item xs={6} md={6} style={{ background: "#CCFFFF" }}>
                      <FormControl>
                        <RadioGroup row>
                          <FormControlLabel
                            value="AOI"
                            control={<Radio size="small" />}
                            label="AOI"
                            style={{ margin: "0px" }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={6} md={6} style={{ background: "#CCFFCC" }} >
                      <FormControl>
                        <RadioGroup row >
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
                    // onClick={btnRetrieveClick}
                  >
                    Retrive
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ textAlign: "center" }}>Piece No. :</TableCell>

                <TableCell sx={{ width: "300px" }}>
                  <TextField
                    id="txtOperator_ScanConfirmMagazineP1_focus"
                    className="input_txt"
                    size="small"
                    fullWidth
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
                      sx={{ height: 28, fontSize: 14 }} 
                      
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>OK</MenuItem>
                      <MenuItem value={20}>NG</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell style={{ width: "35%" }}>
                  <TextField
                    className="field_text"
                    size="small"
                    disabled
                    fullWidth
                    style={{ width: "99%", backgroundColor: "#e0e0e0" }}
                  ></TextField>
                </TableCell>
                <TableCell style={{ width: "35%" }}>
                  <TextField
                    className="field_text"
                    size="small"
                    disabled
                    fullWidth
                    style={{ width: "99%", backgroundColor: "#e0e0e0" }}
                  ></TextField>
                </TableCell>
                <TableCell sstyle={{ width: "10%" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ width: "100px" }}
                    // onClick={btnSubmitClick}
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
