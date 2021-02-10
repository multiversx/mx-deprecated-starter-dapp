import { Address } from '@elrondnetwork/erdjs/out';
import React, { useEffect, useState } from 'react';
import { useContext } from 'context';
import { contractViews } from 'contracts/ContractViews';
import NodesTable from './NodesTable';
import Actions from './Actions';
import Overview from 'components/Overview';

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
    <div className="owner w-100">
      <div className="card border-0">
        <Overview />
        <div className="card-body pt-0 px-spacer pb-spacer">
          <NodesTable />
        </div>
      </div>
    </div>
  );
};

export default Owner;
