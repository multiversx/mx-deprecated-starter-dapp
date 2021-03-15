import React from 'react';
import { useContext, useDispatch } from 'context';
import AddressTable from './AddressTable';
import ConfirmedAddress from './ConfirmedAddress';
import LedgerConnect from './LedgerConnect';
import { HWProvider } from '@elrondnetwork/erdjs/out';
import { useHistory } from 'react-router-dom';

const Ledger = () => {
  const { dapp } = useContext();
  const dispatch = useDispatch();
  const history = useHistory();
  const { ledgerAccount } = useContext();
  const [showAddressTable, setShowAddressTable] = React.useState(false);

  const onClick = () => {
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
              debugger;
              dispatch({ type: 'setProvider', provider: hwWalletP });
              dispatch({ type: 'login', address });
              history.push('/dashboard');
              // return <Redirect to="/dashboard" />;
            })
            .catch((err: any) => {
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

  switch (true) {
    case ledgerAccount !== undefined:
      return <ConfirmedAddress />;
    case showAddressTable:
      return <AddressTable setShowAddressTable={setShowAddressTable} onClick={onClick} />;
    default:
      return <LedgerConnect onClick={onClick} />;
  }
};

export default Ledger;
