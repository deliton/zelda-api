import dbConnect from '../../../utils/dbConnect'
import Item from '../../../models/Item'

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
        var items
        if(pageOptions.name) {
          items = await Item.find({name: new RegExp(pageOptions.name)})
          .skip(pageOptions.page * pageOptions.limit)
          .limit(pageOptions.limit)
          .populate('games','url name')
        }
        else {
          items = await Item.find({})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .populate('games','url name')
        }

        res.status(200).json({ success: true, count: items.length, data: items })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
