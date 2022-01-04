const router = require('express').Router()
const cloudinary = require('cloudinary')
const { auth } = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const Images = require('../controllers/uploadController')
const fs = require('fs')

router.post('/upload',auth,authAdmin,Images.uploadImage)
router.post('/destroy',auth,authAdmin, Images.deleteImage)

module.exports = router