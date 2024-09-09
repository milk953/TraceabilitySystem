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
import BackspaceIcon from "@mui/icons-material/Backspace";
import Header from "../Header/Header";
import React from "react";
import { fn_ScanSMTConnectShtConfirm } from "./fn_ScanSMTConnectShtConfirm";
import Pageimg from "/src/assets/1.jpg";
import "./ScanSMTConnectShtConfirm.css";
function ScanSMTConnectShtConfirm() {
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
    handle_Cancel_Click
  } = fn_ScanSMTConnectShtConfirm();
  return (
    <div>
      <Header />
      <h1>Confirm Sht&Pcs</h1>
      <Card
        component={Paper}
        style={{
          margin: "auto",
          width: "95%",
          maxWidth: "1450px",
          marginTop: "50px",
          minHeight: "200px",
          padding: "20px",
          overflow: "auto",
        }}
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
                      Confirm Sht&Pcs
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Lot No.:</TableCell>
                    <TableCell>
                      <input
                        id="txtLot"
                        className="ScanSMTConnectShtConfirmtxtF"
                        value={txtLot}
                        onChange={(e) => setTxtLot(e.target.value)}
                        // onBlur={txtLot_Change}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            txtLot_Change();
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
                      {ddlproduct && (
                        <select
                          style={{ width: 240 }}
                          onChange={(e) => {
                            setProductSelected(e.target.value);
                            ddlproduct_Change();
                          }}
                          onInputChange={(e) => {
                            setProductSelected(e.target.value);
                            ddlproduct_Change();
                          }}
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
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Sht:</TableCell>
                    <TableCell>
                      <table style={{ display: "flex" }}>
                        <tr style={{ background: "red" }}>
                          <td>lblTotalSht</td>
                        </tr>
                        <tr style={{ background: "green" }}>
                          <td>lblShtCount</td>
                        </tr>
                      </table>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <h2
                style={{
                  textAlign: "center",
                  background: "red",
                  color: "yellow",
                }}
              >
                {"lblError"}
              </h2>
              &nbsp;&nbsp;
              {panalSerialState && (
                <Table classname="" component={Paper}>
                  <TableHead className="">
                    <TableRow>
                      <TableCell className="">No.</TableCell>
                      <TableCell className="">Serial No.</TableCell>
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
                          style={{ width: "40%", textAlign: "right" }}
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
                        <Button
                          className="BtSave"
                          onClick={handle_Save_Click}
                        >
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
              {/* {lblResultState && (
                <div className="lblResultFin">
                  <Paper
                    className="lblResultCardMasterFinal"
                    elevation={3}
                    style={{
                      alignItems: "center",
                      background: lblResult.value === "OK" ? "green" : lblResult.value === "NG" ? "red" : "white",
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
                  <Table
                    className="gvScanResultMasterFinal"
                    component={Paper}
                    style={{ width: "960px", margunBottom: "20px" }}
                  >
                    <TableHead sx={{ height: "20px" }}>
                      <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>Serial No.</TableCell>
                        <TableCell>Re-Judgement 1</TableCell>
                        <TableCell>Result</TableCell>
                        <TableCell>Re-Judgement 2</TableCell>
                        <TableCell>Test Result</TableCell>
                        <TableCell>Scan Result</TableCell>
                        <TableCell>Remark</TableCell>
                      </TableRow>
                    </TableHead>

                    {gvSerialResult.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.SEQ}</TableCell>
                        <TableCell>{row.SERIAL}</TableCell>
                        <TableCell>{row.REJECT}</TableCell>
                        <TableCell>{row.TOUCH_UP}</TableCell>
                        <TableCell>{row.REJECT2}</TableCell>
                        <TableCell>{row.SERIAL == '' ? '' : row.TEST_RESULT}</TableCell>
                        <TableCell sx={{background:row.SCAN_RESULT == 'NG'? 'red' : row.SCAN_RESULT == 'OK' ? 'green' : 'white'}}>{row.SCAN_RESULT}</TableCell>
                        <TableCell>{row.REMARK}</TableCell>
                      </TableRow>
                    ))}
                  </Table>
                  &nbsp; &nbsp;
                </div>
              )} */}
            </td>
          </tr>
        </table>
      </Card>
    </div>
  );
}

export default ScanSMTConnectShtConfirm;
