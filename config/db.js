const mongoose = require('mongoose') // we use it to connect
const config = require('config') // will grape that in string inside the config package
const db = config.get('mongoURI') // to get that value - the whole string that we copy

// to connect to mongoDB we can just use mongoose.connect(db) and will give us a promise ,
//but will use async and await - this is the standard and much cleaner and your code look asyncronise
//so will use async way with try catch
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true
        }) // because mongoose.connect(db)  return a promise we write await before
        console.log('MongoDB Connected')
    } catch (err) {
        //Exit process with failure
        process.exit(1)
    }
}
module.exports = connectDB
