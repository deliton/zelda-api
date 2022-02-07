import { JSONDriver } from "../../../db/driver";
import { parseOneObject } from "../../../utils/responsePipes";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const Boss = new JSONDriver("bosses");
  await Boss.init();

  switch (method) {
    case "GET":
      try {
        const boss = Boss.findById(id);
        boss.data = parseOneObject(boss.data, "games/", "appearances");
        boss.data = parseOneObject(boss.data, "dungeons/", "dungeons");
        res
          .status(200)
          .json({ success: true, count: boss.data.length, data: boss.data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
