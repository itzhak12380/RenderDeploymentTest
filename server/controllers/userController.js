const Users = require("../models/userModel")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const Payments = require('../models/paymentModel')
require('dotenv').config()
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        const user = await Users.findOne({ email })
        if (user) return res.status(400).json({ message: "email already in use" })
        if (password.length < 6) return res.status(400).json({ message: "password is at least 6 characters long" })

        bcrypt.genSalt(12, (error, salt) => {
            if (error) throw error
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
                if (err) throw err
                req.body.password = hash
                const newUser = new Users({
                    name, email, role,
                    password: req.body.password
                })
                await newUser.save()
                const accessToken = createAccessToken({ id: newUser._id })
                const refreshtoken = createRefreshToken({ id: newUser._id })

                res.cookie('refreshtoken', refreshtoken, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
                })
                res.status(200).json({ accessToken,refreshtoken })
            })
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "user email dosnt exist" })
        }
        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "password dosnt match the account" })
        }
        const accessToken = createAccessToken({ id: user._id })
        res.status(201).json({ accessToken })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const logout = (req, res) => {
    res.redirect("/")
}
const refreshToken = (req, res) => {
    try {
        // const ref_token = req.cookie.refreshtoken
        // if (!ref_token) return res.status(400).json({ msg: "please login or register" })
        // jwt.verify(ref_token,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{
        //     if(err) return res.status(400).json({ msg: "please login or register" })
        //     const accesstoken  = createAccessToken({id:user.id})
        // })
        // res.json({ user,accesstoken })


        ///
        const rf_token = req.cookies.refreshtoken;
        if (!rf_token) return res.status(400).json({ msg: "Please Login or Register" })

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(400).json({ msg: "Please Login or Register" })

            const accesstoken = createAccessToken({ id: user.id })

            res.json({ accesstoken })
        })
    } catch (err) {

    }

}
const getUser = async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.user.id }).select("-password")
        if (!user) res.status(401).json({ message: "user dosnt exist" })
        res.json({ user })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const addCart = async (req, res) => {
    try {
        const user = await Users.findById(req.user.id)
        if (!user) return res.status(400).json({ message: "user does not exist" })
        await Users.findOneAndUpdate({ _id: req.user.id }, { cart: req.body })
        return res.json({ message: 'added to cart' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

const history = async (req, res) => {
    try {
        const history = await Payments.find({ user_id: req.user.id })
        res.json(history)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
module.exports = { register, login, logout, getUser, refreshToken, addCart, history }