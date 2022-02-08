function parseLimit(limit) {
  if (limit != null) {
    var intLimit = parseInt(limit, 10);
    if (intLimit > 50) {
      return 50;
    } else {
      return intLimit;
    }
  } else {
    return 20;
  }
}

function parseObject(object, apiPath, objectName) {
  return object.map((entries) => {
    return {
      ...entries,
      [objectName]: entries[objectName].map(
        (objectId) => process.env.API_URL + apiPath + objectId
      ),
    };
  });
}

function parseOneObject(object, apiPath, objectName) {
  const entries = object[objectName].map(
    (objectId) => process.env.API_URL + apiPath + objectId
  );
  return {
    ...object,
    [objectName]: entries,
  }
}

module.exports = { parseObject, parseOneObject, parseLimit };
