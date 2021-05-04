import * as React from 'react';

interface AddressRowType {
  setSelectedAddress: React.Dispatch<React.SetStateAction<string>>;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedAddress: string;
  index: number;
  account: string;
}

const AddressRow = ({
  account,
  index,
  setSelectedAddress,
  selectedAddress,
  setSelectedIndex,
}: AddressRowType) => {
  const ref = React.useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedAddress(account);
      setSelectedIndex(index);
    } else if (selectedAddress === account && !checked) {
      setSelectedAddress('');
      setSelectedIndex(undefined);
    }
  };

  return (
    <tr ref={ref}>
      <td className="text-left">
        <div className="d-flex align-items-start text-left form-check">
          <input
            type="radio"
            id={`check_${index}`}
            data-testid={`check_${index}`}
            onChange={handleChange}
            checked={selectedAddress === account}
            className="form-check-input mr-1 cursor-pointer"
          />
          <label
            htmlFor={`check_${index}`}
            data-testid={`label_${index}`}
            className="form-check-label text-nowrap trim-size-xl cursor-pointer m-0"
          >
            <div className="d-flex align-items-center text-nowrap trim">
              <span className="text-truncate">{account}</span>
            </div>
          </label>
        </div>
      </td>
      <td className="text-left">{index}</td>
    </tr>
  );
};

export default AddressRow;
