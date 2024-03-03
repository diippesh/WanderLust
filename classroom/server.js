const express = require('express')
const app = express()
const session = require('express-session')
const flash =  require('connect-flash')
const path = require('path')
app.set('view engine','ejs')
app.set('views',path.join(__dirname,"views"))


const sessionOption = {secret:"mysupersecretstring",resave:false,saveUninitialized:true}
app.use(session(sessionOption))
app.use(flash())
//flash ke liye session ko use karna padega
// app.get('/reqcount',(req,res)=>{
//     if(req.session.count)
//     req.session.count++;
//     else
// req.session.count = 1;
//     res.send(`${req.session.count}`)
// })
// app.get('/test',(req,res)=>{
//     res.send('successful')
// })
app.get('/register',(req,res)=>{
    let {name = "anonymouss"} = req.query  
    req.session.name = name 
    if(name === "anonymouss")
    req.flash('error','user is not reg')
else
    req.flash('success',"user registered successfully")
    res.redirect('/hello')
   
})
app.get('/hello',(req,res)=>{
    res.locals.messages = req.flash('success')
    res.locals.error = req.flash('error')
    res.render("page.ejs",{name: req.session.name})
})

    
app.listen(3000,()=>{
    console.log('server is listening');
})