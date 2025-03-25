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
import "../AOICOAResult/AOICOAResult.css";
import { fn_AOICOAResult } from "./fn_AOICOAResult.jsx";

function AOICOAResult() {

    const { gvViewAOICOA, columnsAoiCoaResult, btnExport, lbl_Message, lblMessageColor, Now } = fn_AOICOAResult();

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
                            btnExport('AOI_' + Now + '.csv')
                        }
                    >
                        Export
                    </Button>
                </div>
                <Table
                    dataSource={gvViewAOICOA}
                    columns={columnsAoiCoaResult}
                    rowKey={(record) => record.seq}
                    className="tableGvResultViewAOICOA"
                    pagination={false}
                    size="small"
                    bordered
                    scroll={{ x: 'max-content' }}
                />
            </Card>
        </div>
    )
};

export default AOICOAResult;