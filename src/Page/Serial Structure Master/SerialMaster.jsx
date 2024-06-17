import React, { useState, useEffect } from "react";
import "../Serial Structure Master/Style.css";
import Popup from "./SerialPopup";
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
import { SerialMasterPage } from "./function_SerialMaster";
// 
function SerialMaster() {

    const { ShowData, checkHead, checkEmpty, checkData, code, name,
        TEXT_Code, Search, handleCode, handleName, OpenPopup,
        PopupClose, New, Clear, selectedRowData, OpenEdit,
        handleOpenDelete, handleExportToExcel, } = SerialMasterPage();


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
                            Serial Structure Master
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
                            <TextField
                                id="txtCode"
                                label="Code."
                                variant="outlined"
                                size="small"
                                style={{ width: "300px" }}
                                value={code}
                                onChange={handleCode}
                            />
                            <TextField
                                id="txtName"
                                label="Name."
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
                <div className="divTbSheet" style={{ position: "relative" }}>

                    <TableContainer
                        component={Paper}
                        style={{
                            width: "100%",
                            marginBottom: "10px",
                            height: "380px",
                            visibility: checkHead,
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
                                    <TableCell rowSpan={"2"}></TableCell>
                                    <TableCell rowSpan={"2"}></TableCell>
                                    <TableCell rowSpan={"2"}>No.</TableCell>
                                    <TableCell rowSpan={"2"}>Code</TableCell>
                                    <TableCell rowSpan={"2"}>Name</TableCell>
                                    <TableCell rowSpan={"2"}>Up Count</TableCell>
                                    <TableCell rowSpan={"2"}>Length</TableCell>
                                    <TableCell colSpan={"4"}>Plant</TableCell>
                                    <TableCell colSpan={"6"}>Week</TableCell>
                                    <TableCell colSpan={"6"}>Seq</TableCell>
                                    <TableCell colSpan={"3"}>Eng</TableCell>
                                    <TableCell colSpan={"3"}>Rev</TableCell>
                                    <TableCell colSpan={"3"}>Check Sum</TableCell>
                                    <TableCell colSpan={"3"}>Config</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Flag</TableCell>
                                    <TableCell>Code</TableCell>
                                    <TableCell>Start Digit</TableCell>
                                    <TableCell>End Digit</TableCell>
                                    <TableCell>Flag</TableCell>
                                    <TableCell>Code</TableCell>
                                    <TableCell>Start Digit</TableCell>
                                    <TableCell>End Digit</TableCell>
                                    <TableCell>Convert</TableCell>
                                    <TableCell>Convert Base</TableCell>
                                    <TableCell>Flag</TableCell>
                                    <TableCell>Format</TableCell>
                                    <TableCell>Start Digit</TableCell>
                                    <TableCell>End Digit</TableCell>
                                    <TableCell>Convert</TableCell>
                                    <TableCell>Convert Base</TableCell>
                                    <TableCell>Flag</TableCell>
                                    <TableCell>Start Digit</TableCell>
                                    <TableCell>End Digit</TableCell>
                                    <TableCell>Flag</TableCell>
                                    <TableCell>Start Digit</TableCell>
                                    <TableCell>End Digit</TableCell>
                                    <TableCell>Flag</TableCell>
                                    <TableCell>Start Digit</TableCell>
                                    <TableCell>End Digit</TableCell>
                                    <TableCell>Flag</TableCell>
                                    <TableCell>Start Digit</TableCell>
                                    <TableCell>End Digit</TableCell>
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
                                        <TableCell>{item.p_tssm_sn_struc_code}</TableCell>
                                        <TableCell>{item.p_tssm_sn_struc_name}</TableCell>
                                        <TableCell>{item.p_tssm_sn_struc_upcount}</TableCell>
                                        <TableCell>{item.p_tssm_sn_length}</TableCell>
                                        <TableCell>
                                            {item.p_tssm_plant_flag === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{item.p_tssm_plant_code}</TableCell>
                                        <TableCell>{item.p_tssm_plant_start_digit}</TableCell>
                                        <TableCell>{item.p_tssm_plant_end_digit}</TableCell>
                                        <TableCell>
                                            {item.p_tssm_week_flag === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{item.p_tssm_week_code}</TableCell>
                                        <TableCell>{item.p_tssm_week_start_digit}</TableCell>
                                        <TableCell>{item.p_tssm_week_end_digit}</TableCell>
                                        <TableCell>{item.p_tssm_week_convert}</TableCell>
                                        <TableCell>{item.p_tssm_week_convert_base}</TableCell>
                                        <TableCell>
                                            {item.p_tssm_seq_flag === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{item.p_tssm_seq_format}</TableCell>
                                        <TableCell>{item.p_tssm_seq_start_digit}</TableCell>
                                        <TableCell>{item.p_tssm_seq_end_digit}</TableCell>
                                        <TableCell>{item.p_tssm_seq_convert}</TableCell>
                                        <TableCell>{item.p_tssm_seq_convert_base}</TableCell>
                                        <TableCell>
                                            {item.p_tssm_eng_flag === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{item.p_tssm_eng_start_digit}</TableCell>
                                        <TableCell>{item.p_tssm_eng_end_digit}</TableCell>
                                        <TableCell>
                                            {item.p_tssm_rev_flag === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{item.p_tssm_rev_start_digit}</TableCell>
                                        <TableCell>{item.p_tssm_rev_end_digit}</TableCell>
                                        <TableCell>
                                            {item.p_tssm_checksum_flag === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{item.p_tssm_checksum_start_digit}</TableCell>
                                        <TableCell>{item.p_tssm_checksum_end_digit}</TableCell>
                                        <TableCell>
                                            {item.p_tssm_config_flag === 'Y' && (
                                                <FlagFilled style={{ color: "#83A2FF", fontSize: "20px" }} />
                                            )}
                                        </TableCell>
                                        <TableCell>{item.p_tssm_config_start_digit}</TableCell>
                                        <TableCell>{item.p_tssm_config_end_digit}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow style={{ visibility: checkEmpty }}>
                                    <TableCell colSpan={35} >
                                        <InfoCircleOutlined
                                            style={{
                                                visibility: checkData,
                                                fontSize: "30px",
                                                color: "#ffd580",
                                                marginLeft: "420px",
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

export default SerialMaster;
