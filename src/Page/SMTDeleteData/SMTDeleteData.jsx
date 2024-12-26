import React, { useState, useEffect } from "react";
import {
    TextField,
    Card,
    Table,
    TableCell,
    TableBody,
    TableRow,
    TableHead,
    Paper,
    Typography,
    //Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Autocomplete,
    Box,
    Checkbox,
    Tooltip,
    TableContainer,
} from "@mui/material";
import {
    ArrowRightOutlined,
    DeleteOutlined,
    ArrowLeftOutlined,
    FileExcelFilled,
    SearchOutlined,
    DeleteFilled,
    ClearOutlined
} from "@ant-design/icons";
import { Button } from "antd";
import { Table as AntTable } from 'antd';
import DeleteIcon from '@mui/icons-material/Delete';
import "./SMTDeleteData.css";
import Header from "../Header/Header.jsx";
import { fn_SMTDeleteData } from "./fn_SMTDeleteData.jsx";

function SMTDeleteData() {

    const {
        pnlForm, lblResult, lblResultcolor, txtSheetNo, settxtSheetNo, txtRollLeaf, settxtRollLeaf, ddlELTType, ELTTypedata, txtSerialNo,
        txtFinalSerialNo, settxtFinalSerialNo, gvELTResult, gvELTData, gvFinalResult, gvFinalData, inputShtNo, btnShtDeleteClick, handleELTType,
        btnRollDeleteClick, columnsconrollleaf, btnSerialSearchClick, btnELTDeleteClick, btnFinalSerialSearchClick, btnFinalDeleteClick, btnClearELTClick,
        btnClearFinalClick, columnseltresult, rowSelectelt, columnsfinalresult, rowSelectFinal, inputELTSerial, inputFinalSerial, settxtSerialNo, btnSearchShtnoClick,
        gvConShtPcs, gvConShtPcsData, columnsconshtpcs, rowSelection, btnShtCancelClick, rowSelect, btnSearchRollleafClick, gvConRollLeaf, gvConRollLeafData,
        btnRollCancelClick
    } = fn_SMTDeleteData();

    return (
        <div>
            <Header />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginTop: '90px',
                    width: "100%",
                }}
            >
                {pnlForm && (
                    <Paper
                        className="Card-pnlfrom"
                        style={{
                            marginLeft: "2px",
                            background: lblResultcolor,
                        }}
                    >
                        <Typography
                            variant="h5"
                            style={{
                                paddingTop: "5px",
                                color: "#fff"
                            }}
                        >
                            {lblResult}
                        </Typography>
                    </Paper>
                )}

                <Card
                    component={Paper}
                    style={{
                        width: "823px",
                        margin: "10px",
                    }}
                >
                    <Table className="TbSMTDel">
                        <TableHead sx={{ backgroundColor: "#2E073F" }}>
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <Typography
                                        style={{
                                            fontSize: "20px",
                                            height: "30px"
                                        }}
                                    >
                                        Connect Sht&Pcs
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">
                                    <Typography
                                        style={{ marginLeft: "22px", }}
                                    >
                                        Sheet No. :
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        className="customTxtField"
                                        size="small"
                                        fullWidth
                                        inputRef={(el) => (inputShtNo.current = el)}
                                        value={txtSheetNo.trim()}
                                        onChange={(e) => {
                                            settxtSheetNo(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                btnSearchShtnoClick();
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        align="center"
                                        type="primary"
                                        style={{
                                            textTransform: "none",
                                        }}
                                        icon={<SearchOutlined />}
                                        onClick={btnSearchShtnoClick}
                                    >
                                        Search
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>


                {gvConShtPcs && (
                    <AntTable
                        rowSelection={rowSelection}
                        columns={columnsconshtpcs}
                        dataSource={gvConShtPcsData}
                        rowKey={(record) => JSON.stringify
                            ({
                                count: record.count,
                                lot_no: record.lot_no,
                                product_name: record.product_name,
                                front_sheet_no: record.front_sheet_no,
                                back_sheet_no: record.back_sheet_no
                            })}
                        style={{ width: '823px' }}
                        pagination={false}
                        size="small"
                        bordered
                        className="tableGvResult"
                    />
                )}
                {gvConShtPcs && (
                    <TableRow>
                        <TableCell align="center">
                            <Button className="ButtonDelete"
                                type="primary"
                                onClick={btnShtDeleteClick}
                            >
                                Delete
                            </Button>&nbsp;&nbsp;
                            <Button
                                className="ButtonCancel"
                                type="primary"
                                onClick={btnShtCancelClick}
                            >
                                Cancel
                            </Button>
                        </TableCell>
                    </TableRow>
                )}


                <br />
                <br />
                <Card
                    component={Paper}
                    style={{
                        width: "823px",
                        margin: "10px",
                    }}
                >
                    <Table className="TbSMTDel">
                        <TableHead sx={{ backgroundColor: "#001F3F" }}>
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <Typography
                                        style={{
                                            fontSize: "20px",
                                            height: "30px"
                                        }}
                                    >
                                        Connect Roll&Leaf
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">
                                    <Typography>Roll Leaf No. :</Typography>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        className="customTxtField"
                                        id="rollleaf"
                                        size="small"
                                        fullWidth
                                        value={txtRollLeaf.trim()}
                                        onChange={(e) => {
                                            settxtRollLeaf(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                btnSearchRollleafClick();
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        align="center"
                                        type="primary"
                                        style={{
                                            textTransform: "none",
                                        }}
                                        icon={<SearchOutlined />}
                                        onClick={btnSearchRollleafClick}
                                    >
                                        Search
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>

                {gvConRollLeaf && (
                    <AntTable
                        rowSelection={rowSelect}
                        columns={columnsconrollleaf}
                        dataSource={gvConRollLeafData}
                        rowKey={(record) => JSON.stringify
                            ({
                                count: record.count,
                                lot_no: record.lot_no,
                                product_name: record.product_name,
                                roll_no: record.roll_no,
                                roll_leaf: record.roll_leaf
                            })}
                        style={{ width: '823px' }}
                        pagination={false}
                        size="small"
                        bordered
                        className="tableGvResult"
                    />
                )}
                {gvConRollLeaf && (
                    <TableRow>
                        <TableCell align="center">
                            <Button className="ButtonDelete"
                                type="primary"
                                onClick={btnRollDeleteClick}
                            >
                                Delete
                            </Button>&nbsp;&nbsp;
                            <Button
                                className="ButtonCancel"
                                type="primary"
                                onClick={btnRollCancelClick}
                            >
                                Cancel
                            </Button>
                        </TableCell>
                    </TableRow>
                )}

                <br />
                <br />

                <Card
                    component={Paper}
                    style={{
                        width: "823px",
                        margin: "10px",
                    }}
                >
                    <Table className="TbSMTDel">
                        <TableHead sx={{ backgroundColor: "#1A3636" }}>
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <Typography
                                        style={{
                                            fontSize: "20px",
                                            height: "30px"
                                        }}
                                    >
                                        ELT Result
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">
                                    <Typography
                                    // style={{
                                    //     marginLeft: "20px"
                                    // }}
                                    >
                                        ELT Type :
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Autocomplete
                                        className="SeldropDown"
                                        options={ELTTypedata.map((Item) => Item.elt_type)}
                                        value={ddlELTType}
                                        onChange={(e, value) => {
                                            handleELTType(value);
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params}
                                                size="small"
                                                sx={{ textAlign: "left" }}
                                            />
                                        )}
                                    />
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">
                                    <Typography>Serial No. : (No.1,No.2,...)</Typography>
                                </TableCell>
                                <TableCell>
                                    <textarea
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            paddingRight: "60px"
                                        }}
                                        rows="10"
                                        cols="71"
                                        value={txtSerialNo}
                                        onChange={(e) => {
                                            settxtSerialNo(e.target.value);
                                        }}
                                        ref={(el) => (inputELTSerial.current = el)}
                                    ></textarea>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        type="primary"
                                        style={{
                                            textTransform: "none",
                                        }}
                                        icon={<SearchOutlined />}
                                        onClick={btnSerialSearchClick}
                                    >
                                        Search
                                    </Button>
                                    {/* <Button
                                        className="ButtonCancel"
                                        type="primary"
                                        style={{
                                            width: "95px",
                                            //background: "red",
                                        }}
                                        onClick={btnClearELTClick}
                                    >
                                        Cancel
                                    </Button> */}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>

                {gvELTResult && (
                    <AntTable
                        rowSelection={rowSelectelt}
                        columns={columnseltresult}
                        dataSource={gvELTData}
                        rowKey={(record) => JSON.stringify
                            ({
                                ELT_TYPE: record.ELT_TYPE,
                                SERIAL_NO: record.SERIAL_NO,
                                TABLE_NAME: record.TABLE_NAME
                            })}
                        style={{ width: '823px' }}
                        pagination={false}
                        size="small"
                        bordered
                        className="tableGvResult"
                    />
                )}
                {gvELTResult && (
                    <TableRow>
                        <TableCell align="center">
                            <Button className="ButtonDelete"
                                type="primary"
                                onClick={btnELTDeleteClick}
                            >
                                Delete
                            </Button>&nbsp;&nbsp;
                            <Button
                                className="ButtonCancel"
                                type="primary"
                                onClick={btnClearELTClick}
                            >
                                Cancel
                            </Button>
                        </TableCell>
                    </TableRow>
                )}

                <br />
                <br />
                <Card
                    component={Paper}
                    style={{
                        width: "823px",
                        margin: "10px",
                    }}
                >
                    <Table className="TbSMTDel">
                        <TableHead sx={{ backgroundColor: "#3B3030" }}>
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <Typography
                                        style={{
                                            fontSize: "20px",
                                            height: "30px"
                                        }}
                                    >
                                        Final Gate
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">
                                    <Typography>Serial No. : (No.1,No.2,...)</Typography>
                                </TableCell>
                                <TableCell>
                                    <textarea
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            paddingRight: "60px"
                                        }}
                                        rows="10"
                                        cols="71"
                                        value={txtFinalSerialNo}
                                        onChange={(e) => {
                                            settxtFinalSerialNo(e.target.value)
                                        }}
                                        ref={(el) => (inputFinalSerial.current = el)}
                                    ></textarea>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        type="primary"
                                        style={{
                                            textTransform: "none",
                                        }}
                                        icon={<SearchOutlined />}
                                        onClick={btnFinalSerialSearchClick}
                                    >
                                        Search
                                    </Button>
                                    {/* <Button
                                        className="ButtonCancel"
                                        type="primary"
                                        style={{
                                            width: "95px",
                                            //background: "red",
                                        }}
                                        onClick={btnClearFinalClick}
                                    >
                                        Cancel
                                    </Button> */}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>

                {gvFinalResult && (
                    <AntTable
                        rowSelection={rowSelectFinal}
                        columns={columnsfinalresult}
                        dataSource={gvFinalData}
                        rowKey={(record) => JSON.stringify
                            ({
                                SERIAL_NO: record.SERIAL_NO
                            })}
                        style={{ width: '823px' }}
                        pagination={false}
                        size="small"
                        bordered
                        className="tableGvResult"
                    />
                )}

                {gvFinalResult && (
                    <TableRow>
                        <TableCell align="center">
                            <Button className="ButtonDelete"
                                type="primary"
                                onClick={btnFinalDeleteClick}
                            >
                                Delete
                            </Button>&nbsp;&nbsp;
                            <Button
                                className="ButtonCancel"
                                type="primary"
                                onClick={btnClearFinalClick}
                            >
                                Cancel
                            </Button>
                        </TableCell>
                    </TableRow>
                )}
            </Box>
        </div>
    )
};

export default SMTDeleteData;