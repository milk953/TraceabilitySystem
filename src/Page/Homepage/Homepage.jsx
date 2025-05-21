import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Divider,
  Button,
  Typography,
  Avatar,
  notification,
} from "antd";
import "./Homepage.css";
import Hearder from "../Header/Header";
import { fn_Homepage } from "./fn_Homepage";
// import Work from "/src/assets/working-time.png";
import Work from "../../assets/working-time.png";
import Maintain from "../../assets/predictive.png";
import ViewData from "../../assets/analysis.png";
import { ClockCircleOutlined } from "@ant-design/icons";

function HomePage() {
  const {
    Showmenu,
    menu,
    OpenMenu,
    setSL_menu,
    SL_menu,
    HandleSL_Menu,
    checkmenuState,
    setCheckmenuState,
  } = fn_Homepage();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <Hearder />

      <div className="Background">
        <div className="col_style">
          {/* <div className="Space"> */}
          <Typography.Text
            style={{
              width: "30%",
              justifyContent: "center",
              display: "flex",
              margin: "10px auto",
              alignItems: "center",
              fontSize: "20px",
              fontWeight: "bold",
              gap: "8px",
            }}
          >
            <ClockCircleOutlined style={{ color: "#F7B733", fontSize: 26 }} />
            {`${currentDateTime.getDate().toString().padStart(2, "0")}/${(
              currentDateTime.getMonth() + 1
            )
              .toString()
              .padStart(2, "0")}/${currentDateTime.getFullYear()}`}{" "}
            {currentDateTime.toLocaleTimeString([], { hour12: false })}
          </Typography.Text>
          <Row className="RowCardHeader">
            <Col>
              <Card
                className="CardHeader"
                style={{ backgroundColor: "#4ABDAC" }}
              >
                Work &nbsp;{" "}
                <Avatar
                  shape="square"
                  src={Work}
                  size="small"
                  style={{ height: 40, width: 40 }}
                />
              </Card>
            </Col>
            &nbsp;&nbsp;
            <Col>
              <Card
                className="CardHeader"
                style={{ backgroundColor: "#6495ED" }}
              >
                Maintenance &nbsp;{" "}
                <Avatar
                  shape="square"
                  src={Maintain}
                  size="small"
                  style={{ height: 40, width: 40 }}
                />
              </Card>
            </Col>
            &nbsp;&nbsp;
            <Col>
              <Card
                className="CardHeader"
                style={{ backgroundColor: "#F7B733" }}
              >
                View Data &nbsp;{" "}
                <Avatar
                  shape="square"
                  src={ViewData}
                  size="small"
                  style={{ height: 40, width: 40 }}
                />
              </Card>
            </Col>
          </Row>

          <div
            style={{
              height: "600px",
              overflowY: "auto",
              background: "#f5f5f5",
            }}
          >
            <Row className="RowCardHeader">
              <Col>
                <Card className="CardMenu">
                  {menu
                    .filter((item, index) => menu[index].parent_id === "0928")
                    .map((item, index) => (
                      <div
                        key={index}
                        style={{
                          background: "#C1E1C1",
                          margin: "5px",
                          padding: "5px",
                          borderRadius: "15px",
                          textAlign: "center",
                          transition: "background 0.3s ease",
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                        className="hoverable"
                        onClick={() => HandleSL_Menu(item.url)}
                      >
                        {item.menu_name}
                      </div>
                    ))}
                </Card>
              </Col>
              &nbsp;&nbsp;
              <Col>
                <Card className="CardMenu">
                  {menu
                    .filter((item, index) => menu[index].parent_id === "0929")
                    .map((item, index) => (
                      <div
                        key={index}
                        style={{
                          background: "#ADD8E6",
                          margin: "5px",
                          padding: "5px",
                          borderRadius: "15px",
                          textAlign: "center",
                          transition: "background 0.3s ease",
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                        className="hoverable"
                        onClick={() => HandleSL_Menu(item.url)}
                      >
                        {item.menu_name}
                      </div>
                    ))}
                </Card>
              </Col>
              &nbsp;&nbsp;
              <Col>
                <Card className="CardMenu">
                  {menu
                    .filter((item, index) => menu[index].parent_id === "0930")
                    .map((item, index) => (
                      <div
                        key={index}
                        style={{
                          background: "#FFF8DC",
                          margin: "5px",
                          padding: "5px",
                          borderRadius: "15px",
                          textAlign: "center",
                          transition: "background 0.3s ease",
                          fontSize: "16px",
                          cursor: "pointer",
                          //  zoom: 1.5
                        }}
                        className="hoverable"
                        onClick={() => HandleSL_Menu(item.url)}
                      >
                        {item.menu_name}
                      </div>
                    ))}
                </Card>
              </Col>
            </Row>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default HomePage;
