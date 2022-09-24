import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    darkMode: false,
}

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        toggleMode: (state, action) => {
            state.darkMode = action.payload
        }
    }
})

export const { toggleMode } = commonSlice.actions
export default commonSlice.reducer