import React, { useState, useEffect } from "react"
import { Form, Input, Button, Alert } from "antd"
import api from "./api"

const { TextArea } = Input

const UpdatePost = (props) => {
  const id = props.match.params.id
  const [title, setTitle] = useState(null)
  const [content, setContent] = useState(null)

  useEffect(() => {
    api
      .getSinglePost(id)

      .then((res) => {
        setTitle(res.data.title)
        setContent(res.data.content)
      })

      .catch((err) => console.log(err))
  }, [id])

  console.log("Title: ", title, "Content: ", content)

  return (
    <>
      {title && content ? (
        <Output title={title} content={content} id={id} />
      ) : (
        ""
      )}
    </>
  )
}

const Output = ({ title, content, id }) => {
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const onFinish = (values) => {
    api
      .updatePost(id, values)

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
    <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item name="title">
        <Input placeholder="Post Title" defaultValue={title} />
      </Form.Item>

      <Form.Item name="content">
        <TextArea rows={5} placeholder="Content" defaultValue={content} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      {success ? <Alert message="Post updated" type="success" /> : ""}
      {failure ? <Alert message="Failed to update post" type="error" /> : ""}
    </Form>
  )
}
export default UpdatePost
