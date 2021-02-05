import BigNumber from 'bignumber.js';

export default function nominate(input: string, paramDenomination?: number) {
  const parts = input.toString().split('.');
  const denomination = paramDenomination !== undefined ? paramDenomination : 18;

  if (parts[1]) {
    // remove trailing zeros
    while (parts[1].substring(parts[1].length - 1) === '0' && parts[1].length > 1) {
      parts[1] = parts[1].substring(0, parts[1].length - 1);
    }
  }

  let count = parts[1] ? denomination - parts[1].length : denomination;

  count = count < 0 ? 0 : count;

  let transformed = parts.join('') + '0'.repeat(count);

  // remove beginning zeros
  while (transformed.substring(0, 1) === '0' && transformed.length > 1) {
    transformed = transformed.substring(1);
  }

  return transformed;
}

export const nominateValToHex = (value: string) => {
  let val = value && value.length > 0 ? new BigNumber(nominate(value)).toString(16) : '0';

  if (val.length % 2 !== 0) {
    val = '0' + val;
  }

  return val;
};
