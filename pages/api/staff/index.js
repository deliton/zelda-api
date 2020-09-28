import dbConnect from '../../../utils/dbConnect'
import Staff from '../../../models/Staff'
import { parseLimit, parseWorkedOn } from '../../../utils/responsePipes'

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
        var staff
        if (pageOptions.name) {
          staff = await Staff.find({name: new RegExp(pageOptions.name)})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .exec()
        }
        else {
          staff = await Staff.find({})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .exec()
        }
        staff = parseWorkedOn(staff)
        res.status(200).json({ success: true, count: staff.length, data: staff })
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
