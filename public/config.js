const CONFIG = {
  // walletUrl: 'https://wallet.elrond.com',
  walletUrl: 'http://localhost:3001',
  loginCallbackUrl: 'http://localhost:3000',
};

window.CONFIG = CONFIG;

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = CONFIG;
}
