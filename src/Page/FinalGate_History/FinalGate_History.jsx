import React, { useEffect, useState, useRef } from "react";
import "../Common/StyleCommon.css";
import Header from "../Header/Header.jsx";
import { Card, Paper } from "@mui/material";
import { Input, Button, Table, Typography, Tag, Tooltip, Avatar } from "antd";
import {
    SearchOutlined,
    UndoOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import "../FinalGate_History/FinalGate_History.css";
import excel from "/src/assets/excel.png";
import { fn_FinalGate_History } from "./fn_FinalGate_History.jsx";

function FinalGate_History() {
    const {
        gvViewFinal, columns, BtnExport, Serial
    } = fn_FinalGate_History();

    return (
        <div>
            <Header />
            <Card component={Paper} className="Card-Common" style={{ width: '97%' }}>
                <div
                    style={{
                        width: "99%",
                        display: "flex",
                        justifyContent: "flex-end",

                    }}
                >
                    {/* <a id="PieceTraceView"
                        href={`/TraceabilitySystem/PieceTraceView`}
                        style={{ fontSize: "16px", marginRight: "20px" }}
                    >
                        Return to viewdata
                    </a> */}
                    <Button
                        size="small"
                        icon={<Avatar shape="square" src={excel} size="small" />}
                        onClick={() =>
                            BtnExport('FinalGateHistory_' + Serial + '.xls')
                        }
                    >
                        Export
                    </Button>


                </div>
                <Table
                    dataSource={gvViewFinal}
                    columns={columns}
                    rowKey={(record) => record.serial_no}
                    className="tableGvResultViewFinalG"
                    pagination={false}
                    size="small"
                    bordered
                />
            </Card>
        </div>
    )
};

export default FinalGate_History;