import { AxiosInstance } from "axios";

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

  async findOneAccount(id) {
    const path = `/${id}`;
    const response = await this.axios.get(path);
    const result = response.data;

    return result;
  }

  async createAccount(data) {
    const path = "/";
    const response = await this.axios.post(path, data);
    const result = response.data;

    return result;
  }

  async updateAccount(data) {
    console.log(data.accountId);
    const path = `/${data.accountId}`;
    const response = await this.axios.patch(path, data);
    const result = response.data;

    return result;
  }

  async deleteAccount(id) {
    const path = `/${id}`;
    const response = await this.axios.delete(path);
    const result = response.data;

    return result;
  }
}

export default AccountAPI;
