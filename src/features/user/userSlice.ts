import { RootState } from 'app/store';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'utils/types';
import userApi from 'api/userApi';

const InitialState = {
   currentUser: {} as User,
};

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
   try {
      const response = await userApi.getInfo();

      return response;
   } catch (error) {
      console.error(error);
   }
});

export const userSlice = createSlice({
   name: 'user',
   initialState: InitialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(
         getUserInfo.fulfilled,
         (state, action: PayloadAction<any>) => {
            if (action.payload && action.payload['user']) {
               state.currentUser = action.payload['user'];
               localStorage.setItem('user', JSON.stringify(state.currentUser));
            }
         }
      );
   },
});
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
