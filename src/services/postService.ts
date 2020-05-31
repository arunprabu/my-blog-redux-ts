import axios from 'axios';
import { ADD_POST, GET_POSTS, GET_POST_BY_ID, DELETE_POST, EDIT_POST } from "../actions/posts";
import { Post } from '../types/post';
const POSTS_API_URL = 'https://reqres.in/api/posts';

export const createPost = (data: Post) => {

  return (dispatch: any) => {
    // AJAX call to add a post
    return axios.post(POSTS_API_URL, data )
      .then(response => {
          console.log(response);
          dispatch({
            type: ADD_POST,
            post: {
              id: response.data.id,
              title: response.data.title,
              body: response.data.body,
            }
          });
      })
      .catch(error => {
          throw (error);
      })
      .finally( () => {
        console.log('its over');
      }) 
  };
};


export const getPosts = () => {
  return (dispatch: any) => {
    // AJAX call to get posts
    return axios.get(POSTS_API_URL )
      .then(response => {
          dispatch({
            type: GET_POSTS,
            posts: response.data
          });
      })
      .catch(error => {
          throw (error);
      })
      .finally( () => {
        
      }) 
  };
}

export const getPostById = (postId: any) => {
  return (dispatch: any) => {
    // AJAX call to get posts
    return axios.get(POSTS_API_URL + '/' + postId)
      .then(response => {
          dispatch({
            type: GET_POST_BY_ID,
            post: response.data
          });
      })
      .catch(error => {
          throw (error);
      })
      .finally( () => {
        
      }) 
  };
}

export const deletePostById = (postId: any) => {
  return (dispatch: any) => {
    // AJAX call to get posts
    return axios.delete(POSTS_API_URL + '/' + postId)
      .then(response => {
          dispatch({
            type: DELETE_POST,
            post: response.data
          });
      })
      .catch(error => {
          throw (error);
      })
      .finally( () => {
        
      }) 
  };
}

export const updatePostById = (post: Post) => {
  return (dispatch: any) => {
    // AJAX call to get posts
    return axios.put(POSTS_API_URL + '/' + post.id, post)
      .then(response => {
          dispatch({
            type: EDIT_POST,
            post: response.data
          });
      })
      .catch(error => {
          throw (error);
      })
      .finally( () => {
        
      }) 
  };
}