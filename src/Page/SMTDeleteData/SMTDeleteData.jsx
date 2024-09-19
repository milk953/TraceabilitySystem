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
import "/src/Page/SMTDeleteData/SMTDeleteData.css";
import Header from "../Header/Header.jsx";
import { fn_SMTDeleteData } from "./fn_SMTDeleteData.jsx";

function SMTDeleteData() {
    return (
        <div>
            <Header />
        </div>
    )
};

export default SMTDeleteData;