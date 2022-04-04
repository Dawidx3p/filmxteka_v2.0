/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query
const getId = require('./utils/getId');

exports.handler = (event, context) => {
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.REACT_APP_FAUNADB_ADMIN_SECRET
  }) 
  const data = JSON.parse(event.body);
  const id = getId(event.path);
  console.log(`Function 'todo-update' invoked. update id: ${id}`);
  return client.query(q.Update(q.Ref(`classes/articles/${id}`), { data: {...data} }))
    .then((response) => {
      console.log('success', response)
      return {
        statusCode: 200,
        body: JSON.stringify(response)
      }
    }).catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
