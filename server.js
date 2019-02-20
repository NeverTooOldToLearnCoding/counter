var session = require('express-session');
var express = require("express");

var app = express();

app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))


console.log("Let's find out what express is", express);
// invoke express and store the result in the variable app

console.log("Let's find out what app is", app);

// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));
// two underscores before dirname

// try printing out __dirname using console.log to see what it is and why we use it
console.log(__dirname);

// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

app.get("/", function (request, response){

    if(request.session.counter == null){
      request.session.counter = 1; 
    }else{
    request.session.counter += 1;
   }
    response.render('index',{counter:request.session.counter});
})

app.post("/addTwo", function (request, response){

    request.session.counter += 1;

    response.redirect('/');
})

app.post("/reset", function (request, response){

    request.session.counter = 0;
   

    response.redirect('/');
})





app.get("/users", function (request, response){
    // hard-coded user data
    var users_array = [
        {name: "Michael", email: "michael@codingdojo.com"}, 
        {name: "Jay", email: "jay@codingdojo.com"}, 
        {name: "Brendan", email: "brendan@codingdojo.com"}, 
        {name: "Andrew", email: "andrew@codingdojo.com"}
    ];
    response.render('users', {users: users_array});
})





// tell the express app to listen on port 8000, always put this at the end of your server.js file
app.listen(8000, function() {
  console.log("listening on port 8000");
})