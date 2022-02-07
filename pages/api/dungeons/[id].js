import { JSONDriver } from "../../../db/driver";
import { parseOneObject } from "../../../utils/responsePipes";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const Dungeon = new JSONDriver("dungeons");
  await Dungeon.init();

  switch (method) {
    case "GET":
      try {
        const dungeon = Dungeon.findById(id);
        dungeon.data = parseOneObject(dungeon.data, "games/", "appearances");
        res
          .status(200)
          .json({
            success: true,
            count: dungeon.data.length,
            data: dungeon.data,
          });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
