import {App as AntdApp, ConfigProvider, theme, ThemeConfig} from "antd";
import zhCN from "antd/locale/zh_CN";
import {Provider} from "react-redux";
import store from "@/store";
import {RouterProvider} from "react-router-dom";
import router from "@/router";

const themeConfig: ThemeConfig = {
    cssVar: true,
    algorithm: [theme.defaultAlgorithm],
    token: {
        borderRadius: 4,
        colorPrimary: "rgba(0, 96, 183, 1)",
        fontSize: 13,
        colorLink: "rgba(0, 96, 183, 1)",
        colorText: "rgba(51, 51, 51, 1)",
        colorBgLayout: '#ecf1f5',
    },
    components: {
        Menu: {
            subMenuItemBorderRadius: 4,
            itemBorderRadius: 4,
            itemBg: "#1A1A1A",
            itemColor: "#ffffffb3",
            itemSelectedBg: "#1A1A1A",
            itemSelectedColor: '#FFFFFF',
            subMenuItemBg: '#000000',
            itemActiveBg: "#1A1A1A",
            itemHoverColor: "rgb(255, 255, 255)",
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
            siderBg: '#1A1A1A',
        },
    },
};

function App() {
    return (
        <ConfigProvider locale={zhCN} theme={themeConfig}>
            <Provider store={store}>
                <AntdApp style={{height: "100%"}}>
                    <RouterProvider router={router}>

                    </RouterProvider>
                </AntdApp>
            </Provider>
        </ConfigProvider>
    );
}

export default App;
