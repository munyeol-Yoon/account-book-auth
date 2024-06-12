import axios, { AxiosInstance } from "axios";
import AuthAPI from "./auth.api";

const BASE_URL = `https://moneyfulpublicpolicy.co.kr`;

class API {
  private axios: AxiosInstance;

  public auth;

  constructor() {
    this.axios = axios.create({ baseURL: BASE_URL });
    this.auth = new AuthAPI(this.axios);
  }
}

const api = new API();

export default api;
