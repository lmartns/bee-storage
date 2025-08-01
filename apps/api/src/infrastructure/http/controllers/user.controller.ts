import { Request, Response } from "express";
import { CreateUserService } from "../../../domain/use-cases/user/create-user/create-user.service";
import { FindUserService } from "../../../domain/use-cases/user/find-user/find-user.service";
import { ListUsersService } from "../../../domain/use-cases/user/list-users/list-users.service";
import { DeleteUserService } from "../../../domain/use-cases/user/delete-user/delete-user.service";
import { toSafeUser } from "../../../helpers/safe-user";
import { createDtoSchema } from "../dtos/user/create.dto";
import { idParamDtoSchema } from "../dtos/user/id-param.dto";
import { UpdateUserService } from "../../../domain/use-cases/user/update-user/update-user.service";
import { UpdateDtoSchema } from "../dtos/user/update-dto";

export class UserController {
  constructor(
    private readonly createUser: CreateUserService,
    private readonly findUser: FindUserService,
    private readonly listUsers: ListUsersService,
    private readonly updateUser: UpdateUserService,
    private readonly deleteUser: DeleteUserService
  ) {}

  async listAll(req: Request, res: Response): Promise<Response> {
    const users = await this.listUsers.execute();
    return res.status(200).json(users.map(toSafeUser));
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const id = idParamDtoSchema.parse(req.params);
    const user = await this.findUser.execute(id);
    return res.status(200).json(user);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = createDtoSchema.parse(req.body);

      const user = await this.createUser.execute(data);

      return res.status(201).json(toSafeUser(user));
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

 async update(req: Request, res: Response): Promise<Response> {
  try {
    const id = idParamDtoSchema.parse(req.params).id;
    const data = UpdateDtoSchema.parse(req.body);

    const user = await this.updateUser.execute({ id, ...data });

    return res.status(200).json(toSafeUser(user));
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = idParamDtoSchema.parse(req.params);
      await this.deleteUser.execute(id);
      return res.status(200).send();
    } catch (error: any) {
      return res.status(400).json({ message: error });
    }
  }
}
