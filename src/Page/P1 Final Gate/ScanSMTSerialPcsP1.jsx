import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "../Common/StyleCommon.css";
import "./ScanSMTSerialPcsP1.css";
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
import { Button as AntButton } from "antd";
import { Typography, Table as AntTable } from "antd";
import Pageimg from "/src/assets/1.jpg";
import { fn_ScanSMTSerialPcsP1 } from "./fn_ScanSMTSerialPcsP1";
import { fn_Homepage } from "../Homepage/fn_Homepage";
function ScanSMTSerialPcsP1() {
  const { menuName } = fn_Homepage();
  const {
    scanLot,
    setScanLot,
    ddlproduct,
    setddlproduct,
    productSelected,
    setProductSelected,
    lblLot,
    setlblLot,
    lblLotTotal,
    setlblLotTotal,
    lblSerialNG,
    setlblSerialNG,
    lblError,
    setlblError,
    lblErrorState,
    panalSerialState,
    hideImg,
    lblResultState,
    lblResult,
    gvSerialResult,
    gvSerial,
    txtSerial,
    setTxtSerial,
    ddlProductState,
    ddlproduct_Change,
    ibtBack_Click,
    textScanLotChange,
    btnCancel_Click,
    btnSvae_Click,
    handletxtSerialChange,
    columns,
    getRowClassName,
    txtSerialref, //newadding
    handleSaveRef, //newadding
    txtSerialChangeRef, //newadding
    txtSerialClear, //newadding
  } = fn_ScanSMTSerialPcsP1();
  useEffect(() => {
    if (panalSerialState == true) {
      document.getElementById("txtSerial_0").focus();
    }
  }, [panalSerialState]);
  return (
    <>
      <Header />
      <Card
        component={Paper}
        className="Card-Common"
      >
        <table>
          <tr>
            <td className="P1FGmaintd">
              <Table className="P1FGTable" component={Paper}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      {menuName}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Scan Lot:</TableCell>
                    <TableCell>
                      <input
                        className="P1FGtxtF"
                        id="P1FGScanLot"
                        onChange={(e) => {
                          setScanLot(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            textScanLotChange(e);
                          }
                        }}
                        value={scanLot}
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={ibtBack_Click}>
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Product:</TableCell>
                    {
                      <TableCell colSpan={2}>
                        {ddlproduct && (
                          <select
                            style={{ width: '98%', padding: "5px" }}
                            onChange={(e) => {
                              setProductSelected(e.target.value);
                              ddlproduct_Change(e.target.value);
                            }}
                            onInputChange={(e) => {
                              setProductSelected(e.target.value);
                              ddlproduct_Change(e.target.value);
                            }}
                            disabled={ddlProductState}
                            value={productSelected}
                          >
                            {ddlproduct.map((item) => (
                              <option key={item.prd_name} value={item.prd_name}>
                                {item.prd_name}
                              </option>
                            ))}
                          </select>
                        )}
                      </TableCell>
                    }
                  </TableRow>
                </TableBody>
              </Table>
              <Table component={Paper} className="P1FGTableSecond">
                <TableBody>
                  <TableRow>
                    <TableCell style={{ width: 60, textAlign: "right" }}>
                      Lot :
                    </TableCell>
                    <TableCell style={{ textAlign: "left" }}>
                      {lblLot}
                    </TableCell>
                    <TableCell
                      style={{ width: 30, color: "green", fontWeight: "bold" }}
                    >
                      OK:
                    </TableCell>
                    <TableCell style={{ width: 60, textAlign: "left" }}>
                      {lblLotTotal}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell
                      style={{ width: 30, color: "red", fontWeight: "bold" }}
                    >
                      NG:
                    </TableCell>
                    <TableCell style={{ width: 60, textAlign: "left" }}>
                      {lblSerialNG}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {lblErrorState && (
                <Paper className="Card-lblLog">{lblError}</Paper>
              )}
              {panalSerialState && (
                <Table className="P1FGgvSerial" component={Card}>
                  <TableHead
                    className="gvSerialHead"
                    style={{ background: "#12422e" }}
                  >
                    <TableRow>
                      <TableCell
                        className="P1FGgvSerialCell"
                        style={{
                          color: "white",
                          borderRight: "1px solid #e0e0e0",
                        }}
                      >
                        No.
                      </TableCell>
                      <TableCell
                        className="P1FGgvSerialCell"
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
                          className="P1FGgvSerialCell"
                          style={{
                            width: "10%",
                            textAlign: "right",
                            borderRight: "1px solid #e0e0e0",
                          }}
                        >
                          {row.SEQ}
                        </TableCell>
                        <TableCell
                          className="P1FGgvSerialCell"
                          style={{ width: "70%", paddingRight: "10px" }}
                        >
                          <input
                            id={`txtSerial_${index}`}
                            type="text"
                            style={{
                              padding: "3px",
                              width: "95%",
                              textTransform: "uppercase",
                            }}
                            maxLength="30"
                            ref={(el) => (txtSerialClear.current[index] = el)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                if (index < gvSerial.length - 1) {
                                  document
                                    .getElementById(`txtSerial_${index + 1}`)
                                    .focus();
                                } else {
                                  handleSaveRef();
                                }
                              }
                            }}
                            onChange={(e) =>
                              txtSerialChangeRef(index, e.target.value)
                            }
                            // value={txtSerial[index]}
                            // onKeyDown={(e) => {
                            //   // if (e.key === "Enter") {
                            //   //   handletxtSerialChange(index, e);
                            //   // }
                            //   if (
                            //     e.key === "Enter" &&
                            //     index < gvSerial.length - 1
                            //   ) {
                            //     handletxtSerialChange(index, e);
                            //   } else if (
                            //     e.key === "Enter" &&
                            //     index === gvSerial.length - 1
                            //   ) {
                            //     btnSvae_Click();
                            //     e.target.blur();
                            //   }
                            // }}
                            // onChange={(e) => handletxtSerialChange(index, e)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        style={{
                          textAlign: "center",
                          padding: "3px",
                          gap: "10px",
                        }}
                      >
                        <AntButton className="BtSave" onClick={handleSaveRef}>
                          Save
                        </AntButton>
                        &nbsp;&nbsp;
                        <AntButton
                          className="BtCancel"
                          onClick={btnCancel_Click}
                        >
                          {" "}
                          Cancel
                        </AntButton>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </td>
            <td
              style={{
                textAlign: "left",
                width: "900px",
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                padding: "0",
                margin: "0",
                verticalAlign: "top",
              }}
            >
              {hideImg && (
                <img
                  style={{
                    width: "320px",
                    height: "250px",
                    padding: "0",
                    align: "center",
                    margin: "auto",
                  }}
                  src={Pageimg}
                  alt="Description of the image"
                />
              )}
              {lblResultState && (
                <div className="lblResultP1FG">
                  <Paper
                    className="lblResultCardP1FG"
                    elevation={3}
                    style={{
                      alignItems: "center",
                      background:
                        lblResult.value === "OK"
                          ? "green"
                          : lblResult.value === "NG"
                          ? "red"
                          : "white",
                      background:
                        lblResult.value === "OK"
                          ? "green"
                          : lblResult.value === "NG"
                          ? "red"
                          : "red",
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
                    rowClassName={getRowClassName}
                    size="small"
                  />
                  &nbsp; &nbsp;
                </div>
              )}
            </td>
          </tr>
        </table>
      </Card>
    </>
  );
}

export default ScanSMTSerialPcsP1;
