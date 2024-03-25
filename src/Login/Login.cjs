const express = require("express");
const oracledb = require("oracledb");
const { Client } = require("pg");
const app = express();
app.use(express.json());

const pgFETLPSQL_A1 = {
    user: "fetltrace",
    host: "10.17.66.120",
    database: "FETLPSQL_A1",
    password: "f3tltr@c3",
    port: 5432,
}

const client = new Client(pgFETLPSQL_A1);
client.connect();

module.exports.login = async function (req, res) {

    const {  } = req.body;
    const searchQuery = `
        
      `;

    try {
        const result = await client.query(searchQuery);
        const foundDataArray = result.rows;
        res.json(foundDataArray);
        //console.log("Path",foundDataArray)
    } catch (error) {
        console.error("Error searching data:", error);
        res
            .status(500)
            .json({ message: "An error occurred while searching data" });
    }
};