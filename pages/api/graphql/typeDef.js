import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Game {
    id: ID!
    name: String
    description: String
    developer: String
    publisher: String
    released_date: String
  }

  type Dungeon {
    id: ID!
    name: String
    description: String
    appearances: [Game]
  }

  type Boss {
    id: ID!
    name: String
    description: String
    appearances: [Game]
    dungeons: [Dungeon]
  }

  type Character {
    id: ID!
    name: String
    description: String
    gender: String
    race: String
    appearances: [Game]
  }

  type Era {
    id: ID!
    name: String
    description: String
    games: [Game]
  }

  type Item {
    id: ID!
    name: String
    description: String
    games: [Game]
  }

  type Monster {
    id: ID!
    name: String
    description: String
    appearances: [Game]
  }

  type Place {
    id: ID!
    name: String
    description: String
    appearances: [Game]
    inhabitants: [Character]
  }

  type Staff {
    id: ID!
    name: String
    worked_on: [Game]
  }

  type Query {
    games(
      id: ID
      name: String
      description: String
      developer: String
      released_date: String
      page: Int = 0
      limit: Int
    ): [Game]
    getGame(id: String!): Game!

    dungeons(
      id: ID
      name: String
      description: String
      page: Int = 0
      limit: Int
    ): [Dungeon]
    getDungeon(id: String!): Dungeon!

    bosses(
      id: ID
      name: String
      description: String
      page: Int = 0
      limit: Int
    ): [Boss]
    getBoss(id: String!): Boss!

    characters(
      id: ID
      name: String
      description: String
      page: Int = 0
      limit: Int
    ): [Character]
    getCharacter(id: String!): Character!

    eras(
      id: ID
      name: String
      description: String
      page: Int = 0
      limit: Int
    ): [Era]
    getEra(id: String!): Era!

    items(
      id: ID
      name: String
      description: String
      page: Int = 0
      limit: Int
    ): [Item]
    getItem(id: String!): Item!

    monsters(
      id: ID
      name: String
      description: String
      page: Int = 0
      limit: Int
    ): [Monster]
    getMonster(id: String!): Monster!

    places(
      id: ID
      name: String
      description: String
      page: Int = 0
      limit: Int
    ): [Place]
    getPlace(id: String!): Place!

    staff(id: ID, name: String, page: Int = 0, limit: Int): [Staff]
    getStaff(id: String!): Staff!
  }
`;
