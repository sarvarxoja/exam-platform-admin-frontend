// assets
import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';

// icons
const icons = {
  ChromeOutlined,
  QuestionOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Dasturiy yordam',
  type: 'group',
  children: [
    {
      id: 'documentation',
      title: 'Yordam kerakmi',
      type: 'item',
      url: '/support',
      icon: icons.QuestionOutlined  
    }
  ]
};

export default support;
