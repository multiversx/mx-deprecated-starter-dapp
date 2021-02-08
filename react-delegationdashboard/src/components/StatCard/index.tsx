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
    <div className={`col bg-light-${color} px-6 py-8 rounded-xl mr-7 mb-7`}>
      <span className={`svg-icon svg-icon-3x svg-icon-${color} d-block my-2`}>
        <SVG src={svg}></SVG>
      </span>
      <div className={`text-${color} font-weight-bold font-size-h6`}>{title}</div>
      <div>
        {value} {valueUnit}
      </div>
    </div>
  );
};

export default StatCard;
