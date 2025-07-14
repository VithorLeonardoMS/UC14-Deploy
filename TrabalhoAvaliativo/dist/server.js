"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const data_source_1 = __importDefault(require("./config/data-source"));
const ProductRoutes_1 = __importDefault(require("./routes/ProductRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); //API REST
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]
}));
app.use(express_1.default.static("public"));
app.get("/", (req, res) => {
    res.status(200).sendFile(path_1.default.join(__dirname, "../public/index.html"));
    return;
});
app.use("/api", UserRoutes_1.default);
app.use("/api", ProductRoutes_1.default);
data_source_1.default.initialize()
    .then(() => {
    app.listen(3000, () => {
        console.log("Server rodando na em http://localhost:3000");
    });
}).catch((error) => {
    console.error("Erro ao iniciar o banco de dados,", error);
});
