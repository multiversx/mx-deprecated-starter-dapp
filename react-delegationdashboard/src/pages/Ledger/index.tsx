import React from 'react';
import { useContext, useDispatch } from 'context';
import AddressTable from './AddressTable';
import ConfirmedAddress from './ConfirmedAddress';
import { HWProvider } from '@elrondnetwork/erdjs/out';
import { useHistory } from 'react-router-dom';
import LedgerConnect from './LedgerConnect';

const Ledger = () => {
  const { dapp } = useContext();
  const dispatch = useDispatch();
  const history = useHistory();
  const { ledgerAccount } = useContext();
  const [error, setError] = React.useState('');
  const [showAddressTable, setShowAddressTable] = React.useState(false);

  const onClick = () => {
    setError('');
    if (ledgerAccount !== undefined) {
      const hwWalletP = new HWProvider(dapp.proxy);
      hwWalletP
        .init()
        .then((success: any) => {
          if (!success) {
            dispatch({ type: 'loading', loading: false });
            console.warn('could not initialise ledger app, make sure Elrond app is open');
            return;
          }

          hwWalletP
            .login()
            .then(address => {
              dispatch({ type: 'setProvider', provider: hwWalletP });
              dispatch({ type: 'login', address });
              history.push('/dashboard');
            })
            .catch((err: any) => {
              setError('Check if Elrond app is open on Ledger');
              dispatch({ type: 'loading', loading: false });
              console.warn(err);
            });
        })
        .catch(error => {
          console.error('error ', error);
        });
    } else {
      setShowAddressTable(true);
    }
  };
  return (
    <>
      {(() => {
        switch (true) {
          case ledgerAccount !== undefined && !error:
            return <ConfirmedAddress />;
          case showAddressTable && !error:
            return (
              <AddressTable
                setShowAddressTable={setShowAddressTable}
                onClick={onClick}
                setError={setError}
              />
            );
          case error !== '':
            return <LedgerConnect onClick={onClick} error={error} />;
          default:
            return <LedgerConnect onClick={onClick} error={error} />;
        }
      })()}
    </>
  );
};

export default Ledger;
