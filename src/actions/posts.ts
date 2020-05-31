import { Post } from "../types/post";

// possible action types in our blog
export const ADD_POST = 'ADD_POST';
export const GET_POSTS = 'GET_POSTS';
export const GET_POST_BY_ID = 'GET_POST_BY_ID';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';

// TypeScript related optimizations -- 
// interface for the action 
export interface AddPostAction{
  type: typeof ADD_POST,
  post: Post
}

export interface GetPostsAction{
  type: typeof GET_POSTS,
  posts: Post[]
}
export type PostActionTypes = AddPostAction | GetPostsAction;

export type AppActions = PostActionTypes;