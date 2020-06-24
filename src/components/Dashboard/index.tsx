import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { useContext, useDispatch } from 'context';
import initialState from 'context/state';
import { getWalletDetails, getLatestTransactions } from './helpers/asyncRequests';
import pushInTransactions from './helpers/pushInTransactions';
import TopInfo from './TopInfo';
import Actions from './Actions';
import Transactions from './Transactions';

const Dashboard = () => {
  const ref = React.useRef(null);
  const {
    accountAddress,
    balance,
    newTransactions: oldTransactions,
    timeout,
    config: { nodeUrl, elasticUrl },
  } = useContext();

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (accountAddress) {
      Promise.all([
        getWalletDetails({
          accountAddress,
          nodeUrl,
          timeout,
        }),
        getLatestTransactions({ elasticUrl, accountAddress, timeout }),
      ]).then(([walletData, transactionData]: any) => {
        const { balance: newBalance, nonce, detailsFetched: balanceFetched } = walletData;
        const { transactions: newTransactions, transactionsFetched } = transactionData;

        const detailsFetched = transactionsFetched && balanceFetched;
        const initialCallFailed =
          (!transactionsFetched || !balanceFetched) &&
          balance === initialState().balance &&
          oldTransactions.length === 0;

        if (detailsFetched) {
          dispatch({
            type: 'setBalanceAndTransactions',
            newTransactions: pushInTransactions(oldTransactions, newTransactions),
            balance: newBalance,
            nonce,
            detailsFetched,
          });
        } else if (initialCallFailed && balanceFetched) {
          dispatch({
            type: 'setBalanceAndTransactions',
            newTransactions,
            balance: newBalance,
            nonce,
            detailsFetched: balanceFetched,
          });
        } else if (initialCallFailed) {
          dispatch({
            type: 'setBalanceAndTransactions',
            newTransactions,
            balance: '',
            nonce,
            detailsFetched: false,
          });
        }
      });
    }
  });

  if (!accountAddress) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container pt-3 pb-3" ref={ref}>
      <div className="row">
        <div className="col-12">
          <TopInfo />
          <Actions />
        </div>
      </div>
      <Transactions />
    </div>
  );
};

export default Dashboard;
