import mongoose from 'mongoose'

/* DungeonSchema will correspond to a collection in MongoDB database. */
const DungeonSchema = new mongoose.Schema({
   name: String,
   description: String,
   appearances: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'games'
   }],
},
   { collection: 'dungeons' })

export default mongoose.models.dungeons || mongoose.model('dungeons', DungeonSchema)
