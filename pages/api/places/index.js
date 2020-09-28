import dbConnect from '../../../utils/dbConnect'
import Place from '../../../models/Place'
import { parseLimit, parseAppearances } from '../../../utils/responsePipes'

export default async function handler(req, res) {
    const { method } = req
    const pageOptions = {
        page: parseInt(req.query.page, 10) || 0,
        limit: parseLimit(req.query.limit),
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
                }
                else {
                    places = await Place.find({})
                        .skip(pageOptions.page * pageOptions.limit)
                        .limit(pageOptions.limit)
                }
                places = parseAppearances(places)
                places = places.map(entries => {
                    return {
                        ...entries,
                        inhabitants: entries.inhabitants.map(character => process.env.API_URL + 'characters/' + character)
                    }
                })
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
