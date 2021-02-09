import SVG from 'react-inlinesvg';
import { StatCardType } from '../../helpers/types';

const StatCard = ({
  title = '',
  value = '0',
  valueUnit = 'eGLD',
  color = '',
  svg = '',
}: StatCardType) => {
  return (
    <div className={`statcard bg-light-${color} text-${color} p-3 my-2 my-sm-0 rounded`}>
      <div className={`svg-icon fill-${color} mb-2`}>
        <SVG src={process.env.PUBLIC_URL + '/' + svg} className={`text-${color}`}></SVG>
      </div>
      <p className="title">{title}</p>
      <p className="value">
        {value} {valueUnit}
      </p>
      <p className="subvalue"></p>
    </div>
  );
};

export default StatCard;
