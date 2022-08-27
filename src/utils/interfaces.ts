import { RouteObject } from "react-router-dom";

export interface IRoute extends RouteObject {
  name?: string;
  icon?: string;
  navbarVisible: boolean;
}

export interface ILoginInfo {
  email: string;
  password: string;
}

export interface IWaitListItem {
  id: number;
  email: string;
  wallet_address: string;
}

export interface IOrder {
  id: number;
  wallet_address: string;
  email: string;
  message: string;
  nft_image: string | null;
  name: string;
  goal_price: number | null;
  income_price: number | null;
  id_order_status: number;
}

export interface IOrderStatus {
  id: number;
  status: string;
}

export interface IUserdata {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ISignupData extends IUserdata {
  password: string;
  adminPassword: string;
}
