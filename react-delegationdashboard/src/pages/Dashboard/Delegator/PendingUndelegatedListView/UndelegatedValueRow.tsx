import React, { useEffect } from 'react';
import { UndelegatedValueType } from 'helpers/types';
import moment from 'moment';
import { useDelegation } from 'helpers';

const UndelegatedValueRow = ({
  undelegatedValue: value,
  index,
}: {
  undelegatedValue: UndelegatedValueType;
  index: number;
}) => {
  const { delegation } = useDelegation();
  const [isDisabled, setIsDisabled] = React.useState(true);
  const handleWithdraw = () => {
    delegation
      .sendTransaction('0', 'withdraw')
      .then()
      .catch(e => console.error('handleWithdraw error', e));
  };
  useEffect(() => {
    if (value.timeLeft === 0) {
      setIsDisabled(false);
    }
  }, [value.value, value.timeLeft]);

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center text-nowrap trim">{value.value}</div>
      </td>
      <td>
        <div className="d-flex align-items-center text-nowrap trim">
          {value.timeLeft ? (
            <span className="bg-light-orange text-orange px-3 py-2">
              {moment
                .utc(moment.duration(value.timeLeft, 'seconds').asMilliseconds())
                .format('HH:mm:ss')}{' '}
              left
            </span>
          ) : (
            <span className="bg-light-green text-green px-3 py-2">Completed</span>
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
