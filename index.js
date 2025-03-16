const express = require('express');
const cors = require('cors');

const app = express();

require('dotenv').config();

const connectMongo = require('./connectMongo');
connectMongo();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const postsRouter = require('./routes/posts.router');
app.use('/api/posts', postsRouter);

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});