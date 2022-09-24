import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setBannerList, setMovieList } from './slice';


const BASE_URL = process.env.REACT_APP_BASE_URL_API;
const TOKEN_CYBERSOFT = process.env.REACT_APP_TOKEN_CYBERSOFT;
const token = JSON.parse(localStorage.getItem('access_token'));

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('TokenCybersoft', TOKEN_CYBERSOFT)
            const token = JSON.parse(localStorage.getItem('access_token'));
            const needAuth = getState().auth.needAuth;
            if (token && needAuth) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        getBannerList: builder.query({
            query: () => ({ url: `QuanLyPhim/LayDanhSachBanner` }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    // dispatch(setBannerList(res.data.content))
                } catch (err) {
                    console.log('Error Get Banner', err.error);
                }
            }
        }),
        getMovieList: builder.query({
            query: () => ({
                url: `QuanLyPhim/LayDanhSachPhim`,
                params: {
                    maNhom: 'GP11'
                }
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    // dispatch(setMovieList(res.data.content))
                } catch (err) {
                    console.log('Error Get Movie', err.error);
                }
            }
        }),
        getTheaterList: builder.query({
            query: () => ({
                url: `QuanLyRap/LayThongTinHeThongRap`
            }),
        }),
        getMovieDependTheater: builder.query({
            query: (theater) => ({
                url: `/QuanLyRap/LayThongTinLichChieuHeThongRap`,
                params: {
                    maHeThongRap: theater,
                    maNhom: 'GP11'
                }
            })
        }),
        getDetailMovie: builder.query({
            query: (movieId) => ({
                url: `/QuanLyPhim/LayThongTinPhim`,
                params: {
                    maPhim: movieId
                }
            })
        }),
        getSeatList: builder.query({
            query: (scheduleId) => ({
                url: `QuanLyDatVe/LayDanhSachPhongVe`,
                params: {
                    MaLichChieu: scheduleId
                }
            })
        }),
        bookingSeat: builder.mutation({
            query: (body) => ({
                url: `QuanLyDatVe/DatVe`,
                method: "POST",
                body: body
            })
        }),
        getUserInfo: builder.query({
            query: (username) => ({
                url: `QuanLyNguoiDung/LayThongTinNguoiDung`,
                method: "POST",
                params: {
                    taiKhoan: username
                }
            })
        })
    }),
})

export const { useGetBannerListQuery,
    useGetMovieListQuery,
    useGetTheaterListQuery,
    useGetMovieDependTheaterQuery,
    useGetDetailMovieQuery,
    useGetSeatListQuery,
    useBookingSeatMutation,
    useGetUserInfoQuery } = movieApi