import React from "react";
import { Card, Col, Row, Divider, Button, Typography,Avatar } from "antd";
import './Homepage.css'
import Hearder from "../Header/Header";
import { fn_Homepage } from "./fn_Homepage";
// import Work from "/src/assets/working-time.png";
import Work from "../../assets/working-time.png";
import Maintain from "../../assets/predictive.png";
import ViewData from "../../assets/analysis.png";

function Homepage() {
  const { Showmenu, menu, OpenMenu, setSL_menu, SL_menu, HandleSL_Menu } =
    fn_Homepage();
  return (
    <>
      <Hearder />
    
      <div className="Background"> 
        <div className="col_style">
          
          {/* <div className="Space"> */}
         
            <Row  className="RowCardHeader">
              <Col >
                <Card
                  className="CardHeader"
                  style={{ backgroundColor: "#4ABDAC" ,}}
                >
                  Work  &nbsp; <Avatar shape="square" src={Work} size="small" style={{height:40,width:40}} />
                </Card>
              </Col>
              &nbsp;&nbsp;
              <Col>
                <Card
                  className="CardHeader"
                  style={{ backgroundColor: "#6495ED" }}
                >
                  Maintenance  &nbsp; <Avatar shape="square" src={Maintain} size="small" style={{height:40,width:40}}/>
                </Card>
              </Col>
              &nbsp;&nbsp;
              <Col>
                <Card
                  className="CardHeader"
                  style={{ backgroundColor: "#F7B733" }}
                >
                  View Data &nbsp; <Avatar shape="square" src={ViewData} size="small" style={{height:40,width:40}}/>
                </Card>
              </Col>
            </Row>
            <Card style={{ height: '600px', overflowY: 'auto' }}>
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
            </Card>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Homepage;
