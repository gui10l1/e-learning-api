export default interface IHashProvider {
  hash(payload: string): Promise<string>;
  compare(hash: string, payload: string): Promise<boolean>;
}
