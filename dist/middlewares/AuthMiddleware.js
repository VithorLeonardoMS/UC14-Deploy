"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = AuthMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Garantir que a secret exista
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined");
}
const JWT_SECRET = process.env.JWT_SECRET;
function AuthMiddleware(req, res, next) {
    const token = req.cookies.token; // lê do cookie
    // Verifica se o token existe
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        // Log para verificar o erro de token expirado
        res.clearCookie("token", {
            httpOnly: true, // Define o cookie como HttpOnly (não acessível via JavaScript)
            secure: process.env.NODE_ENV === "production", // Define o cookie como seguro (só enviado via HTTPS em produção)
            sameSite: "none" // Permite o envio do cookie em requisições cross-site (sem restrições)
        });
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({ message: 'Token expired' });
            return;
        }
        res.status(401).json({ message: 'Invalid token' });
        return;
    }
}
