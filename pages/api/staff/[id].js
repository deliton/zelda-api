import { JSONDriver } from "../../../db/driver";
import { parseOneObject } from "../../../utils/responsePipes";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const Staff = new JSONDriver("staff");
  await Staff.init();

  switch (method) {
    case "GET":
      try {
        const staff = Staff.findById(id);
        staff.data = parseOneObject(staff.data, "games/", "worked_on");
        res
          .status(200)
          .json({ success: true, count: staff.data.length, data: staff.data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
