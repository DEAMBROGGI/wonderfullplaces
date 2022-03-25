const Router = require('express').Router()
//USERS REQUIRES
const validator = require('../config/validator')
const usersControllers = require('../controllers/userControllers');
const {signUpUsers, signInUser, signOutUser,verifyEmail, verificarToken}= usersControllers
const passport = require('../config/passport')
//PLACES REQUIRES
const placesControlers = require('../controllers/placesControlers')
const {getAllPlaces, getOnePlace, likeDislike}= placesControlers

//COMMENTS REQUIRES
const commentsControllers = require('../controllers/commentsControllers')
const {addComment, modifiComment,deleteComment}= commentsControllers

//LIKES ROUTES
Router.route("/places/like/:id")
.put(passport.authenticate("jwt", {session: false}),likeDislike)

//PLACES ROUTES
Router.route('/places/comment')
.post(passport.authenticate('jwt',{ session: false }),addComment)
.put(passport.authenticate('jwt',{ session: false }),modifiComment)

Router.route('/places/comment/:id')
.post(passport.authenticate('jwt',{ session: false }),deleteComment)

//PLACES ROUTES
Router.route('/places/getallplaces')
.get(getAllPlaces)

Router.route('/places/getoneplace/:id')
.get(getOnePlace)

//USER ROUTES
Router.route('/auth/signUp')
.post(validator,signUpUsers)

Router.route('/auth/signIn')
.post(signInUser)

Router.route('/auth/signOut')
.post(signOutUser)

Router.route('/verify/:uniqueString') //RECIBE EL LINK DE USUARIO
.get(verifyEmail) //LLAMA A FUNCION DE VERIFICACIION

Router.route('/auth/signInToken')
.get(passport.authenticate('jwt',{ session: false }),verificarToken
)
module.exports = Router