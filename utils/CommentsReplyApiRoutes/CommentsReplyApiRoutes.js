// here we are defining the host of the main api
// export const host = 'http://localhost:8080';
// https://backend-social-13bd.onrender.com


// export const host = 'https://backend-social-13bd.onrender.com';

import { host } from "../host/host";


// add a reply to a  comments to the comments in the comment sections
export const addReplyToComment = `${host}/addreplytocomment`;

// get all reply  for a  comments by its id 

export const getAllReplyForComment = `${host}/getallreplyforcomment`;




