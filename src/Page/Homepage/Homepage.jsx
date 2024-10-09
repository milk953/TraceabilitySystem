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
  InputLabel,
  Autocomplete,
  InputAdornment,
  Grid,
} from "@mui/material";

import {
  ArrowRightOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
  HighlightOutlined,
  AreaChartOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import Homeimg from "/src/assets/2.png";
import SearchIcon from "@mui/icons-material/Search";
import "/src/Page/Homepage/Homepage.css";
import { Input, Space } from "antd";
const { Search } = Input;
import Hearder from "../Header/Header";
import { fn_Homepage } from "./fn_Homepage";
function ScanSheetMOTTime() {
  const { Showmenu, menu, OpenMenu, setSL_menu, SL_menu, HandleSL_Menu } =
    fn_Homepage();
  return (
    <div>
      <Hearder />
      <Card
        component={Paper}
      className="Card-Common"
      >
        <div style={{}}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography
                variant="h4"
                component="h1"
                sx={{ fontWeight: "bold", color: "#3D3B40" }}
              >
                Traceability System
              </Typography>
            </Grid>
            <Grid item>
              <FormControl style={{ width: 400 }} fullWidth>
                <Autocomplete
                  id="selectPd"
                  value={SL_menu.url}
                  onChange={(e, value) => HandleSL_Menu(value.url)}
                  options={menu.map((item) => ({
                    name: item.menu_name,
                    url: item.url,
                  }))}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      sx={{ textAlign: "left" }}
                      placeholder="Search Menu.."
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <table style={{ marginTop: "25px", maxWidth: "1400px", width: "100%" }}>
          <tbody>
            <tr>
              <td
                style={{
                  width: "660px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className="Head-Menu1" onClick={() => OpenMenu("W")}>
                  <Typography
                    variant="h5"
                    style={{ margin: "auto", marginTop: "70px" }}
                  >
                    <HighlightOutlined /> <br></br> Work
                  </Typography>
                  <br></br>
                  <div className="count-Menu1">
                    {menu && menu[0] && menu[0].count_work ? (
                      <span>{menu[0].count_work}</span>
                    ) : (
                      <span>0</span>
                    )}
                  </div>
                </div>
                <div className="Head-Menu2" onClick={() => OpenMenu("M")}>
                  <Typography
                    variant="h5"
                    style={{ margin: "auto", marginTop: "70px" }}
                  >
                    <ScheduleOutlined /> <br></br> Maintain
                  </Typography>
                  <br></br>
                  <div className="count-Menu2">
                    {menu && menu[0] && menu[0].count_maintain ? (
                      <span>{menu[0].count_maintain}</span>
                    ) : (
                      <span>0</span>
                    )}
                  </div>
                </div>

                <div className="Head-Menu3" onClick={() => OpenMenu("V")}>
                  <Typography
                    variant="h5"
                    style={{ margin: "auto", marginTop: "70px" }}
                  >
                    <AreaChartOutlined /> <br></br> View Data
                  </Typography>
                  <br></br>
                  <div className="count-Menu3">
                    {menu && menu[0] && menu[0].count_viewdata ? (
                      <span>{menu[0].count_viewdata}</span>
                    ) : (
                      <span>0</span>
                    )}
                  </div>
                </div>
              </td>
              <td
                style={{
                  width: "700px",
                  textAlign: "center",
                  //   border:'1px solid red',
                  verticalAlign: "top",
                }}
              >
                {Showmenu === "img" && (
                  <img
                    style={{
                      width: "400px",
                      height: "400px",
                    }}
                    src={Homeimg} // Import the image
                    alt="Description of the image"
                  />
                )}
                {Showmenu === "Work" && (
                  <Table
                    style={{
                      width: "300px",
                      margin: "auto",
                      height: "100%",
                      maxHeight: "300px",
                    }}
                    component={Card}
                  >
                    <TableHead>
                      <TableRow style={{ background: "#739072" }}>
                        <TableCell
                          align="center"
                          style={{ padding: "4px 8px" }}
                        >
                          {" "}
                          {/* Adjust padding here */}
                          <Typography variant="body2">Work</Typography>{" "}
                          {/* Adjust typography size if needed */}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow align="center">
                        {menu
                          .filter(
                            (item, index) => menu[index].parent_id === "0928"
                          )
                          .map((item, index) => (
                            <div
                              key={index}
                              style={{
                                background: "#d9d9d9",
                                width: "300px",
                                margin: "5px",
                                padding: "5px",
                                borderRadius: "5px",
                                textAlign: "center",
                                transition: "background 0.3s ease",
                              }}
                              className="hoverable"
                              onClick={() => HandleSL_Menu(item.url)}
                            >
                              {item.menu_name}
                            </div>
                          ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                )}
                {Showmenu === "Maintain" && (
                  <TableContainer
                    sx={{
                      maxHeight: "300px",
                      width: "350px",
                      margin: "auto",
                      overflowY: "auto",
                    }}
                  >
                    <Table component={Card}>
                      <TableHead>
                        <TableRow style={{ background: "#CD8D7A" }}>
                          <TableCell
                            align="center"
                            style={{ padding: "4px 8px" }}
                          >
                            {" "}
                            {/* Adjust padding here */}
                            <Typography variant="body2">
                              Maintain
                            </Typography>{" "}
                            {/* Adjust typography size if needed */}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow align="center">
                          {menu
                            .filter(
                              (item, index) => menu[index].parent_id === "0929"
                            )
                            .map((item, index) => (
                              <div
                                key={index}
                                style={{
                                  background: "#d9d9d9",
                                  width: "300px",
                                  margin: "5px",
                                  padding: "5px",
                                  borderRadius: "5px",
                                  textAlign: "center",
                                  transition: "background 0.3s ease",
                                }}
                                className="hoverable"
                                onClick={() => HandleSL_Menu(item.url)}
                              >
                                {item.menu_name}
                              </div>
                            ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                {Showmenu === "View" && (
                  <Table
                    style={{
                      width: "300px",
                      margin: "auto",
                      height: "100%",
                      maxHeight: "300px",
                    }}
                    component={Card}
                  >
                    <TableHead>
                      <TableRow style={{ background: "#f4a86f" }}>
                        <TableCell
                          align="center"
                          style={{ padding: "4px 8px" }}
                        >
                          {" "}
                          {/* Adjust padding here */}
                          <Typography variant="body2">
                            View Data
                          </Typography>{" "}
                          {/* Adjust typography size if needed */}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow align="center">
                        {menu
                          .filter(
                            (item, index) => menu[index].parent_id === "0930"
                          )
                          .map((item, index) => (
                            <div
                              key={index}
                              style={{
                                background: "#d9d9d9",
                                width: "300px",
                                margin: "5px",
                                padding: "5px",
                                borderRadius: "5px",
                                textAlign: "center",
                                transition: "background 0.3s ease",
                              }}
                              className="hoverable"
                              onClick={() => HandleSL_Menu(item.url)}
                            >
                              {item.menu_name}
                            </div>
                          ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default ScanSheetMOTTime;
