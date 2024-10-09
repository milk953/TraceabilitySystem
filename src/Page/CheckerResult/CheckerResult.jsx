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
import "../CheckerResult/CheckerResult.css"
import { fn_CheckerResult } from "./fn_CheckerResult.jsx";

function CheckerResult() {
    const {
        gvViewdata, gvViewdata2, gvViewdata3, columnsChecker1, columnsChecker2, columnsChecker3, lbl_Message, lblMessageColor
    } = fn_CheckerResult();

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
                    <Typography
                        style={{ marginRight: "500px", color: lblMessageColor }}
                    >
                        {lbl_Message}
                    </Typography>
                    <a id="PieceTraceView"
                        href={`/TraceabilitySystem/PieceTraceView`}
                        style={{ fontSize: "16px", marginRight: "20px" }}
                    >
                        Return to viewdata
                    </a>
                </div>
                <Table
                    dataSource={gvViewdata}
                    columns={columnsChecker1}
                    rowKey={(record) => record.serial_no}
                    className="tableGvResultViewChecker"
                    pagination={false}
                    size="small"
                    bordered
                    scroll={{ x: 'max-content' }}
                />
                <div style={{ marginTop: "40px" }}>
                    <Table
                        dataSource={gvViewdata2}
                        columns={columnsChecker2}
                        rowKey={(record) => record.chd_seq}
                        className="tableGvResultViewChecker"
                        pagination={false}
                        size="small"
                        bordered
                        scroll={{ x: 'max-content' }}
                    />
                </div>
                <div style={{ marginTop: "40px" }}>
                    <Table
                        dataSource={gvViewdata3}
                        columns={columnsChecker3}
                        rowKey={(record) => record.chd_serialno}
                        className="tableGvResultViewChecker"
                        pagination={false}
                        size="small"
                        bordered
                        scroll={{ x: 'max-content' }}
                    />
                </div>
            </Card>
        </div>
    )
};

export default CheckerResult;