import IUsersRepositoryDTO from '../dtos/IUsersRepositoryDTO';
import User from '../infra/database/typeorm/entities/User';

export default interface IUsersRepository {
  create(data: IUsersRepositoryDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
