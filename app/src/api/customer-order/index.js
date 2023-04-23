import axiosClient from 'utils/axiosClient';

const END_POINT = {
    ALL: '/order',
    CREATE: '/order',
    UPDATE: '/order',
    GET_DETAIL: '/order',
    DELETE_DETAIL: '/order/delete-detail'
};

export const customerOrderServices = {
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
    },
    getDetails: (id) => {
        return axiosClient.get(`${END_POINT.GET_DETAIL}/${id}`);
    },
    deleteDetail: ({ OrderID, MaterialID }) => {
        return axiosClient.post(`${END_POINT.DELETE_DETAIL}`, { OrderID, MaterialID });
    }
};
