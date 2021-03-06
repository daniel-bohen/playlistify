import querystring from 'querystring'
import axios from 'axios'
require('dotenv').config(); 
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
import { useEffect, useState } from 'react';



export default async function callback(req, res) {

    const code = req.query.code || null;

    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
    })
      .then(response => {
        if (response.status === 200) {
          const { access_token, refresh_token } = response.data;
          const queryParams = querystring.stringify({
            access_token,
            refresh_token,
          });
  
          res.redirect(`http://localhost:3000/dashboard?${queryParams}`);

        } else {
          res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
        }
      })
      .catch(error => {
        res.send(error);
      });
};

