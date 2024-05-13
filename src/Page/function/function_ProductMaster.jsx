import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePopupFunctions } from "../Common/function_Common";
import * as XLSX from 'xlsx';
// 
function ProductMasterPage() {

    const [ShowData, setShowData] = useState([]);
    const [checkHead, setCheckHead] = useState("hidden"); //ตัวแปรเช็คค่าของ ตาราง
    const [checkEmpty, setCheckEmpty] = useState("hidden"); // ตัวแปรเช็คค่าว่าง
    const [checkData, setCheckData] = useState("visible"); // ตัวแปร datashow warning
  
    const [factory, setFactory] = useState([]);
    const [DDLFactory, setDDLFactory] = useState("");
    const [txtProduct, settxtProduct] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post("/Factory"); 
            setFactory(response.data);
          } catch (error) {
            console.error('Error fetching factories:', error.message);
          }
        };
    
        fetchData(); 
      }, []);
    
  

  
    const Search = async () => {
    //   console.log(code, name, "......")
    //   try {
    //     const response = await axios.post("/search/CodeName", {
    //       Code: code,
    //       Name: name
    //     });
    //     const data = response.data;
    //     console.log("/////", data)
    //     setShowData(data);
    //     if (data.length > 0) {
    //       setCheckEmpty("hidden");
    //       setCheckData("hidden");
    //       setCheckHead("visible");
    //     } else {
    //       setCheckEmpty("visible");
    //       setCheckData("visible");
    //     }
  
    //   } catch (error) {
    //     console.error('Error fetching search results:', error);
    //   }
    };
  
    const { OpenPopup, PopupOpen, PopupClose, New } = usePopupFunctions();

  
    const Clear = () => {
      
      setCheckHead("hidden");
      setCheckEmpty("hidden");
      setCheckData("visible");
    }
  
    const [selectedRowData, setSelectedRowData] = useState(null);
  
    const OpenEdit = async (item) => {
      const STATUS = "EDIT";
      localStorage.setItem("STATUS", STATUS);
      setSelectedRowData(item);
    //   setTEXT_SHT_Code(item.tstm_sht_struc_code);
      PopupOpen();
    }
  
    const handleOpenDelete = async (item) => {
    //   swal({
    //     title: "Are you sure you want to delete this information?",
    //     text: "",
    //     icon: "warning",
    //     buttons: true,
    //     dangerMode: true,
    //   }).then(async (willDelete) => {
    //     if (willDelete) {
    //       const shtCodeToDelete = item.tstm_sht_struc_code;
    //       try {
    //         const response = await axios.post("/delSheet_Master", {
    //            sht_code: shtCodeToDelete
    //         });
    //         console.log("ลบข้อมูลสำเร็จ:", response.data);
    //         swal("Your data has been deleted successfully", {
    //           icon: "success",
    //         });
    //         Search(); 
    //       } catch (error) {
    //         console.error("เกิดข้อผิดพลาดในการลบข้อมูล:", error);
    //       }
    //     }
    //   });
    };

    const dataTable1export = [...ShowData]; 
            const handleExportToExcel = () => {
        //         const wsData = [
        //             [
        //                 "No.",
        //                 "Factory",
        //                 "Product Name",
        //                 "Update Count",
        //                 "Config Code",
        //                 "Start Seq Serial",
        //                 "Start Seq Code",
        //                 "Date In process Flag",
        //                 "Date In Process",
        //                 "Pcs Per Sheet (EFPC)",
        //                 "Pcs Per Sheet (SMT)",
        //                 "Serial File Format",
        //                 "Sheet File Format",
        //                 "Serial side",
        //                 "Barcode Grade",
        //                 "Barcode Req Lot",
        //                 "Sheet Type",
        //                 "Sheet per Lot (EFPC)",
        //                 "Sheet per Lot (SMT)",
        //                 "Sheet per scan",
        //                 "Sheet per laser",
        //                 "Sheet Model Code",
        //                 "Sheet check Product Flag",
        //                 "Sheet check Lot Flag",
        //                 "Sheet Plasma Time Flag",
        //                 "Sheet Plasma Time",
        //                 "Sheet Xray Time Flag",
        //                 "Product Status",
        //                 "Conn Roll Sheet Flag",
        //                 "Conn Roll Sheet Length",
        //                 "Conn Roll Leaf Flag",
        //                 "Conn Roll Length",
        //                 "Conn Leaf Length",
        //                 "Conn Roll Product Flag",
        //                 "Conn Roll Product Start",
        //                 "Conn Roll Product End",
        //                 "Conn Roll Serial Flag",
        //                 "Conn Roll Leaf Scan",
        //                 "Conn Roll Req Lot Sheet",
        //                 "Conn Roll Lot Sheet Start",
        //                 "Conn Roll Lot Sheet End",
        //                 "Conn Roll Req Product Sheet",
        //                 "Conn Roll Product Sheet Start",
        //                 "Conn Roll Product Sheet End",
        //                 "Conn Roll Product Fix",
        //                 "Conn Sheet Control Time Flag",
        //                 "Conn Sheet Plasma Time Flag",
        //                 "Conn Sheet Mix Lot Flag",
        //                 "Conn Sheet Mix Product Flag",
        //                 "Conn Sheet check sum Flag",
        //                 "Conn Sheet Week Code Flag",
        //                 "Process Control Time Flag",
        //                 "Process Control Time",
        //                 "Final pcs per tray",
        //                 "Final pcs per scan",
        //                 "Final pack group flag",
        //                 "Final check week code flag",
        //                 "Final PDS time skip elt",
        //                 "Final PDS time Hide time",
        //                 "Final PDS time flag",
        //                 "Final PDS time",
        //                 "Final PDS time by",
        //                 "Final PDS time confirm flag",
        //                 "Final conn sheet flag",
        //                 "Final mix Lot flag",
        //                 "Final mix product flag",
        //                 "Fin inspect flag",
        //                 "Final inspect process",
        //                 "Final check sum flag",
        //                 "Final chip ID flag",
        //             ],
        //             ...dataTable1export.map((item, index) => [
        //                 index + 1,
        //                 item.tstm_sht_struc_code,
        //                 item.tstm_sht_struc_name,
        //                 item.tstm_plant_flag === 'Y' ? 'Y' : 'N',
        //                 item.tstm_plant_code,
        //                 item.tstm_plant_start_digit,
        //                 item.tstm_plant_end_digit,
        //                 item.tstm_lot_flag === 'Y' ? 'Y' : 'N',
        //                 item.tstm_lot_start_digit,
        //                 item.tstm_lot_end_digit,
        //                 item.tstm_model_flag === 'Y' ? 'Y' : 'N',
        //                 item.tstm_model_start_digit,
        //                 item.tstm_model_end_digit,
        //                 item.tstm_seq_flag === 'Y' ? 'Y' : 'N',
        //                 item.tstm_seq_format,
        //                 item.tstm_seq_start_digit,
        //                 item.tstm_seq_end_digit
        //             ])
        //         ];
                

        //         const ws = XLSX.utils.aoa_to_sheet(wsData);

        //         const wb = XLSX.utils.book_new();
        //         XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        //         XLSX.writeFile(wb, `Product_Master.xlsx`);
            };

    return{
        ShowData, checkHead, checkEmpty, checkData, factory, DDLFactory, 
        setDDLFactory, txtProduct, settxtProduct, Search, OpenPopup,
        PopupOpen, PopupClose, New, Clear, selectedRowData, OpenEdit,
        handleOpenDelete,handleExportToExcel,
    }
}

export{ProductMasterPage};