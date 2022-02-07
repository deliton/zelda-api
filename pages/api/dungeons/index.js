import { JSONDriver } from "../../../db/driver";
import { parseLimit, parseObject } from "../../../utils/responsePipes";

export default async function handler(req, res) {
  const { method } = req;
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseLimit(req.query.limit),
    name: req.query.name || undefined,
  };

  const Dungeon = new JSONDriver("dungeons");
  await Dungeon.init();

  switch (method) {
    case "GET":
      try {
        var dungeons;
        if (pageOptions.name) {
          dungeons = Dungeon.search({ name: pageOptions.name })
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        } else {
          dungeons = Dungeon.findMany()
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        }
        dungeons.data = parseObject(dungeons.data, "games/", "appearances");
        res
          .status(200)
          .json({
            success: true,
            count: dungeons.data.length,
            data: dungeons.data,
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
