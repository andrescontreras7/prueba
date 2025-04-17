const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3021;

app.use(cors());
app.use(express.json());

const USERS_FILE = path.join(__dirname, 'users.json');

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
  const user = users.find(u => u.email === email && u.password === password); 

  if (user) {
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email 
      },
      token: 'fake-jwt-token'
    });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});