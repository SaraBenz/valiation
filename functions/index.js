const functions = require("firebase-functions");



const app = require("express")();

 
const FBAuth = require("./util/fbAuth");
const { getAllScreams, postOneScream, getScream, commentOnScream, likeScream, unlikeScream, deleteScream, deleteComment } = require("./handlers/screams");
const { signup, login, uploadImage, addUserDetails, getAuthenticatedUser} = require("./handlers/users");
const{addFollow,getFollow, updateFollow}= require("./handlers/amis");







;
//scream routes
app.get('/screams', getAllScreams);
app.post('/scream', FBAuth, postOneScream);
app.get('/scream/:screamId', getScream);
// add new comment 
app.post('/scream/:screamId/comment', FBAuth, commentOnScream);
// delete scream
app.delete('/scream/:screamId', FBAuth, deleteScream);
// like scream
app.get('/scream/:screamId/like', FBAuth, likeScream);
// unlike scream
app.get('/scream/:screamId/unlike', FBAuth, unlikeScream);
//delete comment
app.delete('/comment/:commentId', FBAuth, deleteComment);
//app.post('/club', FBAuth, postClub);
//app.get('/club', FBAuth, getClub);
//app.post('/follow', FBAuth, onFollow);
//app.post('/follows', FBAuth, onFollowing);

//app.post('/unfollow', FBAuth, unFollow);




//users routes
app.post('/signup', signup);
app.post('/login', login);

app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);
app.post('/add/amis',addFollow);
app.get('/add/:uid',getFollow);
app.post('/amis/:uid',updateFollow);
//app.post('/user/followaccept', FBAuth,acceptFollowRequest);












exports.api = functions.https.onRequest(app);
