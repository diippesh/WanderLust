const mongoose = require('mongoose')
const initData = require('./data.js')
const Listing = require('../models/listing.js');
const MONGO_URL =process.env.ATLASDB_URL
main().then(()=>{
    console.log('server is serving')

})
.catch((err)=>{    console.log('server is busy')
})
async function main(){
    await mongoose.connect(MONGO_URL)
}
const initDB = async ()=>{
    await Listing.deleteMany({})
    initData.data = initData.data.map(obj =>({...obj,owner:'65e53e9818717e77216b7a70'}))
    await Listing.insertMany(initData.data)
}
initDB();