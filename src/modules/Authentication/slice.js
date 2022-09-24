import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    access_token: "",
    user_info: "",
    needAuth: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.access_token = action.payload
        },
        setUserInfo: (state, action) => {
            state.user_info = action.payload
        },
        logout: () => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("user_info");
            window.location.reload();
        },
        setNeedAuth: (state, action) => {
            state.needAuth = action.payload
        }
    }
})

export const { setAccessToken, setUserInfo, logout, setNeedAuth } = authSlice.actions
export default authSlice.reducer