import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../../api/userApi';
import { User, UserState } from '../../types';

const initialState: UserState = {
  users: [],
  user: null,
  loading: false,
  error: false,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getUsers();
  return response.data;
});

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (id: string) => {
    const response = await getUser(id);
    return response.data;
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      return response.data; // Successful response
    } catch (error: unknown) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

export const editUser = createAsyncThunk(
  'users/editUser',
  async ({ id, data }: { id: string; data: User }) => {
    const response = await updateUser(id, data);
    return response.data;
  }
);

export const removeUser = createAsyncThunk(
  'users/removeUser',
  async (id: string) => {
    await deleteUser(id);
    return id;
  }
);

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action?.payload?.message === Array
            ? action.payload.message.join(', ')
            : action.payload.message || 'Failed to add user';
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );

        if (index !== -1) state.users[index] = action.payload;
      })
      .addCase(removeUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
	state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
