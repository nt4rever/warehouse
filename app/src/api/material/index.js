import axiosClient from 'utils/axiosClient';

const END_POINT = {
    ALL: '/material',
    CREATE: '/material/create',
    UPDATE: '/material'
};

export const materialServices = {
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
