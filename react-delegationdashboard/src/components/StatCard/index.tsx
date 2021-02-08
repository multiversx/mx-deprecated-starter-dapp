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
    <div className={`col bg-light-${color} text-${color} p-4 my-2 my-sm-0 mx-3 rounded `}>
      <span className={`svg-icon svg-icon-3x svg-icon-${color} d-block my-2`}>
        <SVG src={svg}></SVG>
      </span>
      <h6>{title}</h6>
      <div>
        {value} {valueUnit}
      </div>
    </div>
  );
};

export default StatCard;
