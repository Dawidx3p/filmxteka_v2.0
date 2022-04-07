import {Comment} from "./types";

const createComment = async (comment:Comment) => fetch('/.netlify/functions/addComment', {
    body: JSON.stringify(comment),
    method: 'POST'
  })
.then(response => response.json())
.then((data: {ref: {"@ref": { id: string }}, data: Comment}) => data)
.catch((error) => console.error(error));

const updateComment = async (comment:Comment, id:string) => fetch(`/.netlify/functions/updateComment/${id}`, {
  body: JSON.stringify(comment),
  method: 'POST'
})
.then(response => response.json())
.catch((error) => console.error(error));

const getCommentsByFilm = async (id:string) => fetch(`/.netlify/functions/comments_by_film`, {
  body: JSON.stringify(id),
  method: 'POST'
})
.then(response => response.json())
.catch((error) => console.error(error));


export { createComment, updateComment, getCommentsByFilm }

