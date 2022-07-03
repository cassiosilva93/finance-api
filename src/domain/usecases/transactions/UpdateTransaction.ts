import TransactionEntity from '@src/domain/entities/Transaction';
import TransactionTypeEntity from '@src/domain/entities/TransactionType';
import TransactionValueEntity from '@src/domain/entities/TransactionValue';
import TransactionRepository from '@src/domain/repositories/Transaction';

export default class UpdateTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(id: string, data: TransactionEntity) {
    let typeOrError;
    let valueOrError;
    let dataValidated = {
      ...data,
    } as any;
    if (data.type)
      typeOrError = TransactionTypeEntity.create(String(data.type));
    if (typeOrError instanceof Error) return typeOrError;
    if (data.value || Number(data.value) >= 0)
      valueOrError = TransactionValueEntity.create(Number(data.value));
    if (valueOrError instanceof Error) return valueOrError;
    if (typeOrError) dataValidated.type = typeOrError.type;
    if (valueOrError) dataValidated.value = valueOrError.value;
    const transaction = await this.transactionRepository.update(
      id,
      dataValidated,
    );
    return transaction;
  }
}
