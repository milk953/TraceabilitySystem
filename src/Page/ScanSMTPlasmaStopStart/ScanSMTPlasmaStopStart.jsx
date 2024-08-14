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
import {
    ArrowRightOutlined,
    DeleteOutlined,
    ArrowLeftOutlined,
    FileExcelFilled
} from "@ant-design/icons";
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
            <h1>Start/Stop Record Time</h1>
            <Card
                component={Paper}
                style={{
                    margin: "auto",
                    width: "90%",
                    maxWidth: "1400px",
                    marginTop: "50px",
                    height: "auto",
                    maxHeight: "560px",
                    padding: "20px",
                    display: 'flex',
                }}
            >
                <Box justifyContent="space-between">
                    <TableContainer
                        component={Paper}
                        style={{
                            width: "490px",
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
                                            id="txtfield"
                                            size="small"
                                            inputRef={inputLot}
                                            fullWidth
                                            value={txtLotNo}
                                            disabled={txtLotDisabled}
                                            style={{
                                                backgroundColor: txtLotDisabled ? "#EEEEEE" : "inherit",
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
                                        <Button className="btIcon" onClick={ibtBackClick}>
                                            <Tooltip title="Clear Lot" placement="right-end">
                                                <BackspaceIcon
                                                    style={{
                                                        fontSize: '24px'
                                                    }}
                                                />
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
                                            id="select"
                                            disabled={selProductDisabled}
                                            ref={ddlProduct}
                                            style={{
                                                backgroundColor: selProductDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            value={selProduct}
                                            onChange={(e, value) => handleChangeProduct(value)}
                                            options={Productdata.map((item) => item.prd_name || null)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    size="small"
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
                                            id="txtfield"
                                            size="small"
                                            inputRef={inputPartial}
                                            fullWidth
                                            value={txtPartialNo}
                                            disabled={txtPartialDisabled}
                                            style={{
                                                backgroundColor: txtPartialDisabled ? "#EEEEEE" : "inherit",
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
                            width: "490px",
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
                        <Card
                            component={Paper}
                            style={{
                                width: "490px",
                                height: "40px",
                                margin: 'auto',
                                textAlign: "center",
                                background: "#BB2525",
                                paddingTop: "9px",
                                marginTop: "1px",
                                marginLeft: "26px",
                            }}
                        >
                            <Typography
                                variant="h5"
                                style={{ color: "yellow" }}
                            >
                                {lblLog}
                            </Typography>
                        </Card>
                    )}

                    {pnlStatus && (
                        <Card
                            component={Paper}
                            style={{
                                width: "490px",
                                height: "80px",
                                margin: 'auto',
                                textAlign: "center",
                                background: "#CCFFFF",
                                paddingTop: "9px",
                                marginTop: "1px",
                                marginLeft: "26px",
                            }}
                        >
                            <Typography
                                variant="h2"
                                color={lblStatusColor}
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