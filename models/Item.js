import mongoose from 'mongoose'

/* ItemSchema will correspond to a collection in MongoDB database. */
const ItemSchema = new mongoose.Schema({
   name: String,
   description: String,
   appearances: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'games'
   }],
},
   { collection: 'items' })

export default mongoose.models.items || mongoose.model('items', ItemSchema)
