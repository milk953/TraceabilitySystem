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
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Header from "../Header/Header";
import "/src/Page/ScanSMTSerialSht/ScanSMTSerialSht.css";
import { fn_ScanSMTSerialSht } from "./fn_ScanSMTSerialSht";

function ScanSMTSerialSht() {

    const {
        txtLotNo, settxtLotNo, selProduct, Productdata, txtLotRef, settxtLotRef, lblTotalSht, lblTotalPcs, txtRollLeaf, settxtRollLeaf,
        lblCheckRoll, lblCheckRollcolor, txtMachineNo, settxtMachineNo, pnlRollLeaf, pnlMachine, pnlLog, lblLog, lblResult, lblResultcolor,
        pnlBoard, txtBoardNoB, settxtBoardNoB, txtBoardNoF, settxtBoardNoF, pnlBackSide, hfShtScan, txtSideBack, gvBackSide, pnlFrontSide,
        txtSideFront, pnlSerial, gvSerialData, gvScanResult, gvScanData, txtgvSerial, handleChangeBoardNoB, txtLotDisabled, selProDisabled,
        txtRollLeafDisabled, inputLot, ddlProduct, inputRollLeaf, inputMachineNo, inputSideBack, inputgvSerial, handleChangeLot, ibtBackClick,
        handleChangeProduct, handleChangeLotRef, handleChangeRollLeaf, handleChangeMachine, handleChangeSerial, handleChangegvBackSide, handleChangegvFontSide,
        btnSaveClick, btnCancelClick, handleKeygvSerial, handleKeySideBack, handleChangeBoardNoF
    } = fn_ScanSMTSerialSht();

    return (
        <div>
            <Header />
            <h1>SMT Connect Sht & Pcs</h1>
            <Card
                component={Paper}
                className="Card-ScanSMTSerialShtPcs"
            >
                <Box justifyContent="space-between">
                    <TableContainer
                        component={Paper}
                        style={{
                            width: "430px",
                            margin: "4px",
                        }}
                    >
                        <Table className="TbScanSMTSerialShtPcs">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography variant="h6">
                                            SMT Connect Sht & Pcs
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Lot No. :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            id="txtfield"
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
                                        // onBlur={handleChangeLot}
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
                                    <TableCell colSpan={3}>
                                        <Autocomplete
                                            id="selectPdShtPcsAuto"
                                            disabled={selProDisabled}
                                            ref={ddlProduct}
                                            style={{
                                                backgroundColor: selProDisabled ? "#e0e0e0" : "inherit",
                                            }}
                                            value={selProduct}
                                            onChange={(e, value) => handleChangeProduct(value)}
                                            options={Productdata.map((item) => item.prd_name)}
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
                                        <Typography>Lot Ref. No. :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                            value={txtLotRef}
                                            onChange={(e) => {
                                                settxtLotRef(e.target.value);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleChangeLotRef();
                                                }
                                            }}
                                            onBlur={handleChangeLotRef}
                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Total Sht :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{lblTotalSht}</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Total Pcs :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{lblTotalPcs}</Typography>
                                    </TableCell>
                                </TableRow>
                                {pnlRollLeaf && (
                                    <>
                                        <TableRow>
                                            <TableCell>
                                                <Typography>Roll Leaf No. :</Typography>
                                            </TableCell>
                                            <TableCell colSpan={3}>
                                                <TextField
                                                    id="txtfield"
                                                    size="small"
                                                    inputRef={inputRollLeaf}
                                                    fullWidth
                                                    value={txtRollLeaf}
                                                    disabled={txtRollLeafDisabled}
                                                    style={{
                                                        backgroundColor: txtRollLeafDisabled ? "#e0e0e0" : "inherit",
                                                    }}
                                                    onChange={(e) => {
                                                        settxtRollLeaf(e.target.value);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            handleChangeRollLeaf();
                                                        }
                                                    }}
                                                    onBlur={handleChangeRollLeaf}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Typography>Check Roll :</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    style={{
                                                        color: "#fff",
                                                        backgroundColor: lblCheckRollcolor
                                                    }}
                                                >
                                                    {lblCheckRoll}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )}

                                {pnlMachine && (
                                    <TableRow>
                                        <TableCell>
                                            <Typography>Machine No. :</Typography>
                                        </TableCell>
                                        <TableCell colSpan={3}>
                                            <TextField
                                                id="txtfield"
                                                size="small"
                                                inputRef={inputMachineNo}
                                                fullWidth
                                                value={txtMachineNo}
                                                onChange={(e) => {
                                                    settxtMachineNo(e.target.value);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleChangeMachine();
                                                    }
                                                }}
                                                onBlur={handleChangeMachine}
                                            />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {pnlBackSide && (
                        <div className="divgvBackSidePcs">
                            <TableContainer
                                component={Paper}
                                style={{
                                    width: "100%",
                                    marginBottom: "1px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Table
                                    sx={{
                                        minWidth: 380,
                                    }}
                                    aria-label="simple table"
                                >
                                    <TableBody>
                                        {Array.from(
                                            { length: gvBackSide.length },
                                            (_, index) => (
                                                <TableRow key={index}>
                                                    <TableCell
                                                        sx={{ borderRight: "1px solid #d9d9d9" }}
                                                        align="center"
                                                    >
                                                        {gvBackSide[index].SEQ}
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            id="txtfield"
                                                            size="small"
                                                            fullWidth
                                                            value={txtSideBack[index] || ""}
                                                            inputRef={el => inputSideBack.current[index] = el}
                                                            onChange={(e) => {
                                                                handleChangegvBackSide(index, e);
                                                            }}
                                                            onKeyDown={(e) => handleKeySideBack(e, index)}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )}

                    {pnlFrontSide && (
                        <div className="divgvFrontSideShtPcs">
                            <TableContainer
                                component={Paper}
                                style={{
                                    width: "100%",
                                    marginBottom: "1px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Table
                                    sx={{
                                        minWidth: 380,
                                    }}
                                    aria-label="simple table"
                                >
                                    <TableBody>
                                        <TableRow>
                                            <TableCell
                                                sx={{ borderRight: "1px solid #d9d9d9" }}
                                                align="center"
                                            >

                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="txtfield"
                                                    size="small"
                                                    fullWidth
                                                    value={txtSideFront}
                                                    onChange={(e) => {
                                                        handleChangegvFontSide(e.target.value);
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    )}

                    {pnlBoard && (
                        <Box className="divpnlBoardShtPcs">
                            <TableContainer
                                component={Paper}
                                style={{
                                    width: "430px",
                                    margin: "10px",
                                }}
                            >
                                <Table
                                    sx={{
                                        minWidth: 380,
                                        margin: "auto",
                                    }}
                                >
                                    <TableHead></TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell
                                                align="left"
                                            >
                                                Bottom Fixture :
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="txtfield"
                                                    size="small"
                                                    fullWidth
                                                    value={txtBoardNoB}
                                                    onChange={(e) => {
                                                        settxtBoardNoB(e.target.value);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            handleChangeBoardNoB();
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell
                                                align="left"
                                            >
                                                Top Fixture :
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    id="txtfield"
                                                    size="small"
                                                    fullWidth
                                                    value={txtBoardNoF}
                                                    onChange={(e) => {
                                                        settxtBoardNoF(e.target.value);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            handleChangeBoardNoF();
                                                        }
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}

                    {pnlLog && (
                        <Paper
                            elevation={3}
                            style={{
                                width: "432px",
                                height: "40px",
                                margin: "auto",
                                textAlign: "center",
                                background: "#BB2525",
                                paddingTop: "18px",
                                color: "yellow",
                                fontWeight: "bold",
                                marginTop: "1px",
                                marginLeft: "23px",
                            }}
                        >
                            {lblLog}
                        </Paper>
                    )}

                    {pnlSerial && (
                        <div className="divgvSerialShtPcs" style={{ position: "relative" }}>
                            <TableContainer
                                component={Paper}
                                style={{
                                    width: "100%",
                                    marginBottom: "10px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Table
                                    sx={{
                                        minWidth: 380,
                                    }}
                                    aria-label="simple table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Sheet</TableCell>
                                            <TableCell>No.</TableCell>
                                            <TableCell>Serial No.</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Array.from({ length: gvSerialData.length }, (_, index) => (
                                            <TableRow key={index}>
                                                <TableCell
                                                    sx={{ borderRight: "1px solid #d9d9d9" }}
                                                    align="center"
                                                >
                                                    {gvSerialData[index].SHEET}
                                                </TableCell>
                                                <TableCell
                                                    sx={{ borderRight: "1px solid #d9d9d9" }}
                                                    align="center"
                                                >
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        id="txtfield"
                                                        size="small"
                                                        fullWidth
                                                        value={txtgvSerial[index] || ""}
                                                        inputRef={el => inputgvSerial.current[index] = el}
                                                        onChange={(e) => {
                                                            handleChangeSerial(index, e);
                                                        }}
                                                        onKeyDown={(e) => handleKeygvSerial(e, index)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <div style={{
                                    marginTop: "auto",
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "10px",
                                    marginLeft: "5px",
                                    marginBottom: "2px"
                                }}
                                >
                                    <Button
                                        className="BtSave"
                                        variant="contained"
                                        size="small"
                                        style={{ marginRight: "20px" }}
                                        onClick={btnSaveClick}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="error"
                                        onClick={btnCancelClick}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </TableContainer>
                        </div>
                    )
                    }
                </Box >

                <img
                    style={{
                        width: "320px",
                        height: "250px",
                        marginLeft: "280px",
                        display: gvScanResult ? 'none' : 'block'
                    }}
                    src={Pageimg} // Import the image
                    alt="Description of the image"
                />


                <div className="divgvScanResultShtPcs" >
                    {gvScanResult && (
                        <Paper
                            className="lblResultShtPcs"
                            elevation={3}
                            style={{
                                background: lblResultcolor,
                                textAlign: "center",
                            }}
                        >
                            <Typography
                                variant="h4"
                                style={{ paddingTop: "3px", color: "#fff" }}
                            >
                                {lblResult}
                            </Typography>
                        </Paper>
                    )}

                    <TableContainer
                        component={Paper}
                        style={{
                            width: "98%",
                            marginBottom: "10px",
                            height: "auto",
                            display: gvScanResult ? 'block' : 'none'
                        }}
                    >
                        <Table
                            sx={{
                                minWidth: 710,
                            }}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sheet No.</TableCell>
                                    <TableCell>No.</TableCell>
                                    <TableCell>Serial No.</TableCell>
                                    <TableCell>Scan Result</TableCell>
                                    <TableCell>Remark</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.from(
                                    { length: gvScanData.length },
                                    (_, index) => (
                                        <TableRow key={index}>
                                            <TableCell
                                                style={{
                                                    textAlign: 'center',
                                                    borderRight: "1px solid #d9d9d9"
                                                }}
                                            >
                                                {gvScanData[index].SHEET}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    textAlign: 'center',
                                                    borderRight: "1px solid #d9d9d9"
                                                }}
                                            >
                                                {gvScanData[index].SEQ}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    textAlign: 'left',
                                                    borderRight: "1px solid #d9d9d9"
                                                }}
                                            >
                                                {gvScanData[index].SERIAL}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    textAlign: 'center',
                                                    backgroundColor: gvScanData[index].SCAN_RESULT === 'OK' ? 'green' : '#ff4d4f',
                                                    borderRight: "1px solid #d9d9d9"
                                                }}
                                            >
                                                {gvScanData[index].SCAN_RESULT}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    textAlign: 'left',
                                                    borderRight: "1px solid #d9d9d9"
                                                }}
                                            >
                                                {gvScanData[index].REMARK}
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Card >
        </div >
    )
};

export default ScanSMTSerialSht;