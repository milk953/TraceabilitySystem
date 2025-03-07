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
import { Table as AntTable, Select, Button as AntdBtn } from "antd";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Header from "../Header/Header";
import React, { useEffect } from "react";
import { fn_ScanSMTConnectShtConfirm } from "./fn_ScanSMTConnectShtConfirm";
import Pageimg from "/src/assets/1.jpg";
import "../Common/StyleCommon.css";
import { Typography } from "antd";
import "./ScanSMTConnectShtConfirm.css";
import { fn_Homepage } from "../Homepage/fn_Homepage";
function ScanSMTConnectShtConfirm() {
  const { menuName } = fn_Homepage();
  const {
    hideImg,
    gvSerial,
    panalSerialState,
    txtLot,
    setTxtLot,
    txtLot_Change,
    ddlproduct,
    productSelected,
    setProductSelected,
    txtSerial,
    handletxtSerialChange,
    handle_Save_Click,
    handle_Cancel_Click,
    lblError,
    lblResultState,
    columns,
    ddlproduct_Change,
    ddlproductState,
    lblShtCount,
    lblTotalSht,
    gvScanResult,
    gvResutlState,
    lblResult,
    lblErrorState,
    handle_ibtnBack_Click,
    getRowClassName
  } = fn_ScanSMTConnectShtConfirm();
  useEffect(() => {
    if (panalSerialState == true && gvSerial != "" && txtSerial == "") {
      document.getElementById(`txtSerial_0`).focus();
    }
  }, [gvSerial, panalSerialState]);
  return (
    <div>
      <Header />
      <Card
        component={Paper}
        className="Card-Common"
      >
        <table>
          <tr>
            <td className="ScanSMTConnectShtConfirmmaintd">
              <Table
                className="ScanSMTConnectShtConfirmTable"
                component={Paper}
              >
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                    {menuName}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Lot No.:</TableCell>
                    <TableCell>
                      <input
                        id="ScanSMTConnectShtConfirmtxtLot"
                        className="ScanSMTConnectShtConfirmtxtF"
                        value={txtLot}
                        onChange={(e) => setTxtLot(e.target.value.trim())}
                        // onBlur={txtLot_Change}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtLot_Change();
                          }
                        }}
                      ></input>
                    </TableCell>
                    <TableCell>
                      <Button onClick={handle_ibtnBack_Click}>
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Product:</TableCell>
                    <TableCell colSpan={2}>
                      <Select
                        style={{
                          width: '98%',
                          textAlign: "left",
                          padding: "0px 5px 0px 0px",
                        }}
                        size={"small"}
                        value={productSelected}
                        onChange={(value) => {
                          ddlproduct_Change(value);
                        }}
                        options={ddlproduct.map((item) => ({
                          label: item.prd_name,
                          value: item.prd_name,
                        }))}
                      ></Select>
                    </TableCell>
                    {/* <TableCell></TableCell> */}
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Sht:</TableCell>
                    <TableCell>
                      <table
                        className="subTable"
                        style={{ display: "flex", marginLeft: "10px" }}
                      >
                        <tr
                          style={{
                            // background: "#8DECB4",
                            width: "115px",
                            borderRadius: "5%",
                            height: "30px",
                          }}
                        >
                          <td> {lblTotalSht}</td>
                        </tr>
                        
                        <tr
                          style={{
                            // background: "#FFF5E0",
                            width: "115px",
                            borderRadius: "5%",
                            height: "30px",
                            color: "green",
                          }}
                        >
                          <td>OK : {lblShtCount}</td>
                        </tr>
                      </table>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {lblErrorState && (
                <Card
  
                  className="Card-lblLog"
                >
                  {lblError}
                </Card>
              )}
              {panalSerialState && (
                <Table className="GvSerialConnectConfirm" component={Card}>
                  <TableHead>
                    <TableRow>
                      <TableCell>No.</TableCell>
                      <TableCell>Sheet No.</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {gvSerial.map((row, index) => (
                      <TableRow
                        key={index}
                        style={{ padding: "4px 4px 4px 4px" }}
                      >
                        <TableCell
                          className=""
                          style={{ width: "40%", textAlign: "center" }}
                        >
                          {row.SEQ}
                        </TableCell>
                        <TableCell
                          className=""
                          style={{ width: "70%", paddingRight: "10px" }}
                        >
                          <input
                            id={`txtSerial_${index}`}
                            type="text"
                            style={{
                              width: "300px",
                              textTransform: "uppercase",
                            }}
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
                      <TableCell
                        colSpan={3}
                        style={{
                          textAlign: "center",
                          padding: "3px",
                          gap: "10px",
                        }}
                      >
                        <AntdBtn className="BtSave" onClick={handle_Save_Click}>
                          Save
                        </AntdBtn>
                        &nbsp;&nbsp;
                        <AntdBtn
                          className="BtCancel"
                          onClick={handle_Cancel_Click}
                        >
                          {" "}
                          Cancel
                        </AntdBtn>
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
                    // width: "320px",
                    // height: "250px",
                    padding: "0",
                    align: "center",
                    margin: "auto",
                  }}
                  className="Img_GvResult"
                  src={Pageimg}
                  alt="Description of the image"
                />
              )}
              {lblResultState && (
                <div className="lblResultConfirmConnect">
                  <Paper
                    className="lblResultCardConfirmConnect"
                    elevation={3}
                    style={{
                      alignItems: "center",
                      background:
                        lblResult === "OK"
                          ? "green"
                          : lblResult === "NG"
                          ? "red"
                          : "red",
                    }}
                  >
                    <Typography
                      variant="h4"
                      style={{
                        color: 'white',
                        fontSize: "30px",
                      }}
                    >
                      {lblResult}
                    </Typography>
                  </Paper>
                </div>
              )}
              <div style={{ width: "1050px" }}>
                {gvResutlState && (
                  // <Paper>
                  <AntTable
                    className="tableGvResultConncetShtConfirm"
                    columns={columns}
                    bordered
                    dataSource={gvScanResult}
                    style={{ width: "100%" }}
                    pagination={false}
                    size="small"
                    rowClassName={getRowClassName}
                  />
                  // </Paper>
                )}
                &nbsp; &nbsp;
              </div>
            </td>
          </tr>
        </table>
      </Card>
    </div>
  );
}

export default ScanSMTConnectShtConfirm;
