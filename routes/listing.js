const express = require('express')
const router = express.Router()
const wrapAsync = require('../utils/wrapAsync.js')
const ExpressError = require('../utils/ExpressError.js')
const {listingSchema} = require('../schema.js')
const Listing = require('../models/listing.js')

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
router.get('/', wrapAsync(async (req, res) => {
    const allListings = await Listing.find({})
    res.render('listings/index.ejs', { allListings })

}))
router.get('/new', (req, res) => {
    res.render('listings/new.ejs')
})
router.get('/:id', wrapAsync(async (req, res) => {
    let { id } = req.params
    const listing = await Listing.findById(id).populate("reviews")
    res.render("listings/show.ejs", { listing })
}))
router.post('/',validateListing, wrapAsync(async (req, res) => {
  
    const newListing = new Listing(req.body.listing)
    await newListing.save()
    req.flash('success','New Listing Created')
    res.redirect('listings')
}))
router.get('/:id/edit',wrapAsync( async (req, res) => {
    let { id } = req.params
    const listing = await Listing.findById(id)
    res.render('./listings/edit.ejs', { listing })
}))
router.put('/:id',validateListing, wrapAsync(async (req, res) => {
    if(!req.body.listing)throw newExpressError(400,"Send valid data for listing")
    let { id } = req.params
    console.log(id)
    await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    req.flash('success','Listing Updated')
    res.redirect(`/listings/${id}`)
}))
router.delete('/:id', wrapAsync(async (req, res) => {
    let { id } = req.params
    await Listing.findByIdAndDelete(id)
    req.flash('success','Listing Deleted')

    res.redirect('/listings')
}))
module.exports = router