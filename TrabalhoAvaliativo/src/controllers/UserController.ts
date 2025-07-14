import { User } from "../models/User";
import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import bcrypt from "bcryptjs";

const userRepository = AppDataSource.getRepository(User);

export class UserController {
  async createUser(req: Request, res: Response) {
    const { email, password } = req.body;

    if(!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const existEmail = await userRepository.findOneBy({ email });

    if (existEmail) {
      res.status(409).json({ message: "Email already exists" });
      return;
    }
    const user = new User(email, password);
    await userRepository.save(user);

    res
      .status(201)
      .json({ message: "User created successfully!", usuario: user });
    return;
  }

  async login(req: Request, res: Response) {
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

    const isValid = await bcrypt.compare(password, existEmail.password);

    if (!isValid) {
      res.status(401).json({ message: "Senha invalida" });
      return;
    }

    res.status(200).json({ message: "Login realizado com sucesso!", user: existEmail});
    return;
  }

  async show(req: Request, res: Response) {
        const { id } = req.params;

        const user = await userRepository.findOneBy({ id: Number(id) });

        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        res.json({id: user.id, email:user.email});
        return;
  }

  async getByEmail(req: Request, res: Response) {
        const { email } = req.params;

        const user = await userRepository.findOneBy({ email });

        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        res.json({id: user.id, email:user.email});
        return;
    }
}