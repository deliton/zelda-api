import dbConnect from '../../../utils/dbConnect'
import Character from '../../../models/Character'

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
        var characters
        if (pageOptions.name) {
          characters = await Character.find({name: new RegExp(pageOptions.name)})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .populate('appearances', 'url name')
        }
        else {
          characters = await Character.find({})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .populate('appearances', 'url name')
        }

        res.status(200).json({ success: true, count: characters.length, data: characters })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
