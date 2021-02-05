import { Address } from '@elrondnetwork/erdjs/out';
import React, { useEffect, useState } from 'react';
import { useContext } from 'context';
import { contractViews } from 'contracts/ContractViews';
import denominate from 'components/Denominate/formatters';
import NodesTable from './NodesTable';
import StakeProviderActionsContainer from './StakeProviderActionsContainer';
import StakeProviderViews from './StakeProviderViews';

const StakeProviderArea = () => {
  const { dapp, address, delegationContract, decimals, denomination } = useContext();
  const { getContractConfig } = contractViews;
  const [isOwner, setIsOwner] = useState(false);
  const [serviceFee, setServiceFee] = useState('0');
  const [maxDelegationCap, setMaxDelegationCap] = useState('0');

  const getContractConfiguration = () => {
    getContractConfig(dapp, delegationContract)
      .then(value => {
        let ownerAddress = value.returnData[0].asHex;
        let loginAddress = new Address(address).hex();
        setIsOwner(loginAddress.localeCompare(ownerAddress) < 0 ? false : true);
        setServiceFee((parseFloat(value.returnData[1].asHex) / 100).toString());
        let delegationCap = denominate({
          decimals,
          denomination,
          input: value.returnData[2].asBigInt.toString(),
          showLastNonZeroDecimal: false,
        });
        setMaxDelegationCap(delegationCap || '0');
      })
      .catch(e => console.error('getContractConfig error ', e));
  };

  useEffect(getContractConfiguration, []);

  if (!isOwner) {
    return <></>;
  }

  return (
    <>
      <StakeProviderViews serviceFee={serviceFee} maxDelegationCap={maxDelegationCap} />
      <StakeProviderActionsContainer />
      <NodesTable />
    </>
  );
};

export default StakeProviderArea;
