import React, { Component } from 'react'
import Title from 'antd/lib/typography/Title';
import { Card, Input, Spin } from 'antd';
import { Button, Modal, notification } from 'antd';
import { Form } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../store';
import { fetchRequestById, updateRequestById } from '../store/posts/actions'
import { connect } from 'react-redux';


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  post: any
  errors?: string,
  status?: boolean
}

interface PropsFromDispatch {
  getPostById: typeof fetchRequestById,
  putPostById: typeof updateRequestById
}

interface RouteParams {
  id: string
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & RouteComponentProps<RouteParams>

class PostDetails extends Component<AllProps>  {
  state = { visible: false };

  componentDidMount() {
    const { match, getPostById } = this.props;
    
    getPostById(match.params.id);
  }

  componentWillUnmount() {
    // ideal place for clearing selected post state before leaving the page
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = (e: any) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onFinish = (values: any) => {
  
    values.id = this.props.post.id;
    console.log('Submitting...', values);
    this.props.putPostById(values);
  };

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  openNotificationWithIcon = (statusType: boolean) => {
    if(statusType){
      notification['success']({
        message: 'Success',
        description:
          'Your Post has been updated',
      });
    }else{
      notification['error']({
        message: 'Error',
        description:
          'Unable to Update the post. Some error occured',
      });
    }
    
  };

  componentDidUpdate(){
    if(this.props && this.props.status){
      this.openNotificationWithIcon(this.props.status)
    } //Todo: write else block also
  }

  render() {
    console.log(this.props);
    const { loading, post } = this.props;

    

    // for getting updated form data during submit 
    //Refer https://ant.design/components/form/#components-form-demo-form-in-modal
    // and  https://ant.design/components/modal/

    return (
      <div>
        <Title level={2}>View Post Details</Title>
        { post?
            <Card title={post.title} style={{ width: '100%' }}>
              <p>{post.body}</p>
              
              <Button type="primary" onClick={this.showModal}>Edit</Button> <Button danger>Delete</Button>
              <Modal
                title="Basic Modal"
                visible={this.state.visible}
                footer={[
                  <Button key="back" onClick={this.handleCancel}>
                    Cancel
                  </Button>,
                  <Button form="myForm" type="primary" key="submit" htmlType="submit">
                    Update
                  </Button>
                ]}
              >
                <Form
                  id='myForm'
                  initialValues={{
                    'title': post.title,
                    'body': post.body
                  }}
                  {...layout}
                  name="basic"
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
              >
                <Form.Item
                  label="Post Title"
                  name="title"                  
                  rules={[{ required: true, message: 'Please input your postTitle!' }]}
                >
                  <Input/>
                </Form.Item>

                <Form.Item
                  label="Post Body"
                  name="body"
                  rules={[{ required: true, message: 'Please input your postContent!' }]}
                >
                  <Input.TextArea />
                </Form.Item>

                
              </Form>
              </Modal>
            </Card>
          :
          <Spin size="large" />
        }
        
      </div>
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
    errors: posts.errors,
    status: posts.status
  }
}

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps: PropsFromDispatch = {
  getPostById: fetchRequestById,
  putPostById: updateRequestById
}

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetails);