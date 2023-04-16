// assets
import { UserOutlined, UserAddOutlined } from '@ant-design/icons';

// icons
const icons = {
    UserOutlined,
    UserAddOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const humanResource = {
    id: 'humanResource',
    title: 'Human Resource',
    type: 'group',
    children: [
        {
            id: 'user',
            title: 'User',
            type: 'item',
            url: '/user',
            icon: icons.UserAddOutlined
        },
        {
            id: 'employee',
            title: 'Employee',
            type: 'item',
            url: '/employee',
            icon: icons.UserOutlined
        }
    ]
};

export default humanResource;
