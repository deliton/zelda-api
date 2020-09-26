import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const BossSchema = new mongoose.Schema({
  name: String,
  description: String,
  appearances: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'games'
  }],
  dungeons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dungeons'
  }],
},
  { collection: 'bosses' })

export default mongoose.models.bosses || mongoose.model('bosses', BossSchema)
