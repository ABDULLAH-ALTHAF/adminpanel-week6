const express = require('express')
const app = express()
app.set('view engine', 'ejs')
const user = require('./routes/userRouter')
const admin = require('./routes/adminRouter')
const mongoose = require('mongoose');
const session = require('express-session')
const nocache = require('nocache')
app.use(nocache())
app.use(express.urlencoded({extended:true}))
app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 24 * 60 * 60 * 1000 },
    })
  );
  
app.use('/',user)
app.use('/admin',admin)

mongoose.connect("mongodb://localhost:27017/week-6")
.then(()=>{
    console.log("mongo db connected");
})
.catch((err)=>{
    console.log(err);
})

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})


