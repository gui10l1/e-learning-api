export default class AppError {
  public readonly message: string;

  public readonly code: number;

  constructor(message: string, code = 404) {
    this.code = code;
    this.message = message;
  }
}
