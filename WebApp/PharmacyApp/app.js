var express         = require("express"),
    bodyParser      = require("body-parser"),
    app             = express(),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    qr              = require('qr-image');
    
var User            = require("./models/user")

mongoose.connect("mongodb://localhost/pharmassist", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.urlencoded()); 
// app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); 
app.use(express.static(__dirname + "/public"));

app.use(require ("express-session")({
    secret: "Remember to take your meds",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})
    
// get home page
app.get("/", function(req, res){
    // var newUser = new User({username: "admin"});
    // User.register(newUser, "12345", function(err, user){
    //     if(err){
    //         console.log(err);
    //         return res.render("home");
    //     }
    // });
    res.render("home");
});

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/generate", 
    failureRedirect: "/login"
    }), function(req, res){
});

app.get("/generate", isLoggedIn, function(req, res){
    
    res.render("generate");
});

app.post("/code", isLoggedIn, function(req, res){
    console.log(req.body.code);
    var qr_svg = qr.image(req.body.code, { type: 'png' });
    // '30{1075-1001,09100-0101,0250-0110} 30{1075-1001,09100-0101,0250-0110} 30{1075-1001,09100-0101,0250-0110}'
    qr_svg.pipe(require('fs').createWriteStream('./public/images/qr.png'));
    res.render("code");
});

    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server is runnning");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};