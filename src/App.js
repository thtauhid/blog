import React, { useState, useEffect } from "react"
import { Layout } from "antd"
import { Route } from "react-router-dom"
import { BoxLoading } from "react-loadingg"
import CreatePost from "./CreatePost"
import UpdatePost from "./UpdatePost"
import PostList from "./PostList"
import SinglePost from "./SinglePost"
import HomePage from "./HomePage"
const { Content, Footer } = Layout

const Routes = () => {
  return (
    <>
      <Route path="/" exact component={HomePage} />
      <Route path="/post/:id" component={SinglePost} />
      <Route path="/update/:id" component={UpdatePost} />
      <Route path="/admin" exact component={PostList} />
      <Route path="/admin/create" component={CreatePost} />
    </>
  )
}
const App = () => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
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
              {/* Future user authentication goes here */}
              {loaded ? <Routes /> : <BoxLoading />}
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

export default App
