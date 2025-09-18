// here we are defining the host of the main api
// export const host = 'http://localhost:8080';



// export const host = 'https://backend-social-13bd.onrender.com';

import { host } from "../host/host";


// now making an api for the adding the group message in the message database

export const addGroupChatRoomMessage = `${host}/addgroupchatroommessage`;

// api for the getting all the groups which i ahve made

export const getAllGroupsDetails = `${host}/getallgroupsdetails`;

// this is the frontend api for the addinga gropu member to the group

export const addANewMemberToGroup = `${host}/addanewmembertogroup`;


// this is the frontend api for the handling the remove user from the group
export const removeUserFromGroup = `${host}/removeuserfromgroup`;
