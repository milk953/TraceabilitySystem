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
import "../AOI_Result/AOI_Result.css";
import excel from "/src/assets/excel.png";
import { fn_AOIResult } from "./fn_AOIResult.jsx";

function AOI_Result() {
    const { gvViewAOI, columns, BtnExport, lbl_Message, lblMessageColor } = fn_AOIResult();
    const Now = new Date().toLocaleTimeString("en-GB", { hour12: false });

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
                    <Button
                        size="small"
                        icon={<Avatar shape="square" src={excel} size="small" />}
                        onClick={() =>
                            BtnExport('AOI_' + Now + '.csv')
                        }
                    >
                        Export
                    </Button>
                </div>
                <Table
                    dataSource={gvViewAOI}
                    columns={columns}
                    rowKey={(record) => record.seq}
                    className="tableGvResultViewAOI"
                    pagination={false}
                    size="small"
                    bordered
                    scroll={{ x: 'max-content' }}
                />
            </Card>
        </div>
    )
};

export default AOI_Result;