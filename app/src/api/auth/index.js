import axiosClient from "../../utils/axiosClient";

const END_POINT = {
  LOGIN: "/login",
  REGISTER: "/register",
  ME: "/me",
};

export const login = (payload) => {
  return axiosClient.post(END_POINT.LOGIN, payload);
};
