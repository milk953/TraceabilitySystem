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
import Pageimg from "/src/assets/1.jpg";
import BackspaceIcon from "@mui/icons-material/Backspace";
import Header from "../Header/Header";
import "/src/Page/ScanSMTSerialShtMaster/ScanSMTSerialShtMaster.css";
import { fn_ScanSMTSerialShtMaster } from "./fn_ScanSMTSerialShtMaster";

function ScanSMTSerialShtMaster() {
    return (
        <div>
            <Header />
            <h1>SMT Connect Sht & Pcs</h1>
            <Card
                component={Paper}
                className="Card-ScanSMTSerialShtMas"
            >

            </Card>
        </div>
    )
}

export default ScanSMTSerialShtMaster;