import { RootState } from '@/store';
import { createSlice } from '@reduxjs/toolkit';

interface CollapsedState {
  value: boolean;
}

const initialState: CollapsedState = {
  value: false,
};

export const collapsedSlice = createSlice({
  name: 'collapsed',
  initialState: initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = collapsedSlice.actions;

export const selectCollapsed = (state: RootState) => state.collapsed.value;

export default collapsedSlice.reducer;
