import React, { useState, useEffect } from "react";
import {
    TextField,
    Card,
    Table,
    TableCell,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    Paper,
    Typography,
    Button,
    Select,
    MenuItem,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    InputLabel,
    Autocomplete,
    Box,
    Tooltip,
} from "@mui/material";
import { Table as AntTable } from 'antd';
import "../Common/StyleCommon.css";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Header from "../Header/Header";
import Pageimg from "/src/assets/1.jpg";
import "../ScanAOISheetNo/ScanAOISheetNo.css";
import { fn_ScanAOISheetNo } from "./fn_ScanAOISheetNo";

function ScanAOISheetNo() {
    const {
        txtOperator, settxtOperator, txtTotalPcs, settxtTotalPcs, txtNo, settxtNo, txtLeaf, settxtLeaf, txtLayer, settxtLayer,
        txtLotNo, settxtLotNo, lblProduct, ibtOperator, ibtback, ibtLayerBack, ibtLotBack, pnlSerial, gvSerial, lblSEQ, txtgvSerial,
        lblResult, lblResultcolor, gvScanResult, txtOperatorDisabled, txtTotalPcsDisabled, txtLeafDisabled, txtLayerDisabled, txtLotNoDisabled,
        inputOperator, inputTotalPcs, inputLeaf, inputLayer, inputLot, inputSerial, handleChangeOperator, ibtOperator_Click, handleChangeTotalPcs,
        handleChangeNo, ibtBack_Click, handleChangeLeaf, handleChangeLayer, ibtLayerBack_Click, handleChangeLotNo, ibtLotBack_Click, handleChangeSerial,
        btnSave_Click, btnCancel_Click, columns, handleKeygvSerial
    } = fn_ScanAOISheetNo();

    return (
        <div>
            <Header />
            <Card
                component={Paper}
                className="Card-Common"
                sx={{ display: "flex" }}
            >
                <Box justifyContent="space-between"
                    sx={{
                        marginLeft: "-20px",
                        marginTop: "-10px"
                    }}
                >
                    <TableContainer
                        component={Paper}
                        style={{
                            width: "440px",
                            margin: "4px",
                        }}
                    >
                        <Table className="TbScanAOISheetNo">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography variant="h6">
                                            Scan AOI SheetNo
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Operator :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            inputRef={(el) => (inputOperator.current = el)}
                                            fullWidth
                                            value={txtOperator}
                                            disabled={txtOperatorDisabled}
                                            style={{
                                                backgroundColor: txtOperatorDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            onChange={(e) => {
                                                settxtOperator(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangeOperator();
                                                }
                                            }}
                                            onBlur={() => {
                                                if (txtOperator !== "") {
                                                    handleChangeOperator();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className="Bt_ibtBack"
                                            disabled={ibtOperator.disabled}
                                            onClick={ibtOperator_Click}
                                        >
                                            <Tooltip title="Lock" placement="right-end">
                                                <BackspaceIcon className="Icon_ibtBack" />
                                            </Tooltip>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Total Sht. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            inputRef={(el) => (inputTotalPcs.current = el)}
                                            fullWidth
                                            value={txtTotalPcs}
                                            disabled={txtTotalPcsDisabled}
                                            style={{
                                                width: "80px",
                                                backgroundColor: txtTotalPcsDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            onChange={(e) => {
                                                settxtTotalPcs(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangeTotalPcs();
                                                }
                                            }}
                                            onBlur={handleChangeTotalPcs}

                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography style={{ marginLeft: "55px" }}>No. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            fullWidth
                                            value={txtNo}
                                            style={{
                                                width: "80px"
                                            }}
                                            onChange={(e) => {
                                                settxtNo(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangeNo();
                                                }
                                            }}
                                            onBlur={handleChangeNo}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className="Bt_ibtBack"
                                            disabled={ibtback.disabled}
                                            onClick={ibtBack_Click}
                                        >
                                            <Tooltip title="Lock" placement="right-end">
                                                <BackspaceIcon className="Icon_ibtBack" />
                                            </Tooltip>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Total Leaf :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            inputRef={(el) => (inputLeaf.current = el)}
                                            fullWidth
                                            value={txtLeaf}
                                            disabled={txtLeafDisabled}
                                            style={{
                                                width: "80px",
                                                backgroundColor: txtLeafDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            onChange={(e) => {
                                                settxtLeaf(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangeLeaf();
                                                }
                                            }}
                                            onBlur={handleChangeLeaf}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Typography style={{ marginLeft: "37px" }}>Layer. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            inputRef={(el) => (inputLayer.current = el)}
                                            fullWidth
                                            value={txtLayer}
                                            disabled={txtLayerDisabled}
                                            style={{
                                                width: "80px",
                                                backgroundColor: txtLayerDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            onChange={(e) => {
                                                settxtLayer(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangeLayer();
                                                }
                                            }}
                                            onBlur={handleChangeLayer}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className="Bt_ibtBack"
                                            disabled={ibtLayerBack.disabled}
                                            onClick={ibtLayerBack_Click}
                                        >
                                            <Tooltip title="Lock" placement="right-end">
                                                <BackspaceIcon className="Icon_ibtBack" />
                                            </Tooltip>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Lot No. :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            inputRef={(el) => (inputLot.current = el)}
                                            fullWidth
                                            value={txtLotNo}
                                            disabled={txtLotNoDisabled}
                                            style={{
                                                backgroundColor: txtLotNoDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            onChange={(e) => {
                                                settxtLotNo(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangeLotNo();
                                                }
                                            }}
                                            onBlur={handleChangeLotNo}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className="Bt_ibtBack"
                                            disabled={ibtLotBack.disabled}
                                            onClick={ibtLotBack_Click}
                                        >
                                            <Tooltip title="Lock" placement="right-end">
                                                <BackspaceIcon className="Icon_ibtBack" />
                                            </Tooltip>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Product :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={2}>
                                        <Typography>{lblProduct}</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {pnlSerial && (
                        <div className="divgvSerialAOISheetNo" style={{ position: "relative" }}>
                            <TableContainer
                                component={Paper}
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>No.</TableCell>
                                            <TableCell>Leaf</TableCell>
                                            <TableCell>Sheet No.</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Array.from({ length: gvSerial.length }, (_, index) => (
                                            <TableRow key={index}>
                                                <TableCell
                                                    align="center"
                                                >
                                                    {lblSEQ}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {gvSerial[index].SEQ}
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        className="input_txt"
                                                        size="small"
                                                        fullWidth
                                                        value={txtgvSerial[index] || ""}
                                                        inputRef={el => inputSerial.current[index] = el}
                                                        onChange={(e) => {
                                                            handleChangeSerial(index, e);
                                                        }}
                                                        onKeyDown={(e) => handleKeygvSerial(e, index)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <div style={{
                                    marginTop: "auto",
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "10px",
                                    marginLeft: "5px",
                                    marginBottom: "2px"
                                }}
                                >
                                    <Button
                                        className="BtSave"
                                        onClick={btnSave_Click}
                                    >
                                        Save
                                    </Button>{" "}
                                    &nbsp;&nbsp;
                                    <Button
                                        className="BtCancel"
                                        onClick={btnCancel_Click}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </TableContainer>
                        </div>
                    )}

                    {gvScanResult.visible && (
                        <div style={{ marginLeft: "22px", width: "100%" }}>
                            <Paper
                                className="Card-lblResult"
                                style={{
                                    width: "100%",
                                    background: lblResultcolor,
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    style={{ paddingTop: "5px", color: "#fff" }}
                                >
                                    {lblResult}
                                </Typography>
                            </Paper>
                        </div>
                    )}
                </Box>

                <div className="divgvScanResultAOISheetNo">
                    {gvScanResult.visible === false && (
                        <>
                            <img
                                className="Img_GvResult"
                                style={{ marginLeft: "35%", }}
                                src={Pageimg} // Import the image
                                alt="Description of the image"
                            />
                        </>
                    )}

                    {gvScanResult.visible && (
                        <>
                            <AntTable
                                columns={columns}
                                dataSource={gvScanResult.value}
                                rowKey={(record) => record.seq}
                                style={{ width: '90%', marginLeft: "70px" }}
                                pagination={false}
                                size="small"
                                bordered
                                className="tableGvResult"
                            />
                        </>
                    )}
                </div>

            </Card>
        </div>
    )
};

export default ScanAOISheetNo;