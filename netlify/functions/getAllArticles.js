/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.REACT_APP_FAUNADB_ADMIN_SECRET
  }) 
  return client.query(q.Paginate(q.Match(q.Ref('indexes/all_articles'))))
    .then((response) => {
      const refs = response.data
      console.log('articles refs', refs)
      console.log(`${refs.length} articles found`)
      // create new query out of todo refs. http://bit.ly/2LG3MLg
      const getAllDataQuery = refs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllDataQuery).then((ret) => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret)
        }
      })
    }).catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
