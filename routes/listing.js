const express = require('express')
const router = express.Router()
const wrapAsync = require('../utils/wrapAsync.js')
const ExpressError = require('../utils/ExpressError.js')
const { reviewSchema } = require('../schema.js')
const { listingSchema } = require('../schema.js')
const Listing = require('../models/listing.js')
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js')

router.get('/', wrapAsync(async (req, res) => {
    const allListings = await Listing.find({})
    res.render('listings/index.ejs', { allListings })

}))

router.get('/new', isLoggedIn, (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'you must be logged in')
        res.redirect('/login')
    }
    res.render('listings/new.ejs')
})
router.get('/:id', wrapAsync(async (req, res) => {
    let { id } = req.params
    const listing = await Listing.findById(id).populate("reviews").populate("owner")
    if (!listing) {
        req.flash('error', 'Listing Not find')
        res.redirect('/listings')
    }

    res.render("listings/show.ejs", { listing })
}))
router.post('/', isLoggedIn, validateListing, wrapAsync(async (req, res) => {

    const newListing = new Listing(req.body.listing)
    newListing.owner = req.user._id
    await newListing.save()
    req.flash('success', 'New Listing Created')
    res.redirect('/listings')
}))
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params
    const listing = await Listing.findById(id)
    if (!listing) {
        req.flash('error', 'Listing Not find')
        res.redirect('/listings')
    }
    res.render('./listings/edit.ejs', { listing })
}))
router.put('/:id', isLoggedIn, isOwner, validateListing, wrapAsync(async (req, res) => {
    if (!req.body.listing) throw newExpressError(400, "Send valid data for listing")
    let { id } = req.params

    await Listing.findByIdAndUpdate(id, { ...req.body.listing })
    req.flash('success', 'Listing Updated')
    res.redirect(`/listings/${id}`)
}))
router.delete('/:id', isLoggedIn, isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params
    await Listing.findByIdAndDelete(id)
    req.flash('success', 'Listing Deleted')

    res.redirect('/listings')
}))
module.exports = router