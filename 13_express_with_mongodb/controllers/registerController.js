import bcrypt from 'bcrypt';
import User from '../models/User.js';

// create user
export const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ 'message': 'Username, email, and password are required.' });
    }

    // check for duplicate email
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) {
        return res.status(409).json({ 'message': 'User already exists.' });
    }

    try {
        // encrypt the password
        // 10 tells bcrypt how many times to process (hash) the password internally
        // the more rounds, the more secure but also the more time it takes to hash and compare passwords
        const hashedpwd = await bcrypt.hash(password, 10);
        // store new user
        const result = await User.create({ username: username, email:email, password: hashedpwd });
        res.status(201).json({ 'success': `New user ${result.username} created.`, result });

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}