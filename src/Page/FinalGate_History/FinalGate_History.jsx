import React, { useEffect, useState, useRef } from "react";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header.jsx";
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
        gvViewFinal, columns
    } = fn_FinalGate_History();

    return (
        <div>
            <Hearder />
            <Card component={Paper} className="Card-Common">
                <div>
                    <a id="hypLotNo"
                        href={`http://10.17.74.227/TraceabilitySystem/PieceTraceView`}
                        style={{ fontSize: "16px" }}
                    >
                        Return to viewdata
                    </a>
                    <button
                        style={{
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            marginLeft: "100px"
                        }}
                    >
                        <img src={excel} alt="Excel Icon" width="40" height="40" />
                    </button>
                </div>
                <Table
                    dataSource={gvViewFinal}
                    columns={columns}
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