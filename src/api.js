const createPost = (data) => {
  return fetch("/.netlify/functions/createPost", {
    body: JSON.stringify(data),
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

// const createDonation = (data) => {
// 	return fetch('/.netlify/functions/createDonation', {
// 		body: JSON.stringify(data),
// 		method: 'POST',
// 	}).then((res) => {
// 		return res.json()
// 	})
// }

// const getDonations = () => {
// 	return fetch('/.netlify/functions/allDonation').then((res) => {
// 		return res.json()
// 	})
// }

export default {
  createPost: createPost,
  getAllPost: getAllPost,
  getSinglePost: getSinglePost,
}
