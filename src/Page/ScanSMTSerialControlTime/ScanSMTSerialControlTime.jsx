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
import "/src/Page/ScanSMTSerialRecordTime/ScanSMTSerialRecordTime.css";
import Hearder from "../Header/Hearder";
import { green } from "@mui/material/colors";

function ScanSMTSerialControlTime() {

   

    return (
        <div>
            <Hearder />
            <h1>Serial/Sheet Record Time</h1>
            <Card
                component={Paper}
                style={{
                    margin: "auto",
                    width: "90%",
                    maxWidth: "1400px",
                    marginTop: "50px",
                    height: "auto",
                    maxHeight: "580px",
                    padding: "20px",
                    display: 'flex',
                }}
            >
                
            </Card>
        </div>
    )
};

export default ScanSMTSerialControlTime;