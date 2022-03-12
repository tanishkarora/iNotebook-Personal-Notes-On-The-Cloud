const router = require('express').Router();
const User = require('../models/User');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET='Harryisagoodb$y'

 //Route 1 Create a User using: POST /api/auth. Doesn't require authentication.
router.post('/createuser',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('name').isLength({min: 3}).withMessage('Please enter a valid name'),
    body('password').isLength({min: 6}).withMessage('Please enter a valid password')
] , async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try{
    let user = await User.findOne({email: req.body.email});
    if (user){
        return res.status(400).json({errors: [{msg: 'User already exists'}]});
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
    })
    const authtoken = jwt.sign({id: user.id}, JWT_SECRET);
    res.json({authtoken});}
    catch(err){
        return res.status(500).send('Server error');
    }

});

///Route 2 authencticate a user using: POST /api/auth/login no login required

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').exists().withMessage('Password cannot be blank')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const{email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({errors: [{msg: 'Invalid credentials'}]});
        }
        
        const authtoken = jwt.sign({id: user.id}, JWT_SECRET);
        res.json({authtoken});

    } catch (error) {
        return res.status(500).send('Server error');
    }


});

// Route 3 Get logged in user using: GET /api/auth/getuser login required
router.post('/getuser', fetchuser, async (req, res) => {
try {
    const user = await User.findById(req.user.id).select('-password');
    res.send(user);
} catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
}}); 

module.exports = router;