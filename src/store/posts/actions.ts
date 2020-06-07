import { action } from 'typesafe-actions';  // npm i typesafe-actions
import { PostsActionTypes, Post } from './types'

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions




// for add post
export const createRequest = (post: Post) => {
  console.log(post);
  return action(PostsActionTypes.CREATE_REQUEST, post)
}
export const createSuccess = (data: Post) => {
  console.log(data);
  return action(PostsActionTypes.CREATE_SUCCESS, data);
}


export const fetchRequest = () => action(PostsActionTypes.FETCH_REQUEST)

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchSuccess = (data: Post[]) => action(PostsActionTypes.FETCH_SUCCESS, data)
export const fetchError = (message: string) => action(PostsActionTypes.FETCH_ERROR, message)

// for post details 
export const fetchRequestById = (postId: string) => action(PostsActionTypes.FETCH_REQUEST_BY_ID, postId)
export const fetchSuccessById = (data: Post) => action(PostsActionTypes.FETCH_SUCCESS_BY_ID, data);


// for post details update
export const updateRequestById = (post: Post) => action(PostsActionTypes.UPDATE_REQUEST_BY_ID, post)
export const updateSuccessById = (data: Post) => action(PostsActionTypes.UPDATE_SUCCESS_BY_ID, data);
