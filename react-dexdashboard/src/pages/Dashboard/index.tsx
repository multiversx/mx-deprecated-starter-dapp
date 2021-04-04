import React, { useEffect } from 'react';
import { useContext, useDispatch } from 'context';
import Delegation from './Delegation';
import PendingUndelegated from './PendingUndelegated';
import { Redirect } from 'react-router-dom';
import Overview from 'components/Overview';
import { Address } from '@elrondnetwork/erdjs/out';
import { AccountType } from 'helpers/contractDataDefinitions';
import State from 'components/State';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { getItem } from 'storage/session';
import {
  Container,
  Grid
} from '@material-ui/core';


const Dashboard = () => {
  const { loggedIn, dapp, address, networkConfig, ledgerAccount } = useContext();
  const dispatch = useDispatch();

  if (!loggedIn) {
    return <Redirect to="/" />;
  }

  const fetchAccount = () => {
    dapp.proxy.getAccount(new Address(address)).then(account => {
      dispatch({
        type: 'setAccount',
        account: new AccountType(account.balance.toString(), account.nonce),
      });
    });
    if (getItem('ledgerLogin') && !ledgerAccount) {
      const ledgerLogin = getItem('ledgerLogin');
      dispatch({
        type: 'setLedgerAccount',
        ledgerAccount: {
          index: ledgerLogin.index,
          address: address,
        },
      });
    }
  };
  useEffect(fetchAccount, []);

  return (
    <Container>
      <Delegation />
    </Container>
  );
};

export default Dashboard;
