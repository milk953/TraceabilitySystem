// import React, { useRef, useState, useMemo } from "react";
// import Header from "../Header/Header";
// import { Input } from "antd";

// function Scantest() {
//   const inputRefs = useRef([]);
//   const [inputValues, setInputValues] = useState(Array(72).fill(""));

//   const handleKeyPress = (event, index) => {
//     if (event.key === 'Enter') {
//       if (index < 71) {
//         inputRefs.current[index + 1].focus();
//       }
//     }
//   };

//   const handleChange = (event, index) => {
//     const newValues = [...inputValues];
//     newValues[index] = event.target.value;
//     setInputValues(newValues);
//   };

//   const inputs = useMemo(() => {
//     return Array.from({ length: 72 }, (_, index) => (
//       <Input
//         key={index}
//         style={{ width: "250px" }}
//         id="serial"
//         placeholder={`TestSerial : ${index}`}
//         onKeyPress={(event) => handleKeyPress(event, index)}
//         onChange={(event) => handleChange(event, index)}
//         value={inputValues[index]}
//         ref={(el) => (inputRefs.current[index] = el)}
//       />
//     ));
//   }, [inputValues]);

//   return (
//     <div>
//       <Header />
//       <div style={{ marginTop: "100px" }}>
//         <Input style={{ width: "200px" }} placeholder="test" />
//         <br />
//         <br />
//         <div style={{ display: "flex", flexDirection: "column" }}>{inputs}</div>
//       </div>
//     </div>
//   );
// }

// export default Scantest;

// import { useState, useEffect, useRef } from "react";

// const BarcodeScanner = () => {
//   const [barcode, setBarcode] = useState("");
//   const [history, setHistory] = useState([]);
//   const [error, setError] = useState("");
//   const inputRef = useRef(null);

//   // โฟกัสไปที่ input เมื่อโหลดหน้า
//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   // จัดการเมื่อสแกนบาร์โค้ดเสร็จ
//   const handleScan = (event) => {
//     const value = event.target.value;

//     if (event.key === "Enter") {
//       if (value.trim() === "") {
//         setError("กรุณาสแกนบาร์โค้ดที่ถูกต้อง");
//         return;
//       }

//       setHistory((prev) => [...prev, value]); // บันทึกประวัติการสแกน
//       console.log("Scanned Barcode:", value);
//       setBarcode("");
//       setError(""); // เคลียร์ข้อผิดพลาด
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-5 border rounded-lg shadow-md bg-white">
//       <h2 className="text-xl font-bold mb-3">📌 ระบบสแกนบาร์โค้ด</h2>

//       <input
//         type="text"
//         ref={inputRef}
//         value={barcode}
//         onChange={(e) => setBarcode(e.target.value)}
//         onKeyDown={handleScan}
//         placeholder="กรุณาสแกนบาร์โค้ด..."
//         className="border p-2 rounded-md w-full text-lg"
//         autoFocus
//       />

//       {error && <p className="text-red-500 mt-2">{error}</p>}

//       <div className="mt-5">
//         <h3 className="text-lg font-semibold">📜 ประวัติการสแกน</h3>
//         <ul className="list-disc ml-5 mt-2">
//           {history.slice(-20).map((code, index) => (
//             <li key={index} className="text-blue-600">{code}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default BarcodeScanner;
import React, { useState, useRef ,useEffect} from 'react';

const BarcodeInputForm = () => {
  // สร้าง state เพื่อเก็บค่าของ 72 ช่อง

  const [barcodes, setBarcodes] = useState(Array(200).fill(''));
  
  // ใช้ useRef เพื่อเก็บอ้างอิงถึง input ทุกช่อง
  const inputRefs = useRef([]);

  // ฟังก์ชันที่ใช้ในการจัดการการเปลี่ยนแปลงข้อมูลในช่อง input
  const handleChange = (index, event) => {
    const newBarcodes = [...barcodes];
    newBarcodes[index] = event.target.value;
    setBarcodes(newBarcodes);
  };

  // ฟังก์ชันที่จะย้ายโฟกัสไปยังช่องถัดไปเมื่อกด Enter
  const handleKeyPress = (index, event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // ป้องกันการส่งฟอร์มเมื่อกด Enter
      if (index < barcodes.length - 1) {
        inputRefs.current[index + 1].focus(); // โฟกัสไปที่ช่องถัดไป
      }
    }
  };
  useEffect(() => {
    inputRefs.current[0].focus(); 
  }, []);
  return (
    <div>
      <form>
        {/* สร้างช่อง input ทั้งหมด 72 ช่อง */}
        {barcodes.map((barcode, index) => (
          <div key={index}>
            <label>{`Barcode ${index + 1}:`}</label>
            <input
              type="text"
              value={barcode}
              onChange={(event) => handleChange(index, event)}
              onKeyDown={(event) => handleKeyPress(index, event)} // เพิ่มการตรวจจับการกด Enter
              ref={(el) => (inputRefs.current[index] = el)} // เก็บอ้างอิงของ input แต่ละช่อง
              // maxLength={0} // กำหนดความยาวสูงสุดของตัวอักษรในแต่ละช่อง (สามารถปรับเปลี่ยนได้)
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default BarcodeInputForm;
