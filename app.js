import { getDB,connect } from "./src/db/config.js";
import {log} from "console"
import express from "express"
import apiRouter from "./src/routers/index.js"

const PORT = process.env.PORT||3000
const app = express();

app.use(express.json());

app.use("/api",apiRouter);

app.get("/api",(_req,res)=> res.send({status:"ok"}))

await connect().then(()=>{
    
    app.listen(PORT,()=>{
        log(`Api in http://localhost:${PORT}`)
    })
})
