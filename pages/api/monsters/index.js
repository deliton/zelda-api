import { JSONDriver } from "../../../db/driver";
import { parseLimit, parseObject } from "../../../utils/responsePipes";

export default async function handler(req, res) {
  const { method } = req;
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseLimit(req.query.limit),
    name: req.query.name || undefined,
  };

  const Monster = new JSONDriver("monsters");
  await Monster.init();

  switch (method) {
    case "GET":
      try {
        var monsters;
        if (pageOptions.name) {
          monsters = Monster.search({ name: pageOptions.name })
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        } else {
          monsters = await Monster.findMany()
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        }
        monsters.data = parseObject(monsters.data, "games/", "appearances");
        res
          .status(200)
          .json({
            success: true,
            count: monsters.data.length,
            data: monsters.data,
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
