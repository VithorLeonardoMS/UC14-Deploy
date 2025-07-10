"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TaskController_1 = require("../controllers/TaskController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const taskController = new TaskController_1.TaskController();
const router = (0, express_1.Router)();
// Rota para criar uma nova tarefa
router.post("/tasks", AuthMiddleware_1.AuthMiddleware, taskController.createTask);
// Rota para obter todas as tarefas de um usuário
router.get("/tasks/user", AuthMiddleware_1.AuthMiddleware, taskController.getTasksByUser);
// Rota para obter uma tarefa específica pelo ID
router.get("/tasks/:id", AuthMiddleware_1.AuthMiddleware, taskController.getTaskById);
// Rota para atualizar o status de uma tarefa
router.put("/tasks/:id", AuthMiddleware_1.AuthMiddleware, taskController.updateTask);
// Rota para deletar uma tarefa
router.delete("/tasks/:id", AuthMiddleware_1.AuthMiddleware, taskController.deleteTask);
// Exporta o rotas para ser usado no server.ts
exports.default = router;
