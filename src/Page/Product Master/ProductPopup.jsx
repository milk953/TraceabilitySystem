import React, { useState, useEffect } from "react";
import "/src/Page/Style.css";
import {
    Typography,
    FormControl,
    TableRow,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    Paper,
    TableHead,
    Select,
    MenuItem,
    Grid,
    TextField,
    Button,
    InputLabel,
    Card,
    CardContent,
    Box,
    Checkbox,
} from "@mui/material";
import swal from "sweetalert";
import axios from "axios";


function ProductPopup({ isOpen, onClose, item, searchFunction }) {

    if (!isOpen) {
        return null;
    }


    return (
        <div className="popup">
            <div className="popupcontect"
                style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                <Card className="ProductPopup">
                    <CardContent>
                        <Typography className="HeadPopup"
                            sx={{ fontSize: 20 }}>
                            Product Master
                        </Typography>
                    </CardContent>
                    <Box sx={{ flexGrow: 1, marginBottom: "10px" }}>
                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}>
                                <Typography>
                                    Factory :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <Select
                                    id="ddlFactory"
                                    variant="outlined"
                                    size="small"
                                    //   value={TXT_SHT_Code}
                                    //   onChange={handleKEY_SHT_Code}
                                    style={{ width: "90%" }}
                                //   error={ERROR_SHT_Code}
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}></Grid>
                            <Grid item xs={1.7}>
                                <Typography style={{ fontSize: "small", color: "red", width: "71%" }}>
                                    {/* {ERROR_SHT_Code ? "Please input SHT Code" : null} */}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}>
                                <Typography>
                                    Product Name :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtConnSheetConTime"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                //   onChange={handleKEY_Plant_Code}
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography>
                                    Update Count :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtConnSheetConTime"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                //   onChange={handleKEY_Plant_Code}
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography style={{ marginLeft: "8%" }}>
                                    Config Code :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtConnSheetConTime"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                //   onChange={handleKEY_Plant_Code}
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}>
                                <Typography>
                                    Start Seq Serial :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtConnSheetConTime"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                //   onChange={handleKEY_Plant_Code}
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography>
                                    Start Seq Code :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtConnSheetConTime"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                //   onChange={handleKEY_Plant_Code}
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography style={{ marginLeft: "8%" }}>
                                    Product Status :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <Select
                                    id="ddlFactory"
                                    variant="outlined"
                                    size="small"
                                    // value=""
                                    //   onChange={handleKEY_SHT_Code}
                                    style={{ width: "90%" }}
                                //   error={ERROR_SHT_Code}
                                >
                                    <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                                    <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}>
                                <Typography>
                                    Date In process Flag :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <Checkbox
                                    style={{ padding: "0" }}
                                //   checked={isPlantChecked}
                                //   onChange={(e) => {
                                //     setIsPlantChecked(e.target.checked);
                                //   }}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography>
                                    Date In Process :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtConnSheetConTime"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                //   onChange={handleKEY_Plant_Code}
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}>
                                <Typography>
                                    Pcs Per Sheet (EFPC) :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtConnSheetConTime"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                //   onChange={handleKEY_Plant_Code}
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography>
                                    Pcs Per Sheet (SMT) :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtConnSheetConTime"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                //   onChange={handleKEY_Plant_Code}
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
                                />
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}>
                                <Typography>
                                    Serial File Format :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtConnSheetConTime"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                //   onChange={handleKEY_Plant_Code}
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography>
                                    Serial side :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <Select
                                    id="ddlFactory"
                                    variant="outlined"
                                    size="small"
                                    //   value={TXT_SHT_Code}
                                    //   onChange={handleKEY_SHT_Code}
                                    style={{ width: "90%" }}
                                //   error={ERROR_SHT_Code}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography style={{ marginLeft: "8%" }}>
                                    Serial Structure :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <Select
                                    id="ddlFactory"
                                    variant="outlined"
                                    size="small"
                                    // value="ACTIVE"
                                    //   onChange={handleKEY_SHT_Code}
                                    style={{ width: "90%" }}
                                //   error={ERROR_SHT_Code}
                                >
                                </Select>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            className="gridContainer2"
                            spacing={0}
                        >
                            <Grid item xs={2.2}>
                                <Typography>
                                    Barcode Req Lot :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <Checkbox
                                    style={{ padding: "0" }}
                                //   checked={isPlantChecked}
                                //   onChange={(e) => {
                                //     setIsPlantChecked(e.target.checked);
                                //   }}
                                />
                            </Grid>
                            <Grid item xs={2.2}>
                                <Typography>
                                    Barcode Grade :
                                </Typography>
                            </Grid>
                            <Grid item xs={1.7}>
                                <TextField
                                    id="txtConnSheetConTime"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "90%",
                                    }}
                                //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                //   onChange={handleKEY_Plant_Code}
                                //   error={isPlantChecked && ERROR_Plant_Code}
                                //   disabled={!isPlantChecked}
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ flexGrow: 1, backgroundColor: "#e0f7fa" }}>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet File Format :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConnSheetConTime"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet Structure :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Select
                                        id="ddlFactory"
                                        variant="outlined"
                                        size="small"
                                        // value=""
                                        //   onChange={handleKEY_SHT_Code}
                                        style={{ width: "90%" }}
                                    //   error={ERROR_SHT_Code}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet Type :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Select
                                        id="ddlFactory"
                                        variant="outlined"
                                        size="small"
                                        //   value={TXT_SHT_Code}
                                        //   onChange={handleKEY_SHT_Code}
                                        style={{ width: "90%" }}
                                    //   error={ERROR_SHT_Code}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet per Lot (EFPC) :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConnSheetConTime"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Sheet per Lot (SMT) :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConnSheetConTime"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet per scan :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtSHperscan"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet per laser :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtSHperlaser"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Sheet Model Code :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtSHModelCode"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet check Product Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet check Lot Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Sheet Xray Time Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet Plasma Time Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Sheet Plasma Time(Hrs.) :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtSHPlasmaTime"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Sheet Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Sheet Length :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtCoRollshLength"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Leaf Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Length :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtCoRollLength"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Conn Leaf Length :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConLeafLength"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Product Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Product Start :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollProSt"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Conn Roll Product End :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollProEnd"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Serial Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Leaf Scan :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollLeafscan"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Req Lot Sheet :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Select
                                        id="ddlConRollReqLotSH"
                                        variant="outlined"
                                        size="small"
                                        value=""
                                        //   onChange={handleKEY_SHT_Code}
                                        style={{ width: "90%" }}
                                    //   error={ERROR_SHT_Code}
                                    >
                                        <MenuItem value="Yes">Yes</MenuItem>
                                        <MenuItem value="No">No</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Lot Sheet Start :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollLotSHSt"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Conn Roll Lot Sheet End :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollLotSHEnd"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Req Product Sheet :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Select
                                        id="ddlConRollReqProSH"
                                        variant="outlined"
                                        size="small"
                                        value=""
                                        //   onChange={handleKEY_SHT_Code}
                                        style={{ width: "90%" }}
                                    //   error={ERROR_SHT_Code}
                                    >
                                        <MenuItem value="Yes">Yes</MenuItem>
                                        <MenuItem value="No">No</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Product Sheet Start :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollProSHSt"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Conn Roll Product Sheet End :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollProSHEnd"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Roll Product Fix :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConRollProFix"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ flexGrow: 1, backgroundColor: "#e0f7fa" }}>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Sheet Control Time Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Sheet Control Time (Hrs.) :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConnSheetConTime"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Conn Sheet check sum Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Sheet Plasma Time Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Sheet Plasma Time (Hrs.) :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConnSheetConTime"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Conn Sheet Week Code Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Sheet Mix Lot Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Conn Sheet Mix Product Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Process Control Time Flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Process Control Time :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Select
                                        id="ddlProConTime"
                                        variant="outlined"
                                        size="small"
                                        //   value={TXT_SHT_Code}
                                        //   onChange={handleKEY_SHT_Code}
                                        style={{ width: "90%" }}
                                    //   error={ERROR_SHT_Code}
                                    >
                                    </Select>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ flexGrow: 1 }}>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final pcs per tray :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtFinalpcspertray"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final pcs per scan :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtFinalpcsperscan"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final pack group flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final check week code flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtConnSheetConTime"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Final PDS time skip ELT :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Select
                                        id="ddlFinalPDSELT"
                                        variant="outlined"
                                        size="small"
                                        //   value={TXT_SHT_Code}
                                        //   onChange={handleKEY_SHT_Code}
                                        style={{ width: "90%" }}
                                        value=""
                                    //   error={ERROR_SHT_Code}
                                    >
                                        <MenuItem value="Yes">Yes</MenuItem>
                                        <MenuItem value="No">No</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final PDS time Hide time :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Select
                                        id="ddlFinalPDStht"
                                        variant="outlined"
                                        size="small"
                                        //   value={TXT_SHT_Code}
                                        //   onChange={handleKEY_SHT_Code}
                                        style={{ width: "90%" }}
                                        value=""
                                    //   error={ERROR_SHT_Code}
                                    >
                                        <MenuItem value="Yes">Yes</MenuItem>
                                        <MenuItem value="No">No</MenuItem>
                                    </Select>
                                </Grid>

                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final PDS time flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>

                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Final PDS time (Hrs.) :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtFinalPDStime"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final PDS time by :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <TextField
                                        id="txtFinalPDStimeby"
                                        variant="outlined"
                                        size="small"
                                        style={{
                                            width: "90%",
                                        }}
                                    //   value={isPlantChecked ? TXT_Plant_Code : ''}
                                    //   onChange={handleKEY_Plant_Code}
                                    //   error={isPlantChecked && ERROR_Plant_Code}
                                    //   disabled={!isPlantChecked}
                                    />
                                </Grid>

                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final PDS time confirm flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>

                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Final conn sheet flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final mix Lot flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>

                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final mix product flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>

                                <Grid item xs={2.2}>
                                    <Typography style={{ marginLeft: "8%" }}>
                                        Final check sum flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Final chip ID flag :
                                    </Typography>
                                </Grid>
                                <Grid item xs={1.7}>
                                    <Checkbox
                                        style={{ padding: "0" }}
                                    //   checked={isPlantChecked}
                                    //   onChange={(e) => {
                                    //     setIsPlantChecked(e.target.checked);
                                    //   }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ flexGrow: 1, backgroundColor: "#e0f7fa" }}>
                            <Grid
                                container
                                className="gridContainer2"
                                spacing={0}
                            >
                                <Grid item xs={2.2}>
                                    <Typography>
                                        Require Result
                                    </Typography>
                                </Grid>
                                <Grid item xs={8.6}>
                                    <TableContainer
                                        component={Paper}
                                        style={{
                                            width: "90%",
                                            marginBottom: "2px",
                                            maxHeight: "400px",
                                            // visibility: checkHead,
                                        }}
                                    >
                                        <Table
                                            sx={{
                                                minWidth: 650,
                                                '& .MuiTableHead-root': {
                                                    position: 'sticky',
                                                    top: 0,
                                                    zIndex: 1,
                                                    background: 'white',
                                                },
                                            }}
                                            aria-label="simple table"
                                        >
                                            <TableHead style={{ backgroundColor: "#BCCEF8" }}>
                                                <TableRow>
                                                    <TableCell>No.</TableCell>
                                                    <TableCell>Item</TableCell>
                                                    <TableCell>Front Side</TableCell>
                                                    <TableCell>Back Side</TableCell>
                                                    <TableCell>Show Result</TableCell>
                                                    <TableCell>Control Conn Roll</TableCell>
                                                    <TableCell>Control Conn Sheet</TableCell>
                                                    <TableCell>Control Final Gate</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody style={{ overflowY: "auto" }}>
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell style={{textAlign: "center"}}>
                                                        <Checkbox
                                                            style={{ padding: "0" }}
                                                        //   checked={isPlantChecked}
                                                        //   onChange={(e) => {
                                                        //     setIsPlantChecked(e.target.checked);
                                                        //   }}
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{textAlign: "center"}}>
                                                        <Checkbox
                                                            style={{ padding: "0" }}
                                                        //   checked={isPlantChecked}
                                                        //   onChange={(e) => {
                                                        //     setIsPlantChecked(e.target.checked);
                                                        //   }}
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{textAlign: "center"}}>
                                                        <Checkbox
                                                            style={{ padding: "0" }}
                                                        //   checked={isPlantChecked}
                                                        //   onChange={(e) => {
                                                        //     setIsPlantChecked(e.target.checked);
                                                        //   }}
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{textAlign: "center"}}>
                                                        <Checkbox
                                                            style={{ padding: "0" }}
                                                        //   checked={isPlantChecked}
                                                        //   onChange={(e) => {
                                                        //     setIsPlantChecked(e.target.checked);
                                                        //   }}
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{textAlign: "center"}}>
                                                        <Checkbox
                                                            style={{ padding: "0" }}
                                                        //   checked={isPlantChecked}
                                                        //   onChange={(e) => {
                                                        //     setIsPlantChecked(e.target.checked);
                                                        //   }}
                                                        />
                                                    </TableCell>
                                                    <TableCell style={{textAlign: "center"}}>
                                                        <Checkbox
                                                            style={{ padding: "0" }}
                                                        //   checked={isPlantChecked}
                                                        //   onChange={(e) => {
                                                        //     setIsPlantChecked(e.target.checked);
                                                        //   }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Box>

                        <Grid
                            container
                            className="gridContainer"
                            spacing={0}
                        >
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    style={{
                                        width: "80%",
                                        marginTop: "7%",
                                    }}
                                //   onClick={handleSaveClick}
                                >
                                    Save
                                </Button>
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    variant="contained"
                                    style={{
                                        width: "80%",
                                        marginTop: "7%",
                                    }}
                                    color="error"
                                    onClick={() => {
                                        // Clear();
                                        onClose();
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Card>
            </div>
        </div>
    )
}

export default ProductPopup;