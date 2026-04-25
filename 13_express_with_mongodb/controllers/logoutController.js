import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const handleLogout = async (req, res) => {

    const cookies = req.cookies;

    if (!cookies.jwt) {
        return res.status(400).json({ 'message': 'Refresh token is required.' });
    }

    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.status(204).json({ 'message': 'No content' });
    }

    foundUser.refreshToken = '';
    const result = await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // secure: true - only serves on https
    res.status(204).json({ 'message': `User ${result.username} logged out successfully.` });

}