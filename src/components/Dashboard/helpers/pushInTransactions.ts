import { TransactionType } from 'context/state';

export default function pushInTransactions(
  oldTransactions: TransactionType[],
  fetchedTransactions: TransactionType[]
) {
  if (oldTransactions.length === 0) {
    return fetchedTransactions;
  }

  const hashes = fetchedTransactions.map((transaction: TransactionType) => transaction.hash);

  const oldHashes = oldTransactions.map((transaction: TransactionType) => transaction.hash);

  const overwriteTransactions = oldTransactions.map((transaction: TransactionType) => {
    const transactionInFetched = hashes.includes(transaction.hash);
    if (transactionInFetched) {
      const hashPosition = hashes.indexOf(transaction.hash);
      const overwriteTransaction = fetchedTransactions[hashPosition];
      return overwriteTransaction;
    } else {
      return transaction;
    }
  });

  const newTransactions = fetchedTransactions.filter(
    (transaction: TransactionType) => !oldHashes.includes(transaction.hash)
  );
  return [...overwriteTransactions, ...newTransactions];
}
