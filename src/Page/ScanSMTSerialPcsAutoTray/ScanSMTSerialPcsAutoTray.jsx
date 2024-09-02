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
import "/src/Page/ScanSMTSerialPcsAutoTray/ScanSMTSerialPcsAutoTray.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTSerialPcsAutoTray } from "./fn_ScanSMTSerialPcsAutoTray";
import { Flex } from "antd";

function ScanSMTSerialPcsAutoTray() {

    const {
        txtLot, selProduct, Productdata, txtPackingNo, lblLot, lblLotTotal, txtPcsTray, lblSerialNG, lblLog, visiblelog,
        lblResult, lblResultcolor, lblTime, pnlPackingGroup, pnlSerial, hfSerialCount, txtgvSerial, txtLotDisabled, selProDisabled,
        txtPackingNoDisabled, inputLot, ddlProduct, inputPackingNo, inputgvSerial, inputTray, handleChangeLot, ibtBackClick,
        handleChangeProduct, handleChangePackingNo, ibtPackingBackClick, handleChangePcsTray, settxtLot, settxtPackingNo,
        settxtPcsTray, handleChangeSerial, handleKeygvSerial, btnSaveClick, btnCancelClick, gvScanData, gvScanResult, lblTimecolor,
        lblLastTray
    } = fn_ScanSMTSerialPcsAutoTray();

    return (
        <div>
            <Hearder />
            <h1>Final Gate Only Good</h1>
            <Card
                component={Paper}
                className="Card-ScanSMTSerialPcs"
            >
                <Box justifyContent="space-between">
                    <TableContainer
                        component={Paper}
                        style={{
                            width: "430px",
                            margin: "4px",
                        }}
                    >
                        <Table className="TbScanSMTSerialPcs">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography variant="h6">
                                            Final Gate Only Good
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Typography> Scan Lot :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            inputRef={inputLot}
                                            fullWidth
                                            value={txtLot}
                                            disabled={txtLotDisabled}
                                            style={{
                                                backgroundColor: txtLotDisabled ? "#EEEEEE" : "inherit",
                                            }}
                                            onChange={(e) => {
                                                settxtLot(e.target.value);
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
                                    <TableCell colSpan={3}>
                                        <Autocomplete
                                            id="selectPdPcsAuto"
                                            disabled={selProDisabled}
                                            ref={ddlProduct}
                                            style={{
                                                backgroundColor: selProDisabled ? "#EEEEEE" : "inherit",
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

                                {pnlPackingGroup && (
                                    <TableRow>
                                        <TableCell>
                                            <Typography> Packing No :</Typography>
                                        </TableCell>
                                        <TableCell colSpan={3}>
                                            <TextField
                                                id="txtfield"
                                                size="small"
                                                inputRef={inputPackingNo}
                                                fullWidth
                                                value={txtPackingNo}
                                                disabled={txtPackingNoDisabled}
                                                style={{
                                                    backgroundColor: txtPackingNoDisabled ? "#EEEEEE" : "inherit",
                                                }}
                                                onChange={(e) => {
                                                    settxtPackingNo(e.target.value);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleChangePackingNo();
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button className="btIcon" onClick={ibtPackingBackClick}>
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
                                )}

                                <TableRow>
                                    <TableCell>
                                        <Typography>Lot :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{lblLot}</Typography>
                                    </TableCell>
                                    <TableCell id="lblLotNG">
                                        <Typography
                                            style={{ color: "green" }}
                                        >
                                            OK :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            style={{ color: "green" }}
                                        >
                                            {lblLotTotal}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Pcs/Tray :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" alignItems="center">
                                            <TextField
                                                id="txtfield"
                                                size="small"
                                                inputRef={inputTray}
                                                value={txtPcsTray}
                                                style={{
                                                    width: "60px"
                                                }}
                                                onChange={(e) => {
                                                    settxtPcsTray(e.target.value);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        handleChangePcsTray();
                                                    }
                                                }}
                                            />
                                            <Typography style={{ marginLeft: "10px" }}>
                                                {lblLastTray}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            style={{ color: "#ff4d4f" }}
                                        >
                                            NG :
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            style={{ color: "#ff4d4f" }}
                                        >
                                            {lblSerialNG}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {visiblelog && (
                        <Card
                            component={Paper}
                            style={{
                                width: "442px",
                                height: "40px",
                                margin: 'auto',
                                textAlign: "center",
                                background: "#BB2525",
                                paddingTop: "16px",
                                marginTop: "1px",
                                marginLeft: "23px",
                                display: "flex",
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                variant="h6"
                                style={{ color: "yellow" }}
                            >
                                {lblLog}
                            </Typography>
                        </Card>
                    )}

                    {pnlSerial && (
                        <div className="divgvSerialPcs" style={{ position: "relative" }}>
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
                                            <TableCell>No.</TableCell>
                                            <TableCell>Serial No.</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Array.from({ length: hfSerialCount }, (_, index) => (
                                            <TableRow key={index}>
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
                                    marginLeft: "70px",
                                    marginBottom: "2px"
                                }}
                                >
                                    <Button
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
                    )}
                    <Button
                        style={{ 
                            width: '1px', 
                            height: '1px',
                            padding: "0px"
                         }}
                        // onKeyDown={handleKeyDown}
                        // onClick={onExport}
                    >
                       <FileDownloadOutlinedIcon/>
                    </Button>
                </Box>

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

                <div className="divgvScanResultPcs" >

                    <div className="gvScanResultContainer">
                        {gvScanResult && (
                            <Paper
                                className="lblResultPcs"
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

                        {gvScanResult && (
                            <Paper
                                className="lblResultTime"
                                elevation={3}
                                style={{
                                    background: lblTimecolor,
                                    textAlign: "center",
                                    marginLeft: "1px",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    style={{
                                        color: "#fff",
                                    }}
                                >
                                    {lblTime}
                                </Typography>
                            </Paper>
                        )}
                    </div>


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
                                    <TableCell>No.</TableCell>
                                    <TableCell>Serial No.</TableCell>
                                    <TableCell>Re-Judgement 1</TableCell>
                                    <TableCell>Result</TableCell>
                                    <TableCell>Re-Judgement 2</TableCell>
                                    <TableCell>Test Result</TableCell>
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
                                                    textAlign: 'left',
                                                    borderRight: "1px solid #d9d9d9"
                                                }}
                                            >
                                                {gvScanData[index].REJECT}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    textAlign: 'left',
                                                    borderRight: "1px solid #d9d9d9"
                                                }}
                                            >
                                                {gvScanData[index].TOUCH_UP}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    textAlign: 'left',
                                                    borderRight: "1px solid #d9d9d9"
                                                }}
                                            >
                                                {gvScanData[index].REJECT2}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    textAlign: 'left',
                                                }}
                                            >
                                                {gvScanData[index].TEST_RESULT}
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

            </Card>
        </div>
    )
}

export default ScanSMTSerialPcsAutoTray