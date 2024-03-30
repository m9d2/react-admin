import {createSlice} from '@reduxjs/toolkit';
import {request, auth} from "@/utils";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: '',
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
    },
});

export const {setToken} = userSlice.actions;

export const fetchLogin = (loginForm: any) => {
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