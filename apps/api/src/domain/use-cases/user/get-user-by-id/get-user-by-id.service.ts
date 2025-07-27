import { IUserRepository } from "../../../repositories/user.repository";
import { GetByIdCaseInput, GetByIdCaseOutput, GetByIdUseCase } from "./get-user-by-id.use-case";

export class GetByIdService implements GetByIdUseCase {
    constructor(private readonly userRepository: IUserRepository) {}

    async execute(input: GetByIdCaseInput): Promise<GetByIdCaseOutput> {
        const userEntity = await this.userRepository.findById(input.id)
        
        return userEntity;
    }
}