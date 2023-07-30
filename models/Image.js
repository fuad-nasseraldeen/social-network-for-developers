const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})
module.exports = Image = mongoose.model('image', ImageSchema)
