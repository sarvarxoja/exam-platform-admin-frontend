// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Testlar',
  type: 'group',
  children: [
    {
      id: 'util-typography',
      title: 'Testlarni nazorat qilish',
      type: 'item',
      url: '/tests',
      icon: icons.FontSizeOutlined
    }
  ]
};

export default utilities;
