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
import "/src/Page/ScanSMTSerialBackendConfirm/ScanSMTSerialBackendConfirm.css";
import Hearder from "../Header/Hearder";
import { fn_ScanSMTSerialBackendConfirm } from "./fn_ScanSMTSerialBackendConfirm";

function ScanSMTSerialBackendConfirm() {
  return (
    <div>
        <Hearder />
    </div>
  )
};

export default ScanSMTSerialBackendConfirm;