import React, { FC } from "react";
import { Row, Col, PageHeader } from "antd";

import PostForm from "../../containers/PostForm";
import PostList from "../../containers/PostList";

const Posts: FC = () => {

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="All Posts"
        subTitle="You can Add & View Your Posts"
      />
      <Row gutter={16}>
        <Col className="gutter-row" span={9}>
          <PostForm></PostForm>
        </Col>

        <Col className="gutter-row" span={15}>
          <PostList></PostList>
        </Col>
      </Row>
    </>
  );
};

export default Posts;
