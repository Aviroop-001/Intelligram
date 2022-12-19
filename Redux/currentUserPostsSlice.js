import { createSlice } from '@reduxjs/toolkit'

// ! make it null to work with authentication
const initialState = {
    currentUserPosts: [],
  }

  export const currentUserPostsSlice = createSlice({
    name: 'userStore',
    initialState,
    reducers: {
      fetchCurrentUserPostsRedux: (state, action) =>{
        state.currentUserPosts = action.payload
      }
    },
  })

  export const { fetchCurrentUserPostsRedux } = currentUserPostsSlice.actions
  export default currentUserPostsSlice.reducer