const express = require('express')
const router = express.Router()
const wrapAsync = require('../utils/wrapAsync.js')
const ExpressError = require('../utils/ExpressError.js')
const { reviewSchema } = require('../schema.js')
const { listingSchema } = require('../schema.js')
const Listing = require('../models/listing.js')
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js')
const listingController = require('../controllers/listings.js')
const multer = require('multer')
const {storage} = require('../cloudConfig.js')
const upload = multer({storage})

router.route('/')
//Index Route
.get(wrapAsync(listingController.index))
// create route
.post(isLoggedIn,upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing))

router.get('/new', isLoggedIn, listingController.renderNewForm)
router.route('/:id') 
//show route
.get( wrapAsync(listingController.showListing))
// Update Route 
.put(isLoggedIn, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
//Destroy Route
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing))


// Edit Route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm))



module.exports = router