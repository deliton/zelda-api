import dbConnect from '../../../utils/dbConnect'
import Staff from '../../../models/Staff'

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
        var staff
        if (pageOptions.name) {
          staff = await Staff.find({name: new RegExp(pageOptions.name)})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .populate('worked_on', 'url name')
        }
        else {
          staff = await Staff.find({})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)
            .populate('worked_on', 'url name')
        }

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
