import { JSONDriver } from "../../../db/driver";
import { parseLimit, parseObject } from "../../../utils/responsePipes";

export default async function handler(req, res) {
  const { method } = req;
  const pageOptions = {
    page: parseInt(req.query.page, 10) || 0,
    limit: parseLimit(req.query.limit),
    name: req.query.name || undefined,
  };

  const Place = new JSONDriver("places");
  await Place.init();

  switch (method) {
    case "GET":
      try {
        var places;
        if (pageOptions.name) {
          places = await Place.search({ name: pageOptions.name })
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        } else {
          places = await Place.findMany({})
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit);
        }
        places.data = parseObject(places.data, "games/", "appearances");
        places.data = parseObject(places.data, "characters/", "inhabitants");
        res
          .status(200)
          .json({
            success: true,
            count: places.data.length,
            data: places.data,
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
