import axiosClient from 'utils/axiosClient';

const END_POINT = {
    LOGIN: '/auth/login'
};

const login = (payload) => {
    return axiosClient.post(END_POINT.LOGIN, payload);
};

export const authServices = { login };
