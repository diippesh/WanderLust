const express = require('express')
const app = express()
const mongoose = require('mongoose')
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'
const path = require('path')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const ExpressError = require('./utils/ExpressError.js')
const session = require('express-session')
const flash = require('connect-flash')
const listings = require('./routes/listing.js')
const reviews = require('./routes/review.js')


main().then(() => {
    console.log("database is running")
})
    .catch((err) => { console.log(err); })
async function main() {
    await mongoose.connect(MONGO_URL)
}

app.use(methodOverride("_method"))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,'/public')))



const sessionOptions = {
    secret:"my super secret code",
    resave:false,
    saveUninitialized:true, 
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        //cross scripting attack prevent ke liye
        httpOnly:true,
    }
}
app.get('/', (req,res)=>{
    console.log('hyyy')
})
app.use(session(sessionOptions))
// flash ko route se pehle use karna hoga
app.use(flash())
app.use((req,res,next)=>{
    res.locals.success = req.flash('success')
    next()
})

app.use('/listings',listings)
app.use('/listings/:id/reviews',reviews)



// app.get('/testListing',(req,res)=>{
//     let sampleListing = new Listing({
//         title:"my New villa",
//         description:"by the beach",
//         price:1200,
//         location:"goa",
//         country:"india",
//     })
//     sampleListing.save()
//         .then(result=>res.send('ho gaya'))
//         .catch(err=>console.log('err'))
// })

// -------Reviews--------

app.all('*',(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"))
})
app.use((err,req,res,next)=>{
    let {status=500,message="something went wrong"}  = err  
    res.status(status).render("error.ejs",{message})
}) 
app.listen(8000, () => {
    console.log('app is lis')
})