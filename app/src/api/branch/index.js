import axiosClient from 'utils/axiosClient';

const END_POINT = {
    ALL: '/branch'
};

const getAll = () => {
    return axiosClient.get(END_POINT.ALL);
};

export const branchServices = { getAll };
