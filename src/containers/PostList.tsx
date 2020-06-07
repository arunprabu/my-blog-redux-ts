import React, { Component } from 'react';
import { NavLink, RouteComponentProps } from "react-router-dom";
import { connect } from 'react-redux';
import { Card, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';

import { ApplicationState } from '../store';
import { Post } from '../store/posts/types';
import { fetchRequest } from '../store/posts/actions'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  postList: Post[]
  errors?: string
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch

//const API_ENDPOINT = 'http://jsonplaceholder.typicode.com/posts';


class PostList extends Component<AllProps> {

  componentDidMount() {
    console.log(this.props);
    const { fetchRequest } = this.props;
    fetchRequest()
  }

  render() {
    console.log(this.props); 
    const { postList } = this.props;

    let allPosts = null;

    allPosts = postList.map(post => {
      return (
        <Card title={post.title} style={{ width: "100%" }} key={`card${post.id}`}>
          <p>
            {post.body}
          </p>
          <NavLink to={`/posts/${post.id}`}>View More... </NavLink>
        </Card>
      )
    })

    return (
      <>
        <Title level={2}>View Posts</Title>
        
          { postList && postList.length > 0 ? 
              allPosts :
              <Spin size="large" />
          }
        
      </>
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ posts }: ApplicationState) => {
  console.log(posts);
  return {
    loading: posts.loading,
    errors: posts.errors,
    postList: posts.postList
  }
}

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = {
  fetchRequest
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)