const CONFIG = {
  walletUrl: 'https://wallet.elrond.com/',
};

window.CONFIG = CONFIG;

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = CONFIG;
}
