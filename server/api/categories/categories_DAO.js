const CategoryModel = require("./categories_schema_DTO")

const getCategories = callback => {
    CategoryModel
        .find({ isDeleted: false })
        .sort('-createAt')
        .lean()
        .exec( (err, docs) => {
            if (err) return callback(err, { success: false, msg: "Something went wrong ", errors: err })
            if (docs.length === 0) return callback(err, { success: false, msg: "not data found", errors: err})
            return callback (null, true, docs)
        })
}
module.exports = { getCategories }