//mongodb+srv://keshu:keshu@bycrpt.jg5ehyl.mongodb.net/


import bcrypt from 'bcrypt';
import express from 'express';

const app = express();
app.use(express.json());

const users = [];

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 13);
    users.push({
        username,
        password: hash
    });
    console.log(users);
    res.send('User signed up successfully');
});

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) {
        res.status(401).send("Wrong username");
        return;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        res.status(401).send("Wrong password");
        return;
    }
    res.send('User logged in successfully');
});

app.listen(8081, () => console.log("Listening on port 8081"));
