// assets
import { ApartmentOutlined, HddOutlined } from '@ant-design/icons';

// icons
const icons = {
    ApartmentOutlined,
    HddOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const branch = {
    id: 'facilities',
    title: 'Facilities',
    type: 'group',
    children: [
        {
            id: 'branch',
            title: 'Branch',
            type: 'item',
            url: '/branch',
            icon: icons.ApartmentOutlined
        },
        {
            id: 'warehouse',
            title: 'Warehouse',
            type: 'item',
            url: '/warehouse',
            icon: icons.HddOutlined
        }
    ]
};

export default branch;
