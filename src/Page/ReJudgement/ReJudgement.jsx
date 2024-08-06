import React from "react";
import "./ReJudgement.css";
import Hearder from "../Header/Hearder";
import { fn_ReJudgement } from "./fn_ReJudgement";
import {
  Button,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Radio,
  TableHead,
} from "@mui/material";
function ReJudgement() {
  const {
    lblResult,
    setLblResult,
    rdSelect,
    setRdSelect,
    selectAll,
    setSelectAll,
    selectedRows,
    setSelectedRows,
    handleRDChange,
    txtSerialno,
    setTxtSerialno,
    lot,
    setLot,
    txtSerialnoChange,
    pnlTableDisplaySatate,
  } = fn_ReJudgement();
  return (
    <>
      <Hearder />
      <h1>ReJudgement</h1>
      <h3 className="ReJudgementResult" style={lblResult.styled}>
        {lblResult.text}
      </h3>
      <div className="DReJudgementTableFirst">
        <Table className="ReJudgementTableFirst" component={Paper}>
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
                  onBlur={txtSerialnoChange}
                ></textarea>
              </TableCell>
              <TableCell
                rowSpan={2}
                sx={{ verticalAlign: "middle", textAlign: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleRetrice_Click}
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
      <Table className="ReJudgementTableSecond" component={Paper}>
        <tr>
          <td>Reason</td>
          <td>Operator</td>
          <td rowSpan={5} style={{ verticalAlign: "middle", width: "60px" }}>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </td>
          <td rowSpan={5} style={{ verticalAlign: "middle", width: "60px" }}>
            <Button variant="contained" color="primary">
              Export
            </Button>
          </td>
        </tr>
        <tr>
          <td style={{ width: "550px" }}>
            <select
            // onChange={(e) => setCbSelected(e.target.value)}
            // value={cbSelected}
            >
              <option value="1">1</option>
            </select>
          </td>
          <td style={{ padding: "10px" }}>
            <input
              // value={txtOperator}
              // onChange={(e) => setTxtOperator(e.target.value)}
              style={{
                width: "120px",
                border: "1px solid black",
                margin: "0px",
              }}
              type="text"
              size="20"
            />
          </td>
        </tr>
        <tr>
          <td>Re-Judgement</td>
          <td>Qualified</td>
        </tr>
        <tr>
          <td>
            <select
            // onChange={(e) => setCbSelected(e.target.value)}
            // value={cbSelected}
            >
              <option value=" "> </option>
              <option value="OK">OK</option>
              <option value="NG">NG</option>
              <option value="DELETE">DELETE</option>

            </select>
          </td>
          <td style={{ padding: "10px" }}>
            <input
              // value={txtOperator}
              // onChange={(e) => setTxtOperator(e.target.value)}
              style={{
                width: "120px",
                border: "1px solid black",
                margin: "0px",
              }}
              type="text"
              size="20"
            />
          </td>
        </tr>
      </Table>
      <br />
      {pnlTableDisplaySatate && (
        <div className="DRejectTableThird">
          <Table className="RejectTableThird" component={Paper}>
            <TableHead>
              <TableRow>
                <TableCell> Serial No</TableCell>
                <TableCell> Reason</TableCell>
                <TableCell> Operator</TableCell>
                <TableCell> Inspect Count</TableCell>
                <TableCell> Sheet Front</TableCell>
                <TableCell> Sheet Back</TableCell>
                <TableCell> Pcs No</TableCell>
                <TableCell> Re-Judgement</TableCell>
                <TableCell> Qualified</TableCell>
                <TableCell> Re-Judgement Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {dtDataSearch.map((row, index) => (
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
              ))} */}
            </TableBody>
          </Table>
        </div>
      )}
      <br />
      <div className="RejectBtoHome">
        <a href="/">Return To Menu</a>
      </div>
    </>
  );
}

export default ReJudgement;
