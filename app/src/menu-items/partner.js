// assets
import { TeamOutlined } from '@ant-design/icons';

// icons
const icons = {
    TeamOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const partner = {
    id: 'partner',
    title: 'Partner',
    type: 'group',
    children: [
        {
            id: 'customer',
            title: 'Customer',
            type: 'item',
            url: '/customer',
            icon: icons.TeamOutlined
        },
        {
            id: 'supplier',
            title: 'Supplier',
            type: 'item',
            url: '/supplier',
            icon: icons.TeamOutlined
        }
    ]
};

export default partner;
