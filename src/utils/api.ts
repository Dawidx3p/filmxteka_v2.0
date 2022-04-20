import { Comment, User } from "./types";

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

const createUser = async (user:User) => fetch('/.netlify/functions/createUser', {
  body: JSON.stringify(user),
  method: 'POST'
})
.then(response => response.json())
.catch((error) => console.error(error));

const updateUser = async (user:User, id:string) => fetch(`/.netlify/functions/updateUser/${id.toString()}`, {
  body: JSON.stringify(user),
  method: 'POST'
})
.then(response => response.json())
.catch((error) => console.error(error));

const getUserByEmail = async (email:string) => fetch(`/.netlify/functions/user_by_email`, {
  body: JSON.stringify(email),
  method: 'POST'
})
.then(response => response.json())
.catch((error) => console.error(error));

const getFilmsByEmail = async (email:string) => fetch(`/.netlify/functions/comments_by_author`, {
  body: JSON.stringify(email),
  method: 'POST'
})
.then(response => response.json())
.catch((error) => console.error(error));

export { createComment, updateComment, getCommentsByFilm, createUser, getUserByEmail, getFilmsByEmail, updateUser }

