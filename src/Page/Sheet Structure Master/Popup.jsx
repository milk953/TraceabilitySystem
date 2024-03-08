import React, { useState, useEffect } from "react";
import "/src/Page/Style.css";
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
            <Grid
              container
              className="gridContainer"
              spacing={0}
            >
              <Grid item xs={2.4}>
                <Typography>
                  SHT Code :
                </Typography>
              </Grid>
              <Grid item xs={3.6}>
                <TextField
                  id="txtSHTCode"
                  variant="outlined"
                  size="small"
                  style={{ width: "71%" }}
                />
              </Grid>
            </Grid>


            <Grid
              container
              className="gridContainer"
              spacing={0}
            >
              <Grid item xs={2.4}>
                <Typography>
                  SHT Name :
                </Typography>
              </Grid>
              <Grid item xs={3.6}>
                <TextField
                  id="txtSHTName"
                  variant="outlined"
                  size="small"
                  style={{ width: "238%" }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              className="gridContainer"
              spacing={0}
            >
              <Grid item xs={2.4}>
                <Typography>
                  Plant Flag :
                </Typography>
              </Grid>
              <Grid item xs={3.6}>
                <Checkbox
                  style={{ padding: "0" }}
                  checked={isPlantChecked}
                  onChange={(e) => setIsPlantChecked(e.target.checked)}
                />
              </Grid>
              <Grid item xs={2.4}>
                <Typography
                  style={{
                    display: isPlantChecked ? 'block' : 'none',
                  }}
                >
                  Plant Code :
                </Typography>
              </Grid>
              <Grid item xs={3.6}>
                <TextField
                  id="txtPlantCode"
                  variant="outlined"
                  size="small"
                  style={{
                    width: "71%",
                    display: isPlantChecked ? 'block' : 'none',
                  }}
                />
              </Grid>
            </Grid>

            {isPlantChecked && (
              <Grid
                container
                className="gridContainer"
                spacing={0}
              >
                <Grid item xs={2.4}>
                  <Typography>
                    Plant Start Digit :
                  </Typography>
                </Grid>
                <Grid item xs={3.6}>
                  <TextField
                    id="txtPStartDigit"
                    variant="outlined"
                    size="small"
                    style={{ width: "71%", }}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Typography>
                    Plant End Digit :
                  </Typography>
                </Grid>
                <Grid item xs={3.6}>
                  <TextField
                    id="txtPEndDigit"
                    variant="outlined"
                    size="small"
                    style={{ width: "71%", }}
                  />
                </Grid>
              </Grid>
            )}

            <Grid
              container
              className="gridContainer"
              spacing={0}
            >
              <Grid item xs={2.4}>
                <Typography>
                  Lot Flag :
                </Typography>
              </Grid>
              <Grid item xs={3.6}>
                <Checkbox
                  style={{ padding: "0" }}
                  checked={isLotChecked}
                  onChange={(e) => setIsLotChecked(e.target.checked)}
                />
              </Grid>
            </Grid>

            {isLotChecked && (
              <Grid
                container
                className="gridContainer"
                spacing={0}
              >
                <Grid item xs={2.4}>
                  <Typography>
                    Lot Start Digit :
                  </Typography>
                </Grid>
                <Grid item xs={3.6}>
                  <TextField
                    id="txtLStartDigit"
                    variant="outlined"
                    size="small"
                    style={{ width: "71%" }}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Typography>
                    Lot End Digit :
                  </Typography>
                </Grid>
                <Grid item xs={3.6}>
                  <TextField
                    id="txtLEndDigit"
                    variant="outlined"
                    size="small"
                    style={{ width: "71%" }}
                  />
                </Grid>
              </Grid>
            )}

            <Grid container
              className="gridContainer"
              spacing={0}
            >
              <Grid item xs={2.4}>
                <Typography>
                  Model Flag :
                </Typography>
              </Grid>
              <Grid item xs={3.6}>
                <Checkbox
                  style={{ padding: "0" }}
                  checked={isModelChecked}
                  onChange={(e) => setIsModelChecked(e.target.checked)}
                />
              </Grid>
            </Grid>

            {isModelChecked && (
              <Grid
                container
                className="gridContainer"
                spacing={0}
              >
                <Grid item xs={2.4}>
                  <Typography>
                    Model Start Digit :
                  </Typography>
                </Grid>
                <Grid item xs={3.6}>
                  <TextField
                    id="txtMStartDigit"
                    variant="outlined"
                    size="small"
                    style={{ width: "71%" }}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Typography>
                    Model End Digit :
                  </Typography>
                </Grid>
                <Grid item xs={3.6}>
                  <TextField
                    id="txtMEndDigit"
                    variant="outlined"
                    size="small"
                    style={{ width: "71%" }}
                  />
                </Grid>
              </Grid>
            )}

            <Grid
              container
              className="gridContainer"
              spacing={0}
            >
              <Grid item xs={2.4}>
                <Typography>
                  Seq Flag :
                </Typography>
              </Grid>
              <Grid item xs={3.6}>
                <Checkbox
                  style={{ padding: "0" }}
                  checked={isSeqChecked}
                  onChange={(e) => setIsSeqChecked(e.target.checked)}
                />
              </Grid>
              <Grid item xs={2.4}>
                <Typography
                  style={{
                    display: isSeqChecked ? 'block' : 'none',
                  }}>
                  Seq Format :
                </Typography>
              </Grid>
              <Grid item xs={3.6}>
                <TextField
                  id="txtSeqFormat"
                  variant="outlined"
                  size="small"
                  style={{
                    width: "71%",
                    display: isSeqChecked ? 'block' : 'none',
                  }}
                />
              </Grid>
            </Grid>

            {isSeqChecked && (
              <Grid
                container
                className="gridContainer"
                spacing={0}
              >
                <Grid item xs={2.4}>
                  <Typography>
                    Seq Start Digit :
                  </Typography>
                </Grid>
                <Grid item xs={3.6}>
                  <TextField
                    id="txtSeqStartDigit"
                    variant="outlined"
                    size="small"
                    style={{ width: "71%" }}
                  />
                </Grid>
                <Grid item xs={2.4}>
                  <Typography>
                    Seq End Digit :
                  </Typography>
                </Grid>
                <Grid item xs={3.6}>
                  <TextField
                    id="txtSeqEndDigit"
                    variant="outlined"
                    size="small"
                    style={{ width: "71%" }}
                  />
                </Grid>
              </Grid>
            )}

            <Grid
              container
              className="gridContainer"
              spacing={0}
            >
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  style={{
                    width: "80%",
                    marginTop: "7%",
                  }}
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  style={{
                    width: "80%",
                    marginTop: "7%",
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