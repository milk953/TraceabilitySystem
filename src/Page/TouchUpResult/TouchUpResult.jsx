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
import "../TouchUpResult/TouchUpResult.css";
import { fn_TouchUpResult } from "./fn_TouchUpResult.jsx";

function TouchUpResult() {
    const { gvViewTouchup, columnsTouchup } = fn_TouchUpResult();

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
                    <a id="PieceTraceView"
                        href={`/TraceabilitySystem/PieceTraceView`}
                        style={{ fontSize: "16px", marginRight: "10px" }}
                    >
                        Return to viewdata
                    </a>
                </div>
                <Table
                    dataSource={gvViewTouchup}
                    columns={columnsTouchup}
                    rowKey={(record) => record.tou_serialno}
                    className="tableGvResultViewTouchUp"
                    pagination={false}
                    size="small"
                    bordered
                    scroll={{ x: 'max-content' }}
                />
            </Card>
        </div>
    )
};

export default TouchUpResult;