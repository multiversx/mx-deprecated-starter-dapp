import { StateType } from './state';

export type ActionType = { type: 'sample'; sample: string };

export function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    default: {
      throw new Error(`Unhandled action type: ${action!.type}`);
    }
  }
}
