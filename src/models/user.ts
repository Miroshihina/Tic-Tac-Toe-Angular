export class User {

  get UserName(): string {
    return this._UserName;
  }

  get Id(): string {
    return this._Password;
  }

  readonly _Password: string;
  readonly _UserName: string;

  constructor(password: string, userName: string) {
    this._Password = password;

    this._UserName = userName;
  }

}
