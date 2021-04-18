import { QueryResponse } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import * as React from 'react';
import { useContext } from 'context';
import { contractViews } from 'contracts/ContractViews';
import denominate from 'components/Denominate/formatters';
import { denomination, decimals } from 'config';
import UndelegatedValueRow from './UndelegatedValueRow';
import { UndelegatedValueType } from './UndelegatedValueType';

const UndelegatedListView = () => {
  const { dapp, address, delegationContract, networkConfig } = useContext();
  const { getUserUnDelegatedList } = contractViews;

  const [userUnstakeValue, setUserUnstakedValue] = React.useState(Array<UndelegatedValueType>());

  const denomintateValue = (value: string): string => {
    return denominate({ denomination, decimals, input: value });
  };

  const getTimeLeft = (value: QueryResponse, index: number, timeLeft: number) => {
    let roundsRemainingInEpoch =
      networkConfig.roundsPerEpoch - networkConfig.roundsPassedInCurrentEpoch;
    let roundEpochComplete = 0;
    let epochsChangesRemaining = value.returnData[index + 1].asNumber;
    if (epochsChangesRemaining > 1) {
      roundEpochComplete = (epochsChangesRemaining - 1) * networkConfig.roundsPerEpoch;
    } else {
      roundEpochComplete = 0;
    }

    let totalRounds = roundsRemainingInEpoch + roundEpochComplete;
    timeLeft = (totalRounds * networkConfig.roundDuration) / 1000;
    return timeLeft;
  };

  const mapUndelegetedValueType = (
    value: QueryResponse,
    index: number,
    undelegatedList: UndelegatedValueType[]
  ) => {
    let timeLeft = 0;
    if (value.returnData[index + 1].asString !== '') {
      timeLeft = getTimeLeft(value, index, timeLeft);
    }
    const element = new UndelegatedValueType(
      denomintateValue(value.returnData[index].asBigInt.toFixed()),
      timeLeft
    );
    undelegatedList.push(element);
    return index;
  };

  const groupUndelegateValuesForTimeLeftZero = (undelegatedList: UndelegatedValueType[]) => {
    let arrayWithdraw = undelegatedList.filter(x => x.timeLeft !== 0);
    const withdrawValue = undelegatedList
      .filter(x => x.timeLeft === 0)
      .reduce((a, b) => a + (parseInt(b.value.replace(/,/g, '')) || 0), 0);
    if (withdrawValue !== 0) {
      arrayWithdraw.push(new UndelegatedValueType(withdrawValue.toString(), 0));
    }
    return arrayWithdraw;
  };

  const getUserUnDelegated = () => {
    getUserUnDelegatedList(dapp, address, delegationContract)
      .then(value => {
        let undelegatedList = new Array<UndelegatedValueType>();
        for (let index = 0; index < value.returnData.length; index++) {
          mapUndelegetedValueType(value, index, undelegatedList);
          index++;
        }
        let arrayWithdraw = groupUndelegateValuesForTimeLeftZero(undelegatedList);
        setUserUnstakedValue(arrayWithdraw.sort((a, b) => a.timeLeft - b.timeLeft));
      })
      .catch(e => console.error('getUserUnDelegatedList error', e));
  };

  React.useEffect(getUserUnDelegated, [networkConfig]);

  return (
    <>
      {userUnstakeValue.length > 0 && (
        <div className="card mt-spacer">
          <div className="card-body p-spacer">
            <div className="d-flex flex-wrap align-items-center justify-content-between mb-spacer">
              <p className="h6 mb-0">Pending Withdrawals</p>
            </div>
            <div className="table-responsive">
              <table className="table table-borderless mb-0">
                <thead className="text-uppercase font-weight-normal">
                  <tr>
                    <th>Undelegated Amount</th>
                    <th>Wait Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userUnstakeValue.map((undelegatedValue, i) => (
                    <UndelegatedValueRow undelegatedValue={undelegatedValue} key={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UndelegatedListView;
