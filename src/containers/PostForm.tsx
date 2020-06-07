import React, { Component } from 'react';
import { Form, Input, Button } from "antd";
import Title from "antd/lib/typography/Title";
import { createRequest } from '../store/posts/actions';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { Post } from '../store/posts/types';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  post: Post
  errors?: string
}

interface PropsFromDispatch {
  addPost: typeof createRequest
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch


class PostForm extends Component<AllProps> {

  onFinish = (values: any) => {
    console.log("Success:", values);
    // submit this data
    this.props.addPost(values);

  };

  onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  componentDidUpdate = () =>{
    // show notification
  }
 
  render() {
    return (
      <>
        <Title level={2}>View Posts</Title>
          <Form
            {...layout}
            name="basic"
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

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ posts }: ApplicationState) => {
  console.log(posts);
  return{
    post: posts.post,
    errors: posts.errors
  }
}

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps: PropsFromDispatch = {
  addPost: createRequest
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);