const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const bcrypt = require('bcryptjs')
// @route   GET api/auth
// @desc    Test route
// @access  Public - we don't need a token for this
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password') // we don't need the password
        res.json(user)
    } catch (error) {
        res.status(500).send('Server Error')
    }
})

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public - we don't need a token for this
router.post(
    '/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'password is required'
        ).exists(),
    ],
    async (req, res) => {
        // in order use this req.body we need to add line 9 in server.js.=> initilaze the middleware
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }) // its not empty but it has error in the body
        }
        const { email, password } = req.body

        try {
            // See if user exists
            let user = await User.findOne({ email })

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] })
            }
            // Return jsonwebtoken

            // we get the id from mongoose after saving it to DB
            // add the id to the user object
            // create our token 
            const payload = {
                user: {
                    id: user.id,
                },
            }

            jwt.sign(
                payload,
                config.get('jwtToken'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err
                    res.send({ token })
                })
            // each time we wait to response we should use niether async await or .then
        } catch (err) {
            res.status(500).send('Server error')
        }
    }
)

module.exports = router