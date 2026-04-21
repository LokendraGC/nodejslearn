import users from '../models/users.json' with { type: 'json' };
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fsPromise = fs.promises;

const userDb = {
    users: users,
    setUsers: function (data) {
        this.users = data;
    }
}

// create user
export const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ 'message': 'Username, email, and password are required.' });
    }

    const duplicate = userDb.users.find(person => person.email === email);
    if (duplicate) {
        return res.status(409).json({ 'message': 'User already exists.' });
    }

    try {
        // encrypt the password
        // 10 tells bcrypt how many times to process (hash) the password internally
        // the more rounds, the more secure but also the more time it takes to hash and compare passwords
        const hashedpwd = await bcrypt.hash(password, 10);
        // store new user
        const newUser = { username: username, email:email, password: hashedpwd };

        userDb.setUsers([...userDb.users, newUser]);

        await fsPromise.writeFile(path.join(__dirname, '..', 'models', 'users.json'), JSON.stringify(userDb.users));

        res.status(201).json({ 'message': `New user ${username} created.` });


    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}