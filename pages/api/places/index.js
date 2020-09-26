import dbConnect from '../../../utils/dbConnect'
import { replaceIdWithApiUrl } from '../../../utils/responsePipes'
import Place from '../../../models/Place'

export default async function handler(req, res) {
    const { method } = req
    const pageOptions = {
        page: parseInt(req.query.page, 10) || 0,
        limit: parseInt(req.query.limit, 10) || 20,
        name: req.query.name || undefined
    }

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                var places
                if (pageOptions.name) {
                    places = await Place.find({name: new RegExp(pageOptions.name)})
                        .skip(pageOptions.page * pageOptions.limit)
                        .limit(pageOptions.limit)
                        .populate('appearances inhabitants', 'url name')
                }
                else {
                    places = await Place.find({})
                        .skip(pageOptions.page * pageOptions.limit)
                        .limit(pageOptions.limit)
                        .populate('appearances inhabitants', 'url name')
                }

                res.status(200).json({ success: true, count: places.length, data: places })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}
