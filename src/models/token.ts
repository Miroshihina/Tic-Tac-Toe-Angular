export class Token {

  set Value(value: string) {
    this._Value = value;
  }
  get Value(): string {
    return this._Value;
  }

  private _Value!: string;
}
