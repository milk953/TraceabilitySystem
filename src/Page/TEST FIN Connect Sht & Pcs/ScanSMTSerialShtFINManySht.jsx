import React, { useEffect, useState, useMemo } from "react";
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
  Box,
  Tooltip,
  Autocomplete,
  Grid,
  Paper,
  Card,
  Typography,
} from "@mui/material";
import { Button as AntButton } from "antd";
import BackspaceIcon from "@mui/icons-material/Backspace";
import "./ScanSMTSerialShtFINManySht.css";
import "../Common/StyleCommon.css";
import Hearder from "../Header/Header";
import { fn_ScanSMTSerialShtFINManySht } from "./fn_ScanSMTSerialShtFINManySht";
import { Table as AntTable } from "antd";
import Pageimg from "/src/assets/1.jpg";
import { fn_Homepage } from "../Homepage/fn_Homepage";
function ScanSMTSerialShtFINManySht() {
  const { menuName } = fn_Homepage();
  console.log(menuName,'mmmm')
  const [barcodes, setBarcodes] = useState(Array(2).fill(''));
  const [SerialTest, setSerialTest] = useState(Array(200).fill(''));
  const [pnlMachineState, setPnlMachineState] = useState(false);
  const {
    productCombo,
    productSelect,
    setProductSelect,
    lotValue,
    setLotValue,
    lotState,
    btnBack_Click,
    Fctxtlot,
    ProductSelect_Change,
    txtLot_Change,
    pnlRollLeafState,
    lblTotalSht,
    lblLog,
    lblLogState,
    txtLotRef,
    setTxtLotRef,
    lblTotalPcs,
    lblCheckRoll,
    gvBackSideState,
    gvBackSide,
    txtRollLeaf,
    setTxtRollLeaf,
    FCtxtRollleaf,
    txtmcno,
    setTxtmcno,
    Fctxtmcno,
    // pnlMachineState,
    FcgvBackside,
    FcgvFrontside,
    FcSelectproduct,
    selectproductState,
    pnlBoardState,
    panalSerialState,
    gvSerial,
    txtRollLeaf_Change,
    txtLotRef_Change,
    txtOperator,
    setTxtOperator,
    FctxtOperator,
    txtOperator_Change,
    btnSave_Click,
    btnCancel_Click,
    txtSideFront,
    txtSideBack,
    handleBackSideChange,
    handleFrontSideChange,
    txtSerial,
    handletxtSerialChange,
    txtBoardNoB,
    setTxtBoardNoB,
    txtBoardNoF,
    setTxtBoardNoF,
    FctxtBoardnoB,
    FctxtBoardnoF,
    lblResultState,
    lblResult,
    gvScanResult,
    hideImg,
    columns,
    getRowClassName,
    FctxtSerial,
  } = fn_ScanSMTSerialShtFINManySht();
  
  const handleKeyPress = (index, event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // ป้องกันการส่งฟอร์มเมื่อกด Enter
      if (index < gvSerial.length - 1) {
        FctxtSerial.current[index + 1].focus(); // โฟกัสไปที่ช่องถัดไป
      }
    }
  };


  const FocusOperator = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // ป้องกันการส่งฟอร์มเมื่อกด Enter
      if(pnlMachineState){
          Fctxtmcno.current.focus()
      }
      else{
        // Fctxtmcno.current.focus
        FcgvBackside.current[0].focus()
      }
    }
  };

  const FocusGvbackSide = (index, event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // ป้องกันการส่งฟอร์มเมื่อกด Enter
      if (index < barcodes.length - 1) {
        FcgvFrontside.current[index].focus(); // โฟกัสไปที่ช่องถัดไป
      }
      else{
        FcgvFrontside.current[index+1].focus(); 
      }
    }
  };

  const FocusGvFont = (index, event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // ป้องกันการส่งฟอร์มเมื่อกด Enter
      if (index < barcodes.length - 1) {
        FcgvBackside.current[index+1].focus(); // โฟกัสไปที่ช่องถัดไป
      }
      else{
        // FcgvFrontside.current[0].focus(); 
      }
    }
  };

  

  
  return (
    <div>
      <Hearder />
      <Card component={Card} className="Card-Common">
        <table>
          <tr>
            <td className="maintd">
              <Table className="mainTable" component={Card}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      {/* {menuName} */}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ textAlign: "right" }}>
                      Lot No.:
                    </TableCell>
                    <TableCell>
                      <input
                        className="txtField"
                        id="txtlot"
                        type="text"
                        value={lotValue}
                        onChange={(e) => setLotValue(e.target.value.trim())}
                        // disabled={lotState.styled.disabled}
                        // style={lotState.styled}
                        ref={Fctxtlot}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            FctxtOperator.current.focus()
                          }
                        }}
                      ></input>
                    </TableCell>
                    <TableCell>
                      <Button   >
                        {/*onClick={btnBack_Click} */}
                        <BackspaceIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ textAlign: "right" }}>
                      Product:
                    </TableCell>
                    <TableCell colSpan={2}>
                      <FormControl style={{ width: "94%" }}>
                        <select
                          onInputChange={(e) =>
                            ProductSelect_Change(e.target.value)
                          }
                          // onChange={(e) => ProductSelect_Change(e.target.value)}
                          value={productSelect}
                          // disabled={selectproductState}
                          ref={FcSelectproduct}
                        >
                          {productCombo.map((option, index) => (
                            <option key={index} value={`${option.prd_name}`}>
                              {`${option.prd_name}`}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ textAlign: "right" }}>
                      Lot Ref. No.:
                    </TableCell>
                    <TableCell>
                      <input
                        size="small"
                        className="txtField"
                        value={txtLotRef}
                        onChange={
                          ((e) => setTxtLotRef(e.target.value.trim())
                          // , txtLotRef_Change }
                          )
                        }
                      ></input>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ textAlign: "right" }}>
                      Operator:
                    </TableCell>
                    <TableCell>
                      <input
                        size="small"
                        className="txtField"
                        id="txtOperatorFin"
                        ref={FctxtOperator}
                        value={txtOperator}
                        onChange={(e) => {
                          setTxtOperator(e.target.value);
                        }}
                        // onKeyDown={(e) => {
                        //   FocusOperator(index, e)
                        // }}
                        onKeyDown={(event) => FocusOperator(event)}
                      ></input>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ textAlign: "right" }}>
                      Total Sht:
                    </TableCell>
                    <TableCell>lblTotalSht</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ textAlign: "right" }}>
                      Total Pcs:
                    </TableCell>
                    <TableCell>lblTotalPcs</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  {pnlRollLeafState && (
                    <>
                      <TableRow>
                        <TableCell>Roll Leaf No.:</TableCell>
                        <TableCell>
                          <input
                            size="small"
                            className="txtField"
                            ref={FCtxtRollleaf}
                            value={txtRollLeaf}
                            onChange={(e) => {
                              setTxtRollLeaf(e.target.value);
                            }}
                            // onKeyDown={(e) => {
                            //   if (e.key === "Enter") {
                            //     txtRollLeaf_Change();
                            //   }
                            // }}
                          ></input>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Check Roll:</TableCell>
                        <TableCell style={lblCheckRoll.styled}>
                          {lblCheckRoll.text}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </>
                  )}
                  {pnlMachineState && (
                    <>
                      <TableRow>
                        <TableCell>Machine No.:</TableCell>
                        <TableCell>
                          <input
                            size="small"
                            className="txtField"
                            ref={Fctxtmcno}
                            value={txtmcno}
                            onChange={(e) => {
                              setTxtmcno(e.target.value);
                            }}
                          ></input>
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
              {/* <td> */}
              {/* {gvBackSideState && ( */}
              {barcodes.map((barcode, index) => (
                <div className="pnlBackside">
                  <Table component={Card} className="gvBackSide">
                    <TableBody>
                      {/* {gvBackSide.map((row, index) => ( */}
                        <TableRow
                          key={index}
                          style={{ backgroundColor: "White" }}
                        >
                          <TableCell
                            style={{
                              textAlign: "center",
                              borderRight: "1px solid #d9d9d9",
                              width: "10%",
                            }}
                          >
                            row.SEQ
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "center",
                              borderRight: "1px solid #d9d9d9",
                              width: "70%",
                            }}
                          >
                            row.TITLE
                          </TableCell>
                          <TableCell>
                            <input
                              type="text"
                              // id="gvBackside_1"
                              // id={`gvBackside_${index}`}
                              style={{
                                width: "98%",
                                textTransform: "uppercase",
                                padding: "0px 0px 0px 0px",
                              }}
                              maxLength="30"
                              className="styleEnable"
                              // ref={FcgvBackside}
                              ref={(el) => (FcgvBackside.current[index] = el)}
                              // onChange={(e) => FocusGvbackSide(index, e)}
                              onKeyDown={(e) => {
                                // if (e.key === "Enter") {
                                  FocusGvbackSide(index, e);
                                // }
                              }}
                              // value={txtSideBack}
                              // onChange={(e) => handleBackSideChange(index, e)}
                            />
                            <input
                              type="text"
                              // id="gvBackside_2"
                              // id={`gvFrontside_${index}`}
                              style={{
                                width: "98%",
                                textTransform: "uppercase",
                                padding: "0px 0px 0px 0px",
                              }}
                              maxLength="30"
                              // ref={FcgvFrontside}
                              ref={(el) => (FcgvFrontside.current[index] = el)}
                              // onKeyDown={(e) => {
                              //   if (e.key === "Enter") {
                              //     handleFrontSideChange(index, e);
                              //   }
                              // }}
                              onKeyDown={(e) => {
                                // if (e.key === "Enter") {
                                  FocusGvFont(index, e);
                                // }
                              }}
                              className="styleEnable"
                              // value={txtSideFront}
                              // onChange={(e) => FocusGvbackSide(index, e)}
                            />
                          </TableCell>
                        </TableRow>
                      {/* ))} */}
                    </TableBody>
                  </Table>
                  {/* {pnlBoardState && ( */}
                    <>
                      {/* <Table component={Paper} sx={{ marginTop: 2 }}>
                        <TableRow>
                          <TableCell>Bottom Fixture</TableCell>
                          <TableCell>
                            <input
                              size="small"
                              className="txtField"
                              ref={FctxtBoardnoB}
                              value={txtBoardNoB}
                              onChange={(e) => {
                                setTxtBoardNoB(e.target.value);
                              }}
                            ></input>
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Top Fixture:</TableCell>
                          <TableCell>
                            <input
                              size="small"
                              className="txtField"
                              ref={FctxtBoardnoF}
                              value={txtBoardNoF}
                              onChange={(e) => {
                                setTxtBoardNoF(e.target.value);
                              }}
                            ></input>
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </Table> */}
                    </>
                  {/* )} */}
                </div>
              ))}
              {/* )} */}
              {/* {lblLogState && ( */}

              <div className="panelgvSerial">
                {/* {panalSerialState && ( */}
                  <Table className="gvSerial" component={Card}>
                    <TableHead
                      sx={{
                        background: "#12422e",
                        padding: "5px",
                        color: "white",
                      }}
                    >
                      <TableRow>
                        <TableCell
                          className="gvSerialThead"
                          style={{ width: "30px" }}
                        >
                          Sheet
                        </TableCell>
                        <TableCell
                          className="gvSerialThead"
                          style={{ width: "30px" }}
                        >
                          No.
                        </TableCell>
                        <TableCell className="gvSerialThead">
                          Serial No.
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {gvSerial.map((row, index) => ( */}
                      {SerialTest.map((barcode, index) => (
                        <tr style={{ padding: "4px 4px 4px 4px" }}>
                          <td
                            className="gvSerialCell"
                            style={{ width: "10px", textAlign: "right" }}
                          >
                            row.SHEET
                          </td>
                          <td
                            className="gvSerialCell"
                            style={{ width: "10px", textAlign: "right" }}
                          >
                            row.SEQ
                          </td>
                          <td
                            className="gvSerialCell"
                            style={{ width: "300px", paddingRight: "10px" }}
                          >
                            <input
                              // id={`txtSerial_${index}`}
                              // ref={(el) => (FctxtSerial.current[index] = el)}
                              type="text"
                              style={{
                                width: "98%",
                                // textTransform: "uppercase",
                                padding: "0px",
                                margin: "0px",
                              }}
                              maxLength="30"
                              className="styleEnable"
                              value={txtSerial}
                              // onKeyDown={(e) => {
                              //   if (e.key === "Enter") {
                              //     handleKeyPress(index, e);
                              //   }
                              // }}
                              // onChange={(e) => handletxtSerialChange(index, e)}
                            />
                          </td>
                        </tr>
                      // {/* ))} */}
                      ))}

                      <TableRow>
                        <TableCell
                          colSpan={3}
                          style={{
                            textAlign: "center",
                            padding: "3px",
                            gap: "10px",
                          }}
                        >
                          <AntButton className="BtSave" >
                            Save
                          </AntButton>
                          &nbsp;&nbsp;
                          <AntButton
                            className="BtCancel"
                          
                          >
                            {" "}
                            Cancel
                          </AntButton>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                {/* )} */}
              </div>
            </td>
            {/* </td> */}

          </tr>
        </table>
      </Card>
    </div>
  );
}

export default ScanSMTSerialShtFINManySht;
