import { Address, BLS, ValidatorSecretKey } from '@elrondnetwork/erdjs';

function hexStringToByte(str: string) {
  if (!str) {
    return new Uint8Array();
  }
  const a = [];
  for (let i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16));
  }
  return new Uint8Array(a);
}

function getPubKey(file: string, indices: any[]) {
  const headerParts = file
    .toString()
    .substring(indices[0], indices[1])
    .split(' ');
  return headerParts[4] ? headerParts[4] : '';
}

export default async function decodePem(file: string, delegationContract?: string) {
  await BLS.initIfNecessary();
  let myKey = ValidatorSecretKey.fromPem(file);
  let dsc = new Address(delegationContract);
  let signature = myKey.sign(Buffer.from(dsc.pubkey())).toString('hex');

  const regex = /-----/gi;
  let result;
  const indices = [];
  while ((result = regex.exec(file.toString()))) {
    indices.push(result.index);
  }

  const key = file.toString().substring(indices[1] + 6, indices[2] - 1);
  const decoded = window.atob(key);

  const value = hexStringToByte(decoded);

  const pubKey = getPubKey(file, indices);

  return { value, pubKey, signature };
}
