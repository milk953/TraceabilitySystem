const express = require("express");
const app = express();
app.use(express.json());

const connectToDatabase = require('../Common/database.cjs');

const { client } = connectToDatabase();

module.exports.getFactory = async function (req, res) {
  try {
    const strSql = [];
    strSql.push('SELECT factory_code, factory_desc');
    strSql.push('FROM "FETLPSQL_A1"."public".fpc_factory');
    strSql.push('ORDER BY factory_desc')

    const query = strSql.join('\n'); // ใช้ \n เพื่อให้แต่ละคำสั่งอยู่บรรทัดเดียวกัน
    const result = await client.query(query);

    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getSerialStructure = async function (req, res) {
  try {
    const strSql = [];
    strSql.push('SELECT tssm_sn_struc_code, tssm_sn_struc_name');
    strSql.push('FROM "FETLPSQL_A1"."Traceability".trc_serial_structure_mst');
    strSql.push('ORDER BY tssm_sn_struc_name')

    const query = strSql.join('\n'); // ใช้ \n เพื่อให้แต่ละคำสั่งอยู่บรรทัดเดียวกัน
    const result = await client.query(query);

    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getSheetStructure = async function (req, res) {
  try {
    const strSql = [];
    strSql.push('SELECT tstm_sht_struc_code, tstm_sht_struc_name');
    strSql.push('FROM "FETLPSQL_A1"."Traceability".trc_sheet_structure_mst');
    strSql.push('ORDER BY tstm_sht_struc_name')

    const query = strSql.join('\n'); // ใช้ \n เพื่อให้แต่ละคำสั่งอยู่บรรทัดเดียวกัน
    const result = await client.query(query);

    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getSheetType = async function (req, res) {
  try {
    const strSql = [];
    strSql.push('SELECT tstm_code, tstm_name');
    strSql.push('FROM "FETLPSQL_A1"."Traceability".trc_sheet_type_mst');
    strSql.push('ORDER BY tstm_name')

    const query = strSql.join('\n'); // ใช้ \n เพื่อให้แต่ละคำสั่งอยู่บรรทัดเดียวกัน
    const result = await client.query(query);

    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.getProceesControl = async function (req, res) {
  try {
    const strSql = [];
    strSql.push('SELECT tpct_code, tpct_name');
    strSql.push('FROM "FETLPSQL_A1"."Traceability".trc_process_control_time_mst');
    strSql.push('ORDER BY tpct_name')

    const query = strSql.join('\n'); // ใช้ \n เพื่อให้แต่ละคำสั่งอยู่บรรทัดเดียวกัน
    const result = await client.query(query);

    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("ข้อผิดพลาดในการค้นหาข้อมูล:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
