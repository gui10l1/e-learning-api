import { hash, compare } from 'bcrypt';

import IHashProvider from '../models/IHashProvider';

class HashProvider implements IHashProvider {
  public async hash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compare(hashed: string, payload: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default HashProvider;
