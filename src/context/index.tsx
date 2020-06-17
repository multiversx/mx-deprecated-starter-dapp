import * as React from 'react';
import { useReducer } from 'reinspect';
import { ActionType, reducer } from './reducer';
import initialState, { StateType } from './state';

type DispatchType = (action: ActionType) => void;
export interface ContextType {
  children: React.ReactNode;
}

const Context = React.createContext<StateType | undefined>(undefined);
const Dispatch = React.createContext<DispatchType | undefined>(undefined);

function ContextProvider({ children }: ContextType) {
  const [prodState, prodDispatch] = React.useReducer(reducer, initialState());
  const [devState, devDispatch] = useReducer(reducer, initialState(), 'context');

  const state = process.env.NODE_ENV === 'development' ? devState : prodState;
  const dispatch = process.env.NODE_ENV === 'development' ? devDispatch : prodDispatch;

  return (
    <Context.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </Context.Provider>
  );
}

function useContext() {
  const context = React.useContext(Context);
  if (context === undefined) {
    throw new Error('useState must be used within a Context.Provider');
  }
  return context;
}

function useDispatch() {
  const context = React.useContext(Dispatch);
  if (context === undefined) {
    throw new Error('useDispatch must be used within a Dispatch.Provider');
  }
  return context;
}

export { ContextProvider, useContext, useDispatch };
