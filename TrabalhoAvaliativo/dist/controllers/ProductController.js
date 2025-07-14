"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const Product_1 = require("../models/Product");
const data_source_1 = __importDefault(require("../config/data-source"));
const User_1 = require("../models/User");
const productRepository = data_source_1.default.getRepository(Product_1.Product);
const userRepository = data_source_1.default.getRepository(User_1.User);
class ProductController {
    // Criar um novo produto
    async createProduct(req, res) {
        try {
            const { name, description, price, userId, image, brand, model } = req.body;
            const user = await userRepository.findOneBy({ id: userId });
            if (!name || price === undefined || !description || !userId || !image) {
                res.status(400).json({ mensagem: "Todos os dados devem ser fornecidos - name, description, price e user" });
                return;
            }
            if (user) {
                const newProduct = new Product_1.Product(name, price, description, image, user);
                newProduct.brand = brand;
                newProduct.model = model;
                await productRepository.save(newProduct);
                console.log("Produto criado com sucesso!");
                res.status(201).json({ mensagem: "Produto criado com sucesso!", user });
                return;
            }
            else {
                console.error("Erro, usario não encontrado -> ProductController.createProduct. userId = " + userId);
                return;
            }
        }
        catch (error) {
            console.log("Erro em createProduct");
        }
    }
    ;
    // Listar todos os produtos
    async listProducts(req, res) {
        try {
            const products = await productRepository.find({
                relations: ["user"]
            });
            res.status(200).json(products);
        }
        catch (error) {
            console.error("Erro ao listar produtos", error);
            res.status(500).json({ mensagem: "Erro ao listar produtos" });
        }
    }
    ;
    // Buscar um produto por ID
    async findProductById(req, res) {
        const id = Number(req.params.id);
        const product = await productRepository.findOne({
            where: { id },
            relations: ["user"]
        });
        if (!product) {
            res.status(404).json({ mensagem: "Produto não encontrado" });
            return;
        }
        res.status(200).json(product);
        return;
    }
    ;
    async findByName(req, res) {
        const { name } = req.params;
        const product = await productRepository.findOne({
            where: { name },
            relations: ["user"]
        });
        if (!product) {
            res.status(404).json({ mensage: "Produto não encontrado" });
            return;
        }
        res.status(200).json(product);
    }
    // Atualizar um produto
    async updateProducts(req, res) {
        const id = Number(req.params.id);
        const { name, price, description } = req.body;
        if (!id) {
            res.status(400).json({ mensagem: "Id é obrigatório!" });
            return;
        }
        if (!name && !price && !description) {
            res.status(400).json({ mensagem: "Um dos campos!" });
            return;
        }
        const product = await productRepository.findOneBy({ id: id });
        if (!product) {
            res.status(404).json({ mensagem: "Produto não encontrado" });
            return;
        }
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        await productRepository.save(product);
        res.status(200).json({ mensagem: "Produto atualizado com sucesso!", product });
        return;
    }
    ;
    // Deletar um produto
    async deleteProduct(req, res) {
        const id = Number(req.params.id);
        if (!id) {
            res.status(400).json({ mensagem: "O id precisa ser fornecido!" });
            return;
        }
        const product = await productRepository.findOneBy({ id: id });
        if (!product) {
            res.status(404).json({ mensagem: "Produto não encontrado" });
            return;
        }
        await productRepository.delete(product.id);
        res.status(200).json({ mensagem: "Produto deletado com sucesso!" });
        return;
    }
    ;
}
exports.ProductController = ProductController;
