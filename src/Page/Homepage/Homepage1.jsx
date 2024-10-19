import React, { useState } from "react";
import { Card, Paper } from "@mui/material";
import { Input, AutoComplete } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Hearder from "../Header/Header";
import { fn_Homepage } from "./fn_Homepage";
import "/src/Page/Homepage/Homepage.css";
import Homeimg from "/src/assets/2.png";
import leftimg from "/src/assets/left-arrow.png";
import rightimg from "/src/assets/right-arrow.png";
import ViewDataimg from "/src/assets/right-arrow.png";
import Maintainimg from "/src/assets/right-arrow.png";
// import Workimg from "/src/assets/checklist.png";

function ScanSheetMOTTime() {
  const { menu } = fn_Homepage();
  const [options, setOptions] = useState([]);
  const [startIndex, setStartIndex] = useState(0); // ตำแหน่งเริ่มต้นคือ 0 (card 1, 2, 3)

  const cards = [
    { id: 1, content: "ALL" },
    { id: 2, content: "Work" },
    { id: 3, content: "Maintain" },
    { id: 4, content: "View Data" },
  ];

  const handleSearch = (value) => {
    const filteredOptions = menu
      .filter((item) =>
        item.menu_name.toLowerCase().includes(value.toLowerCase())
      )
      .map((item) => ({
        value: item.menu_name,
        label: item.menu_name,
        link: item.url,
      }));

    setOptions(
      filteredOptions.length
        ? filteredOptions
        : [{ value: "ไม่มีผลลัพธ์", label: "ไม่มีผลลัพธ์" }]
    );
  };

  const handleNext = () => {
    if (startIndex === 0) {
      setStartIndex(1); // เปลี่ยนไปแสดง Card 2, 3, 4
    }
  };

  const handlePrev = () => {
    if (startIndex === 1) {
      setStartIndex(0); // เปลี่ยนกลับมาแสดง Card 1, 2, 3
    }
  };

  const getVisibleCards = () => {
    // แสดง Card ตาม startIndex ที่เปลี่ยนจากการกดปุ่มซ้ายขวา
    if (startIndex === 0) {
      return [cards[0], cards[1], cards[2]]; // Card 1, 2, 3
    }
    return [cards[1], cards[2], cards[3]]; // Card 2, 3, 4
  };

  return (
    <div>
      <Hearder />
      <Card component={Paper} className="Card-Common">
        {console.log(options)}
        <AutoComplete
          options={options}
          onSearch={handleSearch}
          onChange={handleSearch}
          style={{ width: 300 }}
        >
          <Input
            placeholder=" Search... "
            prefix={<SearchOutlined />}
            bordered={false}
          />
        </AutoComplete>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          {/* ใช้ visibility: "hidden" แทนการซ่อนปุ่ม leftimg */}
          <div
  style={{
    height: 200,
    margin: "0 10px",
    visibility: startIndex === 0 ? "hidden" : "visible",
    display: "flex", // ใช้ flexbox เพื่อจัดตำแหน่งลูกศร
    justifyContent: "center", // จัดให้อยู่ตรงกลางแนวนอน
    alignItems: "center", // จัดให้อยู่ตรงกลางแนวตั้ง
  }}
>
  <img
    src={leftimg}
    alt="Left Arrow"
    style={{ width: 50, height: 50, cursor: "pointer" }}
    onClick={handlePrev}
  />
</div>


          {/* แสดง Card ที่ต้องการ */}
          {getVisibleCards().map((card) => (
            <Card
              key={card.id}
              component={Paper}
              style={{
                width: 400,
                height: 200,
                background: "#FFA24C",
                margin: "0 10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {card.content}
            </Card>
          ))}

          <div
            style={{
              height: 200,
              margin: "0 10px",
              visibility: startIndex === 1 ? "hidden" : "visible",
              display: "flex", // ใช้ flexbox เพื่อจัดตำแหน่งลูกศร
              justifyContent: "center", // จัดให้อยู่ตรงกลางแนวนอน
              alignItems: "center", // จัดให้อยู่ตรงกลางแนวตั้ง
            }}
          >
            <img
              src={rightimg}
              alt="Right Arrow"
              style={{ width: 50, height: 50, cursor: "pointer" }}
              onClick={handleNext}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ScanSheetMOTTime;
