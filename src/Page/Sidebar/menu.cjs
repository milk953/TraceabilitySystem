const express = require("express");
const oracledb = require("oracledb");
const { Client } = require("pg");
const app = express();

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

const pgConfig = {
  user: "postgres",
  host: "10.17.66.120",
  database: "postgres",
  password: "postgres",
  port: 5432,
};

const client = new Client(pgConfig);
client.connect();

module.exports.getCurrentDate = async function (req, res) {
  try {
    const connection = await oracledb.getConnection(FPC);
    const result = await connection.execute("SELECT SYSDATE FROM DUAL");
    const currentDate = result.rows[0][0];
    await connection.close();

    res.json({ date: currentDate });
  } catch (error) {
    console.error("Error fetching current date:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

//Selct Menu Data/////////////////////////////////////////////////////////

module.exports.getFetch_menudata = async function (req, res) {
  try {
    const query = `select  tm.id as id
                  ,tmp.menu_name as parent_id
                ,tm.menu_name as menu_name
                ,tm.app_id as app_id
                ,tm.url as url
                ,tm.active_flag as active_flag
                ,tm.visible_flag as visible_flag
                ,tmp.seq , tm.seq
                from traceability.trace_menu tm inner join traceability.trace_menu tmp on tmp.id =tm.parent_id  
                where tm.parent_id is not null
                order by tmp.seq , tm.seq`;
    const { rows } = await client.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error querying PostgreSQL:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while querying the database." });
  }
};

////Search MenuName only////////////////////////

module.exports.postMenuname = async function (req, res) {
  //app.post("/search/MenuName", async (req, res) => {

  const { System, ParentMenuName, MenuName } = req.body;

  if (MenuName != undefined) {
    const searchQuery = `
    SELECT *
    FROM traceability.trace_menu
    WHERE menu_name = $1
  `;

    try {
      const result = await client.query(searchQuery, [MenuName]);
      const foundDataArray = result.rows;
      res.json(foundDataArray);
      //console.log("Path",foundDataArray)
    } catch (error) {
      console.error("Error searching data:", error);
      res
        .status(500)
        .json({ message: "An error occurred while searching data" });
    }
  }
};

module.exports.login = async function (req, res) {
  try {
    const { User, Password } = req.body;
    const connect = await oracledb.getConnection(DBfpc_fpc_pctt);
    const query = `
    SELECT F_ID_CODE ,F_NAME ,F_LASTNAME
    FROM TRAIN_PROGRAMMER_PERSON 
    WHERE  F_NAME= '${User}' AND F_ID_CODE = '${Password}' `;
    const result = await connect.execute(query);
    connect.release();
    res.json(result.rows);
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
  }
};

