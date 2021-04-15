import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUsersService from './CreateUsersService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let createUsersService: CreateUsersService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUsersService = new CreateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should not be able to create a user with duplicated email', async () => {
    await fakeUsersRepository.create({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: '123456',
    });

    await expect(
      createUsersService.execute({
        email: 'johndoe@exemple.com',
        name: 'John Tre',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a user', async () => {
    const user = await createUsersService.execute({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it("should be able to hash the user's password", async () => {
    const spy = jest.spyOn(fakeHashProvider, 'hash');

    await createUsersService.execute({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: '123456',
    });

    expect(spy).toHaveBeenCalled();
  });
});
