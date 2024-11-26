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
    Button,
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
    DeleteFilled
} from "@ant-design/icons";
import DeleteIcon from '@mui/icons-material/Delete';
import "/src/Page/SMTDeleteData/SMTDeleteData.css";
import Header from "../Header/Header.jsx";
import { fn_SMTDeleteData } from "./fn_SMTDeleteData.jsx";
import Item from "antd/es/list/Item.js";

function SMTDeleteData() {

    const {
        pnlForm, lblResult, lblResultcolor, txtSheetNo, settxtSheetNo, txtRollLeaf, settxtRollLeaf, ddlELTType, ELTTypedata, txtSerialNo,
        txtFinalSerialNo, settxtFinalSerialNo, gvELTResult, gvELTData, gvFinalResult, gvFinalData, inputShtNo, btnShtDeleteClick, handleELTType,
        btnRollDeleteClick, handleSerialNo, btnSerialSearchClick, btnELTDeleteClick, btnFinalSerialSearchClick, btnFinalDeleteClick,
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
                        width: "52%",
                        margin: "10px",
                    }}
                >
                    <Table className="TbSMTDel">
                        <TableHead sx={{ backgroundColor: "#2E073F" }}>
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <Typography variant="h6">
                                        Connect Sht&Pcs
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">
                                    <Typography
                                        style={{ marginLeft: "22px" }}
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
                                        value={txtSheetNo}
                                        onChange={(e) => {
                                            settxtSheetNo(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                if (txtSheetNo !== "") {
                                                    btnShtDeleteClick();
                                                }
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Button className="Bt_del"
                                        onClick={btnShtDeleteClick}
                                    >
                                        <Tooltip title="Delete" placement="right-end">
                                            <DeleteIcon
                                                sx={{
                                                    fontSize: 35,
                                                    color: "red",
                                                    padding: 0
                                                }}
                                            />
                                        </Tooltip>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>

                <br />
                <br />
                <Card
                    component={Paper}
                    style={{
                        width: "52%",
                        margin: "10px",
                    }}
                >
                    <Table className="TbSMTDel">
                        <TableHead sx={{ backgroundColor: "#001F3F" }}>
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <Typography variant="h6">
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
                                        value={txtRollLeaf}
                                        onChange={(e) => {
                                            settxtRollLeaf(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                btnRollDeleteClick();
                                                
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Button className="Bt_del"
                                        onClick={btnRollDeleteClick}
                                    >
                                        <Tooltip title="Delete" placement="right-end">
                                            <DeleteIcon
                                                style={{
                                                    fontSize: 35,
                                                    color: "red",
                                                }}
                                            />
                                        </Tooltip>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>

                <br />
                <br />
                <Card
                    component={Paper}
                    style={{
                        width: "52%",
                        margin: "10px",
                    }}
                >
                    <Table className="TbSMTDel">
                        <TableHead sx={{ backgroundColor: "#1A3636" }}>
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <Typography variant="h6">
                                        ELT Result
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography
                                        style={{
                                            marginLeft: "25px"
                                        }}
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
                                        }}
                                        rows="10"
                                        cols="71"
                                        maxLength="2500"
                                        value={txtSerialNo}
                                        onChange={handleSerialNo}
                                    ></textarea>
                                </TableCell>
                                <TableCell >
                                    <Button
                                        variant="contained"
                                        sx={{
                                            marginLeft: "-114px",
                                            marginBottom: "100px"
                                        }}
                                        size="small"
                                        onClick={btnSerialSearchClick}
                                    >
                                        <SearchOutlined
                                            style={{
                                                fontSize: '20px'
                                            }}
                                        />
                                        Search
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>

                {gvELTResult && (
                    <div className="divgvELTResult" style={{ position: "relative" }}>
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
                                        <TableCell>Type</TableCell>
                                        <TableCell>No</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Serial No.</TableCell>
                                        <TableCell>Result</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Array.from({ length: gvELTData.length }, (_, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">
                                                <Checkbox
                                                    size="small"
                                                    style={{ padding: "0" }}
                                                    checked={true}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                {gvELTData[index].SEQ}
                                            </TableCell>
                                            <TableCell align="center">
                                                {gvELTData[index].ELT_TYPE}
                                            </TableCell>
                                            <TableCell align="center">
                                                {gvELTData[index].SERIAL_NO}
                                            </TableCell>
                                            <TableCell align="center">
                                                {gvELTData[index].ELT_RESULT}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}
                <div style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginBottom: "20px"
                }}>
                    <Button
                        className="BtCancel"
                        onClick={btnELTDeleteClick}
                    >
                        <DeleteIcon />
                        Delete
                    </Button>
                </div>

                <Card
                    component={Paper}
                    style={{
                        width: "52%",
                        margin: "10px",
                    }}
                >
                    <Table className="TbSMTDel">
                        <TableHead sx={{ backgroundColor: "#3B3030" }}>
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <Typography variant="h6">
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
                                            marginRight: "120px"
                                        }}
                                        rows="10"
                                        cols="71"
                                        value={txtFinalSerialNo}
                                        onChange={(e) => {
                                            settxtFinalSerialNo(e.target.value)
                                        }}
                                    ></textarea>
                                </TableCell>
                                <TableCell >
                                    <Button
                                        variant="contained"
                                        sx={{
                                            marginLeft: "-120px",
                                            marginBottom: "100px"
                                        }}
                                        size="small"
                                        onClick={btnFinalSerialSearchClick}
                                    >
                                        <SearchOutlined
                                            style={{
                                                fontSize: '20px'
                                            }}
                                        />
                                        Search
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Card>

                {gvFinalResult && (
                    <div className="divgvELTResult" style={{ position: "relative" }}>
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
                                        <TableCell>Type</TableCell>
                                        <TableCell>No</TableCell>
                                        <TableCell>Serial No.</TableCell>
                                        <TableCell>Result</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Array.from({ length: gvFinalData.length }, (_, index) => (
                                        <TableRow key={index}>
                                            <TableCell align="center">
                                                <Checkbox
                                                    size="small"
                                                    style={{ padding: "0" }}
                                                    checked={true}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                {gvFinalData[index].SEQ}
                                            </TableCell>
                                            <TableCell align="center">
                                                {gvFinalData[index].SERIAL_NO}
                                            </TableCell>
                                            <TableCell align="center">
                                                {gvFinalData[index].FINAL_RESULT}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginBottom: "2px"
                }}>
                    <Button
                        className="BtCancel"
                        onClick={btnFinalDeleteClick}
                    >
                        <DeleteIcon />
                        Delete
                    </Button>
                </div>
            </Box>
        </div>
    )
};

export default SMTDeleteData;