export default function addressIsBach32(destinationAddress: string) {
  const isValidBach = !(
    !destinationAddress ||
    !destinationAddress.startsWith('erd') ||
    destinationAddress.length !== 62 ||
    /^\w+$/.test(destinationAddress) !== true
  );
  return isValidBach;
}
