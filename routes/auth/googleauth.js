const googleStrategy = require("passport-google-oauth2").Strategy;
const express = require("express");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const router = express.Router();


require('dotenv').config();
router.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));
router.use(cors({ origin: true, methods: "GET,HEAD,PUT,PATCH,DELETE", credentials: true }));
router.use(passport.initialize());
router.use(passport.session());
router.use(express.json());


passport.use(new googleStrategy({
        clientID: process.env.GOOGLE_APP_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        console.log(profile);
        //destructure email and name
        //in name => name: {givenName: 'osato', familyName: 'ogbeide'}
        return done(null, profile)
    }
))

//"/auth/google"
router.get("/",
    passport.authenticate("google", {
        scope: ['email', 'profile']
    }
));

//"/auth/google/callback"
router.get("/callback",
    passport.authenticate("google", {
        successRedirect: "/success",
        failureRedirect: "/failure"
    }
));

// app.get("/", function(req, res) {
    
//     res.send("Welcome to server");
// })
router.get("/login", function(req, res) {
    
    res.send("Not aknown user");
})
router.get("/success", isLoggedIn, function(req, res) {
    
    res.send(req.user);
})
passport.serializeUser(function (user, cb) {
    cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
})
// app.get("/success", isLoggedIn, function(req, res) {
//     console.log(req.user)
// })
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect("/");
}

module.exports = router;