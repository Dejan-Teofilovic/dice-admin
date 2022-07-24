import { Navigate } from "react-router-dom";
import Orders from "../pages/Orders";
import WaitingList from "../pages/WaitingList";
import { IRoute } from "../utils/interfaces";

export const routes: Array<IRoute> = [
  {
    name: 'Waiting Lists',
    icon: 'fluent:document-bullet-list-clock-24-filled',
    path: '/waiting-list',
    element: <WaitingList />
  },
  {
    name: 'Orders',
    icon: 'fluent:clipboard-task-list-ltr-24-filled',
    path: '/orders',
    element: <Orders />
  },
  {
    path: '*',
    element: <Navigate to="/waiting-list" />
  }
]