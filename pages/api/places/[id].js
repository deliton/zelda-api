import dbConnect from '../../../utils/dbConnect'
import Place from '../../../models/Place'

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const place = await Place.findById(id)
                    .populate('appearances inhabitants', 'url name') /* find data that contains ID in database */
                res.status(200).json({ success: true, count: place.length, data: place })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}
