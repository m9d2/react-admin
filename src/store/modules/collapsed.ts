import {createSlice} from '@reduxjs/toolkit';

export const collapsedSlice = createSlice({
    name: 'collapsed',
    initialState: {
        value: false,
    },
    reducers: {
        toggle: (state) => {
            state.value = !state.value
        },
    },
});

export const {toggle} = collapsedSlice.actions;

export default collapsedSlice.reducer;