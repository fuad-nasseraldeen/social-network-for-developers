const { check, validationResult } = require('express-validator')
const express = require('express')
const request = require('request')
const config = require('config')
const fs = require('fs') // to delete the file if there is an error in it, the file system = fs
const router = express.Router()
const auth = require('../../middleware/auth')
const fileUpload = require('../../middleware/file-upload')

const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')
const Image = require('../../models/Image')

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private - we don't need a token for this
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['name', 'avatar']
        )

        if (!profile) {
            return res
                .status(400)
                .json({ msg: 'There is no profile for this user' })
        }
        res.send(profile)
    } catch (error) {
        res.status(500).send('Server Error')
    }
})

// @route   POST api/profile/me
// @desc    Create or Update a user profile
// @access  Private - we don't need a token for this
router.post(
    '/',
    [
        auth,
        [
            check('status', 'Status is required').not().isEmpty(),
            check('skills', 'skills is required').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }) // its not empty but it has error in the body
        }

        const {
            company,
            website,
            location,
            status,
            skills,
            bio,
            githubusername,
            youtube,
            github,
            facebook,
            linkedin,
            instagram
        } = req.body

        //Build profile object
        const profileFields = {}
        profileFields.user = req.user.id
        if (company) profileFields.company = company
        if (website) profileFields.website = website
        if (location) profileFields.location = location
        if (bio) profileFields.bio = bio
        if (status) profileFields.status = status
        if (githubusername) profileFields.githubusername = githubusername

        //Build social object
        profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube
        if (github) profileFields.social.github = github
        if (facebook) profileFields.social.facebook = facebook
        if (linkedin) profileFields.social.linkedin = linkedin
        if (instagram) profileFields.social.instagram = instagram

        //Create
        if (skills) {
            Array.isArray(skills)
                ? (profileFields.skills = skills)
                : (profileFields.skills = skills
                      .split(',')
                      .map((skill) => ' ' + skill.trim()))
        }

        try {
            let profile = await Profile.findOne({ user: req.user.id })

            if (profile) {
                //Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                )
                return res.json(profile)
            }

            profile = new Profile(profileFields)
            await profile.save()
            res.json(profile)
        } catch (error) {
            res.status(500).send('Server error')
        }
    }
)

// @route   GET api/profile
// @desc    Get all profiles
// @access  public - we don't need a token for this
router.get('/', fileUpload.single('image'), async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', [
            'name',
            'avatar'
        ])
        res.send(profiles)
    } catch (error) {
        res.status(500).send('Server Error')
    }
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public - we don't need a token for this
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            user: req.params.user_id
        }).populate('user', ['name', 'avatar'])

        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        res.send(profile)
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        res.status(500).send('Server Error')
    }
})

// @route   DELETE api/profile
// @desc    DELETE profile, USER & POSTS
// @access  Private - we don't need a token for this
router.delete('/', auth, async (req, res) => {
    try {
        //Remove user posts
        await Post.deleteMany({ user: req.user.id })

        //Remove Profile
        await Profile.findOneAndRemove({ user: req.user.id })

        //Remove User
        await User.findOneAndRemove({ _id: req.user.id })

        // Remove user posts
        // Remove profile
        // Remove user
        // await Promise.all([
        //     Post.deleteMany({ user: req.user.id }),
        //     Profile.findOneAndRemove({ user: req.user.id }),
        //     User.findOneAndRemove({ _id: req.user.id })
        //   ])

        res.send({ msg: 'User deleted' })
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        res.status(500).send('Server Error')
    }
})

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private - we don't need a token for this
router.put(
    '/experience',
    [
        auth,
        check('title', 'Title is required').not().isEmpty(),
        check('company', 'Company is required').not().isEmpty(),
        check('from', 'From date is required and needs to be from the past')
            .notEmpty()
            .custom((value, { req }) =>
                req.body.to ? value < req.body.to : true
            )
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id })

            profile.experience.unshift(req.body)
            await profile.save()
            res.send(profile)
        } catch (error) {
            res.status(500).send(error)
        }
    }
)

// @route   DELETE api/profile/experience
// @desc    DELETE experience from profile
// @access  Private - we don't need a token for this
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        const removeIndex = profile.experience
            .map((item) => item.id)
            .indexOf(req.params.exp_id)

        profile.experience.splice(removeIndex, 1)
        await profile.save()
        res.send(profile)
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        res.status(500).send(error)
    }
})

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private - we don't need a token for this
router.put(
    '/education',
    [
        auth,
        check('school', 'School is required').not().isEmpty(),
        check('degree', 'Degree is required').not().isEmpty(),
        check('fieldofstudy', 'Field Of Study is required').not().isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { school, degree, fieldofstudy, from, to, current, description } =
            req.body

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id })

            profile.education.unshift(newEdu)
            await profile.save()
            res.send(profile)
        } catch (error) {
            res.status(500).send(error)
        }
    }
)

// @route   DELETE api/profile/education
// @desc    DELETE education from profile
// @access  Private - we don't need a token for this
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })
        const removeIndex = profile.experience
            .map((item) => item.id)
            .indexOf(req.params.edu_id)

        profile.education.splice(removeIndex, 1)
        await profile.save()
        res.send(profile)
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Profile not found' })
        }
        res.status(500).send(error)
    }
})

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  public - we don't need a token for this
router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${
                req.params.username
            }/repos?per_page=5&sort=created:asc&client_id=${config.get(
                'githubClientId'
            )}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }
        request(options, (error, response, body) => {
            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'No Github profile found' })
            }
            res.send(JSON.parse(body))
        })
    } catch (error) {
        res.status(500).send(error)
    }
})

// @route   POST api/profile/upload
// @desc    upload prifile picture
// @access  Private - we don't need a token for this
router.post('/upload', fileUpload.single('image'), auth, async (req, res) => {
    try {
        if (!req.file) {
            // this will delete the file
            fs.unlink(req.file.path, (err) => {
                return res.status(400).send({ msg: 'Please upload a file!' }) // if delete the file not succes
            })
        }

        const avatar = req.file.path
        const user = await User.findById(req.user.id).select('-password')

        if (user) {
            //Update
            await User.findOneAndUpdate(
                { _id: user._id }, // find object that has _id === user._id
                { $set: { avatar } }, // update the fdield avatar with avatar
                { new: true }
            )
        }
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['name', 'avatar']
        )
        return res.send(profile)

        // const user = await Image.findOne({ userId: req.user.id })
        // if (user) {
        //     const updateUser = await Image.findOneAndUpdate(
        //         { user: req.user.id },
        //         { $set: { image: avatar } },
        //         { new: true }
        //     )
        //     return res.json(updateUser)
        // } else {
        //     const userProfile = new Image({
        //         userId: req.user.id,
        //         image: avatar
        //     })

        //     const newUserProfile = await userProfile.save()
        //     return res.json(newUserProfile)
        // }
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router
