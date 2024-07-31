import React, { useEffect } from "react";
import Hearder from "../Header/Hearder";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  TableHead,
  Paper,
} from "@mui/material";
import "./AVIManualConfirm.css";

function AVIManualConfirm() {
  return (
    <>
      <Hearder />
      <h1>ELTType</h1>
      <h3 style={{ display: "flex", justifyContent: "center" }}>
        lblMassage
      </h3>
      <div className="ELTETYPEPnlForm">
        <Table className="ETYPEmasterTb">
          <TableBody>
            <TableRow>
              <TableCell>Product:</TableCell>
              <TableCell>
                {/* <select
                  onInputChange={(e) => productSelectChange(e.target.value)}
                  onChange={(e) => productSelectChange(e.target.value)}
                  value={productSelect}
                >
                  {productData.map((option, index) => (
                    <option key={index} value={`${option.product}`}>
                      {`${option.product}`}
                    </option>
                  ))}
                </select> */}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ELT Type:</TableCell>
              <TableCell>
                {/* <select
                  onInputChange={(e) => ELTTypeSelectChange(e.target.value)}
                  onChange={(e) => ELTTypeSelectChange(e.target.value)}
                  value={ELTTypeSelect}
                >
                  {ELTTypeData.map((option, index) => (
                    <option key={index} value={`${option.elt_type}`}>
                      {`${option.elt_type}`}
                    </option>
                  ))}
                </select> */}
              </TableCell>
              <TableCell>
                <Button onClick={handleAddData}>Add</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default AVIManualConfirm;
