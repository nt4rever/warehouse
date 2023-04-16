// assets
import { UserOutlined, UserAddOutlined } from '@ant-design/icons';

// icons
const icons = {
    UserOutlined,
    UserAddOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const humanResource = {
    id: 'facilities',
    title: 'Facilities',
    type: 'group',
    children: [
        {
            id: 'employee',
            title: 'Employee',
            type: 'item',
            url: '/employee',
            icon: icons.UserOutlined
        },
        {
            id: 'user',
            title: 'User',
            type: 'item',
            url: '/user',
            icon: icons.UserAddOutlined
        }
    ]
};

export default humanResource;
