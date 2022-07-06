import TransactionRepository from '../../../application/repositories/Transaction';
import TransactionEntity from '../../../domain/entities/Transaction';
import TransactionTypeEntity from '../../../domain/entities/TransactionType';
import TransactionValueEntity from '../../../domain/entities/TransactionValue';

export default class UpdateTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  public async run(id: string, data: TransactionEntity) {
    let typeOrError;
    let valueOrError;
    const dataValidated = {
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
