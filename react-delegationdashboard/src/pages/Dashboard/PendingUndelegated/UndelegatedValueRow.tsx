import React, { useEffect } from 'react';
import { UndelegatedValueType } from 'helpers/types';
import moment from 'moment';
import { useDelegation } from 'helpers';
import { useContext } from 'context';

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
  }, [counter]);

  useEffect(() => {
    if (value.timeLeft === 0) {
      setIsDisabled(false);
    }
  }, [value.value, value.timeLeft]);

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center text-nowrap trim">
          {value.value} {egldLabel}
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center text-nowrap trim">
          {value.timeLeft ? (
            <span className="badge badge-sm badge-light-orange text-orange">
              {moment
                .utc(moment.duration(counter, 'seconds').asMilliseconds())
                .format('HH:mm:ss')}{' '}
              left
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
