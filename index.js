const express = require('express');
const cors = require('cors');

const app = express();

require('dotenv').config();

const connectMongo = require('./connectMongo');
connectMongo();

// var allowlist = [process.env.FRONT_APP_URL]
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

// app.use(cors(corsOptionsDelegate));

app.use(cors({
    origin: process.env.FRONT_APP_URL
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const postsRouter = require('./routes/posts.router');
app.use('/api/posts', postsRouter);

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});