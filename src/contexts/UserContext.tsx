import { createContext, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import {
  ERROR,
  LOCALSTORAGE_TOKEN_NAME,
  MESSAGE_LOGIN_ERROR,
  MESSAGE_LOGIN_SUCCESS,
  SUCCESS,
} from '../utils/constants';
import {
  getItemOfLocalStorage,
  removeItemOfLocalStorage,
  setAuthToken,
  setItemOfLocalStorage
} from '../utils/functions';
import { ILoginInfo } from '../utils/interfaces';
import { AlertMessageContext } from './AlertMessageContext';
import { LoadingContext } from './LoadingContext';

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

const initialState = {
  token: ''
};

let count = 0;

const handlers: IHandlers = {
  SET_TOKEN: (state: object, action: IAction) => {
    return {
      ...state,
      token: action.payload
    };
  },
};

const reducer = (state: object, action: IAction) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const UserContext = createContext({
  ...initialState,
  login: (loginInfo: ILoginInfo) => Promise.resolve(),
});

//  Provider
function UserProvider({ children }: IProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { openAlert } = useContext(AlertMessageContext);
  const { openLoading, closeLoading } = useContext(LoadingContext);

  useEffect(() => {
    let tokenOfLocalStorage = getItemOfLocalStorage(LOCALSTORAGE_TOKEN_NAME);
    if (tokenOfLocalStorage && count === 0) {
      count += 1;
      console.log('# tokenOfLocalStorage => ', tokenOfLocalStorage)
      setAuthToken(tokenOfLocalStorage)
      api.get('/admin/check-expiration-of-token')
        .then(response => {
          dispatch({
            type: 'SET_TOKEN',
            payload: tokenOfLocalStorage
          })
        })
        .catch(error => {
          setAuthToken(null)
          dispatch({
            type: 'SET_TOKEN',
            payload: ''
          })
          removeItemOfLocalStorage(LOCALSTORAGE_TOKEN_NAME)
        })
    }
  }, [])

  const login = (loginInfo: ILoginInfo) => {
    openLoading()
    api.post('/admin/login', loginInfo)
      .then(response => {
        if (response.data) {
          setItemOfLocalStorage(LOCALSTORAGE_TOKEN_NAME, response.data)
          dispatch({
            type: 'SET_TOKEN',
            payload: response.data
          })
          closeLoading()
          openAlert({ severity: SUCCESS, message: MESSAGE_LOGIN_SUCCESS })
        }
      })
      .catch(error => {
        closeLoading()
        openAlert({ severity: ERROR, message: MESSAGE_LOGIN_ERROR })
      })
  }

  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };