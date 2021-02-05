import { QueryResponse } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import * as React from 'react';
import { useContext } from '../../context';
import denominate from '../Denominate/formatters';
import StatCard from '../StatCard';
import { contractViews } from '../../contracts/ContractViews';

const DelegatorViews = () => {
  const { dapp, address, erdLabel, delegationContract } = useContext();
  const [userActiveStake, setUserActiveState] = React.useState('0');
  const [claimableRewards, setClaimableRewards] = React.useState('0');

  const getClaimableRewards = () => {
    contractViews['getClaimableRewards'](dapp, address, delegationContract)
      .then(value => {
        console.log('claimable ', value);
        setClaimableRewards(DenominateResponse(value) || '0');
      })
      .catch(e => console.error('getClaimableRewards error', e));
  };

  const getUserActiveStake = () => {
    contractViews['getUserActiveStake'](dapp, address, delegationContract)
      .then(value => {
        setUserActiveState(DenominateResponse(value) || '');
      })
      .catch(e => console.error('getUserActiveStake error', e));
  };

  const getAllData = () => {
    getClaimableRewards();
    getUserActiveStake();
  };

  React.useEffect(getAllData, []);

  return (
    <div className="stats mb-spacer w-100">
      <div className="card card-small">
        <div className="card-header border-bottom">
          <h6 className="m-0">My delegation</h6>
        </div>
        <div className="card-body d-flex flex-wrap p-3">
          <StatCard title="Claimable rewards" value={claimableRewards} valueUnit={erdLabel} />
          <StatCard title="Active stake" value={userActiveStake} valueUnit={erdLabel} />
        </div>
      </div>
    </div>
  );
};

export default DelegatorViews;
function DenominateResponse(value: QueryResponse): React.SetStateAction<string> {
  return denominate({
    input: value.returnData[0].asBigInt.toString(),
    denomination: 18,
    decimals: 2,
    showLastNonZeroDecimal: false,
  });
}
