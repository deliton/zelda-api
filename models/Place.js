import mongoose from 'mongoose'

/* SongSchema will correspond to a collection in MongoDB database. */
const PlaceSchema = new mongoose.Schema({
    name: String,
    description: String,
    inhabitants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'characters'
    }],
    appearances: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'games'
    }],
},
    { collection: 'places' })

export default mongoose.models.places || mongoose.model('places', PlaceSchema)
