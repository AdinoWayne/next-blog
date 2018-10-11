const next = require("next")
const async = require("async")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

const categoryController = require("./api/categories/categories_controller")
const postController = require("./api/posts/post_controller")

const handleNormalRequest = (req, res) => {
    if(dev) {
        const handleDev = req.app.getRequestHandler();
        return handleDev(req, res);
    }
    return handle(req, res);
}

const handleNextRequest = () => {
    const pathname = req.route.path
    const splittedPathname = pathname.split("/")
    const pathList =splittedPathname.filter(elem => elem.length > 0 && elem[0] !==":" );
    const path = "./".concat(pathList.join("/"))
    if (dev) return req.app.render(req, res, path, req.params)
    return app.render(req, res, path, req.params)
}
const middlewareGetHomepage = (req, res, next) => {
    async.parallel({
        categories: (callback) => {
            categoryController._getListOfCategories((err, result) => {
            if (err) return callback(err)
            return callback(null, result)
            })
      },
        posts: (callback) => {
            postController._getListOfPost((err, result) => {
            if (err) return callback(err)
            return callback(null, result)
            })
        }
    }, (err, result) => {
        if (err) {
            req._err = err
            return next()
        }

        req._toClient = result
        return next()
    })
  }
  
const middlewareGetSinglePost = (req, res, next) => {

}
  
const handleGetPostPage = (req, res) => {

}

module.exports = {
    handleNormalRequest,
    handleNextRequest,
    middlewareGetHomepage,
    handleGetPostPage,
    middlewareGetSinglePost
  }