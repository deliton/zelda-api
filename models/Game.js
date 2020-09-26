import mongoose from 'mongoose'

/* GameSchema will correspond to a collection in MongoDB database. */
const GameSchema = new mongoose.Schema({
    name: String,
    description: String,
    released_date: String,
    developer: String,
    publisher: String,
},
    { collection: 'games' })

export default mongoose.models.games || mongoose.model('games', GameSchema)

