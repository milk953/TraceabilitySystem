import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePopupFunctions, getBaseURL } from "../Common/function_Common";
import * as XLSX from 'xlsx';
// 
function SheetMasterT() {

    const { baseURL } = getBaseURL();
    const [ShowData, setShowData] = useState([]);
    const [checkHead, setCheckHead] = useState("hidden"); //ตัวแปรเช็คค่าของ ตาราง
    const [checkEmpty, setCheckEmpty] = useState("hidden"); // ตัวแปรเช็คค่าว่าง
    const [checkData, setCheckData] = useState("visible"); // ตัวแปร datashow warning
  
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
  
    const [TEXT_SHT_Code, setTEXT_SHT_Code] = useState("");
  
    const Search = async () => {
      console.log(code, name, "......")
      try {
        const response = await axios.post(baseURL + "/search/CodeName", {
          Code: code,
          Name: name
        });
        const data = response.data;
        console.log("/////", data)
        setShowData(data);
        if (data.length > 0) {
          setCheckEmpty("hidden");
          setCheckData("hidden");
          setCheckHead("visible");
        } else {
          setCheckEmpty("visible");
          setCheckData("visible");
        }
  
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
  
    // Check Code
    const handleCode = (event) => {
      const code = event.target.value;
      setCode(code);
    };
  
    //Check Name
    const handleName = (event) => {
      const name = event.target.value;
      setName(name);
    };
  
    const { OpenPopup, PopupOpen, PopupClose, New } = usePopupFunctions();

  
    const Clear = () => {
      setCode("");
      setName("");
      setCheckHead("hidden");
      setCheckEmpty("hidden");
      setCheckData("visible");
    }
  
    const [selectedRowData, setSelectedRowData] = useState(null);
  
    const OpenEdit = async (item) => {
      const STATUS = "EDIT";
      localStorage.setItem("STATUS", STATUS);
      setSelectedRowData(item);
      setTEXT_SHT_Code(item.tstm_sht_struc_code);
      PopupOpen();
    }
  
    const handleOpenDelete = async (item) => {
      swal({
        title: "Are you sure you want to delete this information?",
        text: "",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          const shtCodeToDelete = item.tstm_sht_struc_code;
          try {
            const response = await axios.post(baseURL + "/delSheet_Master", {
               sht_code: shtCodeToDelete
            });
            console.log("ลบข้อมูลสำเร็จ:", response.data);
            swal("Your data has been deleted successfully", {
              icon: "success",
            });
            Search(); 
          } catch (error) {
            console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error);
          }
        }
      });
    };

    const dataTableexport = [...ShowData]; 
    const handleExportToExcel = () => {
        const Sheet_Structure_Master = [
      [
        "No.",
        "Code",
        "Name",
        "Plant",
        "",
        "",
        "",
        "Lot",
        "",
        "",
        "Model",
        "",
        "",
        "Seq",
        "",
        "",
        "",
    ],
    [
        "",
        "",
        "",
        "Flag",
        "Code",
        "Start Digit",
        "End Digit",
        "Flag",
        "Start Digit",
        "End Digit",
        "Flag",
        "Start Digit",
        "End Digit",
        "Flag",
        "Format",
        "Start Digit",
        "End Digit",     
    ],
    ...dataTableexport.map((item, index) => [
      index + 1,
      item.tstm_sht_struc_code,
      item.tstm_sht_struc_name,
      item.tstm_plant_flag === 'Y' ? 'Y' : 'N',
      item.tstm_plant_code,
      item.tstm_plant_start_digit,
      item.tstm_plant_end_digit,
      item.tstm_lot_flag === 'Y' ? 'Y' : 'N',
      item.tstm_lot_start_digit,
      item.tstm_lot_end_digit,
      item.tstm_model_flag === 'Y' ? 'Y' : 'N',
      item.tstm_model_start_digit,
      item.tstm_model_end_digit,
      item.tstm_seq_flag === 'Y' ? 'Y' : 'N',
      item.tstm_seq_format,
      item.tstm_seq_start_digit,
      item.tstm_seq_end_digit,

            ])
        ];
        const ws = XLSX.utils.aoa_to_sheet(Sheet_Structure_Master);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `Sheet_Structure_Master.xlsx`);
    };

    return{
        ShowData, checkHead, checkEmpty, checkData, code, name,
        TEXT_SHT_Code, Search, handleCode, handleName, OpenPopup,
        PopupOpen, PopupClose, New, Clear, selectedRowData, OpenEdit,
        handleOpenDelete,handleExportToExcel,
    }
}

export{SheetMasterT};