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
import "/src/Page/ScanSMTPlasmaStopStart/ScanSMTPlasmaStopStart.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTPlasmaStopStart } from "./fn_ScanSMTPlasmaStopStart";
import { fn_Homepage } from "../Homepage/fn_Homepage";

function ScanSMTPlasmaStopStart() {

    const { menuName } = fn_Homepage();
    const {
        txtLotNo, settxtLotNo, selProduct, Productdata, selectedrbt, txtPartialNo, settxtPartialNo, lblPatialNo, visiblelog, lblLog,
        pnlStatus, txtLotDisabled, selProductDisabled, txtPartialDisabled, inputLot, ddlProduct, inputPartial, handleChangeLot, ibtBackClick,
        handleChangeProduct, handleChangePartial, lblStatus, handleChangerbtStopStart, lblStatusColor
    } = fn_ScanSMTPlasmaStopStart();

    return (
        <div>
            <Hearder />
            <Card
                component={Paper}
                className="Card-Common"
                sx={{ display: "flex" }}
            >
                <Box justifyContent="space-between">
                    <TableContainer
                        component={Card}
                        style={{
                            width: "502px",
                            // margin: "4px"
                        }}
                    >
                        <Table className="Header_Left">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        {/* <Typography variant="h6">
                                            Stop/Start Record Time
                                        </Typography> */}
                                        {menuName ? menuName : "Stop/Start Record Time"}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography>Lot No. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="txtLot"
                                            size="small"
                                            inputRef={inputLot}
                                            fullWidth
                                            value={txtLotNo.trim()}
                                            disabled={txtLotDisabled}
                                            style={{
                                                backgroundColor: txtLotDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            onChange={(e) => {
                                                settxtLotNo(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangeLot();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className="Bt_ibtBack" id="ibtBack" onClick={ibtBackClick}>
                                            <Tooltip title="Clear Lot" placement="right-end">
                                                <BackspaceIcon className="Icon_ibtBack" />
                                            </Tooltip>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography>Product :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={2}>
                                        <Autocomplete
                                            className="Select_dropDown"
                                            id="ddlProduct"
                                            disabled={selProductDisabled}
                                            style={{
                                                backgroundColor: selProductDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            value={selProduct}
                                            onChange={(e, value) => handleChangeProduct(value)}
                                            options={Productdata.map((item) => item.prd_name)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
                                                    inputRef={ddlProduct}
                                                    sx={{ textAlign: "left" }}
                                                />
                                            )}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography>Time :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <RadioGroup
                                            row
                                            value={selectedrbt}
                                            onChange={handleChangerbtStopStart}
                                        >
                                            <FormControlLabel
                                                value="rbtStop"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 19,
                                                                color: "white"
                                                            },
                                                        }}
                                                        id="rbtStop"
                                                        checked={selectedrbt === "rbtStop"}
                                                    />
                                                }
                                                label="Stop"
                                                sx={{
                                                    marginLeft: 2,
                                                    backgroundColor: "#EE4E4E",
                                                    color: "white",
                                                    width: "80px"
                                                }}
                                            />
                                            <FormControlLabel
                                                value="rbtStart"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 19,
                                                                color: "white"
                                                            },
                                                        }}
                                                        id="rbtStart"
                                                        checked={selectedrbt === "rbtStart"}
                                                    />
                                                }
                                                label="Start"
                                                sx={{
                                                    marginLeft: 7,
                                                    backgroundColor: "#6295A2",
                                                    color: "white",
                                                    width: "80px"
                                                }}
                                            />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="right">
                                        <Typography>Partial/Packing No. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            id="txtPartialNo"
                                            size="small"
                                            inputRef={inputPartial}
                                            fullWidth
                                            value={txtPartialNo.trim()}
                                            disabled={txtPartialDisabled}
                                            style={{
                                                backgroundColor: txtPartialDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            onChange={(e) => {
                                                settxtPartialNo(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangePartial();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Paper
                        elevation={2}
                        style={{
                            width: "502px",
                            height: "40px",
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography align="left"
                            style={{ padding: "5px", color: "#660066" }}
                        >
                            Partial/Packing No. :
                        </Typography>
                        <Typography
                            id="lblPartialNo"
                            style={{
                                fontSize: "16px",
                                marginLeft: "6px",
                                color: "#660033",
                            }}
                        >
                            {lblPatialNo}
                        </Typography>
                    </Paper>

                    {visiblelog && (
                        <Paper
                            elevation={3}
                            className="Card-lblLog"
                            id="lblLog"
                            style={{
                                width: "503px",
                            }}
                        >
                            {lblLog}
                        </Paper>
                    )}

                    {pnlStatus && (
                        <Card
                            component={Paper}
                            style={{
                                width: "503px",
                                height: "80px",
                                textAlign: "center",
                                background: lblStatusColor,
                                marginTop: "10px"
                            }}
                        >
                            <Typography
                                id="lblStatus"
                                variant="h2"
                                color={"#fff"}
                            >
                                {lblStatus}
                            </Typography>
                        </Card>
                    )}
                </Box>
            </Card>
        </div>
    )
};

export default ScanSMTPlasmaStopStart;