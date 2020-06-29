import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useContext, useDispatch } from 'context';
import initialState from 'context/state';
import { getWalletDetails, getLatestTransactions } from './helpers/asyncRequests';
import pushInTransactions from './helpers/pushInTransactions';
import { PageState } from 'sharedComponents';
import { addressIsBech32 } from 'helpers';
import TopInfo from './TopInfo';
import Actions from './Actions';
import Transactions from './Transactions';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      return (
        <PageState
          svgComponent={<FontAwesomeIcon icon={faBan} className="text-secondary fa-3x" />}
          title="Unavailable"
          className="dapp-icon icon-medium"
        />
      );

    case loading:
      return <PageState svgComponent={<></>} spin />;

    default:
      return (
        <div className="container py-4" ref={ref}>
          <div className="row">
            <div className="col-12 col-md-10 mx-auto">
              <div className="card shadow-sm rounded border-0">
                <div className="card-body p-1">
                  <div className="card rounded border-0 bg-primary">
                    <div className="card-body text-center p-4">
                      <TopInfo />
                      <Actions />
                    </div>
                  </div>
                  <Transactions />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default Dashboard;
