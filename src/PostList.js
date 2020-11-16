import React, { useState, useEffect } from "react"
import { Table, Alert, Divider } from "antd"
import { Link } from "react-router-dom"
import api from "./api"

const PostList = () => {
  const [allPost, setAllPost] = useState([""])
  const [deleted, setDeleted] = useState(false)

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
      title: "Update",
      dataIndex: "update",
      key: "update",
      render: (text, record) => (
        <Link to={`/update/${record.key}`}>Update</Link>
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (text, record) => (
        <button
          onClick={() => {
            api
              .deletePost(record.key)

              .then((res) => {
                console.log(res)
                setDeleted(true)
              })

              .catch((err) => {
                console.log(err)
              })
          }}
        >
          Delete
        </button>
      ),
    },
  ]

  return (
    <>
      {deleted ? (
        <Alert
          message="Post Deleted!"
          type="error"
          style={{ marginBottom: "10px" }}
        />
      ) : (
        ""
      )}
      <Table columns={columns} dataSource={allPost} />
    </>
  )
}

export default PostList
