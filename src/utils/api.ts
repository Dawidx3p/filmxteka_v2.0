import { Comment } from "./types";

const createComment = async (comment:Comment) => fetch('/.netlify/functions/createComment', {
    body: JSON.stringify(comment),
    method: 'POST'
  })
.then(response => response.json())
.catch((error) => console.error(error));

const updateComment = async (comment:Comment, id:string) => fetch(`/.netlify/functions/updateComment/${id.toString()}`, {
  body: JSON.stringify(comment),
  method: 'POST'
})
.then(response => response.json())
.catch((error) => console.error(error));

const getCommentsByFilm = async (id:number) => fetch(`/.netlify/functions/comments_by_film`, {
  body: JSON.stringify(id),
  method: 'POST'
})
.then(response => response.json())
.catch((error) => console.error(error));

const getCommentsByEmail = async (email:string) => fetch(`/.netlify/functions/comments_by_author`, {
  body: JSON.stringify(email),
  method: 'POST'
})
.then(response => response.json())
.catch((error) => console.error(error));

export { createComment, updateComment, getCommentsByFilm, getCommentsByEmail }

