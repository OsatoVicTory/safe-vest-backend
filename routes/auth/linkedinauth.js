const express = require("express");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const router = express.Router();
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;


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

passport.use(new LinkedInStrategy({
    clientID: process.env.LINKED_APP_ID,
    clientSecret: process.env.LINKED_SECRET,
    callbackURL: process.env.LINKED_CALLBACK_URL,
    scope: ['r_emailaddress', 'r_liteprofile'],
    state: true
}, function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            console.log(profile)
            return done(null, profile);
        });
}));

// router.get("/", function(req, res) {
    
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
// app.get("/fail", function(req, res) {
//     console.log("Failed authentication")
// })

//"/auth/LinkedIn"
router.get("/", 
  passport.authenticate("linkedin"),
  function(req, res) {

  }
);

//https://console.cloud.google.com/billing/create?redirectPath=%2Fapis%2Flibrary%2Ftranslate.googleapis.com%3Fproject%3Dsportspadi%26flow%3Dgcp&projectToLink=844773072172&flow=gcp&project=sportspadi

//"/auth/LinkedIn/callback"
router.get("/callback", passport.authenticate("linkedin", { 
    successRedirect: "/success",
    failureRedirect: "/login"
}));

module.exports = router;