import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useContext } from 'context';
import { UndelegatedValueType } from './UndelegatedValueType';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import LedgerValidationTransaction from 'components/LedgerAction';

const UndelegatedValueRow = ({
  undelegatedValue: value,
}: {
  undelegatedValue: UndelegatedValueType;
}) => {
  const [isDisabled, setIsDisabled] = React.useState(true);
  const { egldLabel } = useContext();
  const [counter, setCounter] = React.useState(value.timeLeft);
  const [show, setShow] = React.useState(false);
  const [transactionArguments, setTransactionArguments] = useState(
    new DelegationTransactionType('', '')
  );

  const handleWithdraw = () => {
    let transactionArguments = new DelegationTransactionType('0', 'withdraw');
    setTransactionArguments(transactionArguments);
    setShow(true);
  };

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    counter === 0 && setIsDisabled(false);
  }, [counter]);

  const getTimeLeft = () => {
    if (counter === 0) setCounter(value.timeLeft);
    const timeLeftInMiliseconds = moment.duration(counter, 'seconds').asMilliseconds();
    return moment.utc(timeLeftInMiliseconds).format('HH:mm:ss');
  };
  return (
    <>
      <tr>
        <td>
          <div className="d-flex align-items-center text-nowrap trim">
            {value.value} {egldLabel}
          </div>
        </td>
        <td>
          <div className="d-flex align-items-center text-nowrap trim">
            {value.timeLeft > 0 ? (
              <span className="badge badge-sm badge-light-orange text-orange">
                {getTimeLeft()} left
              </span>
            ) : (
              <span className="badge badge-sm badge-light-green text-green">Completed</span>
            )}
          </div>
        </td>
        <td>
          <button
            disabled={isDisabled}
            onClick={handleWithdraw}
            className="btn btn-primary btn-sm d-flex ml-auto"
          >
            Withdraw
          </button>
        </td>
      </tr>
      <LedgerValidationTransaction
        show={show}
        argumentsTx={transactionArguments}
        action="Withdraw"
        title="Withdraw"
        handleCloseModal={() => {}}
      />
    </>
  );
};
export default UndelegatedValueRow;
