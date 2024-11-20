import React, { useState } from "react";
import Hearder from "../Header/Header";
import "./Reject.css";
// import "../Common/StyleCommon.css";
import { fn_Reject } from "./fn_Reject";
import Checkbox from "@mui/material/Checkbox";
import { Table as AntTable, Select, Button, Avatar } from "antd";
import excel from "/src/assets/excel.png";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import { SearchOutlined } from "@ant-design/icons";
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
    selectedRows,
    handleSelectAll,
    handleExport,
    setCbSelected,
    cbSelected,
    setTxtOperator,
    txtOperator,
    handleSubmit_Click,
    columns,
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
          <TableHead>
            <TableRow>
              <TableCell colSpan={4} align="center">
                Rejcet
              </TableCell>
            </TableRow>
          </TableHead>
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
                  onChange={(e) => setTxtSerialno(e.target.value)}
                  id="txtPieceNoReject"
                  // onKeyDown={(e) => {
                  //   if (e.key === "Enter") {
                  //     txtSerialnoChange();
                  //   }
                  // }}
                ></textarea>
              </TableCell>
              <TableCell
                rowSpan={2}
                sx={{ verticalAlign: "middle", textAlign: "center" }}
              >
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleRetrice_Click}
                >
                  Search
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
                  id="txtLotnoReject"
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
                <Select
                  style={{
                    width: 380,
                    textAlign: "left",
                    padding: "0px 5px 0px 0px",
                  }}
                  value={cbSelected}
                  onChange={(value) => {
                    setCbSelected(value);
                  }}
                  options={
                    rejectCombo.map((option, index) => ({
                      value: `${option.rejcet_code}`,
                      label:
                        option.rejcet_code === "DELETE"
                          ? "DELETE"
                          : option.rejcet_code === " "
                          ? ""
                          : `${option.rejcet_code} : ${option.rejcet_name}`,
                    })) || []
                  }
                ></Select>
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
                  style={{ backgroundColor: "green",width:"90px",color:"white" }}
                  onClick={handleSubmit_Click}
                >
                  Submit
                </Button>
              </TableCell>
              <TableCell sx={{ width: "100px" }}>
                <Button
                  icon={<Avatar shape="square" src={excel} size="small" />}
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
          <AntTable
            columns={columns}
            dataSource={dtDataSearch}
            style={{ width: "100%" }}
            pagination={false}
            size="small"
            className="tableGvResult"
          />
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
                    <Button type="primary" icon={<SearchOutlined />}>
                      Submit
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
}

export default Reject;
