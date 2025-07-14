import { Request, Response } from "express";
import { Product } from "../models/Product";
import { AppDataSource } from "../config/data-source";
import { User } from "../models/User";

const productRepository = AppDataSource.getRepository(Product);
const userRepository = AppDataSource.getRepository(User);

export class ProductController{

  // Criar um novo produto
  public async createProduct(req: Request, res: Response){
    try{
      const {name, description, price, userId, image, brand, model } = req.body
  
      const user = await userRepository.findOneBy({id:userId})

    
      if(!name || price === undefined || !description || !userId || !image){
        res.status(400).json({ mensagem: "Todos os dados devem ser fornecidos - name, description, price e user"})
        return;
      }

      if(user){
        const newProduct = new Product(name, price, description, image, user);
        newProduct.brand = brand;
        newProduct.model = model;
    
        await productRepository.save(newProduct);
      
        console.log("Produto criado com sucesso!")
  
        res.status(201).json({ mensagem: "Produto criado com sucesso!", user});
        return;
      } else {
        console.error("Erro, usario não encontrado -> ProductController.createProduct. userId = " + userId)
        return;
      }
      

    } catch(error){
      console.log("Erro em createProduct")
    }
  };
  
  // Listar todos os produtos
  public async listProducts(req: Request, res: Response){
    try {
        const products = await productRepository.find({
            relations: ["user"]
        });
        res.status(200).json(products);
    } catch (error) {
        console.error("Erro ao listar produtos", error);
        res.status(500).json({ mensagem: "Erro ao listar produtos" });
    }
  };
  
  // Buscar um produto por ID
  public async findProductById(req: Request, res: Response){
    const id = Number(req.params.id);
    const product = await productRepository.findOne(
      {
        where: {id},
        relations: ["user"]
      }
      )
    if (!product) {
      res.status(404).json({ mensagem: "Produto não encontrado" });
      return;
    }
    res.status(200).json(product);
    return;
  };

  public async findByName(req:Request, res: Response){
    const { name } = req.params;

    const product = await productRepository.findOne(
      {
        where: {name},
        relations: ["user"]
      }
      )

    if(!product){
      res.status(404).json({mensage: "Produto não encontrado"})
      return;
    }

    res.status(200).json(product)
  }
  
  // Atualizar um produto
  public async updateProducts(req: Request, res: Response){
    const id = Number(req.params.id);
    const { name, price, description } = req.body;
    
    if(!id){
      res.status(400).json({mensagem:"Id é obrigatório!"})
      return;
    }
  
    if(!name && !price && !description){
      res.status(400).json({mensagem:"Um dos campos!"})
      return;
    }
  
    const product = await productRepository.findOneBy({id:id});
  
    if (!product) {
      res.status(404).json({ mensagem: "Produto não encontrado" });
      return;
    }
    
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;

    await productRepository.save(product)
  
    res.status(200).json({ mensagem: "Produto atualizado com sucesso!", product });
    return;
  };
  
  // Deletar um produto
  public async deleteProduct(req: Request, res: Response){
    const id = Number(req.params.id);
  
    if(!id){
      res.status(400).json({mensagem:"O id precisa ser fornecido!"})
      return;
    }
    const product = await productRepository.findOneBy({id:id})

    if(!product){
      res.status(404).json({ mensagem: "Produto não encontrado" });
      return;
    }

    await productRepository.delete(product.id)
    res.status(200).json({ mensagem: "Produto deletado com sucesso!" });
    return;
  };
  
}

