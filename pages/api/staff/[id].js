import dbConnect from '../../../utils/dbConnect'
import Staff from '../../../models/Staff'
import { parseWorkedOn } from '../../../utils/responsePipes'

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const staff = await Staff.findById(id)/* find data that contains ID in database */
        staff = parseWorkedOn(staff)
        res.status(200).json({ success: true,count: staff.length, data: staff })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
