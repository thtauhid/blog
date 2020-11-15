import React, { useEffect, useState } from "react"
import { Card } from "antd"
import { Link } from "react-router-dom"
import api from "./api"

const Post = ({ title, content, id }) => {
  return (
    <>
      <Card
        title={title}
        extra={<Link to={`/post/${id}`}>Read More</Link>}
        style={{ marginBottom: "20px" }}
      >
        {content}
      </Card>
    </>
  )
}

const HomePage = () => {
  const [allPost, setAllPost] = useState([""])
  useEffect(() => {
    api
      .getAllPost()

      .then((posts) => {
        const allPost = posts.map((post) => {
          const { id: key } = post.ref["@ref"]
          const { title, content } = post.data
          return {
            key,
            title,
            content,
          }
        })

        setAllPost(allPost)
        console.log(allPost)
      })

      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      {allPost.map((p) => (
        <Post title={p.title} id={p.key} content={p.content} />
      ))}
    </>
  )
}

export default HomePage
