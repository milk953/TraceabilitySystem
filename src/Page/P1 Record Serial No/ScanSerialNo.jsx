import React, { useEffect } from "react";
import Header from "../Header/Header";
import { Typography, Table as AntTable } from "antd";
import BackspaceIcon from "@mui/icons-material/Backspace";
import {
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Pageimg from "/src/assets/1.jpg";
import "./ScanSerialNo.css";
import "../Common/StyleCommon.css";
import { fn_ScanSerialNo } from "./fn_ScanSerialNo";
function ScanSerialNo() {
  const {
    operator,
    setOperator,
    pcs,
    setPcs,
    lotNo,
    setLotNo,
    magazine,
    setMagazine,
    product,
    total,
    gvSerialState,
    hideImg,
    lblResultState,
    handle_Save_Click,
    handle_Cancel_Click,
    lblResult,
    columns,
    btnLotBack,
    btnOperatorBack,
    btnback,
    btnMagBack,
    handle_BtnBack_Click,
    handle_OperatorBack_Click,
    handle_LotBack_Click,
    handle_MagazineBack_Click,
    handle_txtPCS_Change,
    handle_txtlotNo_Change,
    handle_Operator_Change,
    handle_Magazine_Change,
    handletxtSerialChange,
    txtSerial,
    gvSerialResult,
    gvSerial,
  } = fn_ScanSerialNo();
  useEffect(() => {
    if (gvSerialState == true){
        document.getElementById("txtSerial_0").focus();
    }
  },[gvSerialState]);
  return (
    <>
      <Header />
      <Card component={Paper} className="RecordSP1Card">
        <table>
          <td className="RecordSP1maintd">
            <Table className="RecordSP1Table" component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Record Serial No.
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Operator:</TableCell>
                  <TableCell>
                    <input
                      className="RecordSP1txtF"
                      id="txtOperator"
                      value={operator}
                      onChange={(e) => setOperator(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handle_Operator_Change();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={btnOperatorBack}
                      onClick={handle_OperatorBack_Click}
                    >
                      <BackspaceIcon />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>PCS:</TableCell>
                  <TableCell>
                    <input
                      className="RecordSP1txtF"
                      id="txtPCS"
                      value={pcs}
                      onChange={(e) => setPcs(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handle_txtPCS_Change();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button disabled={btnback} onClick={handle_BtnBack_Click}>
                      <BackspaceIcon />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lot No.:</TableCell>
                  <TableCell>
                    <input
                      className="RecordSP1txtF"
                      id="txtLotNo"
                      value={lotNo}
                      onChange={(e) => setLotNo(e.target.value)}
                      //   onBlur={handle_txtlotNo_Change}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handle_txtlotNo_Change();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={btnLotBack}
                      onClick={handle_LotBack_Click}
                    >
                      <BackspaceIcon />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Magazine:</TableCell>
                  <TableCell>
                    <input
                      className="RecordSP1txtF"
                      id="txtMagazine"
                      value={magazine}
                      onChange={(e) => setMagazine(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handle_Magazine_Change();
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={btnMagBack}
                      onClick={handle_MagazineBack_Click}
                    >
                      <BackspaceIcon />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Product:</TableCell>
                  <TableCell className="RecordSP1lblShow">{product}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total:</TableCell>
                  <TableCell className="RecordSP1lblShow">{total}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
            &nbsp;&nbsp;
            {gvSerialState && (
              <Table classname="RecordSP1gvSerial" component={Card}>
                <TableHead style={{ background: "#12422e" }}>
                  <TableRow>
                    <TableCell
                      className="RecordSP1gvSerialCell"
                      style={{ color: "white" }}
                    >
                      No.
                    </TableCell>
                    <TableCell
                      className="RecordSP1gvSerialCell"
                      style={{ color: "white" }}
                    >
                      Serial No.
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gvSerial.map((row, index) => (
                    <TableRow
                      key={index}
                      style={{ padding: "4px 4px 4px 4px" }}
                    >
                      <TableCell
                        className="RecordSP1gvSerialCell"
                        style={{ width: "30%", textAlign: "right" }}
                      >
                        {row.SEQ}
                      </TableCell>
                      <TableCell
                        className="RecordSP1gvSerialCell"
                        style={{ width: "70%", paddingRight: "10px" }}
                      >
                        <input
                          className="RecordSP1TextFSerial"
                          id={`txtSerial_${index}`}
                          type="text"
                          maxLength="30"
                          value={txtSerial[index]}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handletxtSerialChange(index, e);
                            }
                          }}
                          onChange={(e) => handletxtSerialChange(index, e)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} className="RecordSP1gvSerialSave">
                      <Button className="BtSave" onClick={handle_Save_Click}>
                        SAVE
                      </Button>
                      &nbsp;&nbsp;
                      <Button
                        className="BtCancel"
                        onClick={handle_Cancel_Click}
                      >
                        {" "}
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </td>
          <td className="RecordSP1ResultTd">
            {hideImg && (
              <img
                className="RecordSP1ResultImg"
                src={Pageimg}
                alt="Description of the image"
              />
            )}
            {lblResultState && (
              <div className="lblResultRecordSP1">
                <Paper
                  className="lblResultCardRecordSP1"
                  elevation={3}
                  style={{
                    alignItems: "center",
                    background:
                      lblResult.value === "OK"
                        ? "#059212"
                        : lblResult.value === "NG"
                        ? "red"
                        : "#BA0900",
                  }}
                >
                  <Typography
                    variant="h4"
                    style={{
                      color: lblResult.styled.color,
                      fontSize: "30px",
                    }}
                  >
                    {lblResult.value}
                  </Typography>
                </Paper>
                <AntTable
                  className="tableGvResult"
                  columns={columns}
                  bordered
                    dataSource={gvSerialResult}
                  style={{ width: "980pxs", marginTop: "10px" }}
                  pagination={false}
                  size="small"
                />
                &nbsp; &nbsp;
              </div>
            )}
          </td>
        </table>
      </Card>
    </>
  );
}

export default ScanSerialNo;
