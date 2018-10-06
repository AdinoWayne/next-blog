const async = require("async")
const mongoose = require('mongoose');

const auth = require("../../authentication")
const User = require("./user_DAO")

const postSignup = (req, res) => {
    req.checkBody("email", "Email is not empty!").notEmpty();
    req.checkBody("username", "Username is not empty!").notEmpty();
    req.checkBody("password", "Password is not empty!").notEmpty();
    req.checkBody("email", "Email is not valid!").isEmail();
    req.checkBody("username", "Username must have at least 4 characters and maximum 16 characters!").len(4, 16);
    const errors = req.validationErrors(req);

    if (errors) return res.status(422).json({ success: false, msg: "Bad Argument", errors });
    const userToSave = {
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    }
    async.waterfall(
        [
          callback => User.asyncFindUser(userToSave, callback),
          User.asyncCreateUser
        ],
        (err, result) => {
          if (err) return res.status(500).json({ success: false, errors: err })
          return res.status(201).json({ success: true, user: { username: result.username, email: result.email } })
        }
    )
}

const postLogout = (req, res) => {
    res.clearCookie("token")
    res.json({ success: true, msg: "Ok!" })
}

const getUserAll = (req, res) => {
    User.syncGetAllUser
    .then(result => {
        const response = {
            status: result.exist,
            count: result.res.length,
            account: result.res.map(data => (
                {
                    _id: data._id,
                    email: data.email,
                    username: data.username,
                    password: data.password,
                    role: data.role,
                }
            ))
        }
        return res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: err});
    })
}

const postLogin = (req, res) => {
    req.checkBody("email", "Email is not empty!").notEmpty()
    req.checkBody("password", "Password is not empty!").notEmpty()
  
    const errors = req.validationErrors(req)
  
    if (errors) return res.status(422).json({ success: false, msg: "Bad Argument", errors })
  
    const { email, password } = req.body
  
    async.waterfall(
      [
        callback => User.asyncFindUser({ email, password }, callback),
        User.asyncVerifyAccount
      ],
      (err, result) => {
        if (err) return res.json({ success: false, errors: err })
        if (!result.isMatch) return res.json({ success: false, msg: "Can not Login", errors: { errMsg: "Email and Password do not match!" } })
        let token = auth.signToken(result.doc)
        let user = {
          username: result.doc.username,
          email: result.doc.email,
          role: result.doc.role,
          updatedAt: result.doc.updatedAt,
          createdAt: result.doc.createdAt
        }
  
        res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
        return res.json({ success: true, msg: "Login successfully!", token, user })
      }
    )
}
const deleteUser  = (req, res) => {
    const username = req.params.id;
    if(username){
        User.syncDeleteUser(username)
        .then(result => res.status(201).json({result}))
        .catch(err => res.status(500).json({err}))
    }
}

module.exports = {
    postSignup,
    getUserAll,
    postLogout,
    postLogin,
    deleteUser
}