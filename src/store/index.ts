import {configureStore} from '@reduxjs/toolkit';
import userReducer from '@/store/modules/user.ts';

export default configureStore({
    reducer: {
        user: userReducer,
    },
});