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
import Hearder from "../Header/Hearder";
import { fn_ScanSMTPlasmaStopStart } from "./fn_ScanSMTPlasmaStopStart";

function ScanSMTPlasmaStopStart() {
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
                            width: "450px",
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
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Card>
        </div>
    )
};

export default ScanSMTPlasmaStopStart;