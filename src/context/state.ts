import { object, string, InferType } from 'yup';

const configKey: any = 'CONFIG';
const config: ConfigType = window[configKey] as any;

const schema = object({
  walletUrl: string().required(),
}).defined();

export type ConfigType = InferType<typeof schema>;

export interface StateType {
  config: ConfigType;
}

const initialState = () => {
  schema.validate(config, { strict: true }).catch(({ errors }) => {
    console.error('config.js format errors: ', errors);
  });
  return {
    config,
  };
};

export default initialState;
