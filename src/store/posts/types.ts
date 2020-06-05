// data type for the post data
// Response object for GET /posts
// http://jsonplaceholder.typicode.com/posts
export interface Post extends ApiResponse{
  id?: number
  title?: string
  body?: string
}

// This type is basically shorthand for `{ [key: string]: any }`. 
// Feel free to replace `any` with
// the expected return type of your API response.
export type ApiResponse = Record<string, any>

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum PostsActionTypes {
  FETCH_REQUEST = '@@posts/FETCH_REQUEST',  // for get all posts
  FETCH_SUCCESS = '@@posts/FETCH_SUCCESS',  // for get all posts success
  FETCH_ERROR = '@@posts/FETCH_ERROR',      // for post related errors 
  FETCH_REQUEST_BY_ID = '@@posts/FETCH_REQUEST_BY_ID',   // for get post by id 
  FETCH_SUCCESS_BY_ID = '@@posts/FETCH_SUCCESS_BY_ID',   // for get post by id - success 
  UPDATE_REQUEST_BY_ID = '@@posts/UPDATE_REQUEST_BY_ID',  // for update post by id
  UPDATE_SUCCESS_BY_ID = '@@posts/UPDATE_SUCCESS_BY_ID'   // // for update post by id - success
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface PostsState {
  readonly loading: boolean
  readonly postList: []
  readonly post?: any,
  readonly errors?: string,
  readonly status?: boolean
}