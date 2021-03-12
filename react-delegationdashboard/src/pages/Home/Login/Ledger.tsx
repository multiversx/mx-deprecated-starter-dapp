import React from 'react';
import { HWProvider, ProxyProvider } from '@elrondnetwork/erdjs';
import { useDispatch } from 'context';

const LedgerLogin = () => {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    const httpProvider = new ProxyProvider('');
    const hwWalletP = new HWProvider(httpProvider);

    dispatch({ type: 'loading', loading: true });
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
            // Set this provider as default inside the app
            dispatch({ type: 'setProvider', provider: hwWalletP });
            dispatch({ type: 'login', address });
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
  };
  return (
    <button onClick={handleOnClick} className="btn btn-primary px-sm-spacer mx-1 mx-sm-3" disabled>
      Ledger
    </button>
  );
};

export default LedgerLogin;
