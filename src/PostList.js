import React, { useState, useEffect } from "react"
import { Table } from "antd"
import { Link } from "react-router-dom"
import api from "./api"

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

export default PostList
