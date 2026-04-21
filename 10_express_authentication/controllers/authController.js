import bcrypt from 'bcrypt';
import users from '../models/users.json' with { type: 'json' };

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
            res.json({ 'message': `User ${foundUser.username} logged in successfully.` });
        } else {
            res.status(401).json({ 'message': 'Unauthorized' });
        }

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}