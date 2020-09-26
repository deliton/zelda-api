import mongoose from 'mongoose'

/* EraSchema will correspond to a collection in MongoDB database. */
const EraSchema = new mongoose.Schema({
    name: String,
    description: String,
    games: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'games'
    }],
},
    { collection: 'eras' })

export default mongoose.models.eras || mongoose.model('eras', EraSchema)
