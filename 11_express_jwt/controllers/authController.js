import bcrypt from 'bcrypt';
import users from '../models/users.json' with { type: 'json' };
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fsPromises = fs.promises;


const userDb = {
    users: users,
    setUsers: function (data) {
        this.users = data;
    }
}

export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 'message': 'Email and password are required.' });
    }

    const foundUser = userDb.users.find(person => person.email === email);

    if (!foundUser) {
        return res.status(401).json({ 'message': 'Unauthorized' });
    }

    try {

        // this is where we create jwt token and send it back to the client
        const match = await bcrypt.compare(password, foundUser.password);

        if (match) {

            // create JWT token here and send it back to the client

            // access token is used to access protected routes, it has a short expiration time
            const accessToken = jwt.sign(
                {
                    username: foundUser.username,
                    email: foundUser.email
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            );

            // refresh token is used to get a new access token, it has a long expiration time
            const refreshToken = jwt.sign(
                {
                    username: foundUser.username,
                    email: foundUser.email
                },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );



            // saving refresh token with current user
            const otherUsers = userDb.users.filter(
                person => person.email !== foundUser.email
            );

            // Best practice: store ONLY refreshToken in DB (not accessToken)
            const currentUser = {
                ...foundUser,
                refreshToken
            };

            userDb.setUsers([...otherUsers, currentUser]);

            await fsPromises.writeFile(
                path.join(__dirname, '..', 'models', 'users.json'),
                JSON.stringify(userDb.users)
            );

            // sending refresh token as http only cookie to the client
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                sameSite: 'None',
                secure: true, // set false in localhost if needed
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            res.json({ 'message': `User ${foundUser.username} logged in successfully.`, accessToken });
        } else {
            res.status(401).json({ 'message': 'Unauthorized' });
        }

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}