import MinimumValue from '../errors/MinimumValue';
import RequiredProperty from '../errors/RequiredProperty';

export default class TransactionValue {
  public constructor(public readonly value: number) {}

  static isValid(value: number): boolean | RequiredProperty | MinimumValue {
    if (value <= 0) return new MinimumValue();
    return true;
  }

  static create(
    value: number,
  ): MinimumValue | RequiredProperty | TransactionValue {
    const validOrError = this.isValid(value);
    if (validOrError instanceof Error) return validOrError;
    return new TransactionValue(value);
  }
}
