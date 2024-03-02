const express = require('express')
const router = express.Router
const wrapAsync = require('../utils/wrapAsync.js')
const ExpressError = require('../utils/ExpressError.js')
const {reviewSchema} = require('../schema.js')
const Review = require('../models/review.js')
const Listing = require('../models/listing.js')

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
router.post('/',validateReview,wrapAsync(async(req,res)=>{
    let listing =  await Listing.findById(req.params.id)
    let newReview = new Review(req.body.review)
    listing.reviews.push(newReview)
    await newReview.save()
    await listing.save()
    res.redirect(`/listing/${listing._id}`)
 }))
 router.delete('/:reviewId',wrapAsync(async (req,res)=>{
     let {id,reviewId} = req.params
     await Listing.findByIdAndUpdate(id,{pull:{reviews:reviewId}})
     await Review.findByIdAndDelete(reviewId)
     res.redirect(`/listing/${id}`)
 }))
 module.exports = router