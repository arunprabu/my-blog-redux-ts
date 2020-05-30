import React, { Component } from 'react';
import { Form, Input, Button } from "antd";
import Title from "antd/lib/typography/Title";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


class PostForm extends Component {

  onFinish = (values: any) => {
    console.log("Success:", values);
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

export default PostForm;