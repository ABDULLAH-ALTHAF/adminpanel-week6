const User = require("../models/userModel");

const login = (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  } else if (req.session.admin) {
    res.redirect("/admin/");
  } else {
    let invalid = req.query.invalid
    res.render("login",{invalid});
  }
};

const postlogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email,password:password });
    if(!user){
      res.redirect("/login?invalid=Invalid Inputs");
    }

  if (user && user.role == "user") {
    if (password == user.password) {
      req.session.user = true;
      res.redirect("/home");
    } else {
      res.redirect("/login?invalid=Invalid Inputs");
    }
  } else if (user && user.role == "admin") {
    if (password == user.password) {
      req.session.admin = true;
      res.redirect("/admin");
    }
  }
};

const signup = (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    let err = req.query.err
    res.render("signup",{err});
  }
};

const postsignup = async (req, res) => {    
  try {
    const { username, email, password } = req.body;
    await User.create({ username, email, password, role: "user" });
    res.redirect("/login");
  } catch (error) {
    if(error.code == 11000){
        res.redirect('/signup?err=User Already Exist With This Email')
    }
    console.log(error, "error creating from postsignup");
  }
};

const home = (req, res) => {
  if (req.session.user) {
    res.render("home");
  } else {
    res.redirect("/login");
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

module.exports = {
  login,
  signup,
  logout,
  home,
  postsignup,
  postlogin,
};
