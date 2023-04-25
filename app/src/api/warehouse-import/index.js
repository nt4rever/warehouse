import axiosClient from 'utils/axiosClient';

const END_POINT = {
    ALL: '/import',
    CREATE: '/import',
    UPDATE: '/import'
};

export const warehouseImportServices = {
    getAll: () => {
        return axiosClient.get(END_POINT.ALL);
    },
    create: (payload) => {
        return axiosClient.post(END_POINT.CREATE, { ...payload });
    },
    update: ({ payload }) => {
        const { OrderDetails } = payload;
        return Promise.all(
            OrderDetails.map(async (item) => {
                if (item.Type) await axiosClient.patch(`${END_POINT.UPDATE}`, { ...item });
            })
        );
    }
};
