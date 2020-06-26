import React from 'react';
import { useContext } from 'context';
import TransactionsList from './TransactionsList';
import { PageState } from 'sharedComponents';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Transactions = () => {
  const { newTransactions } = useContext();

  return newTransactions.length > 0 ? (
    <TransactionsList transactions={newTransactions} />
  ) : (
    <div className="my-5">
      <PageState
        svgComponent={<FontAwesomeIcon icon={faExchangeAlt} className="text-muted fa-3x" />}
        title="No Transactions"
      />
    </div>
  );
};

export default Transactions;
