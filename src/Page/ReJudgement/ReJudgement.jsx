import React, { useEffect } from "react";
import "./ReJudgement.css";
import Hearder from "../Header/Header";
import { fn_ReJudgement } from "./fn_ReJudgement";
import "../Common/StyleCommon.css";
import excel from "/src/assets/excel.png";
import { Table as AntTable, Select, Button, Avatar } from "antd";
import { fn_Homepage } from "../Homepage/fn_Homepage";
import {
  Table,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Radio,
  TableHead,
  Card,
} from "@mui/material";
import { SearchOutlined } from "@ant-design/icons";
function ReJudgement() {
  const { menuName } = fn_Homepage();
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
    btnCancelClick,
    isShowlblResult,
  } = fn_ReJudgement();
  useEffect(() => {
    if (serialState == true) {
      FcSerial.current.focus();
    }
  }, []);
  return (
    <>
      <Hearder />
      <div style={{ marginTop: "70px" }}></div>
      {isShowlblResult && (
        <div className="divRejudgeResult">
          <Card
            className={
              lblResult.styled.color === "red"
                ? "RejudgeResultError"
                : "RejudgeResultSuccess"
            }
          >
            {lblResult.text}
          </Card>
        </div>
      )}
      <div className="DReJudgementTableFirst">
        <Table className="ReJudgementTableFirst" component={Card}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }} colSpan={4}>
                {menuName}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ width: "130px", textAlign: "right" }}>
                Piece No. 1,2,3,...
              </TableCell>
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
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={btnRetrieveClick}
                >
                  Search
                </Button>
                <Button
                  type="primary"
                  style={{ width: "95px" }}
                  className="ButtonCancel"
                  onClick={btnCancelClick}
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ textAlign: "center", textAlign: "right" }}>
                Lot No.
              </TableCell>
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
                      btnRetrieveClick();
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
            <TableCell sx={{ textAlign: "center", textAlign: "right" }}>
              Reason :{" "}
            </TableCell>
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
                    option.rejcet_code.trim() === "------ SELECT ------"
                      ? "------ SELECT ------"
                      : `${option.rejcet_code} : ${option.rejcet_name}`,
                }))}
              />
            </TableCell>
            <TableCell sx={{ textAlign: "center", textAlign: "right" }}>
              Operator :{" "}
            </TableCell>
            <TableCell>
              <input
                value={txtOperator}
                id="txtOperatorRejudege"
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
            <TableCell sx={{ textAlign: "center", textAlign: "right" }}>
              Re-Judgement :
            </TableCell>
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
                  {
                    value: "------ SELECT ------",
                    label: "------ SELECT ------",
                  },
                  { value: "OK", label: "OK" },
                  { value: "NG", label: "NG" },
                  { value: "DELETE", label: "DELETE" },
                ]}
              />
            </TableCell>
            <TableCell sx={{ textAlign: "center", textAlign: "right" }}>
              Qualified :{" "}
            </TableCell>
            <TableCell>
              <input
                id="txtQualifiedRejudege"
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
            <TableCell sx={{ textAlign: "center" }} colSpan={4}>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "3px",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "green",
                    width: "90px",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={btnSubmitClick}
                >
                  Submit
                </Button>
                <Button
                  style={{
                    width: "90px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  icon={<Avatar shape="square" src={excel} size="small" />}
                  onClick={handleExport}
                >
                  Export
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      &nbsp;
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
