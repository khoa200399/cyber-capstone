import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bannerList: [],
    movieList: []
}

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setBannerList: (state, action) => {
            state.bannerList = action.payload
        },
        setMovieList: (state, action) => {
            state.movieList = action.payload
        }
    }
})

export const { setBannerList, setMovieList } = movieSlice.actions
export default movieSlice.reducer