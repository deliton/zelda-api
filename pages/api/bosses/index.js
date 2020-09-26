import dbConnect from '../../../utils/dbConnect'
import Boss from '../../../models/Boss'

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
        var bosses
        if (pageOptions.name) {
          bosses = await Boss.find({name: new RegExp(pageOptions.name)})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .populate('appearances dungeons', 'url name')
        }
        else {
          bosses = await Boss.find({})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .populate('appearances dungeons', 'url name')
        }

        res.status(200).json({ success: true, count: bosses.length, data: bosses })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
