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

function SerialPopup({ isOpen, onClose }) {
    if (!isOpen) {
        return null;
    }

    const [isPlantChecked, setIsPlantChecked] = useState(false);
    const [isWeekChecked, setIsWeekChecked] = useState(false);
    const [isWeekConChecked, setIsWeekConChecked] = useState(false);
    const [isSeqChecked, setIsSeqChecked] = useState(false);
    const [isSeqConChecked, setIsSeqConChecked] = useState(false);
    const [isEngChecked, setIsEngChecked] = useState(false);
    const [isRevChecked, setIsRevChecked] = useState(false);
    const [isCheckSum, setIsCheckSum] = useState(false);
    const [isConfig, setIsConfig] = useState(false);



    return (
        <div className="popup">
            <div className="popupcontect"
                style={{ overflowY: 'auto', maxHeight: '80vh' }}>
                <Card className="StructurePopup">
                    <CardContent>
                        <Typography className="HeadPopup"
                            sx={{ fontSize: 20 }}>
                            Serial Structure Master
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
                                    Code :
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
                                    Name :
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
                                    Up Count :
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
                                    Length :
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
                                    Week Flag :
                                </Typography>
                            </Grid>
                            <Grid item xs={3.6}>
                                <Checkbox
                                    style={{ padding: "0" }}
                                    checked={isWeekChecked}
                                    onChange={(e) => setIsWeekChecked(e.target.checked)}
                                />
                            </Grid>

                            <Grid item xs={2.4}>
                                <Typography
                                    style={{
                                        display: isWeekChecked ? 'block' : 'none',
                                    }}
                                >
                                    Week Code :
                                </Typography>
                            </Grid>
                            <Grid item xs={3.6}>
                                <TextField
                                    id="txtPlantCode"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        width: "71%",
                                        display: isWeekChecked ? 'block' : 'none',
                                    }}
                                />
                            </Grid>
                        </Grid>

                        {isWeekChecked && (
                            <Grid
                                container
                                className="gridContainer"
                                spacing={0}
                            >
                                <Grid item xs={2.4}>
                                    <Typography>
                                        Week Start Digit :
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
                                        Week End Digit :
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

                        <Grid
                            container
                            className="gridContainer"
                            spacing={0}
                        >
                            <Grid item xs={2.4}>
                                <Typography>
                                    Week Convert :
                                </Typography>
                            </Grid>
                            <Grid item xs={3.6}>
                                <Checkbox
                                    style={{ padding: "0" }}
                                    checked={isWeekConChecked}
                                    onChange={(e) => setIsWeekConChecked(e.target.checked)}
                                />
                            </Grid>

                            <Grid item xs={2.4}>
                                <Typography
                                    style={{
                                        display: isWeekConChecked ? 'block' : 'none',
                                    }}
                                >
                                    Week Convert Base :
                                </Typography>
                            </Grid>
                            <Grid item xs={3.6}>
                                <Select
                                    id="cbWeekCon"
                                    size="small"
                                    style={{
                                        width: "71%",
                                        display: isWeekConChecked ? 'block' : 'none',
                                    }}
                                // onChange={handleChange}
                                >
                                </Select>
                            </Grid>
                        </Grid>

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
                                    }}
                                >
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
                            <Grid item xs={2.4}>
                                <Typography>
                                    Seq Convert :
                                </Typography>
                            </Grid>
                            <Grid item xs={3.6}>
                                <Checkbox
                                    style={{ padding: "0" }}
                                    checked={isSeqConChecked}
                                    onChange={(e) => setIsSeqConChecked(e.target.checked)}
                                />
                            </Grid>

                            <Grid item xs={2.4}>
                                <Typography
                                    style={{
                                        display: isSeqConChecked ? 'block' : 'none',
                                    }}
                                >
                                    Seq Convert Base :
                                </Typography>
                            </Grid>
                            <Grid item xs={3.6}>
                                <Select
                                    id="cbSeqCon"
                                    size="small"
                                    style={{
                                        width: "71%",
                                        display: isSeqConChecked ? 'block' : 'none',
                                    }}
                                // onChange={handleChange}
                                >
                                </Select>
                            </Grid>
                        </Grid>

                        <Grid container
                            className="gridContainer"
                            spacing={0}
                        >
                            <Grid item xs={2.4}>
                                <Typography>
                                    Eng Flag :
                                </Typography>
                            </Grid>
                            <Grid item xs={3.6}>
                                <Checkbox
                                    style={{ padding: "0" }}
                                    checked={isEngChecked}
                                    onChange={(e) => setIsEngChecked(e.target.checked)}
                                />
                            </Grid>
                        </Grid>

                        {isEngChecked && (
                            <Grid
                                container
                                className="gridContainer"
                                spacing={0}
                            >
                                <Grid item xs={2.4}>
                                    <Typography>
                                        Eng Start Digit :
                                    </Typography>
                                </Grid>
                                <Grid item xs={3.6}>
                                    <TextField
                                        id="txtEngStartDigit"
                                        variant="outlined"
                                        size="small"
                                        style={{ width: "71%" }}
                                    />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Typography>
                                        Eng End Digit :
                                    </Typography>
                                </Grid>
                                <Grid item xs={3.6}>
                                    <TextField
                                        id="txtEngEndDigit"
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
                                    Rev Flag :
                                </Typography>
                            </Grid>
                            <Grid item xs={3.6}>
                                <Checkbox
                                    style={{ padding: "0" }}
                                    checked={isRevChecked}
                                    onChange={(e) => setIsRevChecked(e.target.checked)}
                                />
                            </Grid>
                        </Grid>

                        {isRevChecked && (
                            <Grid
                                container
                                className="gridContainer"
                                spacing={0}
                            >
                                <Grid item xs={2.4}>
                                    <Typography>
                                        Rev Start Digit :
                                    </Typography>
                                </Grid>
                                <Grid item xs={3.6}>
                                    <TextField
                                        id="txtRevStartDigit"
                                        variant="outlined"
                                        size="small"
                                        style={{ width: "71%" }}
                                    />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Typography>
                                        Rev End Digit :
                                    </Typography>
                                </Grid>
                                <Grid item xs={3.6}>
                                    <TextField
                                        id="txtRevEndDigit"
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
                                    Check Sum Flag :
                                </Typography>
                            </Grid>
                            <Grid item xs={3.6}>
                                <Checkbox
                                    style={{ padding: "0" }}
                                    checked={isCheckSum}
                                    onChange={(e) => setIsCheckSum(e.target.checked)}
                                />
                            </Grid>
                        </Grid>

                        {isCheckSum && (
                            <Grid
                                container
                                className="gridContainer"
                                spacing={0}
                            >
                                <Grid item xs={2.4}>
                                    <Typography>
                                        Check Sum Digit :
                                    </Typography>
                                </Grid>
                                <Grid item xs={3.6}>
                                    <TextField
                                        id="txtCheckSumDigit"
                                        variant="outlined"
                                        size="small"
                                        style={{ width: "71%" }}
                                    />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Typography>
                                        Check Sum Digit :
                                    </Typography>
                                </Grid>
                                <Grid item xs={3.6}>
                                    <TextField
                                        id="txtCheckSumDigit"
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
                                    Config Flag :
                                </Typography>
                            </Grid>
                            <Grid item xs={3.6}>
                                <Checkbox
                                    style={{ padding: "0" }}
                                    checked={isConfig}
                                    onChange={(e) => setIsConfig(e.target.checked)}
                                />
                            </Grid>
                        </Grid>

                        {isConfig && (
                            <Grid
                                container
                                className="gridContainer"
                                spacing={0}
                            >
                                <Grid item xs={2.4}>
                                    <Typography>
                                        Config Start Digit :
                                    </Typography>
                                </Grid>
                                <Grid item xs={3.6}>
                                    <TextField
                                        id="txtConfigStDigit"
                                        variant="outlined"
                                        size="small"
                                        style={{ width: "71%" }}
                                    />
                                </Grid>
                                <Grid item xs={2.4}>
                                    <Typography>
                                        Config End Digit :
                                    </Typography>
                                </Grid>
                                <Grid item xs={3.6}>
                                    <TextField
                                        id="txtConfigEndDigit"
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
        </div >
    )
};

export default SerialPopup;