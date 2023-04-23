// assets
import { TagsOutlined, SkinOutlined } from '@ant-design/icons';

// icons
const icons = {
    TagsOutlined,
    SkinOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const warehousing = {
    id: 'warehousing',
    title: 'Warehousing',
    type: 'group',
    employeeOnly: true,
    children: [
        {
            id: 'inventory',
            title: 'Inventory',
            type: 'item',
            url: '/warehousing/inventory',
            icon: icons.TagsOutlined
        },
        {
            id: 'orders',
            title: 'Orders',
            type: 'item',
            url: '/customer-order',
            icon: icons.SkinOutlined
        }
    ]
};

export default warehousing;
