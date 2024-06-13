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

  async createAccount() {}

  async updateAccount() {}

  async deleteAccount() {}
}

export default AccountAPI;
