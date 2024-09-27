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
            style={{color: "white", backgroundColor: "#4b5943" }}
            type="primary"
            className="RollTraceBtn"
            iconPosition={"end"}
          >
             Roll Leaf No
          </Button>
          <Input
            size="small"
            className="RollTraceInput"
            placeholder="Please Input Roll Leaf"
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
            iconPosition={"end"}
            icon={<SearchOutlined />}
            onClick={enterBtn}
          >
            Retrive
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#f5222d", borderColor: "#f5222d" }}
            className="RollTraceBtn"
            iconPosition={"end"}
            icon={<ClearOutlined />}
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
                  <Tag
                    color="blue"
                    style={{
                      fontSize: 18,
                      width: 130,
                    }}
                  >
                    Product
                  </Tag>
                </th>
                <th>{Product}</th>
              </td>
            </tr>
            <tr>
              <td>
                <th>
                  <Tag
                    color="blue"
                    style={{
                      fontSize: 18,
                      width: 130,
                    }}
                  >
                    Roll No.
                  </Tag>
                </th>
                <th>{RollNo}</th>
              </td>
            </tr>
            <tr>
              <td>
                <th>
                  <Tag
                    color="blue"
                    style={{
                      fontSize: 18,
                      width: 130,
                    }}
                  >
                    Lot No.
                  </Tag>
                </th>
                <th>
                  <a
                    href={`rpt_LotRollLeafNo.aspx?LOTNO=${LotNo}&product=${Product}`}
                    target="#"
                  >
                    {LotNo}{" "}
                  </a>
                </th>
              </td>
            </tr>
            <tr>
              <td>
                <th>
                  <Tag
                    color="blue"
                    style={{
                      fontSize: 18,
                      width: 130,
                    }}
                  >
                    Roll Sheet No.
                  </Tag>
                </th>
                <th>{RollSheetNo}</th>
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
