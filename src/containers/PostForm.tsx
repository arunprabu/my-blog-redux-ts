import React, { Component } from 'react';
import { Form, Input, Button } from "antd";
import { Typography } from 'antd';
import {connect} from 'react-redux';

import { createPost } from '../services/postService';
import { AppActions } from '../actions/posts';
import { Post } from '../types/post';
import { AppState } from '../store/configureStore';

// there are 5 ways to connect to redux actions in redux 
// one is this 
import { bindActionCreators } from "redux";

// we'll soon see an error related to async action w/o middleware
// so add the following  
import { ThunkDispatch } from "redux-thunk";

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

interface AddPostPageProps {
  title: string;
  body: string;
}

interface AddPostPageState {}

type Props = AddPostPageProps & LinkStateProps & LinkDispatchProps;
      
class PostForm extends Component <Props, AddPostPageProps>{

  onFinish = (values: any) => {
    console.log("Success:", values);
    // dispatch an action
    // dispatch is a method will be part of redux.. 
    console.log(this.props);
    // redux's dispatch function available in props... hit the service method
    this.props.onCreatePost(values);
  };

  onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <>
        <Title level={2}>View Posts</Title>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="Post Title"
              name="title"
              rules={[
                { required: true, message: "Please enter your post title!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Post Content"
              name="body"
              rules={[
                { required: true, message: "Please enter your post content!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Create Post
              </Button>
            </Form.Item>
          </Form>
      </>
    )
  }
}

interface LinkStateProps {
  posts: Post[];
}
interface LinkDispatchProps {
  onCreatePost: (post: Post) => any;
}

const mapStateToProps = (
  state: AppState,
  ownProps: AddPostPageProps
): LinkStateProps => ({
  posts: state.posts
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: AddPostPageProps
): LinkDispatchProps => ({
  onCreatePost: bindActionCreators(createPost, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(PostForm);