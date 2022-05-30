import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import routes from './routes';

let shortUrl = require('node-url-shortener');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/shortener-serveless', 
  async (req, res) => {

    console.log(req.body.url)

    const urlEncoder = htmlEncoder(req.body.url);

    const promise = new Promise(function(resolve, reject) {
         shortUrl.short(urlEncoder, function(err, url){
          resolve(url)
        });
    })

    promise.then(obj => {
      return res.status(200).json({
        message: obj
    });
    })

  },
);

const htmlEncoder = (url) => {
  url = url.replace('&', '%26');
  url = url.replace('?', '%3F');
  return url;
}

// * Routes * //
app.use('/shortener-serveless', routes.short);

// * Start * //
app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
