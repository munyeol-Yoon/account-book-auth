import { AxiosInstance } from "axios";
import {
  AuthCheckResType,
  LoginUserResType,
  LoginUserType,
  ProfileDataType,
  ProfileResType,
  RegisterUserResType,
  RegisterUserType,
} from "../types/user.type";

class AuthAPI {
  private axios;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async signUp(data: RegisterUserType): Promise<RegisterUserResType> {
    // POST
    // /register
    const path = "register";
    const response = await this.axios.post(path, data);
    const result = response.data;

    return result;
  }

  async login(data: LoginUserType): Promise<LoginUserResType> {
    // POST
    // /login
    const path = "login";
    const response = await this.axios.post(path, data);
    const result = response.data;

    return result;
  }

  async checkToken(accessToken: string): Promise<AuthCheckResType> {
    // GET
    // /user
    const path = "/user";
    const response = await this.axios.get(path, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = response.data;

    return result;
  }

  async updateProfile(
    data: ProfileDataType,
    accessToken: string
  ): Promise<ProfileResType> {
    // PATCH
    // /profile
    const formData = new FormData();
    if (data.imgFile) formData.append("avatar", data.imgFile);
    formData.append("nickname", data.nickname);

    const path = "/profile";
    const response = await this.axios.patch(path, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = response.data;

    return result;
  }
}

export default AuthAPI;
