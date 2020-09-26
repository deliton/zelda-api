import mongoose from 'mongoose'

/* MonsterSchema will correspond to a collection in MongoDB database. */
const MonsterSchema = new mongoose.Schema({
    name: String,
    description: String,
    appearances: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'games'
    }],
},
    { collection: 'monsters' })

export default mongoose.models.monsters || mongoose.model('monsters', MonsterSchema)
