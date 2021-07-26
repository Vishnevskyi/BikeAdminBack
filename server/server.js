const express = require("express");
const PORT = 5000;
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(require("./router/router"))
app.listen(PORT,()=>{
    console.log(`Server has been started on https://mongo-test-bike-backend.herokuapp.com:${PORT}`);
})