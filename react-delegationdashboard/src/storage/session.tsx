import moment from 'moment';

export const setItem = (key: string, item: any, ttl: number = 3600) => {
  const expires = moment().unix() + ttl;
  sessionStorage.setItem(
    key,
    JSON.stringify({
      expires,
      data: item,
    })
  );
};

export const getItem = (key: string): any => {
  const item = sessionStorage.getItem(key);
  if (!item) {
    return null;
  }

  const deserializedItem = JSON.parse(item);
  if (!deserializedItem) {
    return null;
  }

  if (!deserializedItem.hasOwnProperty('expires') || !deserializedItem.hasOwnProperty('data')) {
    return null;
  }

  const expired = moment().unix() >= deserializedItem.expires;
  if (expired) {
    sessionStorage.removeItem(key);
    return null;
  }

  return deserializedItem.data;
};

export const removeItem = (key: string) => sessionStorage.removeItem(key);
