"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Importa o Express e o tipo Application
const cors_1 = __importDefault(require("cors")); // Importa o middleware CORS
const data_source_1 = __importDefault(require("./config/data-source")); // Importa a configuração do TypeORM
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes")); // Importa as rotas de usuários
const TaskRoutes_1 = __importDefault(require("./routes/TaskRoutes")); // Importa as rotas de tarefas
const dotenv_1 = __importDefault(require("dotenv")); // Importa o dotenv para carregar variáveis de ambiente
dotenv_1.default.config(); // Carrega as variáveis de ambiente do arquivo .env
const app = (0, express_1.default)(); // Cria uma instância do Express
app.use(express_1.default.json()); // Configura o Express para interpretar JSON no corpo das requisições
app.use(express_1.default.urlencoded({ extended: true })); // Configura o Express para interpretar dados URL-encoded (formulários)
// Habilita CORS para permitir requisições de outros domínios
app.use((0, cors_1.default)({
    credentials: true, // Permite credenciais (cookies, headers de autenticação, etc.)
}));
// Configura as rotas de usuários e tarefas
app.use("/api", UserRoutes_1.default); // Rotas de usuários sob o prefixo /api
app.use("/api", TaskRoutes_1.default); // Rotas de tarefas sob o prefixo /api
// Função para inicializar o servidor
const startServer = async () => {
    try {
        // Inicializa a conexão com o banco de dados
        await data_source_1.default.initialize();
        console.log("Database connection established successfully.");
        // Define a porta do servidor
        const PORT = Number(process.env.PORT || "3000");
        // Inicia o servidor na porta especificada
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    }
    catch (error) {
        console.error("Error starting the server:", error);
    }
};
// Chama a função para iniciar o servidor
startServer(); // Inicia o servidor e a conexão com o banco de dados
