
import React, { useEffect, useState, useRef } from "react";
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
  Checkbox,
  Grid,
  Input,
} from "@mui/material";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Table as AntTable } from "antd";
import "./ScanSMTSerialRecordTimeReplace.css";
import Hearder from "../Header/Header";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "../Common/StyleCommon.css";
import {fn_ScanSMTSerialRecordTimeReplace} from './fn_ScanSMTSerialRecordTimeReplace'
import { color } from "framer-motion";
function ScanSMTSerialRecordTimeReplace() {
  const{  txtSerialNo_TextChanged,
    txtSerialRefer,
    settxtSerialRefer,
    txtSerialReplace_TextChanged,
    txtSerialReplace,
    settxtSerialReplace,
    ddlProduct_SelectedIndexChanged,
    ddlProduct,
    selectddlProduct,
    setselectddlProduct,
    BtnSubmit1_Click,
    pnlgvSerialReplace,
    lblStartTime,
    lblResult,
    lblSerial,
    handleSetSerial,
    lblGroup ,gvSerialReplace ,
    setlblSerial,fntxtSerialReplace,fntxtSerialRefer,
    columns} =fn_ScanSMTSerialRecordTimeReplace()
  return (
    <div>
      <Hearder />
      <h1>Replace Recode Time</h1>
      <Card component={Paper} className="Card-Common">
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Grid container spacing={2}>
            <Grid item xs={10} md={12} align="center">
              
             
                <Typography
                  variant="h5"
                  style={ lblResult.style }
                >
                  {lblResult.value}
                </Typography>
           
              <Table
                component={Card}
                className="ReplaceRecord"
                style={{ width: "50%" ,marginTop:'20px'}}
              >
                <TableHead style={{ height: "50px" }}>
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={{ fontSize: "30px" }}
                    >
                      <b>Serial Replace Record Time</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="right" >
                      <Typography>Product.:</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <FormControl fullWidth>
                        <Autocomplete
                          className="Select_dropDown"
                            sx={{width:'61%'}}
                            
                            value={selectddlProduct.value}
                            onChange={(e, value) =>
                              ddlProduct_SelectedIndexChanged(value)
                            }
                            
                            options={ddlProduct.map((item) => item.prd_name)}
                          renderInput={(params) => (
                            <TextField
                               // inputRef={(el) => (fnddlProduct.current = el)}
                                {...params}
                              size="small"
                              sx={{ textAlign: "left" }}
                            />
                          )}
                        />
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" style={{ width: "180px" }}>
                      <Typography>Reference Serial No.:</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        
                       inputRef={(el) => (fntxtSerialRefer.current = el)}
                        className="input_txt"
                        disabled={txtSerialRefer.disbled} 
                        style={{backgroundColor: txtSerialRefer.disbled ? '#e0e0e0' : 'inherit'}}
                          fullWidth
                          value={txtSerialRefer.value}
                          onChange={(e) => {
                            settxtSerialRefer((prevState) => ({
                              ...prevState,
                              value: e.target.value,
                            }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              txtSerialNo_TextChanged();
                            }
                          }}
                         // onBlur={txtSerialNo_TextChanged}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" style={{ width: "150px" }}>
                      <Typography>New Serial No.:</Typography>
                    </TableCell>
                    <TableCell colSpan={2}>
                      <TextField
                        size="small"
                        className="input_txt"
                            inputRef={(el) => (fntxtSerialReplace.current = el)}
                            style={{ backgroundColor: txtSerialReplace.disbled ? '#e0e0e0' : 'inherit'}}
                          fullWidth
                          disabled={txtSerialReplace.disbled} 
                          value={txtSerialReplace.value}
                          onChange={(e) => {
                            settxtSerialReplace((prevState) => ({
                              ...prevState,
                              value: e.target.value,
                            }));
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              txtSerialReplace_TextChanged();
                            }
                          }}
                          //onBlur={txtSerialReplace_TextChanged}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" style={{ width: "150px" }}>
                      <Typography>Group No.:</Typography>
                    </TableCell>
                    <TableCell colSpan={2} >
                 {lblGroup.value}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" style={{ width: "150px" }}>
                      <Typography>Start Time.:</Typography>
                    </TableCell>
                    <TableCell colSpan={2} >
                    <Typography>{lblStartTime.value}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              {pnlgvSerialReplace &&(
              <Table
                className="CSS-GvSerial"
                style={{
                  width: "50%",
                  marginTop: "20px",
                }}
                component={Card}
              >
                <TableHead>
                  <TableCell
                    sx={{ borderRight: "1px solid #d9d9d9" }}
                    align="center"
                  >
                    No.
                  </TableCell>
                  
                  <TableCell align="center">Serial No.</TableCell>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>
                  {/* <TableRow> */}
                  {Array.from(
                        { length: gvSerialReplace.length },
                        (_, index) => (
                          <TableRow key={index}>
                            <TableCell
                              align="center"
                              sx={{ borderRight: "1px solid #d9d9d9" }}
                            >
                              {gvSerialReplace[index].SEQ}
                            </TableCell>
                            <TableCell
                            align="center"
                              sx={{ borderRight: "1px solid #d9d9d9" }}
                            >
                              {gvSerialReplace[index].SERIAL_NO
                              }
                            </TableCell>
                          </TableRow>
                        )
                      )}
         

                  <TableRow>
                    <TableCell colSpan={3} style={{ textAlign: "center" }}>
                      <Button
                        className="BtSave"
                        onClick={BtnSubmit1_Click}
                      >
                        Submit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>)}
              {/* <AntTable
                    columns={columns}
                    dataSource={gvRow.value}
                    pagination={false}
                    size="small"
                    bordered
                    className="tableGvResult"
                    // style={{width:'70%',display:gvRow.visble}}
                  /> */}
            </Grid>
            {/* <Grid item xs={10} md={7} >             */}

            {/* </Grid> */}
          </Grid>
        </Box>
      </Card>
      {/* </Card> */}
    </div>
  );
}

export default ScanSMTSerialRecordTimeReplace;
