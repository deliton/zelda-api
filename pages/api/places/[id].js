import { JSONDriver } from "../../../db/driver";

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
        place.data.appearances = place.data.appearances.map(
          (gameId) => process.env.API_URL + "games/" + gameId["$oid"]
        );
        place.data.inhabitants = place.data.inhabitants.map(
          (characterId) =>
            process.env.API_URL + "characters/" + characterId["$oid"]
        );
        res
          .status(200)
          .json({ success: true, count: place.length, data: place });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
