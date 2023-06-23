const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

const configuration = new Configuration({
    apiKey: process.env.API_KEY,
});

app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(configuration);




app.get('/', async (req, res) => res.send('Server is running'));

app.listen(port, () => console.log(`Server running on port ${port}`));