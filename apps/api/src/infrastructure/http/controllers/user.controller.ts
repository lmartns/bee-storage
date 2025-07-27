import { UserService } from "../../../domain/services/user.service";
import { Request, Response } from "express";
import { createUserSchema } from "../dtos/createUser.dto";
import { findByIdSchema } from "../dtos/findByIdUser.dto";

export class UserController {
  constructor(private userService: UserService) {}

  async getALl(req: Request, res: Response): Promise<Response> {
    const users = await this.userService.getAll();
    return res.status(200).json(users);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const id = findByIdSchema.parse(req.params);
    const user = await this.userService.getById(id);
    return res.status(200).json(user);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = createUserSchema.parse(req.body);

      const user = await this.userService.register(data);

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).send();
    } catch (error: any) {
      return res.status(400).json({ message: error });
    }
  }
}
