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
import excel from "/src/assets/excel.png";
import "../PREResult/PREResult.css";
import { fn_PREResult } from "./fn_PREResult.jsx";

function PREResult() {
    const {gvViewPRE, lbl_Message, lblMessageColor, columnsPRE, btnExport} = fn_PREResult();
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
                    <Button
                        size="small"
                        icon={<Avatar shape="square" src={excel} size="small" />}
                        onClick={() =>
                            btnExport('PRE_' + Now + '.csv')
                        }
                    >
                        Export
                    </Button>
                </div>
                <Table
                    dataSource={gvViewPRE}
                    columns={columnsPRE}
                    rowKey={(record) => record.prd_sheet_no}
                    className="tableGvResultViewPRE"
                    pagination={false}
                    size="small"
                    bordered
                    scroll={{ x: 'max-content' }}
                />
            </Card>
        </div>
    )
};

export default PREResult;