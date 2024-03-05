const express = require("express");
const oracledb = require("oracledb");
const app = express();
const port = 6000;

oracledb.initOracleClient({
    tnsAdmin: "D:\\app\\Administrator\\product\\11.2.0\\client_1\\network\\admin",
});

const FPC = {
    user: "fpc",
    password: "fpc",
    connectString: "PCTTLIV",
  };
  
  const SMT = {
    user: "SMT",
    password: "SMT",
    connectString: "NAPKDBSV",
  };

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
  app.use(express.json());


  app.get("/checkconnect", async (req, res) => {
    try {
      const oracleConnection = await oracledb.getConnection(FPC);
      if (oracleConnection) {
        res.send("เชื่อมต่อสำเร็จ Oracle");
      } else {
        res.send("การเชื่อมต่อไม่สำเร็จ");
      }
      await oracleConnection.close();
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเชื่อมต่อ:", error);
      res.send("การเชื่อมต่อไม่สำเร็จ");
    }
  });
  
  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  });