import React from "react";
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
} from "@mui/material";
import {
  ArrowRightOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import "/src/Page/Scan SMTRoollSht/ScanSmt.css";
import Hearder from "../Header/Hearder";
import { Fn_ScanSMTRollSht } from "./function_ScanSMTRollSht";
function ScanSMTRoollSht() {
  const {
    settxt_lotNo,
    txt_lotNo,
    handleLotxt_Lotno,
    sl_Product,
    Product,
    StyleEneble,
    StyleDisabled,
    HandleSL_Product,
    lbllog,
    visblelog,
    settxtRollLeaf,
    txtRollLeaf,
    gvScanResult,
    txtTotalLeaf,
    settxtTotalLeaf,
    lblCheckRoll,
    lbltotalSht,
    // StyleCheckRoll,
  } = Fn_ScanSMTRollSht();

  return (
    <div>
      <Hearder />
      <h1>ScanSMTRoollSht</h1>
      <table style={{ margin: "auto" }}>
        <tr>
          <td>
            <Table className="ScanSMT" component={Paper}>
              <TableHead>
                <TableCell colSpan={4} align="center">
                  <Typography variant="h6">Connect Roll/Sht & Leaf</Typography>
                </TableCell>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="right">
                 
                  <Typography > LotNo. :</Typography>
                  </TableCell>
                  <TableCell colSpan={2}>
                    <TextField
                      id="txtfild"
                      size="small"
                      fullWidth
                      value={txt_lotNo}
                      // onChange={handleLotxt_Lotno}
                      onChange={(e) => {
                        settxt_lotNo(e.target.value);
                      }}
                      // onChange={(e) =>  settxt_lotNo(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleLotxt_Lotno();
                        }
                        
                      }}
                      // style={StyleEneble()}
                      // disabled ={StyleDisabled()}
                    ></TextField>
                  </TableCell>
                  <TableCell>
                    <button className="BtLotno">
                      {" "}
                      <DeleteOutlined />
                    </button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography >Product :</Typography>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <FormControl fullWidth>
                      <Autocomplete
                      id='selectPd'
                        value={sl_Product}
                        onChange={(e, value) => HandleSL_Product(value)}
                        options={Product.map((item) => item[0])}
                        renderInput={(params) => (
                          <TextField
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
                  <TableCell align="right">
                    <Typography >Check Roll :</Typography>
                  </TableCell>
                  <TableCell
                    colSpan={1}
                   
                  > <div style={
                    lblCheckRoll === "ON"
                    ? { backgroundColor: "#73d13d" }
                    : lblCheckRoll === "OFF"
                    ? { backgroundColor: "#f5222d" }
                    : { backgroundColor: "" }
                }>
 <Typography
                      variant="button"
                      style={{
                        marginLeft: "15px",
                        color: "#FFF",
                        fontSize: "17px",
                      }}
                    >
                      {lblCheckRoll}
                    </Typography>
                  </div>
                   
                  </TableCell>
                  <TableCell colSpan={2}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography >Operator :</Typography>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <TextField
                      id="txtfild"
                      size="small"
                      // label="Operator. :"
                      fullWidth
                      disabled
                    ></TextField>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography>Total Leaf :</Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="txtfild"
                      size="small"
                      style={{ width: "70px" }}
                      value={txtTotalLeaf}
                 
                    ></TextField>
                  </TableCell>
                  <TableCell align="right">
                    <Typography>Total Sht. :</Typography>
                  </TableCell>
                  <TableCell style={{ width: "70px" }}>
                    <TextField
                      id="txtfild"
                      size="small"
                      value={lbltotalSht}
                    ></TextField>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="right">
                    <Typography >Roll/Sht No. :</Typography>
                  </TableCell>
                  <TableCell colSpan={3}>
                    <TextField
                      id="txtfild"
                      size="small"
                      value={txtRollLeaf}
                      onChange={(e) => {
                        settxtRollLeaf(e.target.value);
                        // console.log("txtRollLeaf",e.target.value)
                      }}
                      disabled
                      fullWidth
                    ></TextField>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* {console.log(visblelog,'visblelog')} */}
            {visblelog && (
              <Paper
                elevation={3}
                style={{
                  width: "450px",
                  margin: "auto",
                  height: "40px",
                  textAlign: "center",
                  marginTop:"10px", 
                  backgroundColor: "#f5222d"
                }}

              >
                <Typography variant="h5" style={{ paddingTop: "5px",color:'#fff' }}>
                  {lbllog}
                </Typography>
              </Paper>
            )}
          </td>
          <td>
          <Paper
                elevation={3}
                style={{
                  width: "800px",
                  margin: "auto",
                  height: "70px",
                  textAlign: "center",
                  marginTop:"10px", 
                  backgroundColor: ""
                }}

              >
                <Typography variant="h4" style={{ paddingTop: "15px",color:'#fff' }}>
                  lblResult
                </Typography>
              </Paper>
            <Table className="CSS-GvScanResult" style={{ display: "" }} component={Card}>
              <TableHead >
                <TableRow >
                <TableCell  sx={{ borderRight: '1px solid #d9d9d9' }} width="50px">No.</TableCell>
                <TableCell sx={{ borderRight: '1px solid #d9d9d9' }}  width="200px">Roll/Sheet No.</TableCell>
                <TableCell sx={{ borderRight: '1px solid #d9d9d9' }}  width="200px">Leaf No.</TableCell>
                <TableCell sx={{ borderRight: '1px solid #d9d9d9' }}  width="150px">Scan Result</TableCell>
                <TableCell  width="300px">Remark</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ borderRight: '1px solid #d9d9d9' }}  >xxxx</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #d9d9d9' }}>yyy</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #d9d9d9' }}>sss</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #d9d9d9' }}>zzz</TableCell>
                  <TableCell>qqq</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </td>
        </tr>
      </table>
      {console.log("dataGV", gvScanResult)}
      <Table
        className="CSS-GvSerial"
        style={{ display: "none", borderRadius: "60px" }}
      >
        <TableHead>
          <TableCell>No.</TableCell>
          <TableCell>Leaf No.</TableCell>
          <TableRow></TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>xxxx</TableCell>
            <TableCell>yyy</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} style={{ textAlign: "center" }}>
              <Button>Save</Button> &nbsp;&nbsp;
              <Button>Cancel</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
export default ScanSMTRoollSht;
