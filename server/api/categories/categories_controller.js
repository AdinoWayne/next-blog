const getSlug = require("speakingurl")

const Category = require("./categories_DAO")
const CategorySchema = require("./categories_schema_DTO")

const getListOfCategories = (req, res) => {
    CategorySchema.getCategories((err ,result) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(result)
    })
}
const editCategory = (req, res) => {}

const deleteCategory = (req, res) => {}

const _getListOfCategories = callback =>{
    Category.getCategories( (err, result) => {
        if (err) return callback(err, null)
        return callback(null, result.docs)
    })
}

const createCategory  = (req, res) => {
    req,checkBody("name", "category name is required").notEmpty()
    const errors  =  req.validationErrors(req)
    if (errors) return res.status(422).json({success: false, msg: "Bad Argument", errors })
    const { name, description, title } = req.body
    const data ={
        name,
        description: description || "",
        title: title || "",
        slug: getSlug(name, { lang: process.env.SITE_LANGUAGE || "vn" }),
        createdBy: req.user_id
    }
    let category = new CategorySchema(data)
    category.save( (err, doc) => {
        if (err) return res.staus(422).json({ success: false, msg: "Cannot create document", errors: err})
        return res.status(201).json({ success: true, msg: "Success!", category: doc});
    })
}

module.exports = {
    getListOfCategories,
    _getListOfCategories,
    editCategory,
    deleteCategory,
    createCategory
  }