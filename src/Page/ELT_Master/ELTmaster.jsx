import React, { useState } from "react";
import Hearder from "../Header/Header";
import "../Reject/Reject.css";
import "./ELTmaster.css";
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Typography,
  Card,
} from "@mui/material";
import { fn_ELTmaster } from "./fn_ELTmaster";
import { fn_Homepage } from "../Homepage/fn_Homepage";
import { Button as ButtonTable } from "antd";
import { SearchOutlined } from "@ant-design/icons";
function ELT_Master() {
  const {
    lblUser1,
    lblResult,
    txtSerialNo_TextChanged,
    ddlReason1,
    selectddlReason1,
    setselectddlReason1,
    txtUpdateBy,
    settxtSerialNo_TextChanged,
    Search_Data,
    Submit,
    FctxtSerial,
    handleBtnCancel,
  } = fn_ELTmaster();
  const { menuName } = fn_Homepage();
  return (
    <>
      <Hearder />

      <div className="Head-ELT">
        <table className="Head-Textshow">
          <tbody>
            <tr>
              <td>
                <Typography></Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography>{lblUser1}</Typography>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Card
                  style={{ display: lblResult.text === "" ? "none" : "" }}
                  className={
                    lblResult.styled.backgroundColor === "red"
                      ? "ResultError"
                      : "ResultSuccess"
                  }
                >
                  {lblResult.text}
                </Card>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="ELTMmasterPnlForm">
        <Table className="Header_Center" component={Card}>
          <TableHead>
            <TableCell colSpan={4}>
              {menuName ? menuName : "ELT Master"}
            </TableCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{ width: "20%", textAlign: "right" }}>
                Piece No.
              </TableCell>
              <TableCell style={{ width: "80%" }}>
                <TextField
                  size="small"
                  style={{ width: "100%" }}
                  value={txtSerialNo_TextChanged}
                  onChange={(e) =>
                    settxtSerialNo_TextChanged(
                      e.target.value.trim().toUpperCase()
                    )
                  }
                  // onBlur={Search_Data}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      Search_Data();
                    }
                  }}
                  inputRef={FctxtSerial}
                ></TextField>
              </TableCell>
              <TableCell style={{ padding: "8px" }}>
                <ButtonTable
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={Search_Data}
                >
                  Search
                </ButtonTable>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div>
        <Table className="ELTTableSecond" component={Card}>
          <TableBody>
            <TableRow sx={{ maargin: "1px" }}>
              <TableCell align="right">Before Reson :</TableCell>
              <TableCell>
                <select
                  style={{ width: "95%" }}
                  onChange={(e) => setselectddlReason1(e.target.value)}
                  value={selectddlReason1}
                >
                  <option value="" disabled align="center">
                    --------------------- Select --------------------
                  </option>
                  {ddlReason1
                    .filter(
                      (option) =>
                        option.rejcet_code && option.rejcet_code.trim() !== ""
                    )
                    .map((option, index) => (
                      <option key={index} value={option.rejcet_code}>
                        {option.rejcet_code === "DELETE"
                          ? "DELETE"
                          : `${option.rejcet_code} : ${option.rejcet_name}`}
                      </option>
                    ))}
                </select>
              </TableCell>
              <TableCell align="right">Update By :</TableCell>
              <TableCell>
                <input
                  style={{
                    width: "85%",
                    backgroundColor: "#E2E3DC",
                  }}
                  type="text"
                  value={txtUpdateBy}
                  disabled
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={4}
                sx={{
                  textAlign: "center",
                }}
              >
                <ButtonTable
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    width: "90px",
                  }}
                  onClick={Submit}
                >
                  Submit
                </ButtonTable>
                &nbsp;&nbsp;
                <ButtonTable
                  className="ButtonCancel"
                  style={{
                    width: "90px",
                    color: "white",
                  }}
                  onClick={handleBtnCancel}
                >
                  Cancel
                </ButtonTable>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default ELT_Master;
