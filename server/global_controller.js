const next = require("next")
const async = require("async")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()
const categoryController = require("./api/categories/categories_controller")
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