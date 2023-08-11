// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const profileApi = createApi({
//   reducerPath: "profileApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `https://contact-app.mmsdev.site/api/v1`,
//   }),
//   tagTypes: ["profile"],

//   endpoints: (builder) => ({
    
//     getUserProfile:builder.query({
//       query:({token})=>({
//         url:`/user-profile`,
//         headers: { authorization: `Bearer ${token}` },
//       }),
//       providesTags: ["profile"],

//     })
//   }),
// });

// export const {useGetUserProfileQuery } = profileApi;

// //  https://contact-app.mmsdev.site/api/v1/user-profile

// //https://rizes-organization.gitbook.io/contactapi/?fbclid=IwAR3PLN0xNlhnchv6iOCrys8zD6zDqo-r5Y5WsieEPTJ9xg-XPCS6NGVe0Ic
