interface ITransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

export default class Transaction {
  public readonly title: string;
  public readonly type: string;
  public readonly value: number;
  public readonly category: string;

  constructor({ title, type, value, category }: ITransaction) {
    this.title = title;
    this.type = type;
    this.value = value;
    this.category = category;
  }
}
