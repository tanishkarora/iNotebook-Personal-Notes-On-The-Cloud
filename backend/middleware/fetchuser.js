const jwt = require('jsonwebtoken');

const JWT_SECRET = "Harryisagoodb$y";

const fetchuser = async (req, res, next) => {
    // Get the user from the jwt token and add id to the request
    const token = await req.header('auth-token');
    if (!token) {
        return res.status(401).json({ errors: [{ msg: 'No token, authorization denied' }] });
    }
    try {
        const data = await jwt.verify(token, JWT_SECRET);
        req.user = data;
        next();       
        
    } catch (error) {
        res.status(401).json({ errors: [{ msg: 'Invalid token' }] });
    }
}

module.exports = fetchuser;
