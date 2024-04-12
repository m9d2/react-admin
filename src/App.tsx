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
        // colorPrimary: "#0060b7",
        fontSize: 13,
        colorLink: "#0060b7",
        colorText: "#333333",
    },
    components: {
        Menu: {
            subMenuItemBorderRadius: 4,
            itemBorderRadius: 4,
            // itemBg: '#001529',
            // colorText: '#ffffffb3',
            // itemSelectedColor: '#fff',
            // itemHoverBg: '#0060b7',
            // itemActiveBg: '#0060b7',
            // algorithm: true,
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
        Layout: {
            // siderBg: '#212121',
        }
    },
};

function App() {
    return (
        <ConfigProvider locale={zhCN} theme={themeConfig}>
            <Provider store={store}>
                <AntdApp style={{height: "100%"}}>
                    <RouterProvider router={router}></RouterProvider>
                </AntdApp>
            </Provider>
        </ConfigProvider>
    );
}

export default App;
