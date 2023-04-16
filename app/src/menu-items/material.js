// assets
import { TagsOutlined, SkinOutlined } from '@ant-design/icons';

// icons
const icons = {
    TagsOutlined,
    SkinOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const material = {
    id: 'material',
    title: 'Material',
    type: 'group',
    children: [
        {
            id: 'category',
            title: 'Category',
            type: 'item',
            url: '/category',
            icon: icons.TagsOutlined
        },
        {
            id: 'unit',
            title: 'Unit',
            type: 'item',
            url: '/unit',
            icon: icons.TagsOutlined
        },
        {
            id: 'material',
            title: 'Material',
            type: 'item',
            url: '/material',
            icon: icons.SkinOutlined
        }
    ]
};

export default material;
