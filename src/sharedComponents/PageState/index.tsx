import * as React from 'react';
import { useContext } from 'context';
import './pageState.scss';

const PageState = ({
  title,
  description,
  svgComponent,
  className,
  spin = false,
  showBackBtn = false,
}: {
  title?: string;
  description?: string | React.ReactNode;
  svgComponent: React.ReactNode;
  className?: string;
  spin?: boolean;
  showBackBtn?: boolean;
}) => {
  const { accountAddress } = useContext();

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
          {description && <p className="mt-3">{description}</p>}
          {showBackBtn && (
            <a
              href={`/dashboard?accountAddress=${accountAddress}`}
              className="btn btn-primary mt-3"
            >
              Back to dashboard
            </a>
          )}
        </>
      )}
    </div>
  );
};

export default PageState;
