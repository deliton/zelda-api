import { JSONDriver } from "../../../db/driver";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const Character = new JSONDriver("characters");
  await Character.init();

  switch (method) {
    case "GET":
      try {
        const character = Character.findById(id);
        character.data.appearances = character.data.appearances.map(
          (gameId) => process.env.API_URL + "games/" + gameId["$oid"]
        );
        res
          .status(200)
          .json({
            success: true,
            count: character.data.length,
            data: character.data,
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
