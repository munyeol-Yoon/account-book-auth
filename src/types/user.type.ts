export type RegisterUserType = {
  id: string;
  password: string;
  nickname: string;
};

export type RegisterUserResType = {
  message: string;
  success: boolean;
};

export type LoginUserType = {
  id: string;
  password: string;
};

export type LoginUserResType = {
  accessToken: string;
  userId: string;
  success: boolean;
  avatar: string | null;
  nickname: string;
};

export type AuthCheckResType = {
  id: string;
  nickname: string;
  avatar: string | null;
  success: boolean;
};

export type ProfileDataType = {
  imgFile: string;
  nickname: string;
};

export type ProfileResType = {
  avatar: string;
  nickname: string;
  message: string;
  success: boolean;
};
