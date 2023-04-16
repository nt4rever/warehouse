import axiosClient from 'utils/axiosClient';

const END_POINT = {
    ALL: '/customer',
    CREATE: '/customer/create',
    UPDATE: '/customer'
};

export const customerServices = {
    getAll: () => {
        return axiosClient.get(END_POINT.ALL);
    },
    create: (payload) => {
        return axiosClient.post(END_POINT.CREATE, { ...payload });
    },
    update: ({ id, payload }) => {
        return axiosClient.patch(`${END_POINT.UPDATE}/${id}`, payload);
    }
};
