import React, { useState, useEffect } from "react";
import "/src/Page/Style.css";
// import "./master.css";
import Popup from "./ProductPopup.jsx";
import { Empty } from "antd";
import Hearder from "../Header/Hearder";
import {
    TextField,
    Table,
    TableBody,
    TableCell,
    TableRow,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    TableHead,
    TableContainer,
    Paper,
    Box,
    Tooltip,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
    SearchOutlined,
    RedoOutlined,
    PlusOutlined,
    PlusCircleOutlined,
    CloseOutlined,
    EditFilled,
    FlagFilled,
    InfoCircleOutlined,
} from "@ant-design/icons";
import axios from 'axios';
import { SheetMasterT } from "../function/function_SheetMaster";
import * as XLSX from 'xlsx';

function ProductMaster() {

    const { ShowData, checkHead, checkEmpty, checkData, code, name,
        TEXT_SHT_Code, Search, handleCode, handleName, OpenPopup,
        PopupClose, New, Clear, selectedRowData, OpenEdit, handleOpenDelete, } = SheetMasterT();
        const handleExportToExcel = () => {}
        // const dataTable1export = [...ShowData]; 
        //     const handleExportToExcel = () => {
        //         const wsData = [
        //             [
        //                 "No.",
        //                 "Factory",
        //                 "Product Name",
        //                 "Update Count",
        //                 "Config Code",
        //                 "Start Seq Serial",
        //                 "Start Seq Code",
        //                 "Date In process Flag",
        //                 "Date In Process",
        //                 "Pcs Per Sheet (EFPC)",
        //                 "Pcs Per Sheet (SMT)",
        //                 "Serial File Format",
        //                 "Sheet File Format",
        //                 "Serial side",
        //                 "Barcode Grade",
        //                 "Barcode Req Lot",
        //                 "Sheet Type",
        //                 "Sheet per Lot (EFPC)",
        //                 "Sheet per Lot (SMT)",
        //                 "Sheet per scan",
        //                 "Sheet per laser",
        //                 "Sheet Model Code",
        //                 "Sheet check Product Flag",
        //                 "Sheet check Lot Flag",
        //                 "Sheet Plasma Time Flag",
        //                 "Sheet Plasma Time",
        //                 "Sheet Xray Time Flag",
        //                 "Product Status",
        //                 "Conn Roll Sheet Flag",
        //                 "Conn Roll Sheet Length",
        //                 "Conn Roll Leaf Flag",
        //                 "Conn Roll Length",
        //                 "Conn Leaf Length",
        //                 "Conn Roll Product Flag",
        //                 "Conn Roll Product Start",
        //                 "Conn Roll Product End",
        //                 "Conn Roll Serial Flag",
        //                 "Conn Roll Leaf Scan",
        //                 "Conn Roll Req Lot Sheet",
        //                 "Conn Roll Lot Sheet Start",
        //                 "Conn Roll Lot Sheet End",
        //                 "Conn Roll Req Product Sheet",
        //                 "Conn Roll Product Sheet Start",
        //                 "Conn Roll Product Sheet End",
        //                 "Conn Roll Product Fix",
        //                 "Conn Sheet Control Time Flag",
        //                 "Conn Sheet Plasma Time Flag",
        //                 "Conn Sheet Mix Lot Flag",
        //                 "Conn Sheet Mix Product Flag",
        //                 "Conn Sheet check sum Flag",
        //                 "Conn Sheet Week Code Flag",
        //                 "Process Control Time Flag",
        //                 "Process Control Time",
        //                 "Final pcs per tray",
        //                 "Final pcs per scan",
        //                 "Final pack group flag",
        //                 "Final check week code flag",
        //                 "Final PDS time skip elt",
        //                 "Final PDS time Hide time",
        //                 "Final PDS time flag",
        //                 "Final PDS time",
        //                 "Final PDS time by",
        //                 "Final PDS time confirm flag",
        //                 "Final conn sheet flag",
        //                 "Final mix Lot flag",
        //                 "Final mix product flag",
        //                 "Fin inspect flag",
        //                 "Final inspect process",
        //                 "Final check sum flag",
        //                 "Final chip ID flag",
        //             ],
        //             ...dataTable1export.map((item, index) => [
        //                 index + 1,
        //                 item.tstm_sht_struc_code,
        //                 item.tstm_sht_struc_name,
        //                 item.tstm_plant_flag === 'Y' ? 'Y' : 'N',
        //                 item.tstm_plant_code,
        //                 item.tstm_plant_start_digit,
        //                 item.tstm_plant_end_digit,
        //                 item.tstm_lot_flag === 'Y' ? 'Y' : 'N',
        //                 item.tstm_lot_start_digit,
        //                 item.tstm_lot_end_digit,
        //                 item.tstm_model_flag === 'Y' ? 'Y' : 'N',
        //                 item.tstm_model_start_digit,
        //                 item.tstm_model_end_digit,
        //                 item.tstm_seq_flag === 'Y' ? 'Y' : 'N',
        //                 item.tstm_seq_format,
        //                 item.tstm_seq_start_digit,
        //                 item.tstm_seq_end_digit
        //             ])
        //         ];
                

        //         const ws = XLSX.utils.aoa_to_sheet(wsData);

        //         const wb = XLSX.utils.book_new();
        //         XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        //         XLSX.writeFile(wb, `Product_Master.xlsx`);
        //     };


    return (
        <>
            <Hearder />
            <Popup
                isOpen={OpenPopup}
                onClose={PopupClose}
                item={selectedRowData}
                searchFunction={Search} />
            <div
                style={{
                    marginTop: "60px",
                    marginLeft: "90px",
                    justifyContent: "left",
                    display: "flex",
                }}
            >
                <div>
                    <h1
                        style={{
                            fontFamily: "Verdana, sans-serif",
                            color: "#7286D3",
                            fontWeight: "bold",
                            fontSize: "40px",
                        }}
                    >
                        Product Master
                    </h1>
                </div>
            </div>

            <div style={{ justifyContent: "center", display: "flex" }}>
                <div style={{ marginBottom: "30px" }}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <FormControl size="small" style={{ width: "200px" }}>
                            <InputLabel id="Factory-label">Factory</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value=""
                                label="Factory"
                            // onChange={handleChange}
                            >
                            </Select>
                        </FormControl>
                        <TextField
                            id="txtProduct"
                            label="Product"
                            variant="outlined"
                            size="small"
                            style={{ width: "300px" }}
                            value={name}
                            onChange={handleName}
                        />
                        <Button
                            variant="contained"
                            style={{ width: "130px" }}
                            onClick={Search}
                        >
                            <SearchOutlined style={{ fontSize: "20px" }} /> &nbsp;
                            Search
                        </Button>
                        <Button
                            variant="contained"
                            style={{ width: "130px" }}
                            color="success"
                            onClick={New}
                        >
                            <PlusOutlined style={{ fontSize: "20px" }} /> &nbsp;
                            New
                        </Button>
                        <Button
                            variant="contained"
                            style={{ width: "130px" }}
                            color="error"
                            onClick={Clear}
                        >
                            <CloseOutlined
                                style={{ fontSize: "20px" }}
                            /> &nbsp;
                            Cancel
                        </Button>
                    </Box>
                </div>
            </div>
            <div style={{marginLeft: "5%"}}>
                <Button variant="contained" color="success" onClick={handleExportToExcel} >
                    Export to Excel
                </Button>
            </div>
            <div className="divTbSheet">
                <TableContainer
                    component={Paper}
                    style={{
                        width: "96%",
                        marginBottom: "10px",
                        maxHeight: "400px",
                        visibility: checkHead,
                    }}
                    id="myTable"
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
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>No.</TableCell>
                                <TableCell>Factory</TableCell>
                                <TableCell>Product Name</TableCell>
                                <TableCell>Update Count</TableCell>
                                <TableCell>Config Code</TableCell>
                                <TableCell>Start Seq Serial</TableCell>
                                <TableCell>Start Seq Code</TableCell>
                                <TableCell>Date In process Flag</TableCell>
                                <TableCell>Date In Process</TableCell>
                                <TableCell>Pcs Per Sheet (EFPC)</TableCell>
                                <TableCell>Pcs Per Sheet (SMT)</TableCell>
                                <TableCell>Serial File Format</TableCell>
                                <TableCell>Sheet File Format</TableCell>
                                <TableCell>Serial side</TableCell>
                                <TableCell>Barcode Grade</TableCell>
                                <TableCell>Barcode Req Lot</TableCell>
                                <TableCell>Sheet Type</TableCell>
                                <TableCell>Sheet per Lot (EFPC)</TableCell>
                                <TableCell>Sheet per Lot (SMT)</TableCell>
                                <TableCell>Sheet per scan</TableCell>
                                <TableCell>Sheet per laser</TableCell>
                                <TableCell>Sheet Model Code</TableCell>
                                <TableCell>Sheet check Product Flag</TableCell>
                                <TableCell>Sheet check Lot Flag</TableCell>
                                <TableCell>Sheet Plasma Time Flag</TableCell>
                                <TableCell>Sheet Plasma Time</TableCell>
                                <TableCell>Sheet Xray Time Flag</TableCell>
                                <TableCell>Product Status</TableCell>
                                <TableCell>Conn Roll Sheet Flag</TableCell>
                                <TableCell>Conn Roll Sheet Length</TableCell>
                                <TableCell>Conn Roll Leaf Flag</TableCell>
                                <TableCell>Conn Roll Length</TableCell>
                                <TableCell>Conn Leaf Length</TableCell>
                                <TableCell>Conn Roll Product Flag</TableCell>
                                <TableCell>Conn Roll Product Start</TableCell>
                                <TableCell>Conn Roll Product End</TableCell>
                                <TableCell>Conn Roll Serial Flag</TableCell>
                                <TableCell>Conn Roll Leaf Scan</TableCell>
                                <TableCell>Conn Roll Req Lot Sheet</TableCell>
                                <TableCell>Conn Roll Lot Sheet Start</TableCell>
                                <TableCell>Conn Roll Lot Sheet End</TableCell>
                                <TableCell>Conn Roll Req Product Sheet</TableCell>
                                <TableCell>Conn Roll Product Sheet Start</TableCell>
                                <TableCell>Conn Roll Product Sheet End</TableCell>
                                <TableCell>Conn Roll Product Fix</TableCell>
                                <TableCell>Conn Sheet Control Time Flag</TableCell>
                                <TableCell>Conn Sheet Plasma Time Flag</TableCell>
                                <TableCell>Conn Sheet Mix Lot Flag</TableCell>
                                <TableCell>Conn Sheet Mix Product Flag</TableCell>
                                <TableCell>Conn Sheet check sum Flag</TableCell>
                                <TableCell>Conn Sheet Week Code Flag</TableCell>
                                <TableCell>Process Control Time Flag</TableCell>
                                <TableCell>Process Control Time</TableCell>
                                <TableCell>Final pcs per tray</TableCell>
                                <TableCell>Final pcs per scan</TableCell>
                                <TableCell>Final pack group flag</TableCell>
                                <TableCell>Final check week code flag</TableCell>
                                <TableCell>Final PDS time skip elt</TableCell>
                                <TableCell>Final PDS time Hide time</TableCell>
                                <TableCell>Final PDS time flag</TableCell>
                                <TableCell>Final PDS time</TableCell>
                                <TableCell>Final PDS time by</TableCell>
                                <TableCell>Final PDS time confirm flag</TableCell>
                                <TableCell>Final conn sheet flag</TableCell>
                                <TableCell>Final mix Lot flag</TableCell>
                                <TableCell>Final mix product flag</TableCell>
                                <TableCell>Fin inspect flag</TableCell>
                                <TableCell>Final inspect process</TableCell>
                                <TableCell>Final check sum flag</TableCell>
                                <TableCell>Final chip ID flag</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ overflowY: "auto" }}>
                            {ShowData.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Tooltip title="Edit">
                                            <EditNoteIcon
                                                style={{ color: "#F3B664", fontSize: "30px" }}
                                                onClick={() => OpenEdit(item)}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Delete">
                                            <DeleteForeverIcon
                                                style={{
                                                    color: "#EF4040",
                                                    fontSize: "30",
                                                }}
                                                onClick={() => handleOpenDelete(item)}
                                            />
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{item.tstm_sht_struc_code}</TableCell>
                                    <TableCell>{item.tstm_sht_struc_name}</TableCell>
                                    <TableCell>
                                        {item.tstm_plant_flag === 'Y' && (
                                            <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                        )}
                                    </TableCell>
                                    <TableCell>{item.tstm_plant_code}</TableCell>
                                    <TableCell>{item.tstm_plant_start_digit}</TableCell>
                                    <TableCell>{item.tstm_plant_end_digit}</TableCell>
                                    <TableCell>
                                        {item.tstm_lot_flag === 'Y' && (
                                            <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                        )}
                                    </TableCell>
                                    <TableCell>{item.tstm_lot_start_digit}</TableCell>
                                    <TableCell>{item.tstm_lot_end_digit}</TableCell>
                                    <TableCell>
                                        {item.tstm_model_flag === 'Y' && (
                                            <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                        )}
                                    </TableCell>
                                    <TableCell>{item.tstm_model_start_digit}</TableCell>
                                    <TableCell>{item.tstm_model_end_digit}</TableCell>
                                    <TableCell>
                                        {item.tstm_seq_flag === 'Y' && (
                                            <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                        )}
                                    </TableCell>
                                    <TableCell>{item.tstm_seq_format}</TableCell>
                                    <TableCell>{item.tstm_seq_start_digit}</TableCell>
                                    <TableCell>{item.tstm_seq_end_digit}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow style={{ visibility: checkEmpty }}>
                                <TableCell colSpan={18} >
                                    <InfoCircleOutlined
                                        style={{
                                            visibility: checkData,
                                            fontSize: "30px",
                                            color: "#ffd580",
                                            marginLeft: "500px",
                                        }}
                                    />
                                    <span
                                        style={{
                                            visibility: checkData,
                                            fontSize: "25px",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        {" "}
                                        Please fill in information{" "}
                                    </span>
                                    <Empty style={{ visibility: checkEmpty }} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default ProductMaster;