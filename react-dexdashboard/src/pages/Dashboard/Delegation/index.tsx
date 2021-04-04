import * as React from 'react';
import { useContext, useDispatch } from 'context';
import denominate from 'components/Denominate/formatters';
import DelegateAction from '../Actions/DelegateAction';
import UndelegateAction from '../Actions/UndelegateAction';
import { contractViews } from 'contracts/ContractViews';
import ClaimRewardsAction from '../Actions/ClaimRewardsAction';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import State from 'components/State';
import { denomination, decimals } from 'config';
import AddLiquidityAction from './LiquidityModal';
import SwapFixedInputAction from './SwapFixedInputModal';
import RemoveLiquidityAction from './RemoveLiquidityModal';
import SwapFixedOutputAction from './SwapFixedOutputModal';
import CreatePairAction from './CreatePairModal';

const MyDelegation = () => {
  const { dapp, address, egldLabel, delegationContract, loading } = useContext();
  const dispatch = useDispatch();
  const { getClaimableRewards, getUserActiveStake } = contractViews;
  const [userActiveStake, setUserActiveStake] = React.useState('0');
  const [userActiveNominatedStake, setUserActiveNominatedStake] = React.useState('0');
  const [claimableRewards, setClaimableRewards] = React.useState('0');
  const [displayRewards, setDisplayRewards] = React.useState(false);
  const [displayUndelegate, setDisplayUndelegate] = React.useState(false);

  return (
    <>
      <CreatePairAction />
      <AddLiquidityAction />
      <SwapFixedInputAction />
      <SwapFixedOutputAction />
      <RemoveLiquidityAction />
    </>
  );
};

export default MyDelegation;
