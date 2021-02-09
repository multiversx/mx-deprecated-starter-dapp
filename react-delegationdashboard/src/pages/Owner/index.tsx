import { Address } from '@elrondnetwork/erdjs/out';
import React, { useEffect, useState } from 'react';
import { useContext } from 'context';
import { contractViews } from 'contracts/ContractViews';
import NodesTable from './NodesTable';
import Actions from './Actions';
import NetworkOverview from 'components/NetworkOverview';

const Owner = () => {
  const { dapp, address, delegationContract } = useContext();
  const { getContractConfig } = contractViews;
  const [isOwner, setIsOwner] = useState(false);

  const getContractConfiguration = () => {
    getContractConfig(dapp, delegationContract)
      .then(value => {
        let ownerAddress = value.returnData[0].asHex;
        let loginAddress = new Address(address).hex();
        setIsOwner(loginAddress.localeCompare(ownerAddress) < 0 ? false : true);
      })
      .catch(e => console.error('getContractConfig error ', e));
  };

  useEffect(getContractConfiguration, []);

  if (!isOwner) {
    <></>;
  }

  return (
    <div className="owner container py-4">
      <div className="card border-0">
        <NetworkOverview />
        <div className="card-body">
          <NodesTable />
        </div>
      </div>
    </div>
  );
};

export default Owner;
