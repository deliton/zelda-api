import dbConnect from '../../../utils/dbConnect'
import Character from '../../../models/Character'
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
        var characters
        if (pageOptions.name) {
          characters = await Character.find({ name: new RegExp(pageOptions.name) })
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .exec()
        }
        else {
          characters = await Character.find({})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .exec()
        }

        characters = parseAppearances(characters)

        res.status(200).json({ success: true, count: characters.length, data: characters })
      } catch (error) {
        res.status(400).json({ success: false })
        console.log(error)
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
