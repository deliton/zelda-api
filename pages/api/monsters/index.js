import dbConnect from '../../../utils/dbConnect'
import Monster from '../../../models/Monster'
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
        var monsters
        if(pageOptions.name) {
          monsters = await Monster.find({name: new RegExp(pageOptions.name)})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
        }
        else {
          monsters = await Monster.find({})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
        }
        monsters = parseAppearances(monsters)
        res.status(200).json({ success: true, count: monsters.length, data: monsters })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
