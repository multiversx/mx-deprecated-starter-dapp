import { Address } from '@elrondnetwork/erdjs/out';
import React, { useEffect, useState } from 'react';
import { useContext } from 'context';
import { contractViews } from 'contracts/ContractViews';
import denominate from 'components/Denominate/formatters';
import NodesTable from './NodesTable';
import Actions from './Actions';
import Views from './Views';
import Header from 'components/Header';
import { ContractOverview } from 'helpers/types';
import { QueryResponse } from '@elrondnetwork/erdjs/out/smartcontracts/query';

const Owner = () => {
  const { dapp, address, delegationContract, decimals, denomination } = useContext();
  const { getContractConfig } = contractViews;
  const [isOwner, setIsOwner] = useState(false);
  const [contractOverview, setContractOverview] = useState(new ContractOverview());

  const getContractOverviewType = (value: QueryResponse) => {
    let delegationCap = denominate({
      decimals,
      denomination,
      input: value.returnData[2].asBigInt.toString(),
      showLastNonZeroDecimal: false,
    });
    let initialOwnerFunds = denominate({
      decimals,
      denomination,
      input: value.returnData[3].asBigInt.toString(),
      showLastNonZeroDecimal: false,
    });
    console.log(value.returnData);
    return new ContractOverview(
      (parseFloat(value.returnData[1].asHex) / 100).toString(),
      delegationCap,
      initialOwnerFunds,
      value.returnData[4]?.asBool,
      value.returnData[5].asBool,
      value.returnData[6].asBool,
      value.returnData[7].asBool,
      value.returnData[8]?.asNumber * 6
    );
  };

  const getContractConfiguration = () => {
    getContractConfig(dapp, delegationContract)
      .then(value => {
        let ownerAddress = value.returnData[0].asHex;
        let loginAddress = new Address(address).hex();
        setIsOwner(loginAddress.localeCompare(ownerAddress) < 0 ? false : true);
        let contractOverview = getContractOverviewType(value);
        setContractOverview(contractOverview);
      })
      .catch(e => console.error('getContractConfig error ', e));
  };

  useEffect(getContractConfiguration, []);

  if (!isOwner) {
    <></>;
  }

  return (
    <div className="owner container py-4">
      <div className="row">
        <div className="col-12 col-md-10 mx-auto card p-3">
          <div className="card-body p-1">
            <Header />
            <Actions />
            <Views contractOverview={contractOverview} />
            <NodesTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Owner;
