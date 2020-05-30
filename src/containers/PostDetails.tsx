import React, { Component } from 'react'
import Title from 'antd/lib/typography/Title';
import { Card, Input } from 'antd';
import { Button, Modal } from 'antd';
import { Form } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

class PostDetails extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onFinish = (values: any) => {
    console.log('Success:', values);

    // send the values... 
  };

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
      <div>
        <Title level={2}>View Post Details</Title>
        <Card title="Post title 1" style={{ width: '100%' }}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
            Consequatur officiis hic id at voluptatem modi soluta quas, enim a. 
            Maiores aut quis nobis error ullam temporibus voluptas praesentium amet accusantium.</p>
          
          <Button type="primary" onClick={this.showModal}>Edit</Button> <Button danger>Delete</Button>
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Form
            {...layout}
            name="basic"
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="Post Title"
              name="postTitle"
              rules={[{ required: true, message: 'Please input your postTitle!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Post Body"
              name="postContent"
              rules={[{ required: true, message: 'Please input your postContent!' }]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          </Modal>
        </Card>
      </div>
    )
  }
}

export default PostDetails;
