import SVG from 'react-inlinesvg';
import { StatCardType } from '../../helpers/types';

const StatCard = ({
  title = '',
  value = '0',
  valueUnit = '',
  color = '',
  svg = '',
  percentage = '',
  children = null,
}: StatCardType) => {
  return (
    <div className={`statcard bg-light-${color} text-${color} p-3 my-2 my-sm-0 rounded`}>
      <div className="d-flex flrex-wrap align-items-center justify-content-between mb-2">
        <div className={`svg-icon fill-${color}`}>
          <SVG src={process.env.PUBLIC_URL + '/' + svg} className={`text-${color}`}></SVG>
        </div>
        <div>{children}</div>
      </div>
      <p className="title">{title}</p>
      <p className="value">
        {value} {valueUnit}
      </p>
      <p className="subvalue">{percentage}</p>
    </div>
  );
};

export default StatCard;
