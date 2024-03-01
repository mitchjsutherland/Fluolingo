const express = require("express");

const app = express();

const { pool } = require("./dbConfig");

const bcrypt = require("bcrypt");

const session = require("express-session");

const flash = require("express-flash");

const bodyParser = require("body-parser");

const cors = require('cors');

const passport = require("passport");

const initialisePassport = require("./passportConfig");

//necessary to maintain authentication across multiple requests

initialisePassport(passport);

//referencing env variable port used in a production or port 4000 in dev mode

const PORT = 4000; 

//middleware

app.use(cors());

//necessary to render ejs files

//use ejs as view engine

app.set("view engine", "ejs");

//allow data transfer from front end to a server

app.use(express.urlencoded({extended: false}));

app.use(bodyParser.json());

app.use(session({

  //usually kept in env variable used for data encryption

  secret: "secret",

  //should we save again our session if nothing has changed

  resave: false,

  //This option determines whether a session should be created for an unauthenticated user

  saveUninitialized: false

}));

//we allow the app to use this passport

app.use(passport.initialize());

app.use(passport.session());

app.use(flash());


//creating routes to all pages defined in views folder

//what happens when we get to the root directory of the app

app.get("/", (req, res) => {

  //it knows to look for the file (ejs file) in views folder

  res.render("index");

});
                          //if the user goes to this route first we're checking if

                          //they are already authenticated/logged in

app.get("/users/register", checkAuthenticated, (req, res) => {

  res.render("register");

});

//do I have to pass req argument if not used?

app.get("/users/login", checkAuthenticated, (req, res) => {

  res.render("login");

});

app.get("/users/dashboard", checkNotAuthenticated, (req, res) => {

  res.render("dashboard", { user: req.user.name });

});

app.get("/users/logout", (req, res) => {

  req.logout((err) => {

    if (err) {

      return next(err);

    }

  });

  req.flash("success_msg", "You have logged out");

  res.redirect("/users/login");

});

app.get("/api/words/english", (req,res) => {

  pool.query(

    `SELECT vocabulary_word_en FROM questions`,

    (err, results) => {

      if(err){

        throw err;

      }

      const words = results.rows.map(row => row.vocabulary_word_en);

      res.json(words);

    }

  );

});


//define register route

app.post("/users/register", async (req,res) => {

  console.log(req.body);

  let { name, email, password, password2 } = req.body;


  //any registration errors are gonna be pushed to this initially empty array

  let errors = [];

  console.log({

    name,

    email,

    password,

    password2

  });

  if (!name || !email || !password || !password2) {

    errors.push({ message: "Please enter all fields" });

  }

  

  if (password !== password2) {

    errors.push({ message: "Passwords do not match" });

  }

  

  if (password?.length < 6) {

    errors.push({ message: "Password should be at least 6 characters" });

  }

  // If there are errors 

  if (errors.length > 0) {

    // re-render the register page with error messages
    
    res.render("register", { errors });

  } 

  // If there are no errors, you can proceed with user registration
  
  else {
    
    console.log("Registration successful!");

    let hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    //making sure new user registers with unique email address

    pool.query(

      `SELECT * FROM users

      WHERE email = $1`, [email], (err, results) => {

        if(err){

          throw err;

        }

        console.log(results.rows);

        if(results.rows.length > 0){

          errors.push({message: "Email already registered"});

          res.render("register", {errors});

        }

        //there's no user with this email in the database so can be registered

        else{

          pool.query(

            `INSERT INTO users (name, email, password)
            
             VALUES ($1, $2, $3) 

             RETURNING id, password`, [name, email, hashedPassword], 
             
             (err, results) => {

              if(err){

                throw err;

              }

              //pass a flash message to redirect page

              req.flash("success_msg", "You are now registered. Please log in.");

              res.redirect("/users/login");

             }

          )

        }

      }

    );
    
  }

});

app.post(

  "/users/login",

  passport.authenticate("local", {

    successRedirect: "/users/dashboard",

    failureRedirect: "/users/login",

    failureFlash: true

  })

);

//checking if user is authenticated to redirect him to the dashboard

function checkAuthenticated( req, res, next){

  if(req.isAuthenticated()){

    return res.redirect("/users/dashboard");

  }

  //otherwise go to the next middleware function

  next();

}

function checkNotAuthenticated(req, res, next){

  if(req.isAuthenticated()){

    return next();

  }

  res.redirect("/users/login")

}


app.listen(PORT, () =>{

  console.log(`Server running on port ${PORT}`);

});