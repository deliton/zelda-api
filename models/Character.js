import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const CharacterSchema = new mongoose.Schema({
  name: String,
  description: String,
  gender: String,
  race: String,
  appearances: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'games'
  }],
},
  { collection: 'characters' })

export default mongoose.models.characters || mongoose.model('characters', CharacterSchema)
