import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const handleRefreshToken = async (req, res) => {

    const cookies = req.cookies;

    if (!cookies.jwt) {
        return res.sendStatus(401).json({ 'message': 'Unauthorized' });
    }

    const refreshToken = cookies.jwt;

    console.log("COOKIE:", refreshToken);
    console.log("DB:", await User.find().select('refreshToken').lean().exec());

    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

    if (!foundUser) {
        return res.status(403).json({ 'message': 'Forbidden' });
    }

    try {

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {

            if (err || foundUser.email !== decoded.email) {
                return res.status(403).json({ 'message': 'Forbidden' });
            }


            // Object.values() is used to get the values of the roles object, which is an array of role values
            // it convert the roles object to an array of role values, which can be used to create the access token
            const roles = Object.values(foundUser.roles);

            // New short-lived access token is generated based on the user data in the refresh token
            const accessToken = jwt.sign(
                {
                    "userInfo": {
                        "username": foundUser.username,
                        "email": foundUser.email,
                        "roles": foundUser.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );
            res.json({ accessToken })
        })


    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}