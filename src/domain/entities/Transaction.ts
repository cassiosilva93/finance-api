interface ITransaction {
  id: string;
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
  created_at: Date;
  updated_at: Date;
}

export default class Transaction {
  public readonly id: string;

  public readonly title: string;

  public readonly type: string;

  public readonly value: number;

  public readonly category: string;

  public readonly created_at: Date;

  public readonly updated_at: Date;

  constructor({
    id,
    title,
    type,
    value,
    category,
    created_at,
    updated_at,
  }: ITransaction) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.value = value;
    this.category = category;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
