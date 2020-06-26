import React from 'react';
import { useContext } from 'context';
import { ReactComponent as NoTransactionsIcon } from 'assets/img/chat-smile-3-line.svg';
import TransactionsList from './TransactionsList';
import { PageState } from 'sharedComponents';

const Transactions = () => {
  const { newTransactions } = useContext();

  return newTransactions.length > 0 ? (
    <TransactionsList transactions={newTransactions} />
  ) : (
    <div className="my-5">
      <PageState
        svgComponent={<NoTransactionsIcon />}
        title="No Transactions"
        description="No transactions found for this wallet."
      />
    </div>
  );
};

export default Transactions;
