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
import { fn_ScanSMTSerialRecordTime } from "./fn_ScanSMTSerialRecordTime";

function ScanSMTSerialRecordTime() {

    const {
        selectedrbt, txtMachine, settxtMachine, txtOperator, settxtOperator, txtTotalPcs, settxtTotalPcs, rbtPcs, rbtSht, txtLotNo, settxtLotNo,
        selProduct, setselProduct, txtRackNo, settxtRackNo, lblLot, lblLotTotal, lblLog, visiblelog, lblResult, pnlSerial, gvScanResult, istxtOpDisabled,
        istxtTotalPcsDisabled, istxtLotDisabled, isselProDisabled, handleChangerbt
    } = fn_ScanSMTSerialRecordTime();

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
                        <Table className="TbScanSMTSerail">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        <Typography variant="h6">
                                            Serial/Sheet Record Time
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <RadioGroup
                                            row
                                            value={selectedrbt}
                                            onChange={handleChangerbt}
                                        >
                                            <FormControlLabel
                                                value="rbtRecordTime"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 19,
                                                            },
                                                        }}
                                                        checked={selectedrbt === "rbtRecordTime"}
                                                    />
                                                }
                                                label="Process Time"
                                                sx={{ marginLeft: 7 }}
                                            />
                                            <FormControlLabel
                                                value="rbtPlasmaTime"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 19,
                                                            },
                                                        }}
                                                        checked={selectedrbt === "rbtPlasmaTime"}
                                                    />
                                                }
                                                label="Plasma Time"
                                                sx={{ marginLeft: 7 }}
                                            />
                                        </RadioGroup>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Typography>Machine No. :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                        // value={txtProduct}
                                        // onChange={(e) => {
                                        //     settxtProduct(e.target.value);
                                        // }}
                                        // InputProps={{
                                        //     readOnly: true,
                                        // }}
                                        // onKeyDown={(e) => {
                                        //     if (e.key === "Enter") {
                                        //         settxtProduct(e.target.value);
                                        //     }
                                        // }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className="btIcon">
                                            <Tooltip title="Lock" placement="right-end">
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
                                        <Typography>OP/Partial No. :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                        // value={txtProduct}
                                        // onChange={(e) => {
                                        //     settxtProduct(e.target.value);
                                        // }}
                                        // InputProps={{
                                        //     readOnly: true,
                                        // }}
                                        // onKeyDown={(e) => {
                                        //     if (e.key === "Enter") {
                                        //         settxtProduct(e.target.value);
                                        //     }
                                        // }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className="btIcon">
                                            <Tooltip title="Lock" placement="right-end">
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
                                        <Typography>Total Pcs. :</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            style={{ width: "60px" }}
                                        // value={txtProduct}
                                        // onChange={(e) => {
                                        //     settxtProduct(e.target.value);
                                        // }}
                                        // InputProps={{
                                        //     readOnly: true,
                                        // }}
                                        // onKeyDown={(e) => {
                                        //     if (e.key === "Enter") {
                                        //         settxtProduct(e.target.value);
                                        //     }
                                        // }}
                                        />
                                    </TableCell>
                                    <TableCell colSpan={2}>
                                        <RadioGroup
                                            row
                                        >
                                            <FormControlLabel
                                                value="PCS"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 19,
                                                            },
                                                        }}
                                                    />
                                                }
                                                label="PCS"
                                                sx={{ marginLeft: 1 }}
                                            />
                                            <FormControlLabel
                                                value="SHT"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            '& .MuiSvgIcon-root': {
                                                                fontSize: 19,
                                                            },
                                                        }}
                                                    />
                                                }
                                                label="SHT"
                                                sx={{ marginLeft: 1 }}
                                            />
                                        </RadioGroup>
                                    </TableCell>
                                    <TableCell>
                                        <Button className="btIcon">
                                            <Tooltip title="Lock" placement="right-end">
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
                                        <Typography>Lot No. :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            // inputRef={inputLot}
                                            fullWidth
                                        // value={txtLotNo}
                                        // disabled={istxtLotDisabled}
                                        // style={{
                                        //     backgroundColor: istxtLotDisabled ? "#EEEEEE" : "inherit",
                                        // }}
                                        // onChange={(e) => {
                                        //     settxtLotNo(e.target.value);
                                        // }}
                                        // onKeyDown={(e) => {
                                        //     if (e.key === "Enter") {
                                        //         LotTextChanged();
                                        //     }
                                        // }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button className="btIcon">
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
                                            // inputRef={fcProduct}
                                            id="select"
                                            // value={SlProduct}
                                            // onChange={(e, value) => handleSL_Product(value)}
                                            // options={Product.map((item) => item.prd_name)}
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
                                        <Typography>Rack No. :</Typography>
                                    </TableCell>
                                    <TableCell colSpan={3}>
                                        <TextField
                                            id="txtfield"
                                            size="small"
                                            fullWidth
                                        // value={txtPackingDate}
                                        // inputRef={inputPackingDate}
                                        // onChange={(e) => {
                                        //     settxtPackingDate(e.target.value);
                                        // }}
                                        // onKeyDown={(e) => {
                                        //     if (e.key === "Enter") {
                                        //         settxtPackingDate(e.target.value);
                                        //     }
                                        // }}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Paper
                        elevation={3}
                        style={{
                            width: "450px",
                            margin: "auto",
                            height: "40px",
                            display: 'flex',
                            alignItems: 'center',
                            marginLeft: "24px",
                        }}
                    >
                        <Typography align="left"
                            style={{ padding: "5px" }}
                        >
                            Lot :
                        </Typography>
                        <Typography
                            style={{
                                fontSize: "20px",
                                paddingRight: '170px',
                            }}
                        >
                            {/* {lblTotalSht} */}
                        </Typography>
                        <Typography

                        >
                            OK :
                        </Typography>
                        <Typography
                            style={{
                                fontSize: "20px",
                            }}
                        >
                            {/* {lblTotalSht} */}
                        </Typography>
                    </Paper>

                    {visiblelog && (
                        <Card
                            component={Paper}
                            style={{
                                width: "452px",
                                height: "40px",
                                margin: 'auto',
                                textAlign: "center",
                                background: "#BB2525",
                                paddingTop: "16px",
                                marginTop: "1px",
                                marginLeft: "23px",
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

                    {/* {pnlSerial && ( */}
                    <div className="divgvSerial" style={{ position: "relative" }}>
                        <TableContainer
                            component={Paper}
                            style={{
                                width: "100%",
                                marginBottom: "10px",
                                height: "170px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <Table
                                sx={{
                                    minWidth: 400,
                                    '& .MuiTableHead-root': {
                                        position: 'sticky',
                                        top: 0,
                                        zIndex: 1,
                                        background: 'white',
                                    },
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
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            <TextField
                                                id="txtfield"
                                                size="small"
                                                fullWidth
                                            // value={txtPackingDate}
                                            // inputRef={inputPackingDate}
                                            // onChange={(e) => {
                                            //     settxtPackingDate(e.target.value);
                                            // }}
                                            // onKeyDown={(e) => {
                                            //     if (e.key === "Enter") {
                                            //         settxtPackingDate(e.target.value);
                                            //     }
                                            // }}
                                            />
                                        </TableCell>
                                    </TableRow>
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
                                    style={{marginRight: "20px"}}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="error"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </TableContainer>
                    </div>
                    {/* )} */}

                    <div>
                        {/* <input type="hidden" value={hfUserID} />
                        <input type="hidden" value={hfUserStation} />
                        <input type="hidden" value={hfUserFactory} />
                        <input type="hidden" value={hfPlantCode} />
                        <input type="hidden" value={hfProductKind} />
                        <input type="hidden" value={hfSerialLength} />
                        <input type="hidden" value={hfSerialFixFlag} />
                        <input type="hidden" value={hfSerialDigit} />
                        <input type="hidden" value={hfSerialStartDigit} />
                        <input type="hidden" value={hfSerialEndDigit} />
                        <input type="hidden" value={hfTrayFlag} />
                        <input type="hidden" value={hfTrayLength} />
                        <input type="hidden" value={hfTestResultFlag} />
                        <input type="hidden" value={hfSerialCount} />
                        <input type="hidden" value={hfAutoScan} />
                        <input type="hidden" value={hfMode} />
                        <input type="hidden" value={hfConfigCheck} />
                        <input type="hidden" value={hfConfigCode} />
                        <input type="hidden" value={hfConfigStart} />
                        <input type="hidden" value={hfConfigEnd} />
                        <input type="hidden" value={hfConfigRuning} />
                        <input type="hidden" value={hfDuplicateStart} />
                        <input type="hidden" value={hfDuplicateEnd} />
                        <input type="hidden" value={hfChipIDCheck} />
                        <input type="hidden" value={hfCheckPrdSht} />
                        <input type="hidden" value={hfCheckPrdShtStart} />
                        <input type="hidden" value={hfCheckPrdShtEnd} />
                        <input type="hidden" value={hfCheckPrdAbbr} />
                        <input type="hidden" value={hfPlasmaCheck} />
                        <input type="hidden" value={hfPlasmaTime} />
                        <input type="hidden" value={hfCheckStartSeq} />
                        <input type="hidden" value={hfCheckStartSeqCode} />
                        <input type="hidden" value={hfCheckStartSeqStart} />
                        <input type="hidden" value={hfCheckStartSeqEnd} />
                        <input type="hidden" value={hfCheckDateInProc} />
                        <input type="hidden" value={hfDateInProc} />
                        <input type="hidden" value={hfCheckWeekCode} />
                        <input type="hidden" value={hfCheckWeekCodeStart} />
                        <input type="hidden" value={hfCheckWeekCodeEnd} />
                        <input type="hidden" value={hfWeekCodeType} />
                        <input type="hidden" value={hfWeekCode} />
                        <input type="hidden" value={hfSerialStartCode} /> */}
                    </div>
                </Box>
                {/* <div className="lblResult">
                    <Typography
                     variant="h4"
                    >
                    label
                    </Typography>
                </div> */}
                {/* <img
                    style={{
                        width: "320px",
                        height: "250px",
                        marginLeft: "280px",
                        // display: gvScanResult ? 'none' : 'none'
                    }}
                    src="src/assets/1.jpg" // Import the image
                    alt="Description of the image"
                /> */}
                <div className="divgvScan" style={{ position: "relative" }}>
                    <TableContainer
                        component={Paper}
                        style={{
                            width: "100%",
                            marginBottom: "10px",
                            height: "250px",
                            // display: gvScanResult ? 'block' : 'none'
                        }}
                    >
                        <Table
                            sx={{
                                minWidth: 750,
                                '& .MuiTableHead-root': {
                                    position: 'sticky',
                                    top: 0,
                                    zIndex: 1,
                                    background: 'white',
                                },
                            }}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>No.</TableCell>
                                    <TableCell>Serial/Sheet No.</TableCell>
                                    {/* <TableCell>Reject</TableCell>
                                    <TableCell>Touch Up</TableCell>
                                    <TableCell>Reject 2</TableCell>
                                    <TableCell>Test Result</TableCell> */}
                                    <TableCell>Scan Result</TableCell>
                                    <TableCell>Remark</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* {gvScanData.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell style={{ textAlign: 'left' }}>{item.roll_no}</TableCell>
                                        <TableCell style={{ textAlign: 'left' }}>{item.lot_no}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.shift}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.week_no}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.bin_no}</TableCell>
                                        <TableCell style={{ textAlign: 'center' }}>{item.xout_no}</TableCell>
                                        <TableCell style={{ textAlign: 'right' }}>{item.qty}</TableCell>
                                        <TableCell style={{ textAlign: 'right' }}>{item.pcs_qty}</TableCell>
                                        <TableCell>
                                            <input
                                                type="hidden"
                                                id="hfCountFlg"
                                                value={item.count_flg}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))} */}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Card>
        </div>
    )
};

export default ScanSMTSerialRecordTime;