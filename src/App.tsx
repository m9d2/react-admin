import {App as AntdApp, ConfigProvider} from "antd";
import zhCN from "antd/locale/zh_CN";
import {Provider} from "react-redux";
import store from "@/store";
import {RouterProvider} from "react-router-dom";
import router from "@/router";

const theme = {
    cssVar: true,
    token: {
        borderRadius: 2,
        // colorPrimary: '#006ad4',
        // colorPrimaryActive: '#0055ab',
        // colorPrimaryHover: '#0055ab',
        colorText: '#000000A6',
        fontSize: 14,
    },
    components: {
        Menu: {
            subMenuItemBorderRadius: 0,
            itemBorderRadius: 0,
        },
        Button: {
            paddingBlock: 0,
            contentLineHeight: 1,
        },

        Pagination: {
            // itemActiveBg: '#1890ff',
        },
        Table: {
            cellPaddingBlock: 12,
        },

    },
}

function App() {
    return (
        <ConfigProvider locale={zhCN} theme={theme}>
            <Provider store={store}>
                <AntdApp style={{height: '100%'}}>
                    <RouterProvider router={router}>
                    </RouterProvider>
                </AntdApp>
            </Provider>
        </ConfigProvider>
    )
}

export default App
