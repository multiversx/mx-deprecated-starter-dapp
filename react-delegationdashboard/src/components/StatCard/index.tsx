import { StatCardType } from '../../helpers/types';

const StatCard = ({ title = '', value = '0', valueUnit = 'eGLD' }: StatCardType) => {
  return (
    <div className="stats-card p-4 m-2 d-flex flex-column light-blue">
      <small className="text-uppercase mb-3 text-nowrap">{title}</small>
      {value} {valueUnit}
    </div>
  );
};

export default StatCard;
