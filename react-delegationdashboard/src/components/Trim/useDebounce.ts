import { useState, useEffect } from 'react';

export default (value: any, timeout: number) => {
  const [state, setState] = useState(value);

  const effect = () => {
    const handler = setTimeout(() => setState(value), timeout);

    return () => clearTimeout(handler);
  };

  useEffect(effect, [value]);

  return state;
};
