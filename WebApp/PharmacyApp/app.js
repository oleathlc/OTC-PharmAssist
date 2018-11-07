var express         = require("express"),
    // bodyParser      = require("body-parser"),
    app             = express(),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    qr              = require('qr-image');
    
var User            = require("./models/user")

mongoose.connect("mongodb://localhost/pharmassist", {useNewUrlParser: true});

// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));

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

//login page
app.get("/login", function(req, res){
    res.render("login");
});

// login post route
app.post("/login", passport.authenticate("local", {
    successRedirect: "/generate", 
    failureRedirect: "/login"
    }), function(req, res){
});

// Generation of QR code form
app.get("/generate", isLoggedIn, function(req, res){
    
    res.render("generate");
});

// Host page for QR code
app.post("/code", isLoggedIn, function(req, res){
    var message = req.body.duration + "{" + generateMessage(req.body);
    console.log(message);
    
    var qr_svg = qr.image(message, { type: 'png' });
    // '30{1075-1001,09100-0101,0250-0110} 30{1075-1001,09100-0101,0250-0110} 30{1075-1001,09100-0101,0250-0110}'
    qr_svg.pipe(require('fs').createWriteStream('./public/images/qr.png'));
    res.render("code");
});

// 
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/")
})


// route for help page
app.get("/help", function(req, res){
    res.render("help");
})
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server is runnning");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


// message generation given body of QR form assumes it has fields for duration and 5 fields for each medication
// 1. Medication Code (2 digits: 00 - 9)
// 2. Morning (0 or 1)
// 3. Afternoon (0 or 1)
// 4. Evening (0 or 1)
// 5. Night (0 or 1)


function generateMessage(body){
    var message = "";
    console.log("keys/5: " + Object.keys(body).length + "/5 = " +  Math.floor(Object.keys(body).length/5));
    for(var i = 0; i < Math.floor(Object.keys(body).length/5); i++){
        if(i != 0){
            message += ',';
        }
        
        message += body['medication' + i] + '-';
        message += body['morning' + i][0];
        message += body['afternoon' + i][0];
        message += body['evening' + i][0];
        message += body['night' + i][0];
    }
    message += '}';
    return message;
}