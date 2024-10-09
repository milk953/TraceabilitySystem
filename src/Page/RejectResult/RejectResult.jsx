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
import "../RejectResult/RejectResult.css";
import { fn_RejectResult } from "./fn_RejectResult.jsx";

function RejectResult() {
    const { gvViewReject, columnsReject } = fn_RejectResult();
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
                    dataSource={gvViewReject}
                    columns={columnsReject}
                    rowKey={(record) => record.rej_serial_no}
                    className="tableGvResultViewReject"
                    pagination={false}
                    size="small"
                    bordered
                    scroll={{ x: 'max-content' }}
                />
            </Card>
        </div>
    )
};

export default RejectResult;