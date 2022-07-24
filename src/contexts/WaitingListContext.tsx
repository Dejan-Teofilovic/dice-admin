import { createContext, useContext, useReducer } from 'react';
import api from '../utils/api';
import { IWaitListItem } from '../utils/interfaces';
import { LoadingContext } from './LoadingContext';

/* --------------------------------------------------------------- */

interface IInitialState {
  waitingList: Array<IWaitListItem> | null
}

interface IAction {
  type: string,
  payload: any
}

interface IProps {
  children: any
}

interface IHandlers {
  [key: string]: Function,
}

/* --------------------------------------------------------------- */

const initialState: IInitialState = {
  waitingList: null
};

const handlers: IHandlers = {
  SET_WAITING_LIST: (state: object, action: IAction) => {
    return {
      ...state,
      waitingList: action.payload
    };
  }
};

const reducer = (state: object, action: IAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const WaitingListContext = createContext({
  ...initialState,
  getAllWaitingList: () => Promise.resolve(),
});

//  Provider
function WaitingListProvider({ children }: IProps) {
  const { openLoading, closeLoading } = useContext(LoadingContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllWaitingList = () => {
    openLoading()
    api.get('/admin/get-all-waiting-list')
      .then(response => {
        if (response.data) {
          dispatch({
            type: 'SET_WAITING_LIST',
            payload: response.data
          })
        }
        closeLoading()
      })
      .catch(error => {
        dispatch({
          type: 'SET_WAITING_LIST',
          payload: null
        })
        closeLoading()
      })
  };

  return (
    <WaitingListContext.Provider
      value={{
        ...state,
        getAllWaitingList,
      }}
    >
      {children}
    </WaitingListContext.Provider>
  );
}

export { WaitingListContext, WaitingListProvider };