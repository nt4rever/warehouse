import axiosClient from 'utils/axiosClient';

const END_POINT = {
    ALL: '/employee',
    CREATE: '/employee/create',
    UPDATE: '/employee'
};

export const employeeServices = {
    getAll: () => {
        return axiosClient.get(END_POINT.ALL);
    },
    create: (payload) => {
        return axiosClient.post(END_POINT.CREATE, { ...payload });
    }
};
