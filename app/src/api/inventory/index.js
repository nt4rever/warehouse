import axiosClient from 'utils/axiosClient';

const END_POINT = {
    ALL: '/inventory',
    CREATE: '/inventory',
    UPDATE: '/inventory',
    DELETE: '/inventory'
};

export const inventoryServices = {
    getAll: () => {
        return axiosClient.get(END_POINT.ALL);
    },
    create: (payload) => {
        return axiosClient.post(END_POINT.CREATE, { ...payload });
    },
    update: ({ id, payload }) => {
        return axiosClient.patch(`${END_POINT.UPDATE}/${id}`, payload);
    },
    delete: (id) => {
        return axiosClient.delete(`${END_POINT.DELETE}/${id}`);
    }
};
