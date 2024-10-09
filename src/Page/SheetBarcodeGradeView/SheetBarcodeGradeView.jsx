import React from "react";
import Header from "../Header/Header";
import { Card, Paper } from "@mui/material";
import { Input, Button, Tag, Table, Select, Radio } from "antd";
import { SearchOutlined, FileExcelOutlined } from "@ant-design/icons";
import "./SheetBarcodeGradeView.css";
import { fn_SheetBarcodeGradeView } from "./fn_SheetBarcodeGradeView";
import { set } from "lodash";
function SheetBarcodeGradeView() {
  const {
    gvResult,
    gvResultState,
    lotNotextField,
    setLotNotextField,
    setRadioValue,
    radioValue,
    resultValue,
    setResultValue,
    RetriveBtn,
    product_result,
    lotNo_result,
    totalSheet_result,
    dataSource,
    columns,
    exportExcelFile
  } = fn_SheetBarcodeGradeView();
  return (
    <div>
      <Header />
     
      <Card component={Card} className="Card-Common" style={{width:'97%'}}>
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                RetriveBtn();
              }
            }}
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
            onChange={(e) => {
              setResultValue(e);
            }}
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
            <Radio value={"RESULT"}>Result</Radio>
            <Radio value={"VALUE"}>Value</Radio>
          </Radio.Group>
          <Button
            type="primary"
            className="ReportBadBtn"
            iconPosition={"end"}
            icon={<SearchOutlined />}
            onClick={RetriveBtn}
          >
            Retrive
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#006600", borderColor: "#006600" }}
            className="ReportBadBtn"
            iconPosition={"end"}
            icon={<FileExcelOutlined />}
            onClick={exportExcelFile}
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
                <th className="ReportBadLabelTxt">{product_result}</th>
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
                <th className="ReportBadLabelTxt">
                  <a
                    href={`LotRollLeafNo?LOTNO=${lotNo_result}&product=${product_result}`}
                    target="#"
                  >
                    {lotNo_result}
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
                <th className="ReportBadLabelTxt">{totalSheet_result}</th>
              </td>
            </tr>
          </table>
        </div>
        {gvResultState && (
          <div>
            <Table
              className="tableGvResult"
              style={{
                width: "98%",
                margin: "auto",
                marginTop: "20px",
                marginBottom: "20px",
              }}
              dataSource={gvResult}
              columns={columns}
              pagination={false}
              size="small"
              scroll={{ x: 'max-content' }}
              bordered
            />
          </div>
        )}
        &nbsp;
      </Card>
    </div>
  );
}

export default SheetBarcodeGradeView;
