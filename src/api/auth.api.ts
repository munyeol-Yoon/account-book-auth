import { AxiosInstance } from "axios";
import {
  LoginUserType,
  ProfileDataType,
  RegisterUserType,
} from "../types/user.type";

class AuthAPI {
  private axios;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async signUp(data: RegisterUserType) {
    // POST
    // /register
    const path = "register";
    const response = await this.axios.post(path, data);
    const result = response;

    return result;
  }

  async login(data: LoginUserType) {
    // POST
    // /login
    const path = "login";
    const response = await this.axios.post(path, data);
    const result = response;

    return result;
  }

  async checkToken(accessToken: string) {
    // GET
    // /user
    const path = "/user";
    const response = await this.axios.get(path, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = response;

    return result;
  }

  async updateProfile(data: ProfileDataType, accessToken: string) {
    // PATCH
    // /profile
    const formData = new FormData();
    formData.append("avatar", data.imgFile);
    formData.append("nickname", data.nickname);

    const path = "/profile";
    const response = await this.axios.patch(path, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = response;

    return result;
  }
}

export default AuthAPI;
