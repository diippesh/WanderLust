const Listing = require('./models/listing')
const ExpressError = require('./utils/ExpressError.js')
const {listingSchema} = require('./schema.js')
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl
        req.flash('error', 'you must be logged in to create listing')
        return res.redirect('/login')
    }
    next();
}
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl  
     }
     next()
}
module.exports.isOwner = async(req,res,next)=>{
    let { id } = req.params
    console.log(id)
    let listing = await Listing.findById(id)
    if( !listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","you don't have permission for this action")
        return res.redirect(`/listings/${id}`)
    }
    next()
}
module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body)
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(',')
        console.log(error)
        throw new ExpressError(400,error)
    }
    else
        next();
}
module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body)
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(',')
        console.log(error)
        throw new ExpressError(400,error)
    }
    else
        next();
}