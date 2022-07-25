import { createContext, useContext, useReducer } from 'react';
import api from '../utils/api';
import {
  ERROR,
  MESSAGE_ORDER_STATUS_UPDATE_FAILED,
  MESSAGE_ORDER_STATUS_UPDATE_SUCCESS,
  SUCCESS
} from '../utils/constants';
import { IOrder, IOrderStatus } from '../utils/interfaces';
import { AlertMessageContext } from './AlertMessageContext';
import { LoadingContext } from './LoadingContext';

/* --------------------------------------------------------------- */

interface IInitialState {
  orders: Array<IOrder> | null;
  orderStatuses: Array<IOrderStatus> | null;
  order: IOrder | null;
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
  orderStatuses: null,
  order: null
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
  },
  SET_ORDER: (state: object, action: IAction) => {
    return {
      ...state,
      order: action.payload
    };
  },
};

const reducer = (state: object, action: IAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const OrdersContext = createContext({
  ...initialState,
  getAllOrdersAct: () => Promise.resolve(),
  getAllOrderStatusesAct: () => Promise.resolve(),
  changeOrderStatusAct: (orderId: number, orderStatusId: number) => Promise.resolve(),
  getOrderByIdAct: (id: number) => Promise.resolve(),
  clearOrderAct: () => Promise.resolve()
});

//  Provider
function OrdersProvider({ children }: IProps) {
  const { openLoading, closeLoading } = useContext(LoadingContext);
  const { openAlert } = useContext(AlertMessageContext);

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
        closeLoading();
      })
      .catch(error => {
        dispatch({
          type: 'SET_ORDER_STATUSES',
          payload: null
        })
        closeLoading()
      })
  }

  const changeOrderStatusAct = (orderId: number, orderStatusId: number) => {
    openLoading()
    api.put(`/admin/change-order-status/${orderId}`, { orderStatusId })
      .then(response => {
        if (state.orders) {
          const orders = [...state.orders]
          for (let i = 0; i < orders.length; i += 1) {
            if (orders[i].id === orderId) {
              orders[i].id_order_status = orderStatusId
              break
            }
          }
          dispatch({
            type: 'SET_ORDERS',
            payload: orders
          })

        }

        if (state.order) {
          dispatch({
            type: 'SET_ORDER',
            payload: {
              ...state.order,
              id_order_status: orderStatusId
            }
          })
        }

        closeLoading()
        openAlert({
          severity: SUCCESS,
          message: MESSAGE_ORDER_STATUS_UPDATE_SUCCESS
        })
      })
      .catch(error => {
        console.log('# error => ', error)
        openAlert({
          severity: ERROR,
          message: MESSAGE_ORDER_STATUS_UPDATE_FAILED
        })
        closeLoading()
      })
  }

  const getOrderByIdAct = (id: number) => {
    openLoading()
    api.get(`/admin/get-order-by-id/${id}`)
      .then(response => {
        if (response.data) {
          console.log('# response.data => ', response.data)
          dispatch({
            type: 'SET_ORDER',
            payload: response.data
          })
        }
        closeLoading()
      })
      .catch(error => {
        dispatch({
          type: 'SET_ORDER',
          payload: null
        })
        closeLoading()
      })
  }

  const clearOrderAct = () => {
    dispatch({
      type: 'SET_ORDER',
      payload: null
    })
  }

  return (
    <OrdersContext.Provider
      value={{
        ...state,
        getAllOrdersAct,
        getAllOrderStatusesAct,
        changeOrderStatusAct,
        getOrderByIdAct,
        clearOrderAct
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export { OrdersContext, OrdersProvider };