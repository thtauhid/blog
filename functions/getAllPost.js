const faunadb = require("faunadb")
const q = faunadb.query

exports.handler = async (event, context) => {
  const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET,
  })

  return client
    .query(q.Paginate(q.Match(q.Ref("indexes/posts"))))

    .then((res) => {
      const postRefs = res.data
      const getAllPost = postRefs.map((ref) => {
        return q.Get(ref)
      })

      return client
        .query(getAllPost)

        .then((res) => {
          return {
            statusCode: 200,
            body: JSON.stringify(res),
          }
        })
    })
}
