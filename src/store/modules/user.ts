import {createSlice} from '@reduxjs/toolkit';
import {auth, request} from "@/utils";

interface UserState {
    token: string
}

const initialState: UserState = {
    token: '',
}
export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
    },
});

export const {setToken} = userSlice.actions;

export const login = (loginForm: any) => {
    return async (dispatch: any) => {
        const resp: any = await request.post('/login', loginForm)
        if (resp.code != 200) {
            return resp.msg;
        }
        const accessToken = resp.data.token;
        dispatch(setToken(accessToken))
        auth.setToken(accessToken, loginForm.remember)
    }
}

export default userSlice.reducer;