import dbConnect from '../../../utils/dbConnect'
import Place from '../../../models/Place'
import { parseLimit, parseAppearances } from '../../../utils/responsePipes'

export default async function handler(req, res) {
    const {
        query: { id },
        method,
    } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const place = await Place.findById(id)/* find data that contains ID in database */
                place = parseAppearances(place)
                place = place.map(entries => {
                    return {
                        ...entries,
                        inhabitants: entries.inhabitants.map(character => process.env.API_URL + 'characters/' + character)
                    }
                })
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
