const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Listing = require('./models/listing.js')
const Review = require('./models/review.js')
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'
const path = require('path')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const wrapAsync = require('./utils/wrapAsync.js')
const ExpressError = require('./utils/ExpressError.js')
const {listingSchema,reviewSchema} = require('./schema.js')
app.use(methodOverride("_method"))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,'/public')))

main().then(() => {
    console.log("database is running")
})
    .catch((err) => { console.log(err); })
async function main() {
    await mongoose.connect(MONGO_URL)
}




app.get('/', (req, res) => {
    res.send('htllo')
})
const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body)
    if(error){
        // let errMsg = error.details.map((el)=>el.message).join(',')---> for printing additional details
        console.log(error)
        throw new ExpressError(400,error)
    }
    else
        next();
}
const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body)
    if(error){
        // let errMsg = error.details.map((el)=>el.message).join(',')---> for printing additional details
        console.log(error)
        throw new ExpressError(400,error)
    }
    else
        next();
}
app.get('/listings', wrapAsync(async (req, res) => {
    const allListings = await Listing.find({})
    res.render('./listings/index.ejs', { allListings })

}))
app.get('/listings/new', (req, res) => {
    res.render('./listings/new.ejs')
})
app.get('/listings/:id', wrapAsync(async (req, res) => {
    let { id } = req.params
    const listing = await Listing.findById(id).populate("reviews")
    res.render("./listings/show.ejs", { listing })
}))
app.post('/listings',validateListing, wrapAsync(async (req, res) => {
  
    const newListing = new Listing(req.body.listing)
    await newListing.save()
    res.redirect('/listings')
}))
app.get('/listings/:id/edit',wrapAsync( async (req, res) => {
    let { id } = req.params
    const listing = await Listing.findById(id)
    res.render('./listings/edit.ejs', { listing })
}))
app.put('/listings/:id',validateListing, wrapAsync(async (req, res) => {
    if(!req.body.listing)throw newExpressError(400,"Send valid data for listing")
    let { id } = req.params
    console.log(id)
    await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    res.redirect(`/listings/${id}`)
}))
app.delete('/listings/:id', wrapAsync(async (req, res) => {
    let { id } = req.params
    await Listing.findByIdAndDelete(id)
    res.redirect('/listings')
}))
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
app.post('/listings/:id/reviews',validateReview,wrapAsync(async(req,res)=>{
   let listing =  await Listing.findById(req.params.id)
   let newReview = new Review(req.body.review)
   listing.reviews.push(newReview)
   await newReview.save()
   await listing.save()
   res.redirect(`/listings/${listing._id}`)
}))
app.delete('/listings/:id/reviews/:reviewId',wrapAsync(async (req,res)=>{
    let {id,reviewId} = req.params
    await Listing.findByIdAndUpdate(id,{pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/listings/${id}`)
}))
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