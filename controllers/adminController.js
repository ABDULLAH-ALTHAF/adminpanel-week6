const User = require("../models/userModel");

const adminhome = async (req, res) => {
  if (req.session.admin) {
    const users = await User.find({ role: "user" });
    res.render("adminhome", { users });
  } else {
    res.redirect("/login");
  }
};

const adminlogin = (req, res) => {
  if (req.session.admin) {
    res.redirect("/");
  } else {
    res.render("login");
  }
};

const adminlogout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

const userDelete = async (req, res) => {
  if (req.session.admin) {
    const userId = req.params.userId;
    await User.deleteOne({ _id: userId });
    res.redirect("/admin");
  }else{
    return res.redirect('/login')
  }
};

const createUser = (req, res) => {
  try {
    if (req.session.admin) {
      let err = req.query.err;
      res.render("createuser", { err });
    }else{
        return res.redirect('/login')
      }
  } catch (error) {
    console.log(error);
  }
};

const postcreateUser = async (req, res) => {
  try {
    if (req.session.admin) {
      const { username, email, password } = req.body;
      await User.create({ username, email, password, role: "user" });
      res.redirect("/admin");
    }else{
        return res.redirect('/login')
      }
  } catch (error) {
    if (error.code == 11000) {
      res.redirect("/admin/createuser?err=User already Exist With this Email");
    }
    console.log(error, "error creating from postcreateUser");
  }
};

const userEdit = async (req, res) => {
  if (req.session.admin) {
    const userId = req.params.userId;
    const user = await User.findOne({ _id: userId });
    return res.render("useredit", { user });
  }else{
    return res.redirect('/login')
  }
};

const postuserEdit = async (req, res) => {
  if (req.session.admin) {
    const userId = req.params.userId;
    const { username, email, password } = req.body;
    await User.updateOne(
      { _id: userId },
      { username: username, email: email, password: password }
    );
    return res.redirect("/admin");
  }else{
    return res.redirect('/login')
  }
};

const search = async (req, res) => {
  if (req.session.admin) {
    const searchFor = req.query.searchFor;
    const users = await User.find({
      username: { $regex: searchFor, $options: "i" },
    });
    res.render("adminhome", { users });
  }else{
    return res.redirect('/login')
  }
};

module.exports = {
  adminhome,
  adminlogin,
  adminlogout,
  userDelete,
  postcreateUser,
  createUser,
  userEdit,
  postuserEdit,
  search,
};
