import React, { useEffect, useState } from 'react';
import { Address } from '@elrondnetwork/erdjs/out';
import { useContext } from 'context';
import DelegateModal from '../DelegateModal';
import { useDelegation } from 'helpers';

const DelegateAction = () => {
  const { dapp, erdLabel, address } = useContext();
  const { delegation } = useDelegation();
  const [balance, setBalance] = useState('');
  const [showDelegateModal, setShowDelegateModal] = useState(false);
  useEffect(() => {
    dapp.proxy.getAccount(new Address(address)).then(value => setBalance(value.balance.toString()));
  }, [address, dapp.proxy]);

  const handleDelegate = (value: string) => {
    delegation
      .sendTransaction(value, 'delegate')
      .then()
      .catch(e => {
        console.log('handleDelegate ', e);
      });
  };
  return (
    <div>
      <button
        onClick={() => {
          setShowDelegateModal(true);
        }}
        className="btn btn-primary mt-3"
      >
        Delegate
      </button>
      <DelegateModal
        show={showDelegateModal}
        title="Delegate now"
        description={`Select the amount of ${erdLabel} you want to delegate.`}
        balance={balance}
        handleClose={() => {
          setShowDelegateModal(false);
        }}
        handleContinue={handleDelegate}
      />
    </div>
  );
};

export default DelegateAction;
