import { Navigate } from "react-router-dom";
import OrderItem from "../pages/OrderItem";
import Orders from "../pages/Orders";
import WaitingList from "../pages/WaitingList";
import { IRoute } from "../utils/interfaces";

export const routes: Array<IRoute> = [
  {
    name: 'Waiting List',
    icon: 'fluent:document-bullet-list-clock-24-filled',
    path: '/waiting-list',
    element: <WaitingList />,
    navbarVisible: true
  },
  {
    name: 'Orders',
    icon: 'fluent:clipboard-task-list-ltr-24-filled',
    path: '/orders',
    element: <Orders />,
    navbarVisible: true
  },
  {
    name: 'Order Item',
    path: '/orders/:orderId',
    element: <OrderItem />,
    navbarVisible: false
  },
  {
    path: '*',
    element: <Navigate to="/waiting-list" />,
    navbarVisible: false
  }
]