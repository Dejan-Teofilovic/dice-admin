import { RouteObject } from "react-router-dom"

export interface IRoute extends RouteObject {
  name?: string;
  icon?: string;
}

export interface ILoginInfo {
  email: string;
  password: string;
}