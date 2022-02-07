import { JSONDriver } from "../../../db/driver";
import { parseLimit, parseObject } from "../../../utils/responsePipes";

export default async function handler(req, res) {
  const { method } = req;
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseLimit(req.query.limit),
    name: req.query.name || undefined,
  };

  const Boss = new JSONDriver("bosses");
  await Boss.init();

  switch (method) {
    case "GET":
      try {
        var bosses;
        if (pageOptions.name) {
          bosses = Boss.search({ name: pageOptions.name })
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        } else {
          bosses = Boss.findMany()
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        }
        bosses.data = parseObject(bosses.data, "games/", "appearances");
        bosses.data = parseObject(bosses.data, "dungeons/", "dungeons");
        res.status(200).json({
          success: true,
          count: bosses.data.length,
          data: bosses.data,
        });
      } catch (error) {
        res.status(400).json({ success: false, message: error });
        console.log(error);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
