import store from '@/store';
import { App as AntdApp, ConfigProvider, theme, ThemeConfig } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { Provider } from 'react-redux';
import {
  createHashRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import Root from '@/router';

const router = createHashRouter(createRoutesFromElements(Root));

function App() {
  const root = document.documentElement;
  const style = getComputedStyle(root);
  const primaryColor = style.getPropertyValue('--color-primary');
  const menuBgColor = style.getPropertyValue('--color-bg-menu');
  const themeConfig: ThemeConfig = {
    cssVar: true,
    algorithm: [theme.defaultAlgorithm],
    token: {
      borderRadius: 4,
      colorPrimary: primaryColor,
      fontSize: 13,
      colorLink: primaryColor,
      colorText: 'rgba(51, 51, 51, 1)',
      colorBgLayout: '#ecf1f5',
      paddingXS: 15,
    },
    components: {
      Menu: {
        subMenuItemBorderRadius: 4,
        itemBorderRadius: 4,
        itemBg: menuBgColor,
        itemColor: '#ffffffb3',
        itemSelectedBg: menuBgColor,
        itemSelectedColor: '#FFFFFF',
        subMenuItemBg: '#000000',
        itemActiveBg: menuBgColor,
        itemHoverColor: 'rgb(255, 255, 255)',
        itemMarginInline: 15,
      },
      Input: {},
      Button: {
        controlHeight: 30,
        paddingBlock: 0,
        contentLineHeight: 1,
      },
      Pagination: {},
      Table: {
        cellPaddingBlock: 12,
        borderColor: '#cfdbfa',
        headerBg: 'rgba(4, 66, 225, 0.08)',
      },
      Card: {
        paddingLG: 15,
      },
      Layout: {
        siderBg: menuBgColor,
        headerPadding: 20,
        headerHeight: 56,
      },
    },
  };
  return (
    <ConfigProvider locale={zhCN} theme={themeConfig}>
      <Provider store={store}>
        <AntdApp style={{ height: '100%' }}>
          <RouterProvider router={router}></RouterProvider>
        </AntdApp>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
