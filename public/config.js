const CONFIG = {
  // walletUrl: 'https://wallet.elrond.com',
  // walletUrl: 'http://localhost:3001',
  // selfUrl: 'http://localhost:3000',
  nodeUrl: 'https://api.elrond.com',
  elasticUrl: 'https://elastic-aws.elrond.com',
  contractAddress: '...', // -> catre aici fac sendurile
  decimals: 2,
  denomination: 18,
};

window.CONFIG = CONFIG;

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = CONFIG;
}
