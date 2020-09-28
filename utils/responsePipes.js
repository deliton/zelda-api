function parseLimit(limit) {
    if(limit != null) {
        var intLimit = parseInt(limit,10)
        if(intLimit > 50) {
            return 50
        }
        else {
            return intLimit
        }
    }
    else {
        return 20
    }
}

function parseAppearances(response) {
    return response.map(object => {
        return {
          ...object._doc,
          appearances: object._doc.appearances.map(game => process.env.API_URL + 'games/' + game),
        }
      })
}

function parseGames(response) {
    return response.map(object => {
        return {
          ...object._doc,
          games: object.games.map(game => process.env.API_URL + 'games/' + game),
        }
      })
}

function parseWorkedOn(response) {
    return response.map(object => {
        return {
          ...object._doc,
          worked_on: object.worked_on.map(game => process.env.API_URL + 'games/' + game),
        }
      })
}

module.exports = { parseAppearances, parseLimit, parseWorkedOn, parseGames}