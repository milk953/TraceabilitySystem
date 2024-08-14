import React, { useEffect } from "react";
import Hearder from "../Header/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  TableHead,
  Paper,
  Card
} from "@mui/material";
import "./AVIManualConfirm.css";
import { fn_AVIManualConfirm } from "./fn_AVIManualConfirm";
function AVIManualConfirm() {
  const {
    eltType,
    username,
    pieceNo,
    setPieceNo,
    btnRetrieveClick,
    handlePieceChange,
    eltTypeState,
    eltTypeSelect,
    setEltTypeSelect,
    result,
    resultState,
    lblResult,
    pieceNoRef,
    resultSelect,
    handleResultSelect,
    btnSubmitClick,
    dataNotfound
  } = fn_AVIManualConfirm();
  return (
    <>
      <Hearder />

      <h1>AVIConfirm</h1>
      <h3 style={{ display: "flex", justifyContent: "center" ,color: lblResult === 'update complete.' ? 'blue' : 'red'}}>{lblResult}</h3>
      <Card classNmae="AVIMainCard">
        <div className="DAVITableFirst">
      
        <Table className="AVITableFirst" component={Paper}>
          <TableBody>
            <TableRow>
              <TableCell sx={{ width: "90px", textAlign: "center" }}>
                ELT Type :
              </TableCell>
              {/* <TableCell sx={{ width: "30px" }}></TableCell> */}
              <TableCell>
                <select
                  onInputChange={(e) => setEltTypeSelect(e.target.value)}
                  onChange={(e) => setEltTypeSelect(e.target.value)}
                  value={eltTypeSelect}
                  style={eltTypeState.styled}
                  disabled={eltTypeState.styled.disable}
                >
                  {eltType.map((option, index) => (
                    <option key={index} value={`${option.elt_type}`}>
                      {`${option.elt_type}`}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell
                rowSpan={2}
                sx={{ verticalAlign: "middle", textAlign: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: "100px" }}
                  onClick={btnRetrieveClick}
                >
                  Retrieve
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ textAlign: "center" }}>Piece No. :</TableCell>
              {/* <TableCell></TableCell> */}
              <TableCell sx={{ width: "300px" }}>
                <input
                  ref={pieceNoRef}
                  onChange={(e) => setPieceNo(e.target.value)}
                  onBlur={handlePieceChange}
                  value={pieceNo}
                ></input>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="DAVITableSecond">
        <Table className="AVITableSecond" component={Paper}>
          <TableHead>
            <TableRow>
              <TableCell>Result</TableCell>
              <TableCell>Operator</TableCell>
              <TableCell colSpan={2}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ width: "200px" }}>
                <select value={resultSelect} onChange={handleResultSelect}>
                  <option value=" "> </option>
                  <option value="OK">OK</option>
                  <option value="NG">NG</option>
                  <option value="P-error">P-error</option>
                  <option value="2D-error">2D-error</option>
                </select>
              </TableCell>
              <TableCell sx={{ width: "100px" }}>
                <input
                  style={{ width: "150px", backgroundColor: "#B2A8A8" }}
                  disabled
                  value={username}
                />
              </TableCell>
              <TableCell sx={{ width: "60px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ width: "100px" }}
                  onClick={btnSubmitClick}
                >
                  Submit
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      {resultState && (
        <div className="ELTTYPEpnlResult">
          <Table id="ELTTYPETableResult" component={Paper}>
            <TableHead sx={{ height: "30px" }}>
              <TableCell>No.</TableCell>
              <TableCell>Serial No</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>Inspec Count</TableCell>
              <TableCell>Inspec Date</TableCell>
              <TableCell>Remark</TableCell>
            </TableHead>
            <TableBody sx={{ height: "40px" }}>
              {result.map((row, index) => (
                <TableRow key={index} >
                  <TableCell sx={{color:row.color}} >{row.SEQ}</TableCell>
                  <TableCell sx={{color:row.color}}>{row.CHE_SERIAL_NO}</TableCell>
                  <TableCell sx={{color:row.color}}>{row.result}</TableCell>
                  <TableCell sx={{color:row.color}}></TableCell>
                  <TableCell sx={{color:row.color}}></TableCell>
                  <TableCell sx={{color:row.color}}>{row.remark}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <br></br>
    </Card>  
    </>
  );
}

export default AVIManualConfirm;
