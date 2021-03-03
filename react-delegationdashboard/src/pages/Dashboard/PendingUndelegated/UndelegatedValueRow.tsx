import React, { useEffect } from 'react';
import moment from 'moment';
import { useDelegation } from 'helpers';
import { useContext } from 'context';
import { UndelegatedValueType } from './UndelegatedValueType';

const UndelegatedValueRow = ({
  undelegatedValue: value,
}: {
  undelegatedValue: UndelegatedValueType;
}) => {
  const { delegation } = useDelegation();
  const [isDisabled, setIsDisabled] = React.useState(true);
  const { egldLabel } = useContext();
  const [counter, setCounter] = React.useState(value.timeLeft);

  const handleWithdraw = () => {
    delegation
      .sendTransaction('0', 'withdraw')
      .then()
      .catch(e => console.error('handleWithdraw error', e));
  };

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    counter === 0 && setIsDisabled(false);
  }, [counter]);

  const getTimeLeft = () => {
    const timeLeftInMiliseconds = moment.duration(counter, 'seconds').asMilliseconds();
    return moment.utc(timeLeftInMiliseconds).format('HH:mm:ss');
  };
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center text-nowrap trim">
          {value.value} {egldLabel}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center text-nowrap trim">
          {counter > 0 ? (
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
  );
};
export default UndelegatedValueRow;
