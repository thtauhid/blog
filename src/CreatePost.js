import React, { useState } from "react"
import { Layout, Form, Input, Button, Alert } from "antd"
import api from "./api"

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

export default CreatePost
