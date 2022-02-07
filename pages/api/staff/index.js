import { JSONDriver } from "../../../db/driver";
import {
  parseLimit,
  parseObject,
  parseWorkedOn,
} from "../../../utils/responsePipes";

export default async function handler(req, res) {
  const { method } = req;
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseLimit(req.query.limit),
    name: req.query.name || undefined,
  };

  const Staff = new JSONDriver("staff");
  await Staff.init();

  switch (method) {
    case "GET":
      try {
        var staff;
        if (pageOptions.name) {
          staff = Staff.search({ name: pageOptions.name })
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        } else {
          staff = Staff.findMany()
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        }
        staff.data = parseObject(staff.data, "games/", "worked_on");
        res
          .status(200)
          .json({ success: true, count: staff.data.length, data: staff.data });
      } catch (error) {
        res.status(400).json({ success: false });
        console.log(error);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
