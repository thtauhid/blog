import React, { useState, useEffect } from "react"
import { Layout, Form, Input, Button, Table, Alert } from "antd"
import { Link, Route } from "react-router-dom"
import api from "./api"

const { Content, Footer } = Layout
const { TextArea } = Input

const CreatePost = () => {
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)

  const onFinish = (values) => {
    api
      .createPost(values)

      .then((res) => {
        console.log(res)
        setSuccess(true)
      })
      .catch((err) => {
        console.log(err)
      })
    console.log("Success:", values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
    setFailure(true)
  }
  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Input placeholder="Post Title" />
        </Form.Item>

        <Form.Item
          name="content"
          rules={[{ required: true, message: "Required!" }]}
        >
          <TextArea rows={5} placeholder="Content" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        {success ? <Alert message="Donor added" type="success" /> : ""}
        {failure ? <Alert message="Failed to add donor" type="error" /> : ""}
      </Form>
    </>
  )
}

const PostList = () => {
  const [allPost, setAllPost] = useState([""])
  useEffect(() => {
    api
      .getAllPost()

      .then((posts) => {
        const allPost = posts.map((post) => {
          const { id: key } = post.ref["@ref"]
          const { title } = post.data
          return {
            key,
            title,
          }
        })

        setAllPost(allPost)
        console.log(allPost)
      })

      .catch((err) => console.log(err))
  }, [])

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => <Link to={`/post/${record.key}`}>{text}</Link>,
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
      render: (text, record) => <Link to={`/post/${record.key}`}>View</Link>,
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      render: (text, record) => <Link to={`/edit/${record.key}`}>Edit</Link>,
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (text, record) => (
        <Link to={`/delete/${record.key}`}>Delete</Link>
      ),
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={allPost} />
    </>
  )
}
const Admin = () => {
  return (
    <>
      <Layout>
        <Content style={{ padding: "0 50px" }}>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Route path="/admin" component={PostList} />
              <Route path="/admin/create" component={CreatePost} />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          {"Made with <3 by Tauhid"}
        </Footer>
      </Layout>
    </>
  )
}

export default Admin
