import dbConnect from '../../../utils/dbConnect'
import Dungeon from '../../../models/Dungeon'

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
        var dungeons
        if (pageOptions.name) {
          dungeons = await Dungeon.find({name: new RegExp(pageOptions.name)})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .populate('appearances', 'url name')
        }
        else {
          dungeons = await Dungeon.find({})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .populate('appearances', 'url name')
        }

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
