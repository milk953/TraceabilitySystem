import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
function fn_SerialTestType() {
  const plantCode = import.meta.env.VITE_FAC;
  const [productData, setProductData] = useState([]);
  const [productSelect, setProductSelect] = useState("");
  const [ELTTypeData, setELTTypeData] = useState([]);
  const [ELTTypeSelect, setELTTypeSelect] = useState("");
  const [firstProduct, setFirstProduct] = useState("");
  const [firstElt, setFirstElt] = useState("");
  const [result, setResult] = useState([]);
  const [lblMassage, setlblMassage] = useState("");
  const [lblMassageState, setlblMassageState] = useState(false);
  useEffect(() => {
    Pageload();
    if (firstProduct != "") {
      getData("getELTTypeByProduct", firstProduct);
    }
  }, [firstProduct]);
  const Pageload = async () => {
    await getData("getProduct", "");
    await getData("getELTType", "");
  };
  const productSelectChange = (e) => {
    setlblMassage("");
    setlblMassageState(false);
    setProductSelect(e);
    getData("getELTTypeByProduct", e);
  };
  const ELTTypeSelectChange = (e) => {
    setELTTypeSelect(e);
  };
  const handleDelete = async (e) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        getData("Delete", {
          prdname: e.product,
          testtype: e.elt_type,
          flg: "DELETE",
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const handleAddData = async () => {
    let elt = "";
    if (ELTTypeSelect == "") {
      elt = firstElt;
    } else {
      elt = ELTTypeSelect;
    }
    await getData("submit", {
      prdname: productSelect,
      testtype: elt,
      flg: "INSERT",
    });
  };
  async function getData(type, params) {
    if (type == "getProduct") {
      await axios
        .get("/api/ELTtype/getproduct")
        .then((res) => {
          setProductData(res.data);
          setFirstProduct(res.data[0].product);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type == "getELTType") {
      await axios
        .get("/api/ELTtype/gettype")
        .then((res) => {
          setELTTypeData(res.data);
          setFirstElt(res.data[0].elt_type);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type == "getELTTypeByProduct") {
      setResult([]);
      await axios
        .post(
          "/api/ELTtype/gettypebyproduct",
          {
            dataList: {
              strPlantCode: plantCode,
              strPrdName: params,
            },
          },
          {
            validateStatus: function (status) {
              return true;
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setResult(res.data);
          } else {
            setlblMassage("Not found data.");
            setlblMassageState(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type == "submit") {
      await axios
        .post(
          "/api/ELTtype/deleteData",
          {
            dataList: {
              strPlantCode: plantCode,
              strPrdName: params.prdname,
              strTestType: params.testtype,
              strBtnFlg: params.flg,
            },
          },
          {
            validateStatus: function (status) {
              return true;
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            Swal.fire("Success", "Insert Data Success", "success").then(
              (result) => {
                if (result.isConfirmed) {
                  setResult([]);
                  setlblMassage("");
                  setlblMassageState(false);
                  getData("getELTTypeByProduct", productSelect);
                }
              }
            );
          } else {
            Swal.fire("Error", `Unexpected status: ${res.status}`, "error");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (type == "Delete") {
      await axios
        .post("/api/ELTtype/deleteData", {
          dataList: {
            strPlantCode: plantCode,
            strPrdName: params.prdname,
            strTestType: params.testtype,
            strBtnFlg: params.flg,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire("Delete", "Success", "success").then((result) => {
              if (result.isConfirmed) {
                setResult([]);
                getData("getELTTypeByProduct", productSelect);
              }
            });
          } else {
            Swal.fire("Error", `Unexpected status: ${res.status}`, "error");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return {
    productData,
    productSelect,
    productSelectChange,
    ELTTypeSelectChange,
    ELTTypeSelect,
    ELTTypeData,
    result,
    handleDelete,
    handleAddData,
    lblMassage,
    lblMassageState
  };
}

export { fn_SerialTestType };
