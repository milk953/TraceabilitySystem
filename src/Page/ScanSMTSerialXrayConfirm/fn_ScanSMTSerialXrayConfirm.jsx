function fn_ScanSMTSerialXrayConfirm() {

    const txtLot_TextChanged = async () => {
        let strLotData = "";
        let strLot = "";
        let strPrdName = "";
        strLotData = txtLot.value.trim().toUpperCase().split(";");
        setLblShtCount("0");
        setLblTotalSht("0");
        if (strLotData.length >= 2) {
          strLot = strLotData[0].trim();
          await axios
            .post("/api/Common/getProductNameByLot", {
              strLot: strLot,
            })
            .then((res) => {
              let data = res.data.prdName[0];
              strPrdName = data;
            });
    
          if (strPrdName !== "") {
            setLblPnlLog((prevState) => ({
              ...prevState,
              value: "",
              visble: false,
            }));
            setTxtLot((prevState) => ({ ...prevState, value: strLot }));
    
            try {
              setDdlProduct((prevState) => ({ ...prevState, value: strPrdName }));
    
              await getProductSerialMaster(strPrdName);
              SetMode("SERIAL");
              fnSetFocus("gvSerial_txtSerial_0");
            } catch (ex) {
              console.error(ex);
              let intProduct = strPrdName.slice(13).indexOf("-") + 13;
    
              if (intProduct > 0) {
                strPrdName =
                  strPrdName.slice(0, intProduct) +
                  strPrdName.slice(intProduct + 1, intProduct + 11).trim();
    
                try {
                  setDdlProduct((prevState) => ({
                    ...prevState,
                    value: strPrdName,
                  }));
    
                  await getProductSerialMaster(strPrdName);
                  SetMode("SERIAL");
                  fnSetFocus("gvSerial_txtSerial_0");
                } catch (ex2) {
                  setLblPnlLog((prevState) => ({
                    ...prevState,
                    value: `Product ${strPrdName} not found.`,
                    visble: true,
                  }));
                  fnSetFocus("ddlProduct_ScanSMTConnectRollConfirm_focus");
                }
              } else {
                setLblPnlLog((prevState) => ({
                  ...prevState,
                  value: `Product ${strPrdName} not found.`,
                  visble: true,
                }));
                fnSetFocus("ddlProduct_ScanSMTConnectRollConfirm_focus");
              }
            }
          } else {
            setDdlProduct((prevState) => ({
              ...prevState,
              value: Product[0].prd_name,
            }));
            setTxtLot((prevState) => ({ ...prevState, value: "" }));
            setGvSerial((prevState) => ({ ...prevState, value: "" }));
            setLblPnlLog((prevState) => ({
              ...prevState,
              value: "Invalid lot no.",
              visble: true,
            }));
            setHfMode("LOT");
            fnSetFocus("txtLot_ScanSMTConnectRollConfirm_focus");
          }
        } else {
          setDdlProduct((prevState) => ({
            ...prevState,
            value: Product[0].prd_name,
          }));
          setTxtLot((prevState) => ({ ...prevState, value: "" }));
          setGvSerial((prevState) => ({ ...prevState, value: "" }));
    
          setLblPnlLog((prevState) => ({
            ...prevState,
            value: "Please scan QR Code.\n กรุณาสแกนที่คิวอาร์โค้ด",
            visble: true,
          }));
          setHfMode("LOT");
          fnSetFocus("txtLot_ScanSMTConnectRollConfirm_focus");
        }
        await getShtDataBylot(strLot);
      };
  return {};
}

export { fn_ScanSMTSerialXrayConfirm };
