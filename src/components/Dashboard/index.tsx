import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ReactComponent as Unavailable } from 'assets/img/unavailable.svg';
import { useContext, useDispatch } from 'context';
import initialState from 'context/state';
import { getWalletDetails, getLatestTransactions } from './helpers/asyncRequests';
import pushInTransactions from './helpers/pushInTransactions';
import { PageState } from 'sharedComponents';
import { addressIsBech32 } from 'helpers';
import TopInfo from './TopInfo';
import Actions from './Actions';
import Transactions from './Transactions';

const Dashboard = () => {
  const ref = React.useRef(null);
  const { search } = useLocation();
  const history = useHistory();
  const {
    balance,
    newTransactions: transactions,
    timeout,
    detailsFetched,
    config: { nodeUrl, elasticUrl, contractAddress },
  } = useContext();

  const dispatch = useDispatch();

  const setAddress = () => {
    const address = new URLSearchParams(search).get('accountAddress') || '';
    if (addressIsBech32(address)) {
      fetchData(address);
    } else {
      history.push('/');
    }
  };

  React.useEffect(setAddress, [search]);

  const fetchData = (accountAddress: string) => {
    if (accountAddress) {
      Promise.all([
        getWalletDetails({
          accountAddress,
          nodeUrl,
          timeout,
        }),
        getLatestTransactions({ elasticUrl, accountAddress, timeout, contractAddress }),
      ]).then(([walletData, transactionData]: any) => {
        const { balance: newBalance, nonce, detailsFetched: balanceFetched } = walletData;
        const { transactions: newTransactions, transactionsFetched } = transactionData;

        const detailsFetched = transactionsFetched && balanceFetched;
        const initialCallFailed =
          (!transactionsFetched || !balanceFetched) &&
          balance === initialState().balance &&
          transactions.length === 0;
        dispatch({ type: 'login', accountAddress });
        if (detailsFetched) {
          dispatch({
            type: 'setBalanceAndTransactions',
            newTransactions: pushInTransactions(transactions, newTransactions),
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
  };

  const unavailable = !detailsFetched && balance === '';

  const loading =
    !detailsFetched && (transactions.length === 0 || balance === initialState().balance);

  switch (true) {
    case unavailable:
      return <PageState svgComponent={<Unavailable />} title="Unavailable" />;

    case loading:
      return <PageState svgComponent={<></>} spin />;

    default:
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
  }
};

export default Dashboard;
