interface ITransaction {
  id: string;
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

export default class Transaction {
  public readonly id: string;

  public readonly title: string;

  public readonly type: string;

  public readonly value: number;

  public readonly category: string;

  constructor({ id, title, type, value, category }: ITransaction) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.value = value;
    this.category = category;
  }
}
