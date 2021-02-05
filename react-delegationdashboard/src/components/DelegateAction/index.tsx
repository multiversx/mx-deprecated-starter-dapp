import React, { useEffect, useState } from 'react';
import { useContext } from '../../context';
import DelegateModal from '../DelegateModal';
import Delegation from '../../contracts/Delegation';
import { Address } from '@elrondnetwork/erdjs/out';

const DelegateAction = () => {
  const { dapp, erdLabel, delegationContract, address } = useContext();
  const [balance, setBalance] = useState('');
  const [showDelegateModal, setShowDelegateModal] = useState(false);
  useEffect(() => {
    dapp.proxy.getAccount(new Address(address)).then((value) => setBalance(value.balance.toString()));
  }, [address, dapp.proxy]);

  const handleDelegate = (value: string) => {
    const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
    delegation.sendTransaction(value, 'delegate').then();
  };
  return (
    <div>
      <button onClick={() => setShowDelegateModal(true)} className="btn btn-primary mt-3">
        Delegate
      </button>
      <DelegateModal show={showDelegateModal} title="Delegate now" description={`Select the amount of ${erdLabel} you want to delegate.`}
        balance={balance} handleClose={() => {
          setShowDelegateModal(false);
        }} handleContinue={(value) => handleDelegate(value)} />
    </div>
  );
};

export default DelegateAction;
