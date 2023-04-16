import axiosClient from 'utils/axiosClient';

const END_POINT = {
    ALL: '/branch',
    UPDATE: '/branch'
};

const getAll = () => {
    return axiosClient.get(END_POINT.ALL);
};

const update = ({ id, payload }) => {
    return axiosClient.patch(`${END_POINT.ALL}/${id}`, payload);
};

export const branchServices = { getAll, update };
