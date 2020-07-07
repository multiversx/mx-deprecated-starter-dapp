interface ElrondType {
  window: Window | null;
  windowHeight: number;
  windowWidth: number;
  strWindowFeatures: () => string;
  login: ({ callbackUrl }: { callbackUrl: string }) => void;
  closeWindow: () => void;
  sendTransaction: (props: {
    receiver: string;
    value: string;
    gasLimit: string;
    data: string;
    callbackUrl: string;
  }) => void;
}

const elrond: ElrondType = {
  window: null,
  windowHeight: 730,
  windowWidth: 520,
  strWindowFeatures: () => {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : window.screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : window.screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - elrond.windowWidth) / 2 / systemZoom + dualScreenLeft;
    const top = (height - elrond.windowHeight) / 2 / systemZoom + dualScreenTop;
    return [
      'location=yes,scrollbars=yes,status=yes',
      `height=${elrond.windowHeight}`,
      `width=${elrond.windowWidth}`,
      `top=${top}`,
      `left=${left}`,
    ].join(',');
  },
  login: function ({ callbackUrl }) {
    var queryString = new URLSearchParams({
      callbackUrl,
      modal: 'true',
    });
    var URL = `http://localhost:3001/hook/login?${queryString}`;
    // var URL = `https://wallet.elrond.com/hook/login?${queryString}`;
    elrond.window = window.open(URL, '_blank', elrond.strWindowFeatures());
  },
  closeWindow: () => {
    if (elrond.window) {
      elrond.window.close();
    }
  },
  sendTransaction: function (props) {
    var queryString = new URLSearchParams({
      ...props,
      data: encodeURIComponent(props.data),
      modal: 'true',
    });
    var URL = `http://localhost:3001/hook/transaction?${queryString}`;
    // var URL = `https://wallet.elrond.com/hook/transaction?${queryString}`;
    elrond.window = window.open(URL, '_blank', elrond.strWindowFeatures());
  },
};

export default elrond;
