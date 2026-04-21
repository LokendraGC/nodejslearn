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

export const handleLogout = async (req, res) => {

    const cookies = req.cookies;

    if (!cookies.jwt) {
        return res.status(400).json({ 'message': 'Refresh token is required.' });
    }

    const refreshToken = cookies.jwt;
    const foundUser = userDb.users.find(person => person.refreshToken === refreshToken);

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.status(204).json({ 'message': 'No content' });
    }

    const otherUsers = userDb.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: '' };
    userDb.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'users.json'),
        JSON.stringify(userDb.users)
    );

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // secure: true - only serves on https
    res.status(204).json({ 'message': 'Logged out successfully' });

}