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
} from "@mui/material";
import { Table as AntTable, Select, Button } from "antd";
import "./AVIManualConfirm.css";
import "../Common/StyleCommon.css";
import { fn_AVIManualConfirm } from "./fn_AVIManualConfirm";
import { SearchOutlined } from "@ant-design/icons";
function AVIManualConfirm() {
  const {
    eltType,
    username,
    pieceNo,
    setPieceNo,
    btnRetrieveClick,
    handlePieceChange,
    eltTypeState,
    eltTypeSelect,
    setEltTypeSelect,
    result,
    resultState,
    lblResult,
    pieceNoRef,
    resultSelect,
    handleResultSelect,
    btnSubmitClick,
    dataNotfound,
    handleBtnCancel,
    getSearchData,
    columns,
  } = fn_AVIManualConfirm();
  return (
    <>
      <Hearder />
      <h1>AVIConfirm</h1>
      {/* <Card classNmae="AVIMainCard"> */}
        {lblResult && (
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              color: lblResult === "update complete." ? "blue" : "red",
            }}
          >
            {lblResult}
          </h3>
        )}
        <div className="DAVITableFirst">
          <Table className="AVITableFirst" component={Card}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ width: "90px", textAlign: "center" }}
                  colSpan={4}
                >
                  AVI CONFIRM
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ width: "90px", textAlign: "center" }}>
                  ELT Type :
                </TableCell>
                <TableCell>
                  {console.log(eltType, "eltType")}
                  <Select
                    style={{
                      width: 300,
                      textAlign: "left",
                      marginLeft: "3px",
                    }}
                    value={eltTypeSelect}
                    onChange={(value) => {
                      setEltTypeSelect(value);
                    }}
                    disabled={eltTypeState.styled.disable}
                    options={eltType.map((option, index) => ({
                      value: option.elt_type,
                      label: option.elt_type,
                    }))}
                  />
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
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ textAlign: "center" }}>Piece No. :</TableCell>
                {/* <TableCell></TableCell> */}
                <TableCell sx={{ width: "300px" }}>
                  <input
                    ref={pieceNoRef}
                    style={{ width: "280px" }}
                    onChange={(e) => setPieceNo(e.target.value)}
                    // onBlur={handlePieceChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handlePieceChange();
                      }
                    }}
                    value={pieceNo}
                  ></input>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="DAVITableSecond">
          <Table className="AVITableSecond" component={Card}>

            <TableBody>
              <TableRow>
                <TableCell sx={{ textAlign: "right" }}>Result :</TableCell>
                <TableCell sx={{ width: "200px" }}>
                  <Select
                    style={{
                      width: 200,
                      textAlign: "left",
                      // padding: "0px 5px 0px 0px",
                    }}
                    value={resultSelect}
                    onChange={(value) => {
                      handleResultSelect(value);
                    }}
                    options={[
                      { value: "--- SELECT ---", label: "--- SELECT ---" },
                      { value: "OK", label: "OK" },
                      { value: "NG", label: "NG" },
                      { value: "P-error", label: "P-error" },
                      { value: "2D-error", label: "2D-error" },
                    ]}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "right" }}>Operator :</TableCell>
                <TableCell sx={{ width: "100px" }}>
                  <input
                    style={{ width: "150px", backgroundColor: "#B2A8A8" }}
                    disabled
                    value={username}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{ width: "60px", textAlign: "center" }}
                  colSpan={4}
                >
                  <Button
                    style={{
                      backgroundColor: "green",
                      width: "90px",
                      color: "white",
                    }}
                    onClick={btnSubmitClick}
                  >
                    Submit
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "red",
                      width: "90px",
                      color: "white",
                    }}
                    onClick={handleBtnCancel}
                  >
                    Cancel
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        {resultState && (
          <div className="ELTTYPEpnlResult">
            <AntTable
              columns={columns}
              dataSource={result}
              style={{ width: "100%" }}
              pagination={false}
              size="small"
              rowClassName={(record) => {
                if (record.color === "green") return "green-row";
                if (record.color === "red") return "red-row";
                return "";
              }}
              className="tableGvResult"
            />
          </div>
        )}
        <br></br>
      {/* </Card> */}
    </>
  );
}

export default AVIManualConfirm;
