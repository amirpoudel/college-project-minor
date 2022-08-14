const database = require('./database/database');

const express = require('express');

const router = require('./router')
const app = express();
app.use(express.json());

const port = 5000;

database.connectDatabase();
app.use(router);


app.listen(port,()=>{
    console.log(`listen at ${port}`);
})






