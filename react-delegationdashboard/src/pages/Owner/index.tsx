import { Redirect } from 'react-router-dom';
import { Address } from '@elrondnetwork/erdjs/out';
import { useEffect } from 'react';
import { useContext, useDispatch } from 'context';
import Overview from 'components/Overview';
import Nodes from './Nodes';
import { AccountType } from 'helpers/contractDataDefinitions';
import { getItem } from 'storage/session';

const Owner = () => {
  const { address, contractOverview, loggedIn, dapp, ledgerAccount } = useContext();
  const dispatch = useDispatch();
  const isOwner = () => {
    let loginAddress = new Address(address).hex();
    return loginAddress.localeCompare(contractOverview.ownerAddress) === 0;
  };

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

  if (!loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {isOwner() ? (
        <div className="owner w-100">
          <div className="card border-0">
            <Overview />
            <div className="card-body pt-0 px-spacer pb-spacer">
              <Nodes />
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/dashboard" />
      )}
    </>
  );
};

export default Owner;
