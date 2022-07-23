import api from "./api";
import { STRING } from "./constants";

export const setItemOfLocalStorage = (name = "x", data = "x") => {
  if (typeof data === STRING) {
    localStorage.setItem(name, data);
  } else {
    localStorage.setItem(name, JSON.stringify(data));
  }
};

export const getItemOfLocalStorage = (name = "x"): string | null => {
  return localStorage.getItem(name);
};

export const removeItemOfLocalStorage = (name = "x") => {
  localStorage.removeItem(name);
};

export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};
