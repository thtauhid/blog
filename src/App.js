import React from "react"
import { Layout, Button } from "antd"
import { Route, Link } from "react-router-dom"
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
      <Route
        path="/admin"
        exact
        render={() => (
          <>
            <Button type="primary" style={{ marginBottom: "10px" }}>
              <Link to="/admin/create">Create Post</Link>
            </Button>
            <PostList />
          </>
        )}
      />
      <Route path="/admin/create" component={CreatePost} />
    </>
  )
}
const App = () => {
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
              <Routes />
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
