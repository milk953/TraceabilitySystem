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

function ScanSMTPlasmaStopStart() {

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
                <Box justifyContent="space-between"
                    sx={{
                        marginLeft: "-20px",
                        marginTop: "-14px"
                    }}
                >
                    <TableContainer
                        component={Paper}
                        style={{
                            width: "502px",
                            margin: "4px"
                        }}
                    >
                        <Table className="TbScanSMTPlasma">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <Typography variant="h6">
                                            Start/Stop Record Time
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Lot No. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            inputRef={inputLot}
                                            fullWidth
                                            value={txtLotNo}
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
                                            onBlur={() => {
                                                if (txtLotNo !== "") {
                                                    handleChangeLot();
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className="Bt_ibtBack" onClick={ibtBackClick}>
                                            <Tooltip title="Clear Lot" placement="right-end">
                                                <BackspaceIcon className="Icon_ibtBack" />
                                            </Tooltip>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Product :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Autocomplete
                                            className="Select_dropDown"
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
                                    <TableCell>
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
                                    <TableCell>
                                        <Typography>Partial/Packing No. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            className="input_txt"
                                            size="small"
                                            inputRef={inputPartial}
                                            fullWidth
                                            value={txtPartialNo}
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
                                            onBlur={handleChangePartial}
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
                            margin: "auto",
                            height: "40px",
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: "26px",
                        }}
                    >
                        <Typography align="left"
                            style={{ padding: "5px", color: "#660066" }}
                        >
                            Partial/Packing No. :
                        </Typography>
                        <Typography
                            style={{
                                fontSize: "18px",
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
                            style={{
                                width: "505px",
                                marginLeft: "25px",
                            }}
                        >
                            {lblLog}
                        </Paper>
                    )}

                    {pnlStatus && (
                        <Card
                            component={Paper}
                            style={{
                                width: "502px",
                                height: "80px",
                                margin: 'auto',
                                textAlign: "center",
                                background: lblStatusColor,
                                paddingTop: "9px",
                                marginTop: "1px",
                                marginLeft: "26px",
                            }}
                        >
                            <Typography
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