import React, { useEffect, useState } from "react"
import { Card } from "antd"

import api from "./api"

const SinglePost = (props) => {
  const id = props.match.params.id
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    api
      .getSinglePost(id)

      .then((res) => {
        setTitle(res.data.title)
        setContent(res.data.content)
      })

      .catch((err) => console.log(err))
  }, [id])
  return (
    <>
      <Card title={title}>{content}</Card>
    </>
  )
}

export default SinglePost
