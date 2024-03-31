import {configureStore} from '@reduxjs/toolkit';
import userReducer from '@/store/modules/user.ts';
import collapsedSlice from "@/store/modules/collapsed.ts";

const store = configureStore({
    reducer: {
        user: userReducer,
        collapsed: collapsedSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store