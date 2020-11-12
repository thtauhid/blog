import React, { useEffect, useState } from "react"
import { Layout, Card } from "antd"
import { Link, Route } from "react-router-dom"
import Admin from "./Admin"
import api from "./api"

const { Content, Footer } = Layout

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
      <Layout>
        <Content style={{ padding: "0 25%" }}>
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}
          >
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              {allPost.map((p) => (
                <Post title={p.title} id={p.key} content={p.content} />
              ))}
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
const App = () => {
  return (
    <>
      <Route path="/" exact component={HomePage} />
      <Route path="/post/:id" component={SinglePost} />
      <Route path="/admin" exact component={Admin} />
      {/* <Route path="/admin/create" component /> */}
      {/* <Route path="/admin/edit/:id" component /> */}
    </>
  )
}

export default App
