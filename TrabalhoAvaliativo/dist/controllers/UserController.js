"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../models/User");
const data_source_1 = __importDefault(require("../config/data-source"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepository = data_source_1.default.getRepository(User_1.User);
class UserController {
    async createUser(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const existEmail = await userRepository.findOneBy({ email });
        if (existEmail) {
            res.status(409).json({ message: "Email already exists" });
            return;
        }
        const user = new User_1.User(email, password);
        await userRepository.save(user);
        res
            .status(201)
            .json({ message: "User created successfully!", usuario: user });
        return;
    }
    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const existEmail = await userRepository.findOneBy({ email });
        if (!existEmail) {
            res.status(404).json({ message: "Email invalido" });
            return;
        }
        const isValid = await bcryptjs_1.default.compare(password, existEmail.password);
        if (!isValid) {
            res.status(401).json({ message: "Senha invalida" });
            return;
        }
        res.status(200).json({ message: "Login realizado com sucesso!", user: existEmail });
        return;
    }
    async show(req, res) {
        const { id } = req.params;
        const user = await userRepository.findOneBy({ id: Number(id) });
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        res.json({ id: user.id, email: user.email });
        return;
    }
    async getByEmail(req, res) {
        const { email } = req.params;
        const user = await userRepository.findOneBy({ email });
        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        res.json({ id: user.id, email: user.email });
        return;
    }
}
exports.UserController = UserController;
