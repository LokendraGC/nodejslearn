import users from '../models/users.json' with { type: 'json' };
import jwt from 'jsonwebtoken';


const userDb = {
    users: users,
    setUsers: function (data) {
        this.users = data;
    }
}

export const handleRefreshToken = (req, res) => {

    const cookies = req.cookies;

    if (!cookies.jwt) {
        return res.sendStatus(401).json({ 'message': 'Unauthorized' });
    }

    const refreshToken = cookies.jwt;

    console.log("COOKIE:", refreshToken);
    console.log("DB:", userDb.users.map(u => u.refreshToken));

    const foundUser = userDb.users.find(person => person.refreshToken === refreshToken);

    if (!foundUser) {
        return res.status(403).json({ 'message': 'Forbidden' });
    }

    try {

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {

            if (err || foundUser.email !== decoded.email) {
                return res.status(403).json({ 'message': 'Forbidden' });
            }

            // New short-lived access token is generated based on the user data in the refresh token
            const accessToken = jwt.sign({
                "username": decoded.username,
                "email": decoded.email
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