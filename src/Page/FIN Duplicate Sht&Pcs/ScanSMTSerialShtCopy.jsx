import React, { useState } from "react";
import Header from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Pageimg from "/src/assets/1.jpg";
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
import { Typography, Table as AntTable, Select } from "antd";
import { fn_ScanSMTSerialShtCopy } from "./fn_ScanSMTSerialShtCopy";
import "../Common/StyleCommon.css";
import "./ScanSMTSerialShtCopy.css";
import { set } from "lodash";
function ScanSMTSerialShtCopy() {
  const {
    gvBackSideState,
    lblErrorState,
    panalSerialState,
    hideImg,
    lblResultState,
    pnlRollLeafState,
    pnlMachineState,
    pnlButtonFixState,
    txtlotNo,
    ddlProduct,
    setTxtlotNo,
    ddlproduct_Change,
    productSelected,
    setProductSelected,
    txtLotRef,
    setTxtLotRef,
    txtRollLeaf,
    setTxtRollLeaf,
    txtCheckRoll,
    setTxtCheckRoll,
    txtMachineNo,
    setTxtMachineNo,
    txtButtonFix,
    setTxtButtonFix,
    txtTopFix,
    setTxtTopFix,
  } = fn_ScanSMTSerialShtCopy();
  return (
    <>
      <Header />
      <h1>FIN Connect Sht & Pcs</h1>
      <Card component={Paper} className="FinCopyMainCard">
        <table>
          <tr>
            <td className="FinCopytxtFtable">
              <Table className="FinCopyTable" component={Paper}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      FIN Connect Sht & Pcs
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Lot No.:</TableCell>
                    <TableCell>
                      <input
                        className="FinCopytxtF"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setTxtlotNo(e.target.value);
                            // handle_txtlotNo_Change(e);
                          }
                        }}
                      ></input>
                    </TableCell>
                    <TableCell>
                      <Button>
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Product:</TableCell>
                    <TableCell>
                      <Select
                        style={{
                          width: 213,
                          textAlign: "left",
                          padding: "0px 5px 0px 0px",
                        }}
                        size={"small"}
                        value={productSelected}
                        onChange={(value) => {
                          ddlproduct_Change(value);
                        }}
                        options={ddlProduct.map((item) => ({
                          label: item.prd_name,
                          value: item.prd_name,
                        }))}
                      ></Select>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lot Ref. No.:</TableCell>
                    <TableCell>
                      <input className="FinCopytxtF"></input>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Sht:</TableCell>
                    <TableCell className="CelllblSpan">0</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Pcs:</TableCell>
                    <TableCell className="CelllblSpan">0</TableCell>
                  </TableRow>
                  {pnlRollLeafState && (
                    <>
                      <TableRow>
                        <TableCell>Roll Leaf No.:</TableCell>
                        <TableCell>
                          <input className="FinCopytxtF"></input>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Check Roll:</TableCell>
                        <TableCell>
                          <input className="FinCopytxtF"></input>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </>
                  )}
                  {pnlMachineState && (
                    <TableRow>
                      <TableCell>Machine No.:</TableCell>
                      <TableCell>
                        <input className="FinCopytxtF"></input>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}

                  {gvBackSideState && (
                    <TableRow>
                      <TableCell style={{ width: "100px", textAlign: "right" }}>
                        1
                      </TableCell>
                      <TableCell>
                        <input className="FinCopytxtF"></input>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              {pnlButtonFixState && (
                <Table component={Paper} className="FinCopyTable">
                  <TableBody>
                    <TableRow>
                      <TableCell>Button Fixture:</TableCell>
                      <TableCell>
                        <input className="FinCopytxtF"></input>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Top Fixture:</TableCell>
                      <TableCell>
                        <input className="FinCopytxtF"></input>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
              {lblErrorState && (
                <Paper className="Card-lblLog">{"lblError"}</Paper>
              )}
              {panalSerialState && (
                <Table classname="FinCopygvSerial" component={Card}>
                  <TableHead
                    className="gvSerialHead"
                    style={{ background: "#12422e" }}
                  >
                    <TableRow>
                      <TableCell
                        className="FinCopygvSerialCell"
                        style={{ color: "white" }}
                      >
                        No.
                      </TableCell>
                      <TableCell
                        className="FinCopygvSerialCell"
                        style={{ color: "white" }}
                      >
                        Serial No.
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {gvSerial.map((row, index) => ( */}
                    <TableRow
                      // key={index}
                      style={{ padding: "4px 4px 4px 4px" }}
                    >
                      <TableCell
                        className="FinCopygvSerialCell"
                        style={{ width: "40%", textAlign: "right" }}
                      >
                        {/* {row.SEQ} */}
                      </TableCell>
                      <TableCell
                        className="FinCopygvSerialCell"
                        style={{ width: "70%", paddingRight: "10px" }}
                      >
                        <input
                        // id={`txtSerial_${index}`}
                        // type="text"
                        // style={{
                        //   padding:'5px',
                        //   width: "300px",
                        //   textTransform: "uppercase",
                        // }}
                        // maxLength="30"
                        // value={txtSerial[index]}
                        // onKeyDown={(e) => {
                        //   if (e.key === "Enter") {
                        //     handletxtSerialChange(index, e);
                        //   }
                        // }}
                        // onChange={(e) => handletxtSerialChange(index, e)}
                        />
                      </TableCell>
                    </TableRow>
                    {/* ))} */}
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        style={{
                          textAlign: "center",
                          padding: "3px",
                          gap: "10px",
                        }}
                      >
                        <Button
                          className="BtSave"
                          // onClick={handle_Save_Click}
                        >
                          SAVE
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          className="BtCancel"
                          // onClick={handle_Cancel_Click}
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
            <td className="tdResult">
              {hideImg && (
                <img
                  className="imgPage"
                  src={Pageimg}
                  alt="Description of the image"
                />
              )}
              {lblResultState && (
                <div className="lblResultMasterFinal">
                  <Paper
                    className="lblResultCardMasterFinal"
                    elevation={3}
                    style={{
                      alignItems: "center",
                      // background: lblResult.value === "OK" ? "green" : lblResult.value === "NG" ? "red" : "white",
                      // background:
                      // lblResult.value === "OK"
                      //   ? "#059212"
                      //   : lblResult.value === "NG"
                      //   ? "red"
                      //   : "#BA0900",
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{
                        // color: lblResult.styled.color,
                        fontSize: "30px",
                      }}
                    >
                      {/* {lblResult.value} */}
                    </Typography>
                  </Paper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>No.</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  {/* <AntTable
                  className="tableGvResult"
                  columns={columns}
                  bordered
                  dataSource={gvSerialResult}
                  style={{ width: "980pxs",marginTop:"10px" }}
                  pagination={false}
                  size="small"
                /> */}
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

export default ScanSMTSerialShtCopy;
