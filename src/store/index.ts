import {configureStore} from '@reduxjs/toolkit';
import userReducer from '@/store/modules/user.ts';
import collapsedSlice from "@/store/modules/collapsed.ts";

export default configureStore({
    reducer: {
        user: userReducer,
        collapsed: collapsedSlice,
    },
});