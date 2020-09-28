import dbConnect from '../../../utils/dbConnect'
import Dungeon from '../../../models/Dungeon'
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
        var dungeons
        if (pageOptions.name) {
          dungeons = await Dungeon.find({name: new RegExp(pageOptions.name)})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
        }
        else {
          dungeons = await Dungeon.find({})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
        }
        dungeons = parseAppearances(dungeons)
        res.status(200).json({ success: true, count: dungeons.length, data: dungeons })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
