import { JSONDriver } from "../../../db/driver";
import { parseOneObject } from "../../../utils/responsePipes";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const Place = new JSONDriver("places");
  await Place.init();

  switch (method) {
    case "GET":
      try {
        const place = await Place.findById(id);
        place.data = parseOneObject(place.data, "games/", "appearances");
        place.data = parseOneObject(place.data, "characters/", "inhabitants");
        res
          .status(200)
          .json({ success: true, count: place.data.length, data: place.data });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
