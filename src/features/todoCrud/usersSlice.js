import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showToast } from "../../components/Toaster";



// Async thunk to fetch users data
export const fetchUsersData = createAsyncThunk(
    'users/fetchUsersData',
    async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            return response.data;
        } catch (error) {
            showToast.error(error.message);
        }
    }
);

//  (_, { getState }) Destructure getState from the thunkAPI
// Async thunk to insert a user
export const insertUser = createAsyncThunk("users/insertUser",
    async (_, { getState }) => {        
        const formData = getState().userCrud.formData;
        try {
            const response = await axios.post(
                "https://jsonplaceholder.typicode.com/users",
                formData
            );
            if (response) {
                showToast.success("User inserted successfully!");
                return response.data;
            } else {
                showToast.error("Failed to insert user");
                return null;
            }
        } catch (error) {
            showToast.error(error.message);
            throw error;
        }
    }
);

// Async thunk to update a user
export const updateUser = createAsyncThunk('users/updateUser',
    async (id, { getState }) => {
        const { formData } = getState().userCrud;
        try {
            const response = await axios.put(
                `https://jsonplaceholder.typicode.com/users/${id}`,
                formData
            );
            if (response) {
                showToast.success("User updated successfully!");
                return response.data;
            } else {
                showToast.error("Failed to update user");
                return null;
            }
        } catch (error) {
            showToast.error(error.message);
            throw error;
        }
    }
)

// Async thunk to delete a user
export const deleteUser = createAsyncThunk('users/deleteUser',
    async (id) => {
        try {
            const response = await axios.delete(
                `https://jsonplaceholder.typicode.com/users/${id}`
            );
            if (response) {
                showToast.success("Deleted Successfully!");
                return id;
            } else {
                showToast.error("Failed to Delete!");
                return null;
            }
        } catch (error) {
            showToast.error("Failed to Delete!");
            throw error;
        }
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
        formData: {
            address: {},
            company: {},
            email: "",
            name: "",
            phone: "",
            username: "",
            website: ""
        },
        showInsertDialog: false,
        showUpdateDialog: false,
        showDeleteDialog: {
            visible: false,
            id: 0
        }
    },
    reducers: {
        updateFormData: (state, action) => {
            state.formData = {
                ...state.formData,
                ...action.payload
            };
        },
        resetFormData: (state) => {
            state.formData = {
                address: {},
                company: {},
                email: "",
                name: "",
                phone: "",
                username: "",
                website: ""
            };
        },
        setShowInsertDialog: (state, action) => {
            state.showInsertDialog = action.payload;
        },
        setShowUpdateDialog: (state, action) => {
            state.showUpdateDialog = action.payload;
        },
        setShowDeleteDialog: (state, action) => {
            state.showDeleteDialog = action.payload;
            
        }
    },
    extraReducers: (builder) => {
        builder
        //get
        .addCase(fetchUsersData.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchUsersData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(fetchUsersData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        //insert
        .addCase(insertUser.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(insertUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            if (action.payload) {
                state.data.push(action.payload);
            }
            state.showInsertDialog = false;
        })
        .addCase(insertUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        //update
        .addCase(updateUser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const index = state.data.findIndex(user => user.id === action.payload?.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
            state.showUpdateDialog = false; 
        })
        .addCase(updateUser.rejected, (state) => {
            state.status = 'failed';
        })
        //delete
        .addCase(deleteUser.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.data = state.data.filter(user => user.id !== action.payload);
            state.showDeleteDialog = { visible: false, id: 0 };
        })
        .addCase(deleteUser.rejected, (state) => {
            state.status = 'failed';
        });
    },
});

export const { 
    updateFormData,
    resetFormData,
    setShowInsertDialog,
    setShowUpdateDialog,
    setShowDeleteDialog
 } = userSlice.actions;
export default userSlice.reducer;