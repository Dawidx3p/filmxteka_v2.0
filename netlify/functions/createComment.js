/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = (event, context) => {
  console.log('creating comment')
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.REACT_APP_FAUNADB_ADMIN_SECRET
  }) 
  const data = JSON.parse(event.body)
  return client.query(
    q.Create(
      q.Collection('comments'),
      { ...data }
    )
  )
  .then(response => {
    return{
      statusCode: 200,
      body: JSON.stringify(response)
  }
  })
  .catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
