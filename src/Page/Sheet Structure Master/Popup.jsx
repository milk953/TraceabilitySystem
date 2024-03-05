import React, { useState, useEffect } from "react";
import "./master.css";
import {
  Typography,
  FormControl,
  TableRow,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Select,
  MenuItem,
  Grid,
  TextField,
  Button,
  InputLabel,
  Card,
  CardContent,
  Box,
  Checkbox,
} from "@mui/material";

function Popup({ isOpen, onClose }) {

  if (!isOpen) {
    return null;
  }

  const [isPlantChecked, setIsPlantChecked] = useState(false);
  const [isLotChecked, setIsLotChecked] = useState(false);
  const [isModelChecked, setIsModelChecked] = useState(false);
  const [isSeqChecked, setIsSeqChecked] = useState(false);


  return (
    <div className="popup">
      <div className="popupcontect">
        <Card className="StructurePopup">
          <CardContent>
            <Typography className="HeadPopup"
              sx={{ fontSize: 20 }}>
              Sheet Structure Master
            </Typography>
          </CardContent>
          <Box sx={{ flexGrow: 1, marginBottom: "10px" }}>
            <Grid style={{
              width: "100%",
              textAlign: "left",
              marginLeft: 30,
            }}>
              <Grid container className="gridContainer">
                <Typography>
                  SHT Code :
                </Typography>
                <TextField
                  id="txtSHTCode"
                  variant="outlined"
                  size="small"
                  style={{ width: "150px", marginLeft: "55px" }}
                />
              </Grid>

              <Grid container className="gridContainer">
                <Typography>
                  SHT Name :
                </Typography>
                <TextField
                  id="txtSHTName"
                  variant="outlined"
                  size="small"
                  style={{ width: "490px", marginLeft: "51px" }}
                />
              </Grid>
              <Grid container className="gridContainer">
                <Typography>
                  Plant Flag :
                </Typography>
                <Checkbox
                  style={{ marginLeft: "46px" }}
                  checked={isPlantChecked}
                  onChange={(e) => setIsPlantChecked(e.target.checked)}
                />
                <Typography
                  style={{
                    marginLeft: isPlantChecked ? "209px" : "0",
                    display: isPlantChecked ? 'block' : 'none',
                  }}
                >
                  Plant Code :
                </Typography>
                <TextField
                  id="txtPlantCode"
                  variant="outlined"
                  size="small"
                  style={{
                    width: "150px",
                    marginLeft: "10px",
                    display: isPlantChecked ? 'block' : 'none',
                  }}
                />
              </Grid>

              {isPlantChecked && (
                <Grid container className="gridContainer">
                  <Typography>
                    Plant Start Digit :
                  </Typography>
                  <TextField
                    id="txtPStartDigit"
                    variant="outlined"
                    size="small"
                    style={{ width: "150px", marginLeft: "17px" }}
                  />
                  <Typography style={{ marginLeft: "62px" }}>
                    Plant End Digit :
                  </Typography>
                  <TextField
                    id="txtPEndDigit"
                    variant="outlined"
                    size="small"
                    style={{ width: "150px", marginLeft: "10px" }}
                  />
                </Grid>
              )}

              <Grid container className="gridContainer">
                <Typography>
                  Lot Flag :
                </Typography>
                <Checkbox 
                style={{ marginLeft: "60px" }}y
                checked={isLotChecked}
                onChange={(e) => setIsLotChecked(e.target.checked)}
                 />
              </Grid>

              {isLotChecked && (
              <Grid container className="gridContainer">
                <Typography>
                  Lot Start Digit :
                </Typography>
                <TextField
                  id="txtLStartDigit"
                  variant="outlined"
                  size="small"
                  style={{ width: "150px", marginLeft: "31px" }}
                />
                <Typography style={{ marginLeft: "77px" }}>
                  Lot End Digit :
                </Typography>
                <TextField
                  id="txtLEndDigit"
                  variant="outlined"
                  size="small"
                  style={{ width: "150px", marginLeft: "10px" }}
                />
              </Grid>
              )}
              
              <Grid container className="gridContainer">
                <Typography>
                  Model Flag :
                </Typography>
                <Checkbox 
                style={{ marginLeft: "38px" }}
                checked={isModelChecked}
                onChange={(e) => setIsModelChecked(e.target.checked)} 
                />
              </Grid>
              
              {isModelChecked && (
              <Grid container className="gridContainer">
                <Typography>
                  Model Start Digit :
                </Typography>
                <TextField
                  id="txtMStartDigit"
                  variant="outlined"
                  size="small"
                  style={{ width: "150px", marginLeft: "10px" }}
                />
                <Typography style={{ marginLeft: "56px" }}>
                  Model End Digit :
                </Typography>
                <TextField
                  id="txtMEndDigit"
                  variant="outlined"
                  size="small"
                  style={{ width: "150px", marginLeft: "10px" }}
                />
              </Grid>
              )}

              <Grid container className="gridContainer">
                <Typography>
                  Seq Flag :
                </Typography>
                <Checkbox 
                style={{ marginLeft: "54px" }}
                checked={isSeqChecked}
                onChange={(e) => setIsSeqChecked(e.target.checked)} 
                />
                <Typography 
                style={{ 
                  marginLeft: isSeqChecked ? "205px" : "0",
                  display: isSeqChecked ? 'block' : 'none',
                }}>
                  Seq Format :
                </Typography>
                <TextField
                  id="txtSeqFormat"
                  variant="outlined"
                  size="small"
                  style={{ 
                    width: "150px", 
                    marginLeft: isSeqChecked ? "10px" : "0",
                    display: isSeqChecked ? 'block' : 'none', 
                  }}
                />
              </Grid>

              {isSeqChecked && (
              <Grid container className="gridContainer">
                <Typography>
                  Seq Start Digit :
                </Typography>
                <TextField
                  id="txtSeqStartDigit"
                  variant="outlined"
                  size="small"
                  style={{ width: "150px", marginLeft: "25px" }}
                />
                <Typography style={{ marginLeft: "71px" }}>
                  Seq End Digit :
                </Typography>
                <TextField
                  id="txtSeqEndDigit"
                  variant="outlined"
                  size="small"
                  style={{ width: "150px", marginLeft: "10px" }}
                />
              </Grid>
              )}

              <Grid>
                <Button
                  variant="contained"
                  style={{
                    width: "100px",
                    marginTop: "10px",
                  }}
                >
                  Save
                </Button>&nbsp;&nbsp;
                <Button
                  variant="contained"
                  style={{
                    width: "100px",
                    marginTop: "10px",
                  }}
                  color="error"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </div>
    </div>
  )
}

export default Popup