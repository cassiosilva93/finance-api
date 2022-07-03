import IncorrectType from '../errors/IncorrectType';
import MinimumValue from '../errors/MinimumValue';
import RequiredProperty from '../errors/RequiredProperty';
import TransactionTypeEntity from './TransactionType';
import TransactionValueEntity from './TransactionValue';

export default class Transaction {
  public readonly id: string;

  public readonly title: string;

  public readonly type: TransactionTypeEntity;

  public readonly value: TransactionValueEntity;

  public readonly category: string;

  public readonly created_at: Date;

  public readonly updated_at: Date;

  constructor(
    id: string,
    title: string,
    type: TransactionTypeEntity,
    value: TransactionValueEntity,
    category: string,
    created_at: Date,
    updated_at: Date,
  ) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.value = value;
    this.category = category;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static create(
    id: string,
    title: string,
    type: string,
    value: number,
    category: string,
    created_at: Date,
    updated_at: Date,
  ): Transaction | RequiredProperty | MinimumValue | IncorrectType {
    const typeOrError = TransactionTypeEntity.create(type);
    const valueOrError = TransactionValueEntity.create(value);
    if (typeOrError instanceof Error) return typeOrError;
    if (valueOrError instanceof Error) return valueOrError;
    return new Transaction(
      id,
      title,
      typeOrError,
      valueOrError,
      category,
      created_at,
      updated_at,
    );
  }
}
