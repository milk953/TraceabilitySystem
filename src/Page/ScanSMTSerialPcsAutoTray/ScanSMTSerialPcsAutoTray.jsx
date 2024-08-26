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
import "/src/Page/ScanSMTSerialPcsAutoTray/ScanSMTSerialPcsAutoTray.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTSerialPcsAutoTray } from "./fn_ScanSMTSerialPcsAutoTray";

function ScanSMTSerialPcsAutoTray() {


    return (
        <div>
            <Hearder />
            <h1>Final Gate Only Good</h1>
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
}

export default ScanSMTSerialPcsAutoTray