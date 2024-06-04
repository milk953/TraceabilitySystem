import React, { useState, useEffect } from "react";
import "../Product Master/Style.css";
// import "./master.css";
import Popup from "./ProductPopup.jsx";
import { Empty } from "antd";
import Hearder from "../Header/Hearder";
import {
    TextField,
    Card,
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
    DownloadOutlined
} from "@ant-design/icons";
import axios from 'axios';
import { ProductMasterPage } from "./function_ProductMaster.jsx";
import { getFactory } from "../Common/function_Common";
import * as XLSX from 'xlsx';

function ProductMaster() {

    const { factory, setFactory } = getFactory();

    const { ShowData, checkHead, checkEmpty, checkData, DDLFactory, setDDLFactory, txtProduct, settxtProduct, Search, alignData,
        OpenPopup, PopupOpen, PopupClose, New, Clear, selectedRowData, OpenEdit, handleOpenDelete, handleExportToExcel, } = ProductMasterPage();

    return (
        <>
            <Hearder />
            <Popup
                isOpen={OpenPopup}
                onClose={PopupClose}
                item={selectedRowData}
                searchFunction={Search} />
            <Card
                component={Paper}
                style={{
                    margin: "auto",
                    width: "90%",
                    maxWidth: "1500px",
                    marginTop: "90px",
                    height: "auto",
                    maxHeight: "600px",
                    padding: "20px",
                }}
            >
                <div
                    style={{
                        marginTop: "0px",
                        marginLeft: "70px",
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
                    <div style={{ marginBottom: "20px" }}>
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
                                    value={DDLFactory}
                                    label="Factory"
                                    onChange={(e) => setDDLFactory(e.target.value)}
                                >
                                    {factory.map((item) => (
                                        <MenuItem key={item.p_factory_code} value={item.p_factory_code}>
                                            {item.p_factory_desc}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                id="txtProduct"
                                label="Product"
                                variant="outlined"
                                size="small"
                                style={{ width: "300px" }}
                                value={txtProduct}
                                onChange={(e) => settxtProduct(e.target.value)}
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
                <div className="divTbSheet" style={{ position: "relative" }}>

                    <TableContainer
                        component={Paper}
                        style={{
                            width: "100%",
                            marginBottom: "10px",
                            height: "380px",
                            visibility: checkHead
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
                            <Button
                                color="success"
                                onClick={handleExportToExcel}
                                style={{
                                    position: "absolute",
                                    top: "10px",
                                    right: "1175px",
                                    zIndex: 1
                                }}
                            >
                                <DownloadOutlined style={{ fontSize: "20px" }} /> &nbsp; Export
                            </Button>
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
                                        <TableCell>{item.p_tpm_factory}</TableCell>
                                        <TableCell className="autowidthcell">
                                            {item.p_tpm_product_name}
                                        </TableCell>
                                        <TableCell>{alignData(item.p_tpm_update_count)}</TableCell>
                                        <TableCell>{item.p_tpm_config_code}</TableCell>
                                        <TableCell>{alignData(item.p_tpm_start_seq_serial)}</TableCell>
                                        <TableCell>{item.p_tpm_start_seq_code}</TableCell>
                                        <TableCell>
                                            {item.p_tpm_date_inproc_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{item.p_tpm_date_inproc}</TableCell>
                                        <TableCell>{alignData(item.p_tpm_pcs_per_sht_efpc)}</TableCell>
                                        <TableCell>{alignData(item.p_tpm_pcs_per_sht_smt)}</TableCell>
                                        <TableCell>{item.p_tpm_serial_file_format}</TableCell>
                                        <TableCell>{item.p_tpm_sht_file_format}</TableCell>
                                        <TableCell>{item.p_tpm_serial_side}</TableCell>
                                        <TableCell>{item.p_tpm_barcode_grade}</TableCell>
                                        <TableCell>
                                            {item.p_tpm_barcode_req_lot === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{item.p_tpm_sht_type}</TableCell>
                                        <TableCell>{alignData(item.p_tpm_sht_per_lot_efpc)}</TableCell>
                                        <TableCell>{alignData(item.p_tpm_sht_per_lot_smt)}</TableCell>
                                        <TableCell>{alignData(item.p_tpm_sht_per_scan)}</TableCell>
                                        <TableCell>{alignData(item.p_tpm_sht_per_laser)}</TableCell>
                                        <TableCell>{item.p_tpm_sht_model_code}</TableCell>
                                        <TableCell>
                                            {item.p_tpm_sht_check_prd_flag === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.p_tpm_sht_check_lot_flag === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.p_tpm_sht_plasma_time_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{alignData(item.p_tpm_sht_plasma_time)}</TableCell>
                                        <TableCell>
                                            {item.p_tpm_sht_xray_1_time_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{item.p_tpm_product_status}</TableCell>
                                        <TableCell>
                                            {item.p_tpm_conn_roll_sht_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{alignData(item.p_tpm_conn_roll_sht_length)}</TableCell>
                                        <TableCell>
                                            {item.p_tpm_conn_roll_leaf_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{alignData(item.p_tpm_conn_roll_length)}</TableCell>
                                        <TableCell>{alignData(item.p_tpm_conn_leaf_length)}</TableCell>
                                        <TableCell>
                                            {item.p_tpm_conn_roll_prd_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{alignData(item.p_tpm_conn_roll_prd_start)}</TableCell>
                                        <TableCell>{alignData(item.p_tpm_conn_roll_prd_end)}</TableCell>
                                        <TableCell>
                                            {item.p_tpm_conn_roll_serial_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{alignData(item.p_tpm_conn_roll_leaf_scan)}</TableCell>
                                        <TableCell>{item.p_tpm_conn_roll_req_lot_sht}</TableCell>
                                        <TableCell>{alignData(item.p_tpm_conn_roll_lot_sht_start)}</TableCell>
                                        <TableCell>{alignData(item.p_tpm_conn_roll_lot_sht_end)}</TableCell>
                                        <TableCell>{item.p_tpm_conn_roll_req_prd_sht}</TableCell>
                                        <TableCell>{alignData(item.p_tpm_conn_roll_prd_sht_start)}</TableCell>
                                        <TableCell>{alignData(item.p_tpm_conn_roll_prd_sht_end)}</TableCell>
                                        <TableCell>{item.p_tpm_conn_roll_prd_fix}</TableCell>
                                        <TableCell>
                                            {item.p_tpm_conn_sht_control_time_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.p_tpm_conn_sht_plasma_time_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.p_tpm_conn_sht_mix_lot_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.p_tpm_conn_sht_mix_product_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.p_tpm_conn_sht_checksum_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.p_tpm_conn_sht_check_weekcode_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.p_tpm_proc_control_time_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{item.p_tpm_proc_control_time}</TableCell>
                                        <TableCell>{alignData(item.p_tpm_fin_pcs_per_tray)}</TableCell>
                                        <TableCell>{alignData(item.p_tpm_fin_pcs_per_scan)}</TableCell>
                                        <TableCell>
                                            {item.p_tpm_fin_pack_group_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.p_tpm_fin_check_weekcode_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{item.p_tpm_fin_pds_time_skip_elt}</TableCell>
                                        <TableCell>{item.p_tpm_fin_pds_time_hide_time}</TableCell>
                                        <TableCell>
                                            {item.p_tpm_fin_pds_time_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{alignData(item.p_tpm_fin_pds_time)}</TableCell>
                                        <TableCell>{item.p_tpm_fin_pds_time_by}</TableCell>
                                        <TableCell>
                                            {item.p_tpm_fin_pds_time_confirm_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.p_tpm_fin_conn_sht_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.p_tpm_fin_mix_lot_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.p_tpm_fin_mix_product_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            {item.p_tpm_fin_checksum_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.p_tpm_fin_chip_id_flg === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow style={{ visibility: checkEmpty }}>
                                    <TableCell colSpan={18} >
                                        <InfoCircleOutlined
                                            style={{
                                                visibility: checkData,
                                                fontSize: "30px",
                                                color: "#ffd580",
                                                marginLeft: "420px",
                                                marginTop: "50px"
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
            </Card>
        </>
    );
};

export default ProductMaster;