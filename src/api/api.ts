import axios, { AxiosInstance } from "axios";
import AccountAPI from "./account.api.ts";
import AuthAPI from "./auth.api.ts";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const JSON_URL = import.meta.env.VITE_JSON_URL;

class API {
  private axiosAuth: AxiosInstance;
  private axiosJSON: AxiosInstance;

  public auth;
  public accountBook;

  constructor() {
    this.axiosAuth = axios.create({ baseURL: BASE_URL });
    this.axiosJSON = axios.create({ baseURL: JSON_URL });
    this.auth = new AuthAPI(this.axiosAuth);
    this.accountBook = new AccountAPI(this.axiosJSON);
  }
}

const api = new API();

export default api;
