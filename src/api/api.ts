import axios, { AxiosInstance } from "axios";
import AccountAPI from "./account.api";
import AuthAPI from "./auth.api";

const BASE_URL = `https://moneyfulpublicpolicy.co.kr`;
const JSON_URL = `http://localhost:5001/accountBook`;

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
