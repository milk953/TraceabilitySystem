import React from "react";
import Header from "../Header/Header";
import "./rollTraceView.css";
import { Input, Button, Tag, Table } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { Card, Paper } from "@mui/material";
import { fn_rollTraceView } from "./fn_rollTraceView";
import "../Common/StyleCommon.css";
function rollTraceView() {
  const {
    Product,
    RollNo,
    LotNo,
    RollSheetNo,
    setRollLeafTextFiled,
    RollLeafTextFiled,
    enterBtn,
    gvResultState,
    gvResult,
    columns,
    clearViwe,
  } = fn_rollTraceView();
  return (
    <>
      <Header />
      <h1>ViewTraceRoll</h1>

      <Card component={Paper}>
        <div className="RollTracetextField">
          {/* <Tag color="blue" style={{ fontSize: 20, verticalAlign: "center",height:40}}>
           <span style={{padding:'0 10 0 0 '}}> Roll Leaf No.</span>
          </Tag> */}
          <Button
            disabled
            style={{ color: "white", backgroundColor: "#31363F" }}
            type="primary"
            className="RollTraceBtn"
            iconPosition={"end"}
          >
            Roll Leaf No
          </Button>
          <Input
            size="small"
            id="RollLeafTextFiledFirst"
            className="RollTraceInput"
            placeholder="Please Input Roll Leaf"
            value={RollLeafTextFiled}
            onChange={(e) => setRollLeafTextFiled(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                enterBtn();
              }
            }}
          />
          <Button
            type="primary"
            className="RollTraceBtn"
            icon={<SearchOutlined />}
            onClick={enterBtn}
          >
            Retrive
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#f5222d", borderColor: "#f5222d" }}
            className="RollTraceBtn"
            icon={<ClearOutlined />}
            onClick={clearViwe}
          >
            Clear
          </Button>
        </div>

        <div className="RollTraceShowData">
          <table className="tableRollTrace">
            <tr>
              <td>
                <th>
                  {" "}
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#31363F" }}
                    className="RollTraceBtnLable"
                  >
                    Product
                  </Button>
                </th>
                <th className="labelShowData" >{Product}</th>
              </td>
              <td>
                <th>
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#31363F" }}
                    className="RollTraceBtnLable"
                  >
                    Roll No.
                  </Button>
                </th>
                <th className="labelShowData">{RollNo}</th>
              </td>
            </tr>
            <tr>
              <td>
                <th>
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#31363F" }}
                    className="RollTraceBtnLable"
                  >
                    Lot No.
                  </Button>
                </th>
                <th className="labelShowData">
                  <a
                    href={`LotRollLeafNo?ROLLNO=${LotNo}&product=${Product}`}
                    target="_blank"
                  >
                    {LotNo}{" "}
                  </a>
                </th>
              </td>
              <td>
                <th>
                  <Button
                    type="primary"
                    style={{ backgroundColor: "#31363F" }}
                    className="RollTraceBtnLable"
                  >
                    Roll Sheet No.
                  </Button>
                </th>
                <th className="labelShowData">{RollSheetNo}</th>
              </td>
            </tr>
         
          </table>
        </div>
        {gvResultState && (
          <Table
            className="tableGvResult"
            style={{
              width: "800px",
              margin: "auto",
              marginTop: "20px",
              marginBottom: "20px",
            }}
            columns={columns}
            dataSource={gvResult}
          />
        )}
        &nbsp;
      </Card>
    </>
  );
}

export default rollTraceView;
