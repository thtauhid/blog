const createPost = (data) => {
  return fetch("/.netlify/functions/createPost", {
    body: JSON.stringify(data),
    method: "POST",
  }).then((res) => {
    return res.json()
  })
}

const updatePost = (id, data) => {
  return fetch("/.netlify/functions/updatePost", {
    body: JSON.stringify([id, data]),
    method: "POST",
  }).then((res) => {
    return res.json()
  })
}

const getAllPost = () => {
  return fetch("/.netlify/functions/getAllPost").then((res) => {
    return res.json()
  })
}

const getSinglePost = (id) => {
  return fetch("/.netlify/functions/getSinglePost", {
    body: JSON.stringify(id),
    method: "POST",
  }).then((res) => {
    return res.json()
  })
}

const deletePost = (id) => {
  return fetch("/.netlify/functions/deletePost", {
    body: JSON.stringify(id),
    method: "POST",
  }).then((res) => {
    return res.json()
  })
}

export default {
  createPost: createPost,
  updatePost: updatePost,
  getAllPost: getAllPost,
  getSinglePost: getSinglePost,
  deletePost: deletePost,
}
