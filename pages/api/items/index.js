import dbConnect from '../../../utils/dbConnect'
import Item from '../../../models/Item'
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
        var items
        if(pageOptions.name) {
          items = await Item.find({name: new RegExp(pageOptions.name)})
          .skip(pageOptions.page * pageOptions.limit)
          .limit(pageOptions.limit)
        }
        else {
          items = await Item.find({})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
        }
        items = parseAppearances(items)
        res.status(200).json({ success: true, count: items.length, data: items })
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
