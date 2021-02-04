import React, { useEffect } from 'react';
import { UndelegatedValueType } from '../../helpers/types';
import moment from 'moment';
import { Delegation } from '../../contracts';
import { useContext } from '../../context';

const UndelegatedValueRow = ({ undelegatedValue: value, index }: { undelegatedValue: UndelegatedValueType; index: number }) => {

    const { dapp, delegationContract } = useContext();
    const [isDisabled, setIsDisabled] = React.useState('disabled');
    const handleWithdraw = () => {
        const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
        delegation.sendTransaction('0', 'withdraw').then()
            .catch(e => console.error('handleWithdraw error', e));
    };
    useEffect(()=>{
        if (value.timeLeft===0) {
            setIsDisabled('');
        }
    }, [value.value, value.timeLeft]);

    return (
        <tr>
            <td>
                <div className="ml-2">{index + 1}</div>
            </td>
            <td>
                <div className="d-flex align-items-center text-nowrap bls-trim trim-fs-sm">
                    {value.value}
                </div>
            </td>
            <td>
                <div className="d-flex align-items-center text-nowrap bls-trim trim-fs-sm">
                    {moment.utc(moment.duration(value.timeLeft, 'seconds').asMilliseconds()).format('HH:mm:ss')}{' '}left)
                </div>
            </td>
            <td>
                <button onClick={() => handleWithdraw()} className={`btn btn-primary mt-3 ${isDisabled}`}>
                    Withdraw
                </button>
            </td>
        </tr>
    );
};
export default UndelegatedValueRow;
