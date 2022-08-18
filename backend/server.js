const database = require('./database/database');

const express = require('express');
const cookieParse = require('cookie-parser')

const router = require('./router')
const cors = require("cors");
const app = express();
app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(cookieParse());
app.use(express.json());

const port = 5000;

database.connectDatabase();
app.use(router);


app.listen(port,()=>{
    console.log(`listen at ${port}`);
})






