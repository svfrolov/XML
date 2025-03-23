// bff/index.js
const express = require('express');
const axios = require('axios');

const app = express();
const port = 9000;

app.use(express.json());
app.use(express.static('public'));

app.get('/api/stocks', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8000/stocks');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`BFF server is running on port ${port}`);
});
