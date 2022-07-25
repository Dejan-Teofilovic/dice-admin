import { createContext, useContext, useReducer } from 'react';
import api from '../utils/api';
import { IOrder, IOrderStatus } from '../utils/interfaces';
import { LoadingContext } from './LoadingContext';

/* --------------------------------------------------------------- */

interface IInitialState {
  orders: Array<IOrder> | null;
  orderStatuses: Array<IOrderStatus> | null;
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
  orders: null,
  orderStatuses: null
};

const handlers: IHandlers = {
  SET_WAITING_LIST: (state: object, action: IAction) => {
    return {
      ...state,
      orders: action.payload
    };
  },
  SET_ORDER_STATUSES: (state: object, action: IAction) => {
    return {
      ...state,
      orderStatuses: action.payload
    };
  }
};

const reducer = (state: object, action: IAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const OrdersContext = createContext({
  ...initialState,
  getAllOrdersAct: () => Promise.resolve(),
  getAllOrderStatusesAct: () => Promise.resolve()
});

//  Provider
function OrdersProvider({ children }: IProps) {
  const { openLoading, closeLoading } = useContext(LoadingContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  const getAllOrdersAct = () => {
    openLoading()
    api.get('/admin/get-all-orders')
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

  const getAllOrderStatusesAct = () => {
    openLoading()
    api.get('/admin/get-all-order-statuses')
      .then(response => {
        if (response.data) {
          dispatch({
            type: 'SET_ORDER_STATUSES',
            payload: response.data
          })
        }
      })
      .catch(error => {
        dispatch({
          type: 'SET_ORDER_STATUSES',
          payload: null
        })
      })
  }

  return (
    <OrdersContext.Provider
      value={{
        ...state,
        getAllOrdersAct,
        getAllOrderStatusesAct
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export { OrdersContext, OrdersProvider };