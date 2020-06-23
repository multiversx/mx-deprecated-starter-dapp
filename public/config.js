const CONFIG = {
  // walletUrl: 'https://wallet.elrond.com',
  walletUrl: 'http://localhost:3001',
  loginCallbackUrl: 'http://localhost:3000',
  nodeUrl: 'https://api.elrond.com',
  elasticUrl: 'https://elastic-aws.elrond.com',
};

window.CONFIG = CONFIG;

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = CONFIG;
}
