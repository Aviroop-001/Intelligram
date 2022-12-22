import { createSlice } from '@reduxjs/toolkit'

// ! make it null to work with authentication
const initialState = {
    loggedUser: null,
    userPosts: null,
    likedPosts: null,
  }

  export const userSlice = createSlice({
    name: 'userStore',
    initialState,
    reducers: {
      userLoginRedux: (state, action) =>{
        state.loggedUser = action.payload
      },
      userLogoutRedux: (state) =>{
        state.loggedUser = null,
        state.userPosts = null
      },
      fetchCurrentUserPostsRedux: (state, action) =>{
        state.userPosts = action.payload
      },
      fetchLikedPostsRedux: (state,action) =>{
        state.likedPosts = action.payload
      },
    },
  })

  export const { userLoginRedux, userLogoutRedux, fetchCurrentUserPostsRedux, fetchLikedPostsRedux } = userSlice.actions
  export default userSlice.reducer