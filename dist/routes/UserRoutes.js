"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const userController = new UserController_1.UserController();
const router = (0, express_1.Router)();
// Rota para criar um novo usuário
router.post("/users", userController.createUser);
// Rota para autenticar um usuário (login)
router.post("/login", userController.loginUser);
// Rota para deslogar um usuário (logout) com middleware de autenticação
// Esta rota deve ser protegida, pois o usuário precisa estar autenticado para deslogar
router.post("/logout", AuthMiddleware_1.AuthMiddleware, userController.logoutUser);
// Exporta o rotas para ser usado no server.ts
exports.default = router;
