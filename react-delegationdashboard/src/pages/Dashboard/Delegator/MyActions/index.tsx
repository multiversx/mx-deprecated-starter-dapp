import React from 'react';
import { useContext } from 'context';
import { contractViews } from 'contracts/ContractViews';
import DelegateAction from './DelegateAction';
import UndelegateAction from './UndelegateAction/Index';

const MyActions = () => {
  const { dapp, delegationContract, address } = useContext();
  const [displayUndelegate, setDisplayUndelegate] = React.useState(false);
  const { getUserActiveStake } = contractViews;

  React.useEffect(() => {
    getUserActiveStake(dapp, address, delegationContract)
      .then(result => {
        if (result.returnData.length > 0 && result.returnData[0]?.asNumber !== 0) {
          setDisplayUndelegate(true);
        }
      })
      .catch(e => console.error('getUserActiveStake error', e));
  }, []);

  return (
    <>
      <DelegateAction />
      {displayUndelegate ? <UndelegateAction /> : <></>}
    </>
  );
};

export default MyActions;
