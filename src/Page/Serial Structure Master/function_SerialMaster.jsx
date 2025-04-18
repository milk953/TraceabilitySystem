import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePopupFunctions, } from "../Common/function_Common";
import * as XLSX from 'xlsx';

// 
function SerialMasterPage() {

    const [ShowData, setShowData] = useState([]);
    const [checkHead, setCheckHead] = useState("hidden"); //ตัวแปรเช็คค่าของ ตาราง
    const [checkEmpty, setCheckEmpty] = useState("hidden"); // ตัวแปรเช็คค่าว่าง
    const [checkData, setCheckData] = useState("visible"); // ตัวแปร datashow warning
  
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
  
    const [TEXT_Code, setTEXT_Code] = useState("");
  
    const Search = async () => {

      try {
        const response = await axios.post("/api/SearchSerial", {
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
      setTEXT_Code(item.p_tssm_sn_struc_code);
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
          const snCodeToDelete = item.p_tssm_sn_struc_code;
        
          try {
            const response = await axios.post("/api/delSerial_Master", {
               sn_code: snCodeToDelete
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
        const Serial_Structure_Master = [
      [
        "No.",
        "Code",
        "Name",
        "Up Count",
        "Length",
        "Plant",
        "",
        "",
        "",
        "Week",
        "",
        "",
        "",
        "",
        "",
        "Seq",
        "",
        "",
        "",
        "",
        "",
        "Eng",
        "",
        "",
        "Rev",
        "",
        "",
        "Check Sum",
        "",
        "",
        "Config",
        "",
        "",
    ],
    [
        "",
        "",
        "",
        "",
        "",
        "Flag",
        "Code",
        "Start Digit",
        "End Digit",
        "Flag",
        "Code",
        "Start Digit",
        "End Digit",
        "Convert",
        "Convert Base",
        "Flag",
        "Format",
        "Start Digit",
        "End Digit",
        "Convert",
        "Convert Base",
        "Flag",
        "Start Digit",
        "End Digit",
        "Flag",
        "Start Digit",
        "End Digit",
        "Flag",
        "Start Digit",
        "End Digit",
        "Flag",
        "Start Digit",
        "End Digit",
        
    ],
    ...dataTableexport.map((item, index) => [
        index + 1,
        item.p_tssm_sn_struc_code,
        item.p_tssm_sn_struc_name,
        item.p_tssm_sn_struc_upcount,
        item.p_tssm_sn_length,
        item.p_tssm_plant_flag === 'Y' ? 'Y' : 'N',
        item.p_tssm_plant_code,
        item.p_tssm_plant_start_digit,
        item.p_tssm_plant_end_digit,
        item.p_tssm_week_flag  === 'Y' ? 'Y' : 'N',
        item.p_tssm_week_code,
        item.p_tssm_week_start_digit,
        item.p_tssm_week_end_digit,
        item.p_tssm_week_convert,
        item.p_tssm_week_convert_base,
        item.p_tssm_seq_flag  === 'Y' ? 'Y' : 'N',
        item.p_tssm_seq_format,
        item.p_tssm_seq_start_digit,
        item.p_tssm_seq_end_digit,
        item.p_tssm_seq_convert,
        item.p_tssm_seq_convert_base,
        item.p_tssm_eng_flag === 'Y' ? 'Y' : 'N',
        item.p_tssm_eng_start_digit,
        item.p_tssm_eng_end_digit,
        item.p_tssm_rev_flag  === 'Y' ? 'Y' : 'N',
        item.p_tssm_rev_start_digit,
        item.p_tssm_rev_end_digit,
        item.p_tssm_checksum_flag  === 'Y' ? 'Y' : 'N', 
        item.p_tssm_checksum_start_digit,
        item.p_tssm_checksum_end_digit,
        item.p_tssm_config_flag  === 'Y' ? 'Y' : 'N',
        item.p_tssm_config_start_digit,
        item.p_tssm_config_end_digit,

            ])
        ];
        

        const ws = XLSX.utils.aoa_to_sheet(Serial_Structure_Master);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `Serial_Structure_Master.xlsx`);
    };



    return{
        ShowData, checkHead, checkEmpty, checkData, code, name,
        TEXT_Code, Search, handleCode, handleName, OpenPopup,
        PopupOpen, PopupClose, New, Clear, selectedRowData, OpenEdit,
        handleOpenDelete,handleExportToExcel,
    }
}

export{SerialMasterPage};
