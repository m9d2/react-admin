import { auth, request } from '@/utils';
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  userInfo: object;
}

const initialState: UserState = {
  userInfo: {},
};
export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export const login = (loginForm: any) => {
  return async (dispatch: any) => {
    const resp: any = await request.post('/login', loginForm);
    if (resp.code != 200) {
      return resp.msg;
    }
    dispatch(setUserInfo(resp.data));
    auth.setUserInfo(resp.data, loginForm.remember);
  };
};

export default userSlice.reducer;
