import * as React from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import copyTextToClipboard from './helpers/copyToClipboard';
import './copyButton.scss';

interface CopyButtonType {
  text: string;
  extraClasses?: string;
}

const CopyButton = ({ text, extraClasses }: CopyButtonType) => {
  const [copyResult, setCopyResut] = React.useState({
    default: true,
    success: false,
  });

  const handleCopyToClipboard = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const noSpaces = text ? text.trim() : text;
    setCopyResut({
      default: false,
      success: await copyTextToClipboard(noSpaces),
    });

    setTimeout(() => {
      setCopyResut({
        default: true,
        success: false,
      });
    }, 1000);
  };

  return (
    <button
      className={`btn copy-btn text-primary p-0 px-2 ${extraClasses ? extraClasses : ''}`}
      onClick={handleCopyToClipboard}
    >
      <FontAwesomeIcon icon={faCheck} className="check-icon" />
    </button>
  );
};

export default CopyButton;
