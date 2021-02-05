
import { QueryResponse } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import * as React from 'react';
import { useContext } from '../../context';
import { UndelegatedValueType } from '../../helpers/types';
import { contractViews } from '../../contracts/ContractViews';
import denominate from '../Denominate/formatters';
import UndelegatedValueRow from './UndelegatedValueRow';

const UndelegatedListView = () => {
    const { dapp, address, denomination, decimals, delegationContract } = useContext();
    const { getUserUnDelegatedList, } = contractViews;

    const [userUnstakeValue, setUserUnstakedValue] = React.useState(Array<UndelegatedValueType>());

    const denomintateValue = (value: string): string => {
        return denominate({ denomination, decimals, input: value, showLastNonZeroDecimal: false });
    };

    const mapUndelegetedValueType = (value: QueryResponse, index: number, undelegatedList: UndelegatedValueType[]) => {
        const element = new UndelegatedValueType(
            denomintateValue(value.returnData[index].asBigInt.toString()).toString(),
            value.returnData[index + 1].asNumber * 6);
        undelegatedList.push(element);
        return index;
    };

    const groupUndelegateValuesForTimeLeftZero = (undelegatedList: UndelegatedValueType[]) => {
        let arrayWithdraw = undelegatedList.filter(x => x.timeLeft !== 0);
        const withdrawValue = undelegatedList
            .filter(x => x.timeLeft === 0).reduce((a, b) => a + (parseInt(b.value) || 0), 0);
        if (withdrawValue !== 0) {
            arrayWithdraw.push(new UndelegatedValueType(withdrawValue.toString(), 0));
        }
        return arrayWithdraw;
    };

    const getUserUnDelegated = () => {
        getUserUnDelegatedList(dapp, address, delegationContract)
            .then((value) => {
                console.log('getUserUnDelegatedList', value.returnData);
                let undelegatedList = new Array<UndelegatedValueType>();
                for (let index = 0; index < value.returnData.length; index++) {
                    mapUndelegetedValueType(value, index, undelegatedList);
                    index++;
                }
                let arrayWithdraw = groupUndelegateValuesForTimeLeftZero(undelegatedList);
                setUserUnstakedValue(arrayWithdraw);
            })
            .catch(e => console.error('getUserUnDelegatedList error', e));
    };

    React.useEffect(getUserUnDelegated, []);

    return (
        <>
            {userUnstakeValue.length > 0 ? (
                <div className="row stats full-width">
                    <div className="col-12 mb-spacer">
                        <div className="card card-small">
                            <div className="card-header border-bottom">
                                <h6 className="m-0">Pending undelegated list</h6>
                            </div>
                            <div className="card-body d-flex flex-wrap p-3">

                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <thead className="py-2 text-semibold border-bottom">
                                            <tr>
                                                <th className="border-0">
                                                    <div className="ml-2">#</div>
                                                </th>
                                                <th className="border-0">Undelegated Value</th>
                                                <th className="border-0">Time remaining</th>
                                                <th className="border-0"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userUnstakeValue.map((undelegatedValue, i) => (
                                                <UndelegatedValueRow undelegatedValue={undelegatedValue} key={i} index={i} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            ) : (<></>)
            }
        </>
    );
};

export default UndelegatedListView;


