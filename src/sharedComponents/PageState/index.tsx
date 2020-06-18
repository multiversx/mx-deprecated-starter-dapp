import * as React from 'react';
import './pageState.scss';

const PageState = ({
  title,
  description,
  svgComponent,
  className,
  spin = false,
}: {
  title?: string;
  description?: string | React.ReactNode;
  svgComponent: React.ReactNode;
  className?: string;
  spin?: boolean;
}) => {
  return (
    <div className="mx-auto my-auto text-center page-state">
      {spin ? (
        <div className="col-12 text-center">
          <div className="lds-ellipsis mx-auto mt-5 mb-5">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      ) : (
        <>
          <i>
            <div className={`icon ${className ? className : ''}`}>{svgComponent}</div>
          </i>
          {title && <p className="h3 mt-3">{title}</p>}
          {description && <p>{description}</p>}
        </>
      )}
    </div>
  );
};

export default PageState;
