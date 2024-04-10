import { App as AntdApp, ConfigProvider, ThemeConfig } from "antd";
import zhCN from "antd/locale/zh_CN";
import { Provider } from "react-redux";
import store from "@/store";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { theme } from "antd";

const themeConfig: ThemeConfig = {
  cssVar: true,
  algorithm: [theme.defaultAlgorithm],
  token: {
    borderRadius: 4,
    colorPrimary: "#0060b7",
    fontSize: 12,
    colorLink: "#0060b7",
    colorText: "#333333",
  },
  components: {
    Menu: {
      subMenuItemBorderRadius: 4,
      itemBorderRadius: 4,
    },
    Input: {},
    Button: {
      paddingBlock: 0,
      contentLineHeight: 1,
    },
    Pagination: {},
    Table: {
      cellPaddingBlock: 12,
    },
    Card: {},
  },
};

function App() {
  return (
    <ConfigProvider locale={zhCN} theme={themeConfig}>
      <Provider store={store}>
        <AntdApp style={{ height: "100%" }}>
          <RouterProvider router={router}></RouterProvider>
        </AntdApp>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
