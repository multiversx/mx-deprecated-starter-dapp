import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useContext, useDispatch } from 'context';
import { HWProvider } from '@elrondnetwork/erdjs/out';
import { faChevronLeft, faChevronRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import AddressRow from './AddressRow';
import LedgerConnect from './LedgerConnect';
import { useHistory } from 'react-router-dom';
import State from 'components/State';

const AddressTable = ({
  setShowAddressTable,
  onClick,
}: {
  setShowAddressTable: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
}) => {
  const { dapp, loading } = useContext();
  const dispatch = useDispatch();
  const [startIndex, setStartIndex] = React.useState(0);
  const [accounts, setAccounts] = React.useState<string[]>([]);
  const [error, setError] = React.useState('');
  const [selectedAddress, setSelectedAddress] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState<number | undefined>();
  const hwWalletP = new HWProvider(dapp.proxy);
  const history = useHistory();

  const fetchAccounts = () => {
    dispatch({ type: 'loading', loading: true });
    hwWalletP.init().then((success: any) => {
      if (!success) {
        dispatch({ type: 'loading', loading: false });
        console.warn('could not initialise ledger app, make sure Elrond app is open');
        return;
      }
      hwWalletP
        .getAccounts(startIndex, 5)
        .then(accounts => {
          setAccounts(accounts);
          dispatch({ type: 'loading', loading: false });
        })
        .catch(e => {
          dispatch({ type: 'loading', loading: false });
          console.log('error', e);
          setError('Check if Elrond app is open on Ledger');
        });
    });
  };

  React.useEffect(fetchAccounts, [startIndex]);

  const goToNext = () => {
    setSelectedAddress('');
    setStartIndex(current => current + 1);
  };

  const goToPrev = () => {
    setSelectedAddress('');
    setStartIndex(current => (current === 0 ? 0 : current - 1));
  };

  const setAddress = () => {
    if (selectedIndex !== undefined) {
      dispatch({
        type: 'setLedgerAccount',
        ledgerAccount: {
          index: selectedIndex,
          address: selectedAddress,
        },
      });

      dispatch({
        type: 'ledgerLogin',
        ledgerLogin: {
          index: selectedIndex,
          loginType: 'ledger',
        },
      });
      dispatch({ type: 'loading', loading: true });
      const hwWalletProvider = new HWProvider(dapp.proxy, selectedIndex);
      hwWalletProvider
        .init()
        .then((success: any) => {
          if (!success) {
            dispatch({ type: 'loading', loading: false });
            console.warn('could not initialise ledger app, make sure Elrond app is open');
            return;
          }

          hwWalletProvider
            .login()
            .then(address => {
              dispatch({ type: 'setProvider', provider: hwWalletProvider });
              dispatch({ type: 'login', address });

              history.push('/dashboard');
            })
            .catch((err: any) => {
              dispatch({ type: 'loading', loading: false });
              console.warn(err);
            });
        })
        .catch((err: any) => {
          dispatch({ type: 'loading', loading: false });
          console.warn('could not initialise ledger app, make sure Elrond app is open', err);
        });
      setShowAddressTable(false);
    }
  };

  switch (true) {
    case loading:
      return (
        <State icon={faCircleNotch} iconClass="fa-spin text-primary" title="Waiting for device" />
      );
    case error !== '':
      return <LedgerConnect onClick={onClick} />;

    default:
      return (
        <>
          <div className="m-auto">
            <div className="card my-spacer text-center">
              <div className="card-body p-spacer mx-lg-spacer">
                <div className="table-responsive" data-testid="ledgerAddresses">
                  <table className="table m-0 border-bottom">
                    <thead className="py-2 text-semibold border-bottom">
                      <tr>
                        <th className="text-left border-0">Address</th>
                        <th className="text-left border-0">#</th>
                      </tr>
                    </thead>
                    <tbody data-testid="addressesTable">
                      {accounts.map((account, index) => {
                        const props = {
                          account,
                          index: index + startIndex * 10,
                          selectedAddress,
                          setSelectedAddress,
                          setSelectedIndex,
                          key: index,
                        };
                        return <AddressRow {...props} />;
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-center pager mt-2">
                  <button
                    type="button"
                    className="btn btn-link px-2"
                    onClick={goToPrev}
                    data-testid="prevBtn"
                  >
                    <FontAwesomeIcon size="sm" icon={faChevronLeft} /> Prev
                  </button>
                  <button
                    type="button"
                    className="btn btn-link px-2"
                    onClick={goToNext}
                    data-testid="nextBtn"
                  >
                    Next <FontAwesomeIcon size="sm" icon={faChevronRight} />
                  </button>
                </div>
                <div className="mt-3">
                  {error && (
                    <p className="text-danger m-0 pb-3" data-testid="ledgerError">
                      {error}
                    </p>
                  )}
                </div>
                <button
                  className="btn btn-primary px-spacer mt-4"
                  disabled={selectedAddress === ''}
                  onClick={setAddress}
                  data-testid="confirmBtn"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      );
  }
};

export default AddressTable;
