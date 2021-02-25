import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const State = ({
  icon,
  iconClass,
  title,
  description,
  action,
}: {
  icon?: any;
  iconClass?: string;
  title?: string;
  description?: string | React.ReactNode;
  action?: React.ReactNode;
}) => (
  <div className="state m-auto p-spacer text-center">
    {icon && <FontAwesomeIcon icon={icon} className={iconClass ? iconClass : ''} size="5x" />}
    {title && <p className="h4 mt-2 mb-1">{title}</p>}
    {description && <div className="mb-3">{description}</div>}
    {action && <>{action}</>}
  </div>
);

export default State;
