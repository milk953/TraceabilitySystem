import React, { useState } from "react";
import Hearder from "../Header/Header";
import "./Reject.css";
import { fn_Reject } from "./fn_Reject";
import Checkbox from "@mui/material/Checkbox";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  TableHead,
  Paper,
} from "@mui/material";
import Radio from "@mui/material/Radio";
function Reject() {
  const {
    rdSelect,
    handleRDChange,
    pnlTouchupState,
    pnlTableDisplaySatate,
    rejectCombo,
    lblResult,
    txtSerialno,
    setTxtSerialno,
    txtSerialnoChange,
    dtDataSearch,
    setLot,
    lot,
    handleRetrice_Click,
    handleCheckboxChange,
    selectAll,
    selectedRows,
    handleSelectAll,
    handleExport,
    setCbSelected,
    cbSelected,
    ip,
    Fac,
    setTxtOperator,
    txtOperator,
    handleSubmit_Click,
  } = fn_Reject();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <>
      <Hearder />
      <h1>Reject Page</h1>
      <h3 className="RejectResult" style={lblResult.styled}>
        {lblResult.text}
      </h3>
      <div className="DRejectTableFirst">
        <Table className="RejectTableFirst" component={Paper}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ width: "130px" }}>Piece No. 1,2,3,...</TableCell>
              <TableCell sx={{ width: "30px" }}>
                <Radio
                  checked={rdSelect === "rdPcsno"}
                  onChange={handleRDChange}
                  value="rdPcsno"
                  name="radio-buttons"
                />
              </TableCell>
              <TableCell>
                <textarea
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  rows="5"
                  cols="45"
                  value={txtSerialno}
                  onChange={(e) => setTxtSerialno(e.target.value)}
                  // onBlur={txtSerialnoChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      txtSerialnoChange();
                    }
                  }
                }
                ></textarea>
              </TableCell>
              <TableCell
                rowSpan={2}
                sx={{ verticalAlign: "middle", textAlign: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRetrice_Click}
                >
                  Retrieve
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>Lot No.</TableCell>
              <TableCell>
                <Radio
                  checked={rdSelect === "rdLotNo"}
                  onChange={handleRDChange}
                  value="rdLotNo"
                  name="radio-buttons"
                />
              </TableCell>
              <TableCell sx={{ width: "350px" }}>
                <input
                  style={{
                    width: "300px",
                    border: "1px solid black",
                    margin: "0px",
                  }}
                  type="text"
                  size="20"
                  value={lot}
                  onChange={(e) => setLot(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      txtSerialnoChange();
                    }
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <br></br>
      <div className="DRejectTableSecond">
        <Table className="RejectTableSecond" component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell>Reason</TableCell>
              <TableCell>Operator</TableCell>
              <TableCell colSpan={2}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <select
                  onChange={(e) => setCbSelected(e.target.value)}
                  value={cbSelected}
                >
                  {rejectCombo.map((option, index) => (
                    <option key={index} value={`${option.rejcet_code}`}>
                      {option.rejcet_code === "DELETE"
                        ? "DELETE"
                        : option.rejcet_code === " "
                        ? ""
                        : `${option.rejcet_code} : ${option.rejcet_name}`}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell sx={{ width: "100px" }}>
                <input
                  value={txtOperator}
                  onChange={(e) => setTxtOperator(e.target.value)}
                  style={{
                    width: "100px",
                    border: "1px solid black",
                    margin: "0px",
                  }}
                  type="text"
                  size="20"
                />
              </TableCell>
              <TableCell sx={{ width: "100px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit_Click}
                >
                  Submit
                </Button>
              </TableCell>
              <TableCell sx={{ width: "100px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleExport}
                >
                  Export
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <br></br>
      {pnlTableDisplaySatate && (
        <div className="DRejectTableThird">
          <Table className="RejectTableThird" component={Paper}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    {...label}
                    onChange={handleSelectAll}
                    checked={selectedRows.length ==  dtDataSearch.length}
                  />
                </TableCell>
                <TableCell> Serial No</TableCell>
                <TableCell> Reason</TableCell>
                <TableCell> Inspect Count</TableCell>
                <TableCell> Sheet Front</TableCell>
                <TableCell> Sheet Back</TableCell>
                <TableCell> Pcs No</TableCell>
                <TableCell> MPE Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dtDataSearch.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      {...label}
                      onChange={(e) =>
                        handleCheckboxChange(e, row.rem_serial_no)
                      }
                      checked={selectedRows.includes(row.rem_serial_no)}
                    />
                  </TableCell>
                  <TableCell>{row.rem_serial_no}</TableCell>
                  <TableCell>{row.rem_reject_name}</TableCell>
                  <TableCell>{row.rej_inspect_count}</TableCell>
                  <TableCell>{row.front_no}</TableCell>
                  <TableCell>{row.back_no}</TableCell>
                  <TableCell>{row.pcs_no}</TableCell>
                  <TableCell>{row.mpe_result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <br></br>
      {pnlTouchupState && (
        <div className="RejectPnltouchup">
          <div className="DRejcetTableFourth">
            <Table className="RejcetTableFourth" component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>TouchUp</TableCell>
                  <TableCell>Operator</TableCell>
                  <TableCell>Inspect Count</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <input
                      style={{
                        width: "400px",
                        border: "1px solid black",
                        margin: "0px",
                      }}
                      type="text"
                      size="20"
                    />
                  </TableCell>
                  <TableCell sx={{ width: "100px" }}>
                    <input
                      style={{
                        width: "150px",
                        border: "1px solid black",
                        margin: "0px",
                      }}
                      type="text"
                      size="20"
                    />
                  </TableCell>
                  <TableCell sx={{ width: "100px" }}>
                    <input
                      style={{
                        width: "150px",
                        border: "1px solid black",
                        margin: "0px",
                      }}
                      type="text"
                      size="20"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <br></br>
          <div className="DRejcetTableFifth">
            <Table className="RejcetTableFifth" component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: "center" }}>
                    After Reason
                  </TableCell>
                  <TableCell>Operator</TableCell>
                  <TableCell>Inspect Count</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <input
                      style={{
                        width: "400px",
                        border: "1px solid black",
                        margin: "0px",
                      }}
                      type="text"
                      size="20"
                    />
                  </TableCell>
                  <TableCell sx={{ width: "100px" }}>
                    <input
                      style={{
                        width: "150px",
                        border: "1px solid black",
                        margin: "0px",
                      }}
                      type="text"
                      size="20"
                    />
                  </TableCell>
                  <TableCell sx={{ width: "100px" }}>
                    <input
                      style={{
                        width: "150px",
                        border: "1px solid black",
                        margin: "0px",
                      }}
                      type="text"
                      size="20"
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary">
                      Submit
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      {/* <div className="RejectBtoHome">
        <a href="/">Return To Menu</a>
      </div> */}
    </>
  );
}

export default Reject;
