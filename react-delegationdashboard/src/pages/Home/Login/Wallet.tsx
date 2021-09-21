import { Address, WalletProvider } from '@elrondnetwork/erdjs';
import React, { useEffect } from 'react';
import { useContext, useDispatch } from 'context';
import { getItem, removeItem, setItem } from 'storage/session';
import { AccountType } from 'helpers/contractDataDefinitions';
import { useLocation } from 'react-router-dom';
import { network } from 'config';

const WalletLogin = () => {
  const dispatch = useDispatch();
  const { dapp } = useContext();

  const { search } = useLocation();
  const handleOnClick = () => {
    dispatch({ type: 'loading', loading: true });
    dapp.provider
      .init()
      .then(async initialised => {
        if (initialised) {
          // Wallet provider will redirect, we can set a session information so we know when we are getting back
          //  that we initiated a wallet provider login
          setItem('wallet_login', {}, 60); // Set a 60s session only
          await dapp.provider.login();
        } else {
          dispatch({ type: 'loading', loading: true });
          console.warn('Something went wrong trying to redirect to wallet login..');
        }
      })
      .catch(err => {
        dispatch({ type: 'loading', loading: false });
        console.warn(err);
      });
  };

  const walletLogin = () => {
    if (getItem('wallet_login')) {
      dispatch({ type: 'loading', loading: true });
      dapp.provider.init().then(initialised => {
        if (!initialised) {
          dispatch({ type: 'loading', loading: false });
          return;
        }
        const urlSearchParams = new URLSearchParams(search);
        const params = Object.fromEntries(urlSearchParams as any);
        const address = params?.address;
        if (address !== undefined && new Address(params.address)) {
          removeItem('wallet_login');
          dispatch({ type: 'login', address });
          dapp.proxy
            .getAccount(new Address(address))
            .then(account =>
              dispatch({
                type: 'setAccount',
                account: new AccountType(account.balance.toString(), account.nonce),
              })
            )
            .catch(err => {
              console.log({ err });
              dispatch({ type: 'loading', loading: false });
            });
        }
        removeItem('wallet_login');
        dispatch({ type: 'loading', loading: false });
        return;
      });
    }
  };

  useEffect(walletLogin, /* eslint-disable react-hooks/exhaustive-deps */ [dapp.provider]);

  return (
    <button onClick={handleOnClick} className="btn btn-primary px-sm-spacer mx-1 mx-sm-3">
      Wallet
    </button>
  );
};

export default WalletLogin;
