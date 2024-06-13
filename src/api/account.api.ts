import { AxiosInstance } from "axios";
import { AccountDataType } from "../types/account.type";

class AccountAPI {
  private axios;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async getAccount() {
    const path = "/";
    const response = await this.axios.get(path);
    const result = response.data;

    return result;
  }

  async findOneAccount(id: string) {
    const path = `/${id}`;
    const response = await this.axios.get(path);
    const result = response.data;

    return result;
  }

  async createAccount(data: AccountDataType) {
    const path = "/";
    const response = await this.axios.post(path, data);
    const result = response.data;

    return result;
  }

  async updateAccount(data: AccountDataType) {
    console.log(data.accountId);
    const path = `/${data.accountId}`;
    const response = await this.axios.patch(path, data);
    const result = response.data;

    return result;
  }

  async deleteAccount(id: string) {
    const path = `/${id}`;
    const response = await this.axios.delete(path);
    const result = response.data;

    return result;
  }
}

export default AccountAPI;
