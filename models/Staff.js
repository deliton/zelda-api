import mongoose from 'mongoose'

/* StaffSchema will correspond to a collection in MongoDB database. */
const StaffSchema = new mongoose.Schema({
    name: String,
    worked_on: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'games'
    }]
},
    { collection: 'staff' })

export default mongoose.models.Staff || mongoose.model('Staff', StaffSchema)

