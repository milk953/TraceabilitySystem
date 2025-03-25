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
import "../OSTResultPiece/OSTResultPiece.css";
import { fn_OSTResultPiece } from "./fn_OSTResultPiece.jsx";

function OSTResultPiece() {
    const {
        gvViewOST, lbl_Message, lblMessageColor, columnsOST
    } = fn_OSTResultPiece();

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
                    {/* <a id="PieceTraceView"
                        href={`/TraceabilitySystem/PieceTraceView`}
                        style={{ fontSize: "16px", marginRight: "20px" }}
                    >
                        Return to viewdata
                    </a> */}
                </div>
                <Table
                    dataSource={gvViewOST}
                    columns={columnsOST}
                    rowKey={(record) => record.LOT_NO}
                    className="tableGvResultViewOST"
                    pagination={false}
                    size="small"
                    bordered
                    scroll={{ x: 'max-content' }}
                />
            </Card>
        </div>
    )
};

export default OSTResultPiece;