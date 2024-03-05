const express = require("express");
const oracledb = require("oracledb");
const app = express();
const port = 6000;
app.use(express.json());

oracledb.initOracleClient({
    tnsAdmin: "D:\\app\\Administrator\\product\\11.2.0\\client_1\\network\\admin",
});

const FPC = {
    user: "fpc",
    password: "fpc",
    connectString: "PCTTLIV",
};