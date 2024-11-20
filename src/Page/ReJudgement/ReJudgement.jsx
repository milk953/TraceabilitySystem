import React, { useEffect } from "react";
import "./ReJudgement.css";
import Hearder from "../Header/Header";
import { fn_ReJudgement } from "./fn_ReJudgement";
import { Table as AntTable, Select } from "antd";
import {
  Button,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Radio,
  TableHead,
  Card,
} from "@mui/material";
import { SevenK } from "@mui/icons-material";
function ReJudgement() {
  const {
    lblResult,
    rdSelect,
    handleRDChange,
    txtSerialno,
    setTxtSerialno,
    lot,
    setLot,
    txtSerialnoChange,
    pnlTableDisplaySatate,
    resultCombo,
    resultComboSelected,
    setResultComboSelected,
    btnRetrieveClick,
    dtDataSearch,
    txtQualified,
    setTxtQualified,
    txtOperator,
    setTxtOperator,
    cbReJustment,
    setCbReJustment,
    btnSubmitClick,
    serialState,
    FcSerial,
    handleExport,
    columns,
  } = fn_ReJudgement();
  useEffect(() => {
    if (serialState == true) {
      FcSerial.current.focus();
    }
  }, []);
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
                    width: "300px",
                  }}
                  rows="5"
                  cols="45"
                  value={txtSerialno}
                  id="txtSerialnoRejudege"
                  onChange={(e) => setTxtSerialno(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      txtSerialnoChange();
                    }
                  }}
                  ref={FcSerial}
                ></textarea>
              </TableCell>
              <TableCell
                rowSpan={2}
                sx={{ verticalAlign: "middle", textAlign: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={btnRetrieveClick}
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
                  id="txtLotnoRejudege"
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
      <Table className="ReJudgementTableSecond" component={Card}>
        <TableBody>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>Reason</TableCell>
            <TableCell>
              {" "}
              <Select
                style={{
                  width: 270,
                  textAlign: "left",
                  padding: "0px 5px 0px 0px",
                }}
                value={resultComboSelected}
                onChange={(value) => {
                  setResultComboSelected(value);
                }}
                options={resultCombo.map((option) => ({
                  value: option.rejcet_code,
                  label:
                    option.rejcet_code.trim() === ""
                      ? ""
                      : `${option.rejcet_code} : ${option.rejcet_name}`,
                }))}
              />
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>Operator</TableCell>
            <TableCell>
              <input
                value={txtOperator}
                onChange={(e) => setTxtOperator(e.target.value)}
                style={{
                  width: "120px",
                  border: "1px solid black",
                  margin: "0px",
                }}
                type="text"
                size="20"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>Re-Judgement</TableCell>
            <TableCell>
              <Select
                style={{
                  width: 270,
                  textAlign: "left",
                  padding: "0px 5px 0px 0px",
                }}
                value={cbReJustment}
                onChange={(value) => {
                  setCbReJustment(value);
                }}
                options={[
                  { value: " ", label: "" },
                  { value: "OK", label: "OK" },
                  { value: "NG", label: "NG" },
                  { value: "DELETE", label: "DELETE" },
                ]}
              />
            </TableCell>
            <TableCell sx={{ textAlign: "center" }}>Qualified</TableCell>
            <TableCell>
              <input
                value={txtQualified}
                onChange={(e) => setTxtQualified(e.target.value)}
                style={{
                  width: "120px",
                  border: "1px solid black",
                  margin: "0px",
                }}
                type="text"
                size="20"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ textAlign: "center"}} colSpan={4}>
              <Button
                variant="contained"
                color="primary"
                onClick={btnSubmitClick}
              >
                Submit
              </Button>
              &nbsp;
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
      &nbsp;
      {/* <Table className="ReJudgementTableSecond" component={Paper}>
        <tr>
          <td>Reason</td>
          <td>Operator</td>
          <td rowSpan={5} style={{ verticalAlign: "middle", width: "60px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={btnSubmitClick}
            >
              Submit
            </Button>
          </td>
          <td rowSpan={5} style={{ verticalAlign: "middle", width: "60px" }}>
            <Button variant="contained" color="primary" onClick={handleExport}>
              Export
            </Button>
          </td>
        </tr>
        <tr>
          <td style={{ width: "550px" }}>
            <select
              onChange={(e) => setResultComboSelected(e.target.value)}
              value={resultComboSelected}
            >
              {resultCombo.map((item, index) => (
                <option key={index} value={`${item.rejcet_code}`}>
                  {item.rejcet_code === " "
                    ? ""
                    : `${item.rejcet_code} : ${item.rejcet_name}`}
                </option>
              ))}
            </select> 
            <Select
              style={{
                width: 380,
                textAlign: "left",
                padding: "0px 5px 0px 0px",
              }}
              value={resultComboSelected}
              onChange={(value) => {
                setResultComboSelected(value);
              }}
              options={resultCombo.map((option) => ({
                value: option.rejcet_code,
                label:
                  option.rejcet_code.trim() === ""
                    ? ""
                    : `${option.rejcet_code} : ${option.rejcet_name}`,
              }))}
            />
          </td>
          <td style={{ padding: "10px" }}>
            <input
              value={txtOperator}
              onChange={(e) => setTxtOperator(e.target.value)}
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
              onChange={(e) => setCbReJustment(e.target.value)}
              value={cbReJustment}
            >
              <option value=" "> </option>
              <option value="OK">OK</option>
              <option value="NG">NG</option>
              <option value="DELETE">DELETE</option>
            </select> 
            <Select
              style={{
                width: 380,
                textAlign: "left",
                padding: "0px 5px 0px 0px",
              }}
              value={cbReJustment}
              onChange={(value) => {
                setCbReJustment(value);
              }}
              options={[
                { value: " ", label: "" },
                { value: "OK", label: "OK" },
                { value: "NG", label: "NG" },
                { value: "DELETE", label: "DELETE" },
              ]}
            />
          </td>
          <td style={{ padding: "10px" }}>
            <input
              value={txtQualified}
              onChange={(e) => setTxtQualified(e.target.value)}
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
      </Table> */}
      <br />
      {pnlTableDisplaySatate && (
        <div className="DReJudgementTableThird">
          <AntTable
            columns={columns}
            dataSource={dtDataSearch}
            style={{ width: "100%" }}
            pagination={false}
            size="small"
            // bordered
            className="tableGvResult"
          />
        </div>
      )}
      <br />
    </>
  );
}

export default ReJudgement;
