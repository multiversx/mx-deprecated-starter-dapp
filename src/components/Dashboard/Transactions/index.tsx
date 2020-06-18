import React from 'react';
import { useContext } from 'context';
import NoTransactions from './NoTransactions';
import TransactionsList from './TransactionsList';
import { PageState } from 'sharedComponents';

const Transactions = () => {
  const { newTransactions, accountAddress } = useContext();
  const [fristLogin, setFirstLogin] = React.useState(false);

  const checkFirstLogin = () => {
    setFirstLogin(sessionStorage.getItem('created') === accountAddress);
    return () => {
      sessionStorage.clear();
    };
  };

  React.useEffect(checkFirstLogin, []);

  return (
    <>
      {newTransactions.length > 0 ? (
        <TransactionsList transactions={newTransactions} />
      ) : (
        <>
          {fristLogin ? (
            <PageState
              svgComponent={null}
              title="Welcome"
              description="No transactions found for this wallet"
            />
          ) : (
            <NoTransactions />
          )}
        </>
      )}
    </>
  );
};

export default Transactions;
