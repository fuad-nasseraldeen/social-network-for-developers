const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')
// @route   POST api/users
// @desc    Test route
// @access  Public - we don't need a token for this
router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more character'
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        // in order use this req.body we need to add line 9 in server.js.=> initilaze the middleware
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }) // its not empty but it has error in the body
        }
        const { name, email, password } = req.body

        try {
            // See if user exists
            let user = await User.findOne({ email })

            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'User already exists' }] })
            }
            // Get users gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            user = new User({
                name,
                email,
                avatar,
                password
            })

            // Encrypt password
            const salt = await bcrypt.genSalt(10) // await because we will get a response here, length 10, its like pattern
            user.password = await bcrypt.hash(password, salt) // build the hash password - an encrypt one

            await user.save() // save it to the DB

            // Return jsonwebtoken

            // we get the id from mongoose after saving it to DB
            // add the id to the user object
            // create our token
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtToken'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err
                    res.send({ token })
                }
            )
            // each time we wait to response we should use niether async await or .then
        } catch (err) {
            res.status(500).send('Server error')
        }
    }
)

module.exports = router
