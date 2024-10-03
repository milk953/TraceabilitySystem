import React from "react";
import Header from "../Header/Header";
import { Card, Paper } from "@mui/material";
import { Input, Button, Tag, Table, Select, Radio } from "antd";
import { SearchOutlined, FileExcelOutlined } from "@ant-design/icons";
import "./SheetBadMarkView.css";
import { fn_SheetBadMarkView } from "./fn_SheetBadMarkView";
import { set } from "lodash";
function SheetBadMarkView() {
  const {
    product,
    lotNo,
    totalSheet,
    gvResult,
    gvResultState,
    lotNotextField,
    setLotNotextField,
    setRadioValue,
    radioValue,
    resultValue,
    setResultValue,
  } = fn_SheetBadMarkView();
  return (
    <div>
      <Header />
      <h1>SheetBadMarkView</h1>
      <Card component={Card}>
        <div className="ReportBadTextFileDiv">
          <Button
            disabled
            style={{ color: "white", backgroundColor: "#31363F" }}
            type="primary"
            iconPosition={"end"}
          >
            Lot No.
          </Button>
          <Input
            size="small"
            id="ReportBadLotNoInput"
            className="ReportBadLotNoInput"
            placeholder="Please Input Lot No"
            value={lotNotextField}
            onChange={(e) => setLotNotextField(e.target.value)}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") {
            //     enterBtn();
            //   }
            // }}
          />
          <Button
            disabled
            style={{ color: "white", backgroundColor: "#31363F" }}
            type="primary"
            // className="ReportBadBtn"
            iconPosition={"end"}
          >
            Result
          </Button>
          <Select
            value={resultValue}
            style={{ width: 120 }}
            onChange={(e) => {setResultValue(e)}}
            options={[
              { value: "ALL", label: "ALL" },
              { value: "OK", label: "OK" },
              { value: "NG", label: "NG" },
            ]}
          />
          <Button
            disabled
            style={{ color: "white", backgroundColor: "#31363F" }}
            type="primary"
            // className="ReportBadBtn"
            iconPosition={"end"}
          >
            By
          </Button>
          <Radio.Group
            value={radioValue}
            on
            style={{ marginTop: "5px" }}
            onChange={(e) => {
              setRadioValue(e.target.value);
            }}
          >
            <Radio value={"Result"}>Result</Radio>
            <Radio value={"Value"}>Value</Radio>
          </Radio.Group>
          <Button
            type="primary"
            className="ReportBadBtn"
            iconPosition={"end"}
            icon={<SearchOutlined />}
            // onClick={enterBtn}
          >
            Retrive
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#006600", borderColor: "#006600" }}
            className="ReportBadBtn"
            iconPosition={"end"}
            icon={<FileExcelOutlined />}
            // onClick={clearViwe}
          >
            Export
          </Button>
        </div>
        <div className="RollTraceShowData">
          <table className="tableReportBad">
            <tr>
              <td>
                <th>
                  {" "}
                  <Button
                    disabled
                    className="ReportBadBtnLabel"
                    style={{ color: "white", backgroundColor: "#31363F" }}
                    type="primary"
                    iconPosition={"end"}
                  >
                    Product
                  </Button>
                </th>
                {/* <th>{Product}</th> */}
              </td>
            </tr>
            <tr>
              <td>
                <th>
                  <Button
                    disabled
                    className="ReportBadBtnLabel"
                    style={{ color: "white", backgroundColor: "#31363F" }}
                    type="primary"
                    iconPosition={"end"}
                  >
                    Lot No.
                  </Button>
                </th>
                <th>
                  <a
                    // href={`rpt_LotRollLeafNo.aspx?LOTNO=${LotNo}&product=${Product}`}
                    target="#"
                  >
                    {/* {LotNo}{" "} */}
                  </a>
                </th>
              </td>
            </tr>
            <tr>
              <td>
                <th>
                  <Button
                    disabled
                    className="ReportBadBtnLabel"
                    style={{ color: "white", backgroundColor: "#31363F" }}
                    type="primary"
                    iconPosition={"end"}
                  >
                    Total Sheet
                  </Button>
                </th>
                {/* <th>{RollSheetNo}</th> */}
              </td>
            </tr>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default SheetBadMarkView;
