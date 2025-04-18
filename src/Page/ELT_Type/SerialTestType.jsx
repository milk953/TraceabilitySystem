import React, { useEffect } from "react";
import Hearder from "../Header/Header";
import { fn_SerialTestType } from "./fn_SerialTestType";
import { fn_Homepage } from "../Homepage/fn_Homepage";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
  Card,
} from "@mui/material";
import { Table as AntTable, Button } from "antd";
import "./SerialTestType.css";
import { PlusCircleOutlined } from "@ant-design/icons";
function SerialTestType() {
  const { menuName } = fn_Homepage();
  const {
    productData,
    productSelect,
    productSelectChange,
    ELTTypeSelectChange,
    ELTTypeSelect,
    ELTTypeData,
    result,
    handleDelete,
    handleAddData,
    lblMassage,
    lblMassageState,
    columns,
  } = fn_SerialTestType();
  return (
    <>
      <Hearder />
      <div style={{ marginTop: "80px" }} />
      {lblMassageState && (
        <Paper className="CardlblErrorELT">{lblMassage}</Paper>
      )}
      <div className="ELTETYPEPnlForm">
        <Table className="ETYPEmasterTb" component={Card}>
          <TableHead>
            <TableCell colSpan={4}> {menuName || "ELT Type"}</TableCell>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell style={{ textAlign: "right" }}>Product:</TableCell>
              <TableCell>
                <select
                  onInputChange={(e) => productSelectChange(e.target.value)}
                  onChange={(e) => productSelectChange(e.target.value)}
                  value={productSelect}
                >
                  {productData.map((option, index) => (
                    <option key={index} value={`${option.product}`}>
                      {`${option.product}`}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{ textAlign: "right" }}>ELT Type:</TableCell>
              <TableCell>
                <select
                  onInputChange={(e) => ELTTypeSelectChange(e.target.value)}
                  onChange={(e) => ELTTypeSelectChange(e.target.value)}
                  value={ELTTypeSelect}
                >
                  {ELTTypeData.map((option, index) => (
                    <option key={index} value={`${option.elt_type}`}>
                      {`${option.elt_type}`}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell>
                <Button
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  onClick={handleAddData}
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
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
    </>
  );
}

export default SerialTestType;
