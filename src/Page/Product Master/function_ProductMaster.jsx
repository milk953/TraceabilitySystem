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




  const Search = async () => {

    try {
      const response = await axios.post("/api/searchFactory", {
        Factory: DDLFactory,
        Product: txtProduct
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
        setCheckData("hidden");
      }

    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const alignData = (data) => {
    if (typeof data === 'number') {
      return (
        <div style={{ textAlign: 'right' }}>
          {data}
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: 'left' }}>
          {data}
        </div>
      );
    }
  };

  const { OpenPopup, PopupOpen, PopupClose, New } = usePopupFunctions();


  const Clear = () => {
    setDDLFactory("");
    settxtProduct("");
    setCheckHead("hidden");
    setCheckEmpty("hidden");
    setCheckData("visible");
  }

  const [selectedRowData, setSelectedRowData] = useState(null);

  const OpenEdit = async (item) => {
    const STATUS = "EDIT";
    localStorage.setItem("STATUS", STATUS);
    setSelectedRowData(item);
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
        const factoryCode = item.p_tpm_plant_code;
        const productName = item.p_tpm_product_name;

        try {
          const response = await axios.post("/api/delProduct_Master", {
            p_tpm_plant_code: factoryCode,
            p_tpm_product_name: productName
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

  const dataTable1export = [...ShowData];
  const handleExportToExcel = () => {
            const wsData = [
                [
                    "No.",
                    "Factory",
                    "Product Name",
                    "Update Count",
                    "Config Code",
                    "Start Seq Serial",
                    "Start Seq Code",
                    "Date In process Flag",
                    "Date In Process",
                    "Pcs Per Sheet (EFPC)",
                    "Pcs Per Sheet (SMT)",
                    "Serial File Format",
                    "Sheet File Format",
                    "Serial side",
                    "Barcode Grade",
                    "Barcode Req Lot",
                    "Sheet Type",
                    "Sheet per Lot (EFPC)",
                    "Sheet per Lot (SMT)",
                    "Sheet per scan",
                    "Sheet per laser",
                    "Sheet Model Code",
                    "Sheet check Product Flag",
                    "Sheet check Lot Flag",
                    "Sheet Plasma Time Flag",
                    "Sheet Plasma Time",
                    "Sheet Xray Time Flag",
                    "Product Status",
                    "Conn Roll Sheet Flag",
                    "Conn Roll Sheet Length",
                    "Conn Roll Leaf Flag",
                    "Conn Roll Length",
                    "Conn Leaf Length",
                    "Conn Roll Product Flag",
                    "Conn Roll Product Start",
                    "Conn Roll Product End",
                    "Conn Roll Serial Flag",
                    "Conn Roll Leaf Scan",
                    "Conn Roll Req Lot Sheet",
                    "Conn Roll Lot Sheet Start",
                    "Conn Roll Lot Sheet End",
                    "Conn Roll Req Product Sheet",
                    "Conn Roll Product Sheet Start",
                    "Conn Roll Product Sheet End",
                    "Conn Roll Product Fix",
                    "Conn Sheet Control Time Flag",
                    "Conn Sheet Plasma Time Flag",
                    "Conn Sheet Mix Lot Flag",
                    "Conn Sheet Mix Product Flag",
                    "Conn Sheet check sum Flag",
                    "Conn Sheet Week Code Flag",
                    "Process Control Time Flag",
                    "Process Control Time",
                    "Final pcs per tray",
                    "Final pcs per scan",
                    "Final pack group flag",
                    "Final check week code flag",
                    "Final PDS time skip elt",
                    "Final PDS time Hide time",
                    "Final PDS time flag",
                    "Final PDS time",
                    "Final PDS time by",
                    "Final PDS time confirm flag",
                    "Final conn sheet flag",
                    "Final mix Lot flag",
                    "Final mix product flag",
                    // "Fin inspect flag",
                    // "Final inspect process",
                    "Final check sum flag",
                    "Final chip ID flag",
                ],
                ...dataTable1export.map((item, index) => [
                    index + 1,
                    item.p_tpm_factory,
                    item.p_tpm_product_name,
                    item.p_tpm_update_count,
                    item.p_tpm_config_code,
                    item.p_tpm_start_seq_serial,
                    item.p_tpm_start_seq_code,
                    item.p_tpm_date_inproc_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_date_inproc,
                    item.p_tpm_pcs_per_sht_efpc,
                    item.p_tpm_pcs_per_sht_smt,
                    item.p_tpm_serial_file_format,
                    item.p_tpm_sht_file_format,
                    item.p_tpm_serial_side,
                    item.p_tpm_barcode_grade,
                    item.p_tpm_barcode_req_lot === 'Y' ? 'Y' : 'N',
                    item.p_tpm_sht_type,
                    item.p_tpm_sht_per_lot_efpc,
                    item.p_tpm_sht_per_lot_smt,
                    item.p_tpm_sht_per_scan,
                    item.p_tpm_sht_per_laser,
                    item.p_tpm_sht_model_code,
                    item.p_tpm_sht_check_prd_flag === 'Y' ? 'Y' : 'N',
                    item.p_tpm_sht_check_lot_flag === 'Y' ? 'Y' : 'N',
                    item.p_tpm_sht_plasma_time_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_sht_plasma_time,
                    item.p_tpm_sht_xray_1_time_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_product_status,
                    item.p_tpm_conn_roll_sht_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_conn_roll_sht_length,
                    item.p_tpm_conn_roll_leaf_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_conn_roll_length,
                    item.p_tpm_conn_leaf_length,
                    item.p_tpm_conn_roll_prd_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_conn_roll_prd_start,
                    item.p_tpm_conn_roll_prd_end,
                    item.p_tpm_conn_roll_serial_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_conn_roll_leaf_scan,
                    item.p_tpm_conn_roll_req_lot_sht,
                    item.p_tpm_conn_roll_lot_sht_start,
                    item.p_tpm_conn_roll_lot_sht_end,
                    item.p_tpm_conn_roll_req_prd_sht,
                    item.p_tpm_conn_roll_prd_sht_start,
                    item.p_tpm_conn_roll_prd_sht_end,
                    item.p_tpm_conn_roll_prd_fix,
                    item.p_tpm_conn_sht_control_time_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_conn_sht_plasma_time_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_conn_sht_mix_lot_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_conn_sht_mix_product_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_conn_sht_checksum_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_conn_sht_check_weekcode_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_proc_control_time_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_proc_control_time,
                    item.p_tpm_fin_pcs_per_tray,
                    item.p_tpm_fin_pcs_per_scan,
                    item.p_tpm_fin_pack_group_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_fin_check_weekcode_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_fin_pds_time_skip_elt,
                    item.p_tpm_fin_pds_time_hide_time,
                    item.p_tpm_fin_pds_time_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_fin_pds_time,
                    item.p_tpm_fin_pds_time_by,
                    item.p_tpm_fin_pds_time_confirm_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_fin_conn_sht_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_fin_mix_lot_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_fin_mix_product_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_fin_checksum_flg === 'Y' ? 'Y' : 'N',
                    item.p_tpm_fin_chip_id_flg === 'Y' ? 'Y' : 'N',
                ])
            ];


            const ws = XLSX.utils.aoa_to_sheet(wsData);

            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            XLSX.writeFile(wb, `Product_Master.xlsx`);
  };

  return {
    ShowData, checkHead, checkEmpty, checkData, DDLFactory, setDDLFactory, txtProduct, settxtProduct, Search, alignData,
    OpenPopup, PopupOpen, PopupClose, New, Clear, selectedRowData, OpenEdit, handleOpenDelete, handleExportToExcel,
  }
}

export { ProductMasterPage };