const express = require( "express");
const routes = require("./router")
const fileRouter = require('./components/files/router')

const app = express();

app.use(express.json());
app.use(express.Router());

app.use("/files",fileRouter)
app.use(routes)

app.listen(3333,()=>{
console.log('Working...')
})