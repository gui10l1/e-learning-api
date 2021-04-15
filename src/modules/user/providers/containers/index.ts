import { container } from 'tsyringe';

import HashProvider from '../HashProvider/implementations/HashProvider';
import IHashProvider from '../HashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', HashProvider);
