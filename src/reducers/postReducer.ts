// What's a Reducer?
// It is a function that takes the current state and 
// an action that was dispatched as its parameters and returns the new state.

import { ADD_POST, GET_POSTS, GET_POST_BY_ID, EDIT_POST, DELETE_POST, PostActionTypes } from "../actions/posts";
import { Post } from "../types/post";

// Setting up postReducer so that
// we can combine this reducer with other reducers later 
// and make a big object for the store 
// reducer should mandatorily return a state. 

const postReducerDefaultState: Post[] = [];

// Step 3: setting up reducer which should return a state
const postReducer = (state: any = postReducerDefaultState, action: PostActionTypes) => {
  // Actions will be performed GET, POST, PUT, DELETE 
  // Step 8:
  
  switch(action.type) {
    case ADD_POST:
      return state.concat([action.post]);
    case GET_POSTS:
      return action.posts;
    // case GET_POST_BY_ID:
    //   return action.post;
    // case EDIT_POST:
    //   return action.post;
    // case DELETE_POST:
    //   return action.post;
    default:
      return state;
  }
}

// Note to myself: any one will work -- check it
export {postReducer};  
//export default postReducer;