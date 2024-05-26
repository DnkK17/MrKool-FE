// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { logOut, setCredentials } from "../redux/slice/authSlice";

// const baseQuery = fetchBaseQuery({
//     baseUrl: "http://localhost:5173",
//     credentials: 'include',
//     prepareHeaders: (headers, { getState }) => {
//         const token = getState().auth.token;
//         if (token) {
//             headers.set("authorization", `Bearer ${token}`);
//         }
//         return headers;
//     }
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions);
//     if (result?.error?.originalStatus === 403) {
//         console.log('sending refresh token');
//         // send refresh token to get new access token
//         const refreshResult = await baseQuery('/refresh', api, extraOptions)
//         console.log(refreshResult);
//         if (refreshResult?.data) {
//             const user = api.getState().auth.user;
//             //store the new token
//             api.dispatch(setCredentials({ ...refreshResult.data, user }));
//             //retry the original query with new access token
//             result = await baseQuery(args, api, extraOptions);
//         } else {
//             api.dispatch(logOut());
//         }
//     }
//     return result;
// };

// export const api = createApi({
//     reducerPath: 'api',
//     baseQuery: baseQueryWithReauth,
//     tagTypes: ['User'],
//     endpoints: (builder) => ({
//         getUsers: builder.query({
//             query: () => '/users',
//             providesTags: ['User'],
//         }),
//         // Add more endpoints as needed
//     }),
// });

// export const { useGetUsersQuery } = api;