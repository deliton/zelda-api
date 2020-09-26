function replaceIdWithApiUrl(id, collection) {
    return `${process.env.API_URL}${collection}/${id}`
}

module.exports = { replaceIdWithApiUrl }