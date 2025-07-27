import { IUserRepository } from "../../../repositories/user.repository";
import { DeleteUserCaseInput, DeleteUserUseCase } from "./delete-user.use-case";

export class DeleteUserService implements DeleteUserUseCase {
    constructor(private readonly userRepository: IUserRepository) {}


    async execute(input: DeleteUserCaseInput) {
        const userId = await  this.userRepository.findById(input.id)

        if (!userId) {
            throw new Error ("Not find this ID")
        }

        await this.userRepository.delete(input.id)
    }
}