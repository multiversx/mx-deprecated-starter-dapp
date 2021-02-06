import { Address } from '@elrondnetwork/erdjs/out';
import React, { useEffect, useState } from 'react';
import { useContext } from 'context';
import { contractViews } from 'contracts/ContractViews';
import denominate from 'components/Denominate/formatters';
import NodesTable from './NodesTable';
import Actions from './Actions';
import Views from './Views';
import Header from 'components/Header';

const Owner = () => {
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
    <></>;
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12 col-md-10 mx-auto">
          <div className="card shadow-sm rounded border-0">
            <div className="card-body p-1">
              <Header />
              <Views serviceFee={serviceFee} maxDelegationCap={maxDelegationCap} />
              <Actions />
              <NodesTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Owner;
