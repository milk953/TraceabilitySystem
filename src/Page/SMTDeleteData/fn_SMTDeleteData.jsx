import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import { Checkbox } from "antd";
//import swal from "sweetalert";

function fn_SMTDeleteData() {
  const [pnlForm, setpnlForm] = useState(false);
  const [lblResult, setlblResult] = useState("");
  const [lblResultcolor, setlblResultcolor] = useState("#059212");
  const [txtSheetNo, settxtSheetNo] = useState("");
  const [txtRollLeaf, settxtRollLeaf] = useState("");
  const [ddlELTType, setddlELTType] = useState("");
  const [ELTTypedata, setELTTypedata] = useState([]);
  const [txtSerialNo, settxtSerialNo] = useState("");
  const [txtFinalSerialNo, settxtFinalSerialNo] = useState("");

  //Table
  const [gvConShtPcs, setgvConShtPcs] = useState(false);
  const [gvConShtPcsData, setgvConShtPcsData] = useState([]);
  const [gvConRollLeaf, setgvConRollLeaf] = useState(false);
  const [gvConRollLeafData, setgvConRollLeafData] = useState([]);
  const [gvELTResult, setgvELTResult] = useState(false);
  const [gvELTData, setgvELTData] = useState([]);
  const [gvFinalResult, setgvFinalResult] = useState(false);
  const [gvFinalData, setgvFinalData] = useState([]);

  //hiddenfield
  const [hfUserName, sethfUserName] = useState("");

  //inputRef
  const inputShtNo = useRef([]);
  const inputELTSerial = useRef([]);
  const inputFinalSerial = useRef([]);

  const plantCode = import.meta.env.VITE_FAC;

  useEffect(() => {
    PageLoad();
  }, []);

  const PageLoad = async () => {
    inputShtNo.current.focus();
    sethfUserName("");
    setpnlForm(false);
    await fn_GetELTType();
  };

  const fn_GetELTType = async () => {
    await axios.get("/api/ELTtype/gettype")
      .then((res) => {
        setELTTypedata(res.data);
        setddlELTType(res.data[0].elt_type);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const btnSearchShtnoClick = async () => {
    fn_GetSheetNo();
  };

  const fn_GetSheetNo = async () => {
    if (txtSheetNo !== "") {
      await axios.post("/api/SMTDeleteData/getSheetno", {
        plant_code: plantCode,
        sheet_no: txtSheetNo
      })
        .then((res) => {
          let dtSheetNo = res.data;
          const isDuplicate = gvConShtPcsData.some((item) => item.front_sheet_no === txtSheetNo);
          if (!isDuplicate) {
            if (dtSheetNo.length > 0) {
              setgvConShtPcsData((prevData) => [...prevData, ...dtSheetNo]);
              setgvConShtPcs(true);
              settxtSheetNo("");
            } else {
              setgvConShtPcs(false);
              Swal.fire("Error", "Not found data", "error");
            }
          } else {
            Swal.fire({
              icon: "error",
              text: "Dupplicate Sheet No.",
            });
          }
        });

    } else {
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          text: "Please input Sheet No.",
          timer: 3000,
          //showConfirmButton: false,
        });
      }, 500);
      inputShtNo.current.focus();
    }
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columnsconshtpcs = [
    {
      title: "COUNT",
      dataIndex: "count",
      key: "Count",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "LOT_NO",
      dataIndex: "lot_no",
      key: "LOT_NO",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "PRODUCT_NAME",
      dataIndex: "product_name",
      key: "PRODUCT_NAME",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "FRONT_SHEET_NO",
      dataIndex: "front_sheet_no",
      key: "FRONT_SHEET_NO",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "BACK_SHEET_NO",
      dataIndex: "back_sheet_no",
      key: "BACK_SHEET_NO",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
  ];

  const btnShtDeleteClick = async () => {
    if (selectedRowKeys.length === 0) {
      Swal.fire('Warning', 'Please select row before deleting.', 'warning');
      return;
    }
    const result = await Swal.fire({
      title: 'Are you confirm delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      icon: 'warning',
    });

    if (result.isConfirmed) {
      Delete_Data("SHEET");
      settxtSheetNo("");
      document.getElementById("rollleaf").focus();
    }

  };

  const btnShtCancelClick = async () => {
    setgvConShtPcsData([]);
    setgvConShtPcs(false);
    inputShtNo.current.focus();
  };

  const btnSearchRollleafClick = async () => {
    if (txtRollLeaf !== "") {
      await axios.post("/api/SMTDeleteData/getRollLeaf", {
        strplantcode: plantCode,
        strrollleaf: txtRollLeaf
      })
        .then((res) => {
          let dtRollLeaf = res.data;
          const isDuplicate = gvConRollLeafData.some((item) => item.roll_leaf === txtRollLeaf);
          if (!isDuplicate) {
            if (dtRollLeaf.length > 0) {
              setgvConRollLeafData((prevData) => [...prevData, ...dtRollLeaf]);
              setgvConRollLeaf(true);
              settxtRollLeaf("");
              document.getElementById("rollleaf").focus();
            } else {
              setgvConRollLeaf(false);
              Swal.fire("Error", "Not found data", "error");
            }
          } else {
            Swal.fire({
              icon: "error",
              text: "Dupplicate Roll Leaf No.",
            });
          }
        });

    } else {
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          text: "Please input Roll Leaf No.",
          timer: 3000,
          //showConfirmButton: false,
        });
      }, 500);
      document.getElementById("rollleaf").focus();
    }
  };

  const [selectRowrollleaf, setselectRowrollleaf] = useState([]);

  const SelectChange = (newselectRowrollleaf) => {
    console.log('selectedRowKeys changed: ', newselectRowrollleaf);
    setselectRowrollleaf(newselectRowrollleaf);
  };

  const rowSelect = {
    selectRowrollleaf,
    onChange: SelectChange,
  };

  const columnsconrollleaf = [
    {
      title: "COUNT",
      dataIndex: "count",
      key: "Count",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "LOT_NO",
      dataIndex: "lot_no",
      key: "LOT_NO",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "PRODUCT_NAME",
      dataIndex: "product_name",
      key: "PRODUCT_NAME",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "ROll_NO",
      dataIndex: "roll_no",
      key: "ROll_NO",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "ROLL_LEAF",
      dataIndex: "roll_leaf",
      key: "ROLL_LEAF",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
  ];

  const btnRollDeleteClick = async () => {
    if (selectRowrollleaf.length === 0) {
      Swal.fire('Warning', 'Please select row before deleting.', 'warning');
      return;
    }
    const result = await Swal.fire({
      title: 'Are you confirm delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      icon: 'warning',
    });

    if (result.isConfirmed) {
      if (gvConRollLeafData.length > 0) {
        Delete_Data("ROLL");
      } else {
        Swal.fire('Error', 'Failed to delete data', 'error');
      }
    }
  };

  const btnRollCancelClick = async () => {
    setgvConRollLeafData([]);
    setgvConRollLeaf(false);
    document.getElementById("rollleaf").focus();
  };

  const Delete_Data = async (strType) => {

    try {

      const parsedRows = selectedRowKeys.map((rowKey) => JSON.parse(rowKey));
      console.log(parsedRows)

      if (strType === "SHEET") {
        const deletionPromises = parsedRows.map((record) =>
          axios.post("/api/SMTDeleteData/DeleteDataSheet", {
            strplantcode: plantCode,
            strlotno: record.lot_no,
            strsheetnof: record.front_sheet_no,
            strsheetnob: record.back_sheet_no,
            strproduct: record.product_name
          }).then((res) => {
            let dtdelsht = res.data;
            if (dtdelsht === "") {
              Swal.fire('Success', 'You delete data success', 'success');

              setgvConShtPcsData((prevData) =>
                prevData.filter(
                  (item) =>
                    item.lot_no !== record.lot_no ||
                    item.product_name !== record.product_name ||
                    item.front_sheet_no !== record.front_sheet_no ||
                    item.back_sheet_no !== record.back_sheet_no
                )
              );
            }
          }).catch((error) => {
            console.error("Error deleting row", error);
            Swal.fire('Error', 'Failed to delete data', 'error');
          })
        );

        try {
          await Promise.all(deletionPromises);
          console.log('All deletions are complete');
        } catch (error) {
          console.error("Error during deletion process", error);
          Swal.fire('Error', 'One or more deletions failed', 'error');
        }
      } else {

        const parsedRow = selectRowrollleaf.map((rowKey) => JSON.parse(rowKey));
        console.log(parsedRow)

        const deleteRes = parsedRow.map((record) =>
          axios.post("/api/SMTDeleteData/DeleteDataRollleaf", {
            strplantcode: plantCode,
            strlotno: record.lot_no,
            strproduct: record.product_name,
            strrollno: record.roll_no,
            strrollleaf: record.roll_leaf
          })
            .then((res) => {
              let dtdelrollleaf = res.data;
              if (dtdelrollleaf === "") {
                Swal.fire('Success', 'You delete data success', 'success');
                //setlblResult(`RollLeaf No. ${txtSheetNo} Delete Complete.`);
                //setpnlForm(true);
                settxtRollLeaf("");
                setgvConRollLeafData((prevData) =>
                  prevData.filter(
                    (item) =>
                      item.lot_no !== record.lot_no ||
                      item.product_name !== record.product_name ||
                      item.roll_no !== record.roll_no ||
                      item.roll_leaf !== record.roll_leaf
                  )
                );
              }
            }).catch((error) => {
              console.error("Error deleting row", error);
              Swal.fire('Error', 'Failed to delete data', 'error');
            })
        )
        try {
          await Promise.all(deleteRes);
          console.log('All deletions are complete');
        } catch (error) {
          console.error("Error during deletion process", error);
          Swal.fire('Error', error.message, 'error');
        }
        //setlblResultcolor("#059212");
      }
    } catch (error) {
      // setpnlForm(true);
      // setlblResultcolor("#BA0900");
      // setlblResult(error.message);
      Swal.fire('Error', error.message, 'error');
    }
  };

  const handleELTType = async (value) => {
    setddlELTType(value);
  };

  const btnSerialSearchClick = async () => {
    //const isDuplicate = gvELTData.some((item) => item.SERIAL_NO === txtSerialNo);
    if (txtSerialNo !== "") {
      let intRow = 0;
      let dtData = [];
      let dt = []

      await axios.post("/api/SMTDeleteData/getELTResult", {
        strserialno: txtSerialNo.trim().toUpperCase(),
        strplantcode: plantCode,
        strelttype: ddlELTType
      })
        .then((res) => {
          dt = res.data;
        });

      for (let i = 0; i < dt.length; i++) {
        let row = dt[i];
        console.log("dt", row)
        intRow++;

        dtData.push({
          SEQ: intRow,
          ELT_TYPE: row.elt_type,
          SERIAL_NO: row.serial_no,
          TABLE_NAME: row.table_name,
          ELT_RESULT: row.elt_result,
          ELT_DATE: row.elt_date
        });
        console.log(dtData)
      }

      if (dtData.length > 0) {
        setgvELTResult(true);
      } else {
        setgvELTResult(false);
        Swal.fire({
          icon: "error",
          text: "Not found data",
        }).then(() => {
          setTimeout(() => {
            inputELTSerial.current.focus();
          }, 300);
        });
      }
      setgvELTData(dtData);
      console.log("gvELTData", dtData)

    } else {
      Swal.fire({
        icon: "error",
        text: "Please input ELT Serial No.",
      }).then(() => {
        setTimeout(() => {
          inputELTSerial.current.focus();
        }, 300);
      });
    }

    // if (!isDuplicate) {
    //   if (gvELTData.length > 0) {
    //     setgvELTResult(true);
    //   } 
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     text: "Dupplicate Serial No.",
    //   });
    // } 
  };



  const FNGetELTResult = async () => {
    let intRow = 0;
    let dtData = [];
    let dt = []

    await axios.post("/api/SMTDeleteData/getELTResult", {
      strserialno: txtSerialNo.trim().toUpperCase(),
      strplantcode: plantCode,
      strelttype: ddlELTType
    })
      .then((res) => {
        dt = res.data;
      });

    for (let i = 0; i < dt.length; i++) {
      let row = dt[i];
      console.log("dt", row)
      intRow++;

      dtData.push({
        SEQ: intRow,
        ELT_TYPE: row.elt_type,
        SERIAL_NO: row.serial_no,
        TABLE_NAME: row.table_name,
        ELT_RESULT: row.elt_result,
        ELT_DATE: row.elt_date
      });
      console.log(dtData)
    }

    // if (dtData.length > 0) {
    //   setgvELTResult(true);
    // } else {
    //   setgvELTResult(false);
    //   Swal.fire("Error", "Not found data", "error");
    // }
    setgvELTData(dtData);
    console.log("gvELTData", dtData)
  };

  const [selectedRows, setSelectedRows] = useState([]);

  const eltSelectChange = (newSelectedRows) => {
    console.log('selectedRows changed: ', newSelectedRows);
    setSelectedRows(newSelectedRows);
  };

  const rowSelectelt = {
    selectedRows,
    onChange: eltSelectChange,
  };

  const columnseltresult = [
    {
      title: "No.",
      dataIndex: "SEQ",
      key: "No.",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Type",
      dataIndex: "ELT_TYPE",
      key: "Type",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Serial No.",
      dataIndex: "SERIAL_NO",
      key: "Serial No.",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Result",
      dataIndex: "ELT_RESULT",
      key: "Result",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
  ];

  const btnELTDeleteClick = async () => {

    if (selectedRows.length === 0) {
      Swal.fire('Warning', 'Please select row before deleting.', 'warning');
      return;
    }
    const result = await Swal.fire({
      title: 'Are you confirm delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      icon: 'warning',
    });

    if (result.isConfirmed) {
      let dtDelELT = "";
      const parsedRows = selectedRows.map((rowKey) => JSON.parse(rowKey));
      console.log(parsedRows)
      const deletionPromises = parsedRows.map((record) =>
        axios.post("/api/SMTDeleteData/DeleteELT", {
          strplantcode: plantCode,
          strelttype: record.ELT_TYPE,
          strserial: record.SERIAL_NO,
          strtablename: record.TABLE_NAME
        })
          .then((res) => {
            dtDelELT = res.data.p_error;
            if (dtDelELT === "") {
              Swal.fire('Success', 'You delete data success', 'success');
              //setlblResult(`ELT Result Delete Complete.`);
            }
          })
          .catch((error) => {
            Swal.fire("Error", error.res.data.p_error, "error");
          })
      )
      try {
        await Promise.all(deletionPromises);
        console.log('All deletions are complete');
      } catch (error) {
        Swal.fire('Error', error.message, 'error');
      }
      FNGetELTResult();
    } else {
      console.log('Form not Delete');
    }
  };

  const btnClearELTClick = () => {
    settxtSerialNo("");
    setgvELTResult(false);
    setgvELTData([]);
    setTimeout(() => {
      inputELTSerial.current.focus();
    }, 300);
  };

  const btnFinalSerialSearchClick = async () => {
    if (txtFinalSerialNo !== "") {
      let intRow = 0;
      let dtData = [];

      await axios.post("/api/SMTDeleteData/getFinalGateResult", {
        strplantcode: plantCode,
        strfinalserialno: txtFinalSerialNo.toUpperCase()
      })
        .then((res) => {
          let dt = res.data;
          for (let i = 0; i < dt.length; i++) {
            let row = dt[i];
            intRow++;

            dtData.push({
              SEQ: intRow,
              SERIAL_NO: row.serial_no,
              FINAL_RESULT: row.final_result,
              FINAL_DATE: row.final_date,
            });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });

      if (dtData.length > 0) {
        setgvFinalResult(true);
      } else {
        setgvFinalResult(false);
        Swal.fire({
          icon: "error",
          text: "Not found data",
        }).then(() => {
          setTimeout(() => {
            inputFinalSerial.current.focus();
          }, 300);
        });
      }
      setgvFinalData(dtData);
      console.log("gvFinalData", dtData)
    } else {
      Swal.fire({
        icon: "error",
        text: "Please input Final Serial No.",
      }).then(() => {
        setTimeout(() => {
          inputFinalSerial.current.focus();
        }, 300);
      });
    }
  };

  const btnClearFinalClick = () => {
    settxtFinalSerialNo("");
    setgvFinalResult(false);
    setgvFinalData([]);
    setTimeout(() => {
      inputFinalSerial.current.focus();
    }, 300);
  };

  const FNGetFinalGateResult = async () => {
    let intRow = 0;
    let dtData = [];

    await axios.post("/api/SMTDeleteData/getFinalGateResult", {
      strplantcode: plantCode,
      strfinalserialno: txtFinalSerialNo.toUpperCase()
    })
      .then((res) => {
        let dt = res.data;
        for (let i = 0; i < dt.length; i++) {
          let row = dt[i];
          intRow++;

          dtData.push({
            SEQ: intRow,
            SERIAL_NO: row.serial_no,
            FINAL_RESULT: row.final_result,
            FINAL_DATE: row.final_date,
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    // if (dtData.length > 0) {
    //   setgvFinalResult(true);
    // } else {
    //   setgvFinalResult(false);
    //   Swal.fire("Error", "Not found data", "error");
    // }
    setgvFinalData(dtData);
    console.log("gvFinalData", dtData)

  };


  const [selectedRow, setSelectedRow] = useState([]);

  const FinalSelectChange = (newSelectedRows) => {
    console.log('selectedRows changed: ', newSelectedRows);
    setSelectedRow(newSelectedRows);
  };

  const rowSelectFinal = {
    selectedRows,
    onChange: FinalSelectChange,
  };

  const columnsfinalresult = [
    {
      title: "No.",
      dataIndex: "SEQ",
      key: "No.",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Serial No.",
      dataIndex: "SERIAL_NO",
      key: "Serial No.",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Result",
      dataIndex: "FINAL_RESULT",
      key: "Result",
      align: "center",
      render: (text, record, index) => {
        return text;
      },
    },
  ];

  const btnFinalDeleteClick = async () => {

    if (selectedRow.length === 0) {
      Swal.fire('Warning', 'Please select row before deleting.', 'warning');
      return;
    }
    const result = await Swal.fire({
      title: 'Are you confirm delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      icon: 'warning',
    });

    if (result.isConfirmed) {
      let dtDelFinal = "";
      const parsedRow = selectedRow.map((rowKey) => JSON.parse(rowKey));
      const deletionPromises = parsedRow.map((record) =>
        axios.post("/api/SMTDeleteData/FinalDelete", {
          strplantcode: plantCode,
          strserial: record.SERIAL_NO,
        })
          .then((res) => {
            dtDelFinal = res.data.p_error;
            if (dtDelFinal === "") {
              Swal.fire('Success', 'You delete data success', 'success');
              //setlblResult(`Final Gate Delete Complete.`);
            }
          })
          .catch((error) => {
            Swal.fire("Error", error.res.data.p_error, "error");
          })
      )
      try {
        await Promise.all(deletionPromises);
        console.log('All deletions are complete');
      } catch (error) {
        Swal.fire('Error', error.message, 'error');
      }
      FNGetFinalGateResult();
    } else {
      console.log('Form not Delete');
    }
  };


  return {
    pnlForm, lblResult, lblResultcolor, txtSheetNo, settxtSheetNo, txtRollLeaf, settxtRollLeaf, ddlELTType, ELTTypedata, txtSerialNo,
    txtFinalSerialNo, settxtFinalSerialNo, gvELTResult, gvELTData, gvFinalResult, gvFinalData, inputShtNo, btnShtDeleteClick, handleELTType,
    btnRollDeleteClick, columnsconrollleaf, btnSerialSearchClick, btnELTDeleteClick, btnFinalSerialSearchClick, btnFinalDeleteClick, btnClearELTClick,
    btnClearFinalClick, columnseltresult, rowSelectelt, columnsfinalresult, rowSelectFinal, inputELTSerial, inputFinalSerial, settxtSerialNo, btnSearchShtnoClick,
    gvConShtPcs, gvConShtPcsData, columnsconshtpcs, rowSelection, btnShtCancelClick, rowSelect, btnSearchRollleafClick, gvConRollLeaf, gvConRollLeafData,
    btnRollCancelClick
  }
};

export { fn_SMTDeleteData };