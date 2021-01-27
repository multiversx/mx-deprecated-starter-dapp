import * as React from 'react';
import useDebounce from './useDebounce';

interface TrimType {
  text: string;
  dataTestId?: string;
}

const Trim = ({ text, dataTestId = '' }: TrimType) => {
  const [debounce, setDebounce] = React.useState(0);
  const [overflow, setOverflow] = React.useState(false);
  const wrapperRef = React.useRef(document.createElement('span'));
  const childRef = React.useRef(document.createElement('span'));

  const debounceTracker = useDebounce(debounce, 100);

  const listener = () => {
    setDebounce(debounce + 1);
  };

  const effect = () => {
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  };

  React.useEffect(effect, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debounce]);

  React.useEffect(() => {
    if (childRef.current && wrapperRef.current) {
      const diff = childRef.current.offsetWidth - wrapperRef.current.offsetWidth;
      setOverflow(diff > 1);
    }
  }, [debounceTracker]);

  return (
    <span className={`trim ${overflow ? 'overflow' : ''}`} data-testid={dataTestId}>
      <span className="left" ref={wrapperRef}>
        <span ref={childRef}>{String(text).substring(0, Math.floor(text.length / 2))}</span>
      </span>
      <span className="ellipsis">...</span>
      <span className="right">
        <span>{String(text).substring(text.length - Math.floor(text.length / 2))}</span>
      </span>
    </span>
  );
};

export default Trim;
