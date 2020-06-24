interface ElrondType {
  window: Window | null;
  strWindowFeatures: string;
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
  strWindowFeatures: 'location=yes,height=570,width=520,scrollbars=yes,status=yes',
  login: function ({ callbackUrl }) {
    var queryString = new URLSearchParams({
      callbackUrl,
      modal: 'true',
    });
    var URL = `http://localhost:3001/hook/login?${queryString}`;
    elrond.window = window.open(URL, '_blank', elrond.strWindowFeatures);
  },
  closeWindow: () => {
    if (elrond.window) {
      elrond.window.close();
    }
  },
  sendTransaction: function (props) {
    var queryString = new URLSearchParams({
      ...props,
      modal: 'true',
    });
    var URL = `http://localhost:3001/hook/transaction?${queryString}`;
    elrond.window = window.open(URL, '_blank', elrond.strWindowFeatures);
  },
};

export default elrond;
