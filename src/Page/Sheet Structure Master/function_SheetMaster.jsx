import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePopupFunctions } from "../Common/function_Common";
import * as XLSX from 'xlsx';
// 
function SheetMasterT() {
    const [ShowData, setShowData] = useState([]);
    const [checkHead, setCheckHead] = useState("hidden"); //ตัวแปรเช็คค่าของ ตาราง
    const [checkEmpty, setCheckEmpty] = useState("hidden"); // ตัวแปรเช็คค่าว่าง
    const [checkData, setCheckData] = useState("visible"); // ตัวแปร datashow warning
  
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
  
    const [TEXT_SHT_Code, setTEXT_SHT_Code] = useState("");
  
    const Search = async () => {
    
      try {
        const response = await axios.post("/api/searchCodeName", {
          Code: code,
          Name: name
        });
        const data = response.data;
      
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
      setTEXT_SHT_Code(item.sht_code);
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
          const shtCodeToDelete = item.sht_code;
          try {
            const response = await axios.post("/api/delSheet_Master", {
               sht_code: shtCodeToDelete
            });
           
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
      item.sht_code,
      item.sht_name,
      item.plant_flag === 'Y' ? 'Y' : 'N',
      item.plant_code,
      item.plant_start_digit,
      item.plant_end_digit,
      item.lot_flag === 'Y' ? 'Y' : 'N',
      item.ot_start_digit,
      item.lot_end_digit,
      item.model_flag === 'Y' ? 'Y' : 'N',
      item.model_start_digit,
      item.model_end_digit,
      item.seq_flag === 'Y' ? 'Y' : 'N',
      item.seq_format,
      item.seq_start_digit,
      item.seq_end_digit,

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