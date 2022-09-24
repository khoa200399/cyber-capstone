import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUserInfo } from './slice';


const BASE_URL = process.env.REACT_APP_BASE_URL_API;
const TOKEN_CYBERSOFT = process.env.REACT_APP_TOKEN_CYBERSOFT;

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            headers.set('TokenCybersoft', TOKEN_CYBERSOFT)
            // const token = getState().auth.token
            // if (token) {
            //     headers.set('authorization', `Bearer ${token}`)
            // }
            return headers
        }
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (dataLogin) => ({
                url: `QuanLyNguoiDung/DangNhap`,
                method: "POST",
                body: dataLogin
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    const { accessToken, ...userInfo } = res.data.content
                    console.log(res.data.content);
                    localStorage.setItem('access_token', JSON.stringify(accessToken))
                    localStorage.setItem('user_info', JSON.stringify(userInfo))
                } catch (err) {
                    console.log('Error Get Banner', err.error);
                }
            }
        }),
        register: builder.mutation({
            query: (dataRegister) => ({
                url: `QuanLyNguoiDung/DangKy`,
                method: "POST",
                body: dataRegister
            }),
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                try {
                    const res = await queryFulfilled;
                    dispatch(setUserInfo(res.data.content))
                } catch (err) {
                    console.log('Error Get Banner', err.error);
                }
            }
        })
    }),
})

export const { useLoginMutation, useRegisterMutation } = authApi