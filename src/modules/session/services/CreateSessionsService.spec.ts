import FakeUsersRepository from '@modules/user/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/user/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

import CreateSessionsService from './CreateSessionsService';

let createSessionsService: CreateSessionsService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe('CreateSessions', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSessionsService = new CreateSessionsService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should not be able to create a session when the email is incorrect', async () => {
    const { password } = await fakeUsersRepository.create({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: '123456',
    });

    await expect(
      createSessionsService.execute({
        email: 'wrong@email.com',
        password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a session when the password is incorrect', async () => {
    const { email } = await fakeUsersRepository.create({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: '123456',
    });

    await expect(
      createSessionsService.execute({
        email,
        password: 'wrongpassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a session', async () => {
    const { email, password, id } = await fakeUsersRepository.create({
      email: 'johndoe@exemple.com',
      name: 'John Doe',
      password: '123456',
    });

    const { token, user } = await createSessionsService.execute({
      email,
      password,
    });

    expect(user.name).toBe('John Doe');
    expect(user.id).toBe(id);
    expect(token);
  });
});
