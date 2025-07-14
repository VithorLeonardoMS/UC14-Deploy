import cors from "cors";
import path from "path";
import express, { Application } from "express";
import userRoutes from "./routes/UserRoutes"
import { Request, Response } from "express";
import AppDataSource from "./config/data-source";
import { error } from "console";
import productRoutes from "./routes/ProductRoutes"

const app:Application = express();

app.use(express.json()); //API REST
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:[
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]
}))

app.use(express.static("public"))

app.get("/", (req:Request, res:Response) => {
    res.status(200).sendFile(path.join(__dirname, "../public/index.html"))
    return;
})

app.use("/api", userRoutes);
app.use("/api", productRoutes)

AppDataSource.initialize()
.then(()=>{
    app.listen(3000, () => {
        console.log("Server rodando na em http://localhost:3000")
    })
}).catch((error) => {
    console.error("Erro ao iniciar o banco de dados,", error)
})