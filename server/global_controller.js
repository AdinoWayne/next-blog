const next = require("next")
const async = require("async")

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

const handleNormalRequest = (req, res) => {
    if(dev) {
        const handleDev = req.app.getRequestHandler();
        return handleDev(req, res);
    }
    return handle(req, res);
}

const handleNextRequest = () => {

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